import React from 'react';
import { connect } from 'react-redux';
import { getRenderPixel } from 'ol/render';

class MainMagnifier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleLayers: 0,
      mapLayers: 0
    }
    this.radius = 130;
    this.mousePosition = null;
    this.container = null;
    this.map = props.map;
  }

  componentDidMount = () => {
    this.container = document.getElementById('map');
    const { basemapLayer, mapLayers, compareBasemapLayer } = this.props;
    this.renderMagnifier(basemapLayer, mapLayers, compareBasemapLayer);
  }

  componentWillUnmount = () => {
    const { basemapLayer, mapLayers, compareBasemapLayer } = this.props;
    this.clear(basemapLayer, mapLayers, compareBasemapLayer);
  }

  shouldComponentUpdate = ({ basemapLayer, visibleLayers, mapLayers, layers,  compareBasemapLayer }, nextState) => {
    if (visibleLayers !== this.state.visibleLayers) {
      this.setState({ visibleLayers });
    }
    if (layers !== this.state.mapLayers) {
      this.setState({ mapLayers: layers });
    }

    if (basemapLayer !== this.props.basemapLayer) {
      this.props.basemapLayer.un('postrender', this.postRender);
      basemapLayer.on('postrender', this.postRender);
    }

    if (compareBasemapLayer !== this.props.compareBasemapLayer) {
      if (compareBasemapLayer) {
        compareBasemapLayer.on('postrender', this.postRender);
      }
      if (this.props.compareBasemapLayer) {
        this.props.compareBasemapLayer.un('postrender', this.postRender);
      }
    }
    
    if (
      visibleLayers !== nextState.visibleLayers
      || layers !== nextState.mapLayers
    ) {
      this.props.mapLayers.map(layer => layer.un('postrender', this.postRender));
      mapLayers.map(layer => layer.on('postrender', this.postRender));
    }
    return false;
  }

  mouseMove = (event) => {
    this.mousePosition = this.map.getEventPixel(event);
    this.map.render();
  };

  mouseOut = () => {
    this.mousePosition = null;
    this.map.render();
  }

  postRender = (event) => {
    if (this.mousePosition) {
      const pixel = getRenderPixel(event, this.mousePosition);
      const offset = getRenderPixel(event, [
        this.mousePosition[0] + this.radius,
        this.mousePosition[1]]);
      const half = Math.sqrt(
        Math.pow(offset[0] - pixel[0], 2) + Math.pow(offset[1] - pixel[1], 2)
      );
      const context = event.context;
      const centerX = pixel[0];
      const centerY = pixel[1];
      const originX = centerX - half;
      const originY = centerY - half;
      const size = Math.round(2 * half + 1);
      const sourceData = context.getImageData(originX, originY, size, size).data;
      const dest = context.createImageData(size, size);
      const destData = dest.data;
      for (let j = 0; j < size; ++j) {
        for (let i = 0; i < size; ++i) {
          const dI = i - half;
          const dJ = j - half;
          const dist = Math.sqrt(dI * dI + dJ * dJ);
          let sourceI = i;
          let sourceJ = j;
          if (dist < half) {
            sourceI = Math.round(half + dI / 2);
            sourceJ = Math.round(half + dJ / 2);
          }
          const destOffset = (j * size + i) * 4;
          const sourceOffset = (sourceJ * size + sourceI) * 4;
          destData[destOffset] = sourceData[sourceOffset];
          destData[destOffset + 1] = sourceData[sourceOffset + 1];
          destData[destOffset + 2] = sourceData[sourceOffset + 2];
          destData[destOffset + 3] = sourceData[sourceOffset + 3];
        }
      }
      context.beginPath();
      context.arc(centerX, centerY, half, 0, 2 * Math.PI);
      context.lineWidth = (3 * half) / this.radius;
      context.strokeStyle = 'rgba(255,255,255,0.5)';
      context.putImageData(dest, originX, originY);
      context.stroke();
      context.restore();
    }
  };

  renderMagnifier(basemapLayer, mapLayers, compareBasemapLayer) {
    this.container.addEventListener('mousemove', this.mouseMove);
    this.container.addEventListener('mouseout', this.mouseOut);
    basemapLayer.on('postrender', this.postRender);
    mapLayers.map(layer => layer.on('postrender', this.postRender));
    if (compareBasemapLayer) {
      compareBasemapLayer.on('postrender', this.postRender);
    }
  }

  clear = (basemapLayer, mapLayers, compareBasemapLayer) => {
    this.container.removeEventListener('mousemove', this.mouseMove);
    this.container.removeEventListener('mouseout', this.mouseOut);
    basemapLayer.un('postrender', this.postRender);
    mapLayers.map(layer => layer.un('postrender', this.postRender));
    if (compareBasemapLayer) {
      compareBasemapLayer.un('postrender', this.postRender);
    }
  }

  render() {
    return null;
  }
}


export default connect((state) => {
  return ({
    basemapLayer: state.basemap.selectedBasemapLayer,
    compareBasemapLayer: state.basemap.selectedCompareLayer,
    mapLayers: state.layers.mapLayers,
    layers: state.layers.mapLayers.length,
    visibleLayers: state.layers.visibleLayers.length,
    map: state.map.map
  })
})(MainMagnifier);