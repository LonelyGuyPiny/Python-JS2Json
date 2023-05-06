import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Draw, { createBox } from 'ol/interaction/Draw';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Button } from 'semantic-ui-react';

import { Block, Svg } from '../../..';
import { drawingOptions } from '../../../../constants';
import { filterFeatures, setDrawingData, setSpatialFilterState, setTOCDrawing } from '../../../../redux/modules/toc';

class DrawingComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drawingOptions,
      type: null
    }
    this.draw = null;
    this.source = new VectorSource({ wrapX: false })
    this.map = props.map;
  }

  componentDidMount = () => {
    const { drawingData, bufferData } = this.props;
    if (drawingData) {
      const { vectorLayer, source, draw, type } = drawingData;
      this.vectorLayer = vectorLayer;
      this.source = source;
      this.map.addLayer(vectorLayer);
      this.setState({ type });
      if (draw) {
        this.draw = draw;
        this.map.addInteraction(this.draw);
      }
    } else {
      this.createVectorLayer();
    }

    if (bufferData && bufferData && this.source.getFeatures().length === 0) {
      bufferData.features.map(f => {
        f.setStyle(null);
        return this.source.addFeature(f)
      });
    }

    const { dispatch } = this.props;
    // dispatch(updateDrawingState('DRAWING'));
    dispatch(setSpatialFilterState(true));
    dispatch(setTOCDrawing(true));
  }
  
  UNSAFE_componentWillReceiveProps = ({ isFilter }) => {
    if (isFilter !== this.props.isFilter && isFilter === false) {
      this.source.clear();
    }
  }

  componentWillUnmount = () => {
    this.props.dispatch(setDrawingData({
      vectorLayer: this.vectorLayer,
      source: this.source,
      draw: this.draw,
      type: this.state.type
    }))
    this.map.removeInteraction(this.draw);
    this.map.removeLayer(this.vectorLayer);

    const { dispatch } = this.props;
    // dispatch(updateDrawingState('SPAITAL'));
    dispatch(setSpatialFilterState(false));
    dispatch(setTOCDrawing(false));
  }

  createVectorLayer = () => {
    this.vectorLayer = new VectorLayer({
      source: this.source,
      zIndex: 502,
      title: 'toc-draw'
    });
    this.map.addLayer(this.vectorLayer);
  }

  drawShape = type => () => {
    const { dispatch } = this.props;

    this.setState({ type });
    const self = this;

    if (this.draw) { this.map.removeInteraction(this.draw); }
    let geometryFunction;

    if (type === 'Box') {
      type = 'Circle';
      geometryFunction = createBox();
    }
    this.draw = new Draw({
      source: this.source,
      type,
      geometryFunction
    });

    this.map.addInteraction(this.draw);
    this.intrection = true;
    // dispatch(setMap(map));

    // on start draw clear source
    this.draw.on('drawstart', async function (evt) {
      self.source.clear();
    });

    this.draw.on('drawend', async function (evt) {
      let flatCordinates = evt.feature.getGeometry().flatCoordinates;
      let geometry = null;
      let geometryType = 'esriGeometryPoint';
     
      if (type === 'Point') {
        const coordinate = flatCordinates;
        flatCordinates = coordinate.toString();
        geometry = {
          x: evt.feature.getGeometry().flatCoordinates[0],
          y: evt.feature.getGeometry().flatCoordinates[0]
        };
      } else if (type === 'Polygon') {
        geometryType = 'esriGeometryPolygon';
        const newArray = flatCordinates.reduce(function (coordinates, coordinate, i) {
          if (i % 2 === 0) {
            coordinates.push([coordinate, flatCordinates[i + 1]]);
          }
          return coordinates;
        }, []);
        flatCordinates = ` {"rings": ${JSON.stringify([newArray])}}`;
        geometry = { rings: [newArray] };
      } else if (type === 'LineString') {
        geometryType = 'esriGeometryPolyline';
        const newArray = flatCordinates.reduce(function (coordinates, coordinate, i) {
          if (i % 2 === 0) {
            coordinates.push([coordinate, flatCordinates[i + 1]]);
          }
          return coordinates;
        }, []);
        flatCordinates = ` {"paths": ${JSON.stringify([newArray])}}`;
        geometry = { paths: [newArray] };
      } else {
        geometryType = 'esriGeometryEnvelope';
        flatCordinates = evt.feature.getGeometry().getExtent();
        const coordinate = flatCordinates;
        flatCordinates = coordinate.toString();
        geometry = evt.feature.getGeometry().getExtent();
        geometry = {
          xmin: evt.feature.getGeometry().getExtent()[0],
          ymin: evt.feature.getGeometry().getExtent()[1],
          xmax: evt.feature.getGeometry().getExtent()[2],
          ymax: evt.feature.getGeometry().getExtent()[3],
        };
      }
      dispatch(filterFeatures(null, null, {
        coordinates: flatCordinates,
        type: geometryType,
        rings: geometry
      }));
      self.props.dispatch(setDrawingData({
        vectorLayer: self.vectorLayer,
        source: self.source,
        draw: self.draw,
        type: self.state.type
      }))
    });
  }

  deleteDrawing = async () => {
    this.source.clear();
    const { dispatch } = this.props;
    dispatch(filterFeatures(null, null, null, true));
  }

  render() {
    const { type, drawingOptions } = this.state;
    return (
      <Block className="filter-draw d-flex justify-content-center align-item-center">
        <Block className="filter-draw">
          <Block className="filter-draw d-flex justify-content-center align-item-center">
            {
              drawingOptions.map((element) =>
                <Block className={` ${type === element.text ? 'active' : ''}`} key={element.value}>
                  <Button className="background-grey mr-1 btn-sm" onClick={this.drawShape(element.text)} value={element.value}>
                    <Svg name={element.value} />
                  </Button>
                </Block>
              )
            }
            <Block className="shapes">
              <Button onClick={this.deleteDrawing} >
                <Svg name="trashred" />
              </Button>
            </Block>
          </Block>
        </Block>
      </Block >
    )
  }
}

export default connect(
  state => ({
    map: state.map.map,
    drawingData: state.tocData.drawingData,
    isFilter: state.tocData.isFilter,
    bufferData: state.tocData.bufferData,
  })
)(reduxForm({
  form: 'select-basemap',
  enableReinitialize: true,
})(DrawingComponent));


// digi.pl@kotak.com