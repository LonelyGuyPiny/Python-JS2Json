import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon, Fill, Stroke, Circle } from 'ol/style';

import { Block, Svg } from '../../';
import { mapData } from '../../../config/settings';

import {
  centerOnMap,
  transCordinates
} from '../../../utils/map';

class UrlQuery extends Component {
  constructor(props) {
    super(props)
    const query = new URLSearchParams(window.location.search);
    this.state = {
      query,
      isVisible: false,
      isError: false
    }
    this.vectorSource = new VectorSource();
    this.map = props.map;
    this.compareMap = props.compareMap;
    this.mapOverlay = null;
  }

  componentDidMount = async () => {
    this.VectorLayer = new VectorLayer({
      source: this.vectorSource,
      zIndex: 101,
      title: 'searchQuery',
      style: new Style({
        stroke: new Stroke({
          color: `rgb(27,197,189, 1.0)`,
          width: 3
        }),
        fill: new Fill({
          color: `rgb(27,197,189, 0.5)`
        }),
        image: new Circle({
          radius: 7,
          fill: new Fill({
            color: '#1BC5BD'
          })
        })
      }),
    });
    this.map.addLayer(this.VectorLayer);
    if (!this.state.query) {
      return;
    }


    const { query } = this.state;
    const type = query.get('type');

    if (type && type === 'coordinates') {
      const x = query.get('x');
      const y = query.get('y');
      const projection = query.get('projection');
      const xy = transCordinates([Number(x), Number(y)], this.props.projection, `EPSG:${projection}`);
      this.createFeature(xy);
      this.setState({
        isVisible: true
      })
    }
  }

  componentWillUnmount = () => {
    this.map.removeLayer(this.VectorLayer);
    this.vectorSource.clear();
  }

  getLayersData = () => {
    const data = []
    const { selectedLayers } = this.props;
    if (selectedLayers) {
      Object.keys(selectedLayers).forEach(item => {
        data.push({
          key: item,
          value: selectedLayers[item].layerId,
          text: selectedLayers[item].name,
          parentlayer: selectedLayers[item].parentLayerId,
          url: selectedLayers[item].url,
          id: selectedLayers[item].id
        })
      });
    }
    return data;
  }

  handleClick = () => {
    this.setState({ positionCorner: !this.state.positionCorner });
  }

  createFeature = (coordinate) => {
    try {
      this.vectorSource.clear();
      this.coordinate = coordinate;
      let point = new Point(coordinate);
      if(!point.intersectsExtent([mapData.minx, mapData.miny, mapData.maxx, mapData.maxy])) {
        alert('outside of extent');
        return false;
      }
      const feature = new Feature({
        geometry: point,
        name: 'Null Island',
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
      setTimeout(() => centerOnMap(coordinate, this.map, true), 20);
    } catch(er) {}
  }

  handleZoom = () => {
    try {
      centerOnMap(this.coordinate, this.map, true);
    } catch { }
  }

  clear = () => {
    this.props.history.push('/');
    this.vectorSource.clear();
    // this.props.dispatch(clearData());
    this.setState({ isVisible: false, isError: false })
  }

  render() {
    const { translation } = this.props;
    const { isVisible, isError } = this.state;
    if (isError) {
      return (
        <Block className="d-flex bg-primary query-popup">
          {/* <Block onClick={this.handleZoom.bind(this)} className="mr-1 cursor-pointer" data-tooltip="Focus" data-position="bottom center">
            <Svg name="focus-query" />
          </Block> */}
          <Block><p>{translation.noRecoedOfQuery}</p></Block>
          <Block onClick={this.clear.bind(this)} className="ml-1"><Svg name="close-white" /></Block>
        </Block>
      )
    }
    if (!isVisible) {
      return null;
    }
    return (
      <Block className="d-flex bg-primary query-popup">
        <Block onClick={this.handleZoom.bind(this)} className="mr-1 cursor-pointer" data-tooltip={translation.focusquery} data-position="bottom center">
          <Svg name="focus-query" />
        </Block>
        <Block><p>{translation.showingQueryResuts}</p></Block>
        <Block onClick={this.clear.bind(this)} className="ml-1"><Svg name="close-white" /></Block>
      </Block>
    )
  }
}

export default withRouter(connect(
  state => ({
    map: state.map.map,
    // layers: state.layers.allLayers,
    // center: state.map.center,
    translation: state.translation.translation,
    // basemapList: state.basemap.list,
    projection: state.map.projection
  })
)(UrlQuery));

// unique result:
// ?locate={"layer":"חלקות","where":"GUSH_NUM=1901 and PARCEL=18", "visibleLayers":["גושים","חלקות","ניקוז - רשתות"]}
// ?locate={"layer":"חלקות","where":"GUSH_NUM=1901 and PARCEL=18"}&visibleLayers=["גושים","חלקות","ניקוז - רשתות"]
// multiple results:
// ?locate={"layer":"כתובות","where":"street_name='הנרייטה סאלד' and number='2'"}