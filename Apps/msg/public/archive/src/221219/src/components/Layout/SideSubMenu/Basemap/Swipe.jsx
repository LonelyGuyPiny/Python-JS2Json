import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { getRenderPixel } from 'ol/render';
import { Block, Svg } from '../../../'

class Swipe extends React.Component {
  constructor(props) {
    super(props);
    this.map = this.props.map;
    this.map.updateSize();
    this.swipeBtn = document.getElementById('swipe-btn');
    this.mapWidth = this.map.getSize()[0] / 2;
    this.posX = 0;
    this.left = 0;
    this.movePx = 0;
    this.maxLeft = this.map.getSize()[0] - 110;
    this.minLeft = 100;
    this.state = {
      compareBasemapLayer: null
    }
  }

  componentDidMount = () => {
    this.swipeBtn = document.getElementById('swipe-btn');
    this.createSwipeView();
    this.map.addLayer(this.props.compareBasemapLayer);
    this.handleLables(this.props);
  }

  componentWillUnmount = () => {
    this.map.removeLayer(this.props.compareBasemapLayer);
    const { compareBasemapLayer, labelLayer } = this.props;
    if (compareBasemapLayer) {
      compareBasemapLayer.un('prerender', this.preRender);
      compareBasemapLayer.un('postrender', this.postRender);
      this.swipeBtn.removeEventListener('pointerdown', this.pointerDown, false);
      if (!labelLayer) {
        return
      }
      labelLayer.un('prerender', this.preRender);
      labelLayer.un('postrender', this.postRender);
    }
  }

  shouldComponentUpdate = (nextProps) => {
    const { compareBasemap, compareBasemapLayer, direction } = nextProps;
    this.handleLables(nextProps);
    this.handleNavToggle(nextProps);
    if (compareBasemap !== this.props.compareBasemap) {
      this.compareBasemapLayer = this.props.compareBasemapLayer;
      this.map.addLayer(compareBasemapLayer);
      this.map.removeLayer(this.props.compareBasemapLayer);
    }
    if (direction !== this.props.direction) {
      this.map.render();
    }
    return (
      compareBasemap !== this.props.compareBasemap
    );
  }

  handleLables = (props) => {
    const { compareBasemapLayer, compareBasemapType, basemapType, labelLayer, islabelLayer } = props;
    if (!labelLayer) {
      return
    }
    labelLayer.un('prerender', this.preRender);
    labelLayer.un('postrender', this.postRender);
    if (compareBasemapType === basemapType && basemapType === 'ARIAL') {
      labelLayer.setZIndex(3);
      compareBasemapLayer.setZIndex(2);
    } else if (compareBasemapType === 'ARIAL') {
      labelLayer.setZIndex(3);
      compareBasemapLayer.setZIndex(2);
      labelLayer.on('prerender', this.preRender);
      labelLayer.on('postrender', this.postRender);
    } else {
      labelLayer.setZIndex(2);
      compareBasemapLayer.setZIndex(3);
    }

    if (compareBasemapType === 'ARIAL' && islabelLayer) {
      labelLayer.setVisible(true);
    } else if (compareBasemapType === basemapType && compareBasemapType !== 'ARIAL' && islabelLayer) {
      labelLayer.setVisible(false);
    }
  }

  handleNavToggle = (props) => {
    const { activeNav, direction } = props;
    let minLeft = 100;
    const left = this.swipeBtn.offsetLeft;
    if (activeNav) {
      minLeft += document.getElementById('menuShowhide-block').offsetWidth;
    } else {
      minLeft = 100;
    }

    if (direction === 'RTL') {
      minLeft = this.map.getSize()[0] - (minLeft + 50);
    }

    if (direction === 'LTR' && minLeft > left) {
      this.swipeBtn.style.left = `${minLeft - 18}px`
      this.mapWidth = minLeft;
      this.map.render();
    } else if (direction === 'RTL' && minLeft < left) {
      this.swipeBtn.style.left = `${minLeft - 18}px`
      this.mapWidth = minLeft;
      this.map.render();
    }
  }

  preRender = (event) => {
    const ctx = event.context;
    const mapSize = this.map.getSize();
    const width = this.mapWidth + this.movePx;
    const { direction } = this.props;
    let tl = getRenderPixel(event, [width, 0]);
    let tr = getRenderPixel(event, [mapSize[0], 0]);
    let bl = getRenderPixel(event, [width, mapSize[1]]);
    let br = getRenderPixel(event, mapSize);

    if (direction === 'RTL') {
      tl = getRenderPixel(event, [width, 0]);
      tr = getRenderPixel(event, [0, 0]);
      bl = getRenderPixel(event, [width, mapSize[1]]);
      br = getRenderPixel(event, [0, mapSize[1]]);
    }

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(tl[0], tl[1]);
    ctx.lineTo(bl[0], bl[1]);
    ctx.lineTo(br[0], br[1]);
    ctx.lineTo(tr[0], tr[1]);
    ctx.closePath();
    ctx.clip();
  };

  postRender = (event) => {
    const ctx = event.context;
    ctx.restore();
  }

  onDrag = (e) => {
    const { direction } = this.props;
    const dx = e.x - this.posX;
    if (direction === 'LTR') {
      if ((this.left + dx) > this.maxLeft || (this.left + dx) < this.minLeft) {
        return;
      }
    } else {
      if ((this.left + dx) < 80 || (this.left + dx) > this.minLeft) {
        return;
      }
    }
    this.movePx = dx;
    this.swipeBtn.style.left = `${this.left + this.movePx}px`;
    this.map.render();
  }

  pointerUp = (e) => {
    document.removeEventListener("pointermove", this.onDrag, false);
    this.posX = 0;
    this.left = 0;
    this.mapWidth += this.movePx;
    this.movePx = 0;
    this.minLeft = 100;
  }

  pointerDown = (e) => {
    const { activeNav, direction } = this.props;
    this.posX = e.x;
    this.left = this.swipeBtn.offsetLeft;
    if (activeNav) {
      this.minLeft += document.getElementById('menuShowhide-block').offsetWidth;
    } else {
      this.minLeft = 100;
    }

    if (direction === 'RTL') {
      this.minLeft = this.map.getSize()[0] - (this.minLeft + 50);
    }

    document.addEventListener("pointermove", this.onDrag, false);
    document.addEventListener("pointerup", this.pointerUp, false);
  }

  createSwipeView = () => {
    const { compareBasemapLayer } = this.props;
    if (compareBasemapLayer) {
      compareBasemapLayer.on('prerender', this.preRender);
      compareBasemapLayer.on('postrender', this.postRender);
      this.swipeBtn.addEventListener('pointerdown', this.pointerDown, false);
    }
  }

  clear = () => {
    const { compareBasemapLayer, swipeBtn } = this;
    if (compareBasemapLayer) {
      compareBasemapLayer.un('prerender', this.preRender);
      compareBasemapLayer.un('postrender', this.postRender);
      swipeBtn.removeEventListener('pointerdown', this.pointerDown, false);
    }
  }

  render() {
    const { compareBasemapLayer } = this.props;
    if (compareBasemapLayer && this.swipeBtn) {
      this.clear();
      this.createSwipeView();
    }

    return (
      <Block id="swipe-btn" className="drag-btn" style={{ zIndex: 8, position: 'fixed', left: 'calc(50% - 18px)' }}>
        <Button className="drag-handle-btn">
          <Svg name="arrows-horizontal" />
        </Button>
      </Block>
    );
  }
}

export default connect((state) => ({
  compareBasemapLayer: state.basemap.selectedCompareLayer,
  compareBasemapType: state.basemap.selectedCompareBasemapType,
  basemapType: state.basemap.basemapType,
  labelLayer: state.basemap.labelLayer,
  islabelLayer: state.basemap.islabelLayer,
  map: state.map.map,
  direction: state.translation.direction
}))(Swipe);