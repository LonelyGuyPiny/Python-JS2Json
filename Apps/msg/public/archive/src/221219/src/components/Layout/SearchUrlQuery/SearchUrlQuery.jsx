import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Polygon from 'ol/geom/Polygon';
import MultiLineString from 'ol/geom/MultiLineString';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon, Fill, Stroke, Circle } from 'ol/style';

import { Block, Svg } from '../../';
import { fetchSearchQuery, showVisibleLayers, clearData } from '../../../redux/modules/urlQuery';
import { setBasemap } from '../../../redux/modules/basemap';
import {
  fitToMap,
  centerOnMap,
} from '../../../utils/map';

class SearchUrlQuery extends Component {
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

    if (type) {
      const { dispatch, basemapList } = this.props;
      const data = await dispatch(fetchSearchQuery(this.state.query));
      if (data) {
        const { features, geometryType, visibleLayers, basemap } = data;
        if (!features || (features && features.length === 0)) {
          // alert('something is wrong');
          this.setState({ isError: true })
          return;
        }
        const geometry = features.map(f => f.geometry);
        this.createFeature(geometry, geometryType);
        this.setState({ isVisible: true });
        if (visibleLayers) {
          dispatch(showVisibleLayers(visibleLayers));
        }
        if (basemap && basemap.trim() !== '') {
          const basemapOps = basemapList.basemaps || [];
          if (basemapOps.find(b => b.slug === basemap)) {
            dispatch(setBasemap(basemap, 'VECTOR'));
          } else {
            dispatch(setBasemap(basemap, 'ARIAL'));
          }
        }
      }
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

  createFeature = (geometry, geometryType) => {
    try {
      this.geometryType = geometryType;
      this.geometry = geometry;
      this.vectorSource.clear();
      if (geometryType === 'esriGeometryPoint') {
        geometry.forEach(ring => {
          const coordinate = [ring.x, ring.y];
          let point = new Point(coordinate);
          const feature = new Feature({
            geometry: point,
            name: 'Null Island',
            population: 4000,
            rainfall: 500
          });
          var iconStyle = new Style({
            image: new Icon(({
              anchor: [0.5, 15],
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
          if (geometry.length === 1) {
            setTimeout(() => centerOnMap(coordinate, this.map, true), 20);
          }
        });
        if (geometry.length > 1) {
          setTimeout(() => fitToMap(this.vectorSource.getExtent(), this.map), 20);
        }
      } else if (geometryType === 'esriGeometryPolyline') {
        geometry.forEach(({ paths }) => {
          // let coordinate = paths[0];
          let drawLine = new MultiLineString(paths);
          const feature = new Feature(drawLine);
          this.vectorSource.addFeature(feature);
        });
        setTimeout(() => fitToMap(this.vectorSource.getExtent(), this.map), 20);
      } else {
        geometry.forEach(({ rings }) => {
          const polygon = new Polygon(rings);
          const feature = new Feature(polygon);
          this.vectorSource.addFeature(feature);
        });
        setTimeout(() => { fitToMap(this.vectorSource.getExtent(), this.map) }, 20);
      }
    } catch { }
  }

  handleZoom = () => {
    try {
      if (this.geometryType === 'esriGeometryPoint') {
        if (this.geometry.length > 1) {
          setTimeout(() => fitToMap(this.vectorSource.getExtent(), this.map), 20);
        } else {
          const ring = this.geometry[0];
          const coordinate = [ring.x, ring.y];
          centerOnMap(coordinate, this.map, true);
        }
      } else if (this.geometryType === 'esriGeometryPolyline') {
        setTimeout(() => fitToMap(this.vectorSource.getExtent(), this.map), 20);
      } else {
        setTimeout(() => fitToMap(this.vectorSource.getExtent(), this.map), 20);
      }
    } catch { }
  }

  clear = () => {
    this.props.history.push('/');
    this.vectorSource.clear();
    this.props.dispatch(clearData());
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
    layers: state.layers.allLayers,
    center: state.map.center,
    translation: state.translation.translation,
    basemapList: state.basemap.list,
  })
)(SearchUrlQuery));