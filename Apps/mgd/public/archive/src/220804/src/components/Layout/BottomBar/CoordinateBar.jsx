import React, { Component } from 'react';
import { connect } from 'react-redux';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Icon, Style } from 'ol/style';
import { Block, Svg } from '../..';

import { transCordinates, centerOnMap } from '../../../utils/map';

/**
 * Component
 * @name CoordinateBar
 * @description
 * This is the coordinate bar component of the application. 
 * On application startup, this component is loaded
 */
class CoordinateBar extends Component {
  constructor(props) {
    super(props);
    const { projection, map, decDigits } = props
    const xy = transCordinates(map.getView().getCenter(), this.props.spatialReference, projection);
    this.state = {
      X: xy[0].toFixed(decDigits || 4),
      Y: xy[1].toFixed(decDigits || 4),
      selectedXAxis: '',
      selectedYAxis: '',
      edit: false,
      modelOpen: false
    };

    this.map = props.map;
    this.compareMap = props.compareMap;
    this.vectorSource = new VectorSource();
    this.vectorLayer = null;
  }

  componentDidMount = () => {
    this.getXy();
    this.createVectorLayer();
  }

  componentWillUnmount = () => {
    this.map.removeLayer(this.vectorLayer);
  }

  createVectorLayer = () => {
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      zIndex: 106,
      title: 'show-cooridate',
    });
    this.map.addLayer(this.vectorLayer);
  }

  getXy = () => {
    this.map.on('pointermove', (e) => {
      const { projection, decDigits } = this.props;
      const xy = transCordinates(e.coordinate, this.props.spatialReference, projection);
      this.setState({
        X: xy[0].toFixed(decDigits || 4),
        Y: xy[1].toFixed(decDigits || 4)
      });
    })
    this.compareMap.on('pointermove', (e) => {
      const { projection, decDigits } = this.props;
      const xy = transCordinates(e.coordinate, this.props.spatialReference, projection);
      this.setState({
        X: xy[0].toFixed(decDigits || 4),
        Y: xy[1].toFixed(decDigits || 4)
      });
    })
  }

  editCordinate = () => {
    this.setState({
      selectedXAxis: '',
      selectedYAxis: '',
      edit: !this.state.edit,
      modelOpen: true,
      //showCoordinateOnMap: false
    })
  }


  handleXAxisValue(e) {
    this.setState({
      selectedXAxis: parseFloat(e.target.value)
    })
  }

  handleYAxisValue(e) {
    this.setState({
      selectedYAxis: parseFloat(e.target.value)
    })
  }

  close() {
    this.vectorSource.clear();
    this.setState({
      edit: false,
      modelOpen: false
    })
  }

  showPointonMap = () => {
    const { selectedXAxis, selectedYAxis } = this.state;
    const { projection, spatialReference } = this.props;
    if (selectedXAxis && selectedYAxis) {
      let coordinate = [selectedXAxis, selectedYAxis]
      coordinate = transCordinates(coordinate, projection, spatialReference);
      const point = new Point(coordinate);
      const feature = new Feature({
        geometry: point,
        // name: 'Null Island',
        population: 4000,
        rainfall: 500
      });
      var iconStyle = new Style({
        image: new Icon(({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          opacity: 1,
          height: 400,
          width: 658,
          src: require("../../../assets/images/point.png")
        }))
      });
      feature.setStyle(iconStyle);
      this.vectorSource.addFeature(feature);
      setTimeout(() => centerOnMap(coordinate, this.map), 20);
    }
  }

  render() {
    const { translation, decDigits, direction } = this.props;
    const { selectedXAxis, selectedYAxis, X, Y } = this.state;
    return (
      <Block className="footer-menu-left">
        {/* {!edit ? */}
        <Block className={`axis d-flex pad-${decDigits}`}>
          <Block className="x-axis"><p className="font-weight-medium">X <span className="font-weight-regular">{X}</span></p></Block>
          <Block className="y-axis"><p className="font-weight-medium">Y <span className="font-weight-regular">{Y}</span></p></Block>
          <Block className="locationaxis cursor-pointer" onClick={this.editCordinate} data-tooltip={translation.locatecoordinates} data-position={`${direction === 'RTL' ? 'top left' : 'top right'}`}><Svg name="map-marker" className="pencil alternate icon" /></Block>
        </Block>
        <Block className={`axis axis-edit ${this.state.modelOpen ? 'bottom-axis' : ''} `}>
          <Block className="d-flex justify-space-between">
            <p>{translation.locatecoordinates}</p>
            <Svg name="close-new" className="cursor-pointer" onClick={this.close.bind(this)} />
          </Block>
          <Block className="d-flex flex-pop-up">
            <Block><input type="number" name="x-axis" value={selectedXAxis} placeholder={translation.enterxaxis} onChange={this.handleXAxisValue.bind(this)} /></Block>
            <Block><input type="number" name="y-axis" value={selectedYAxis} placeholder={translation.enteryaxis} onChange={this.handleYAxisValue.bind(this)} /></Block>
            <Svg name="submitaxis" className="cursor-pointer" onClick={this.showPointonMap} />
          </Block>
        </Block>
        {/* } */}
      </Block>
    )
  }
}

export default connect(
  state => ({
    translation: state.translation.translation,
    lang: state.translation.language,
    direction: state.translation.direction,
    map: state.map.map,
    projection: state.map.projection,
    center: state.map.center,
    spatialReference: state.settings.selectedSpatialReference,
    decDigits: state.settings.selectedSpaitalRef.dec_digits,
  }))(CoordinateBar);