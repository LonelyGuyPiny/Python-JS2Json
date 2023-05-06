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
import { fetchQueryGeometry, showVisibleLayers, clearData } from '../../../redux/modules/urlQuery';
import {
  fitToMap,
  centerOnMap,
} from '../../../utils/map';

class UrlQuery extends Component {
  constructor(props) {
    super(props)
    const query = this.getQueryJson();
    this.state = {
      query,
      isVisible: false
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
      title: 'polygon',
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
    const { dispatch } = this.props;
    const { visibleLayers } = this.state.query;

    if (visibleLayers) {
      dispatch(showVisibleLayers(visibleLayers));
    }

    const data = await dispatch(fetchQueryGeometry(this.state.query));
    if (data) {
      const { features, geometryType } = data;
      const geometry = features.map(f => f.geometry);
      this.createFeature(geometry, geometryType);
      this.setState({ isVisible: true });
    }
  }

  componentWillUnmount = () => {
    this.map.removeLayer(this.VectorLayer);
    this.vectorSource.clear();
  }

  getQueryJson = () => {
    try {
      let query = new URLSearchParams(window.location.search).get('locate');
      let visibleLayers = new URLSearchParams(window.location.search).get('visibleLayers');
      query = query ? JSON.parse(query) : null;
      visibleLayers = visibleLayers ? JSON.parse(visibleLayers) : null;
      query = query && visibleLayers ? { ...query, visibleLayers } : (visibleLayers ? { visibleLayers } : query);
      return query;
    } catch {
      return null;
    }
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
        setTimeout(() => fitToMap(this.vectorSource.getExtent(), this.map), 20);
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
    this.setState({ isVisible: false })
  }

  render() {
    const { translation } = this.props;
    const { isVisible } = this.state;
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
  })
)(UrlQuery));

// unique result:
// ?locate={"layer":"חלקות","where":"GUSH_NUM=1901 and PARCEL=18", "visibleLayers":["גושים","חלקות","ניקוז - רשתות"]}
// ?locate={"layer":"חלקות","where":"GUSH_NUM=1901 and PARCEL=18"}&visibleLayers=["גושים","חלקות","ניקוז - רשתות"]
// multiple results:
// ?locate={"layer":"כתובות","where":"street_name='הנרייטה סאלד' and number='2'"}
// http://localhost:3010/?locate={%22layer%22:%22%D7%97%D7%9C%D7%A7%D7%95%D7%AA%22,%22where%22:%22GUSH_NUM=1901%20and%20PARCEL=18%22,%20%22visibleLayers%22:[%22%D7%92%D7%95%D7%A9%D7%99%D7%9D%22,%22%D7%97%D7%9C%D7%A7%D7%95%D7%AA%22]}