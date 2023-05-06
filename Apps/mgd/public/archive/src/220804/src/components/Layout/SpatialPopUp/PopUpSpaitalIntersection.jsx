import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Button, Popup } from 'semantic-ui-react';
import {
  buffer as Buffer,
  point,
  polygon,
  multiLineString,
  dissolve,
  featureCollection
} from '@turf/turf'
import { fromLonLat, toLonLat } from 'ol/proj';
import { Polygon, MultiPolygon } from 'ol/geom';
import MultiLineString from 'ol/geom/MultiLineString';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import {
  Style,
  Icon,
  Fill,
  Stroke,
} from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';

import { onLayerChangeSpaitalIntersection } from '../../../redux/modules/toc';
import { setActiveMenuItem } from '../../../redux/modules/menu';
import { settings } from '../../../config/settings';
import SpaitalIntersection from '../SpaitalIntersection/SpaitalIntersection'

const bufferStyle = new Style({
  stroke: new Stroke({
    color: `rgb(255, 158, 85, 1)`,
    width: 3,
  }),
  fill: new Fill({
    color: `rgb(255, 158, 85, 0.5)`,
  }),
});
const style = new Style({
  stroke: new Stroke({
    color: `rgb(0,0,255, 1.0)`,
    width: 3
  }),
  fill: new Fill({
    color: `rgb(153,204,255, 0.5)`
  }),
});
const iconStyle = new Style({
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

class SpaitialIntersection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buffer: settings.defaultBuffer,
      isBuffer: false,
      layer: null,
      open: false
    }
    if (props.spaitalIntSecData) {
      const { buffer, isBuffer, layer } = props.spaitalIntSecData;
      this.state = {
        ...this.state,
        buffer,
        isBuffer,
        layer
      }
    }
    this.vectorLayer = null;
    this.source = new VectorSource();
    this.map = props.map;
  }

  componentDidMount = () => {
    this.vectorLayer = new VectorLayer({
      source: this.source,
      zIndex: 101,
      title: 'toc',
      style
    });
    this.map.addLayer(this.vectorLayer);
    if (this.props.feature) {
      this.createFeatures();
    }
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    // console.log('feature =>>', nextProps.feature);
    if (!nextProps.isActive) {
      this.source.clear();
    }
    if (nextProps.feature && nextProps.feature !== this.props.feature) {
      this.createFeatures(nextProps.feature);
    }
  }

  componentWillUnmount = () => {
    this.source.clear();
    this.map.removeLayer(this.vectorLayer);
  }

  clearSource = () => {
    this.source.clear();
    this.setState({ open: false });
  }

  createFeatures = (feature = this.props.feature) => {
    this.source.clear();
    // const { feature } = this.props;
    const { buffer, isBuffer } = this.state;
    this.source.clear();
    if (isBuffer && Number(buffer)) {
      this.createBufferFeature(feature);
    // } else {
    //   const layerFeature = this.createFeature(feature);
    //   if (layerFeature) {
    //     this.source.addFeature(layerFeature);
    //   }
    }
  }

  createBufferFeature = (rowData) => {
    const { projection } = this.props;
    const { geometryType, geometry } = rowData;
    const featuresArr = [];

    let bufferFeature;
    if (geometryType === 'esriGeometryPoint') {
      bufferFeature = point(toLonLat([geometry.x, geometry.y], projection));
    } else if (geometryType === 'esriGeometryPolyline') {
      const lonLatLine = geometry.paths.map(a => {
        return a.map(b => toLonLat(b, projection))
      });
      bufferFeature = multiLineString(lonLatLine);
    } else {
      const lonLatPolygon = geometry.rings.map(a => {
        return a.map(b => toLonLat(b, projection))
      });
      bufferFeature = polygon(lonLatPolygon);
    }
    const bufferC = this.getBuffer();
    const buffered = Buffer(bufferFeature, bufferC, { units: 'miles' });
    if (buffered.geometry.type === 'MultiPolygon') {
      buffered.geometry.coordinates.forEach(item => {
        featuresArr.push(polygon(item));
      });
    } else {
      featuresArr.push(buffered);
    }

    if (featuresArr.length > 0) {
      const dissolvedPolygon = dissolve(featureCollection(featuresArr));
      dissolvedPolygon.features.forEach(buffered => {
        let featureGeometry;
        let drawPolygon;
        if (buffered.geometry.type === 'MultiPolygon') {
          featureGeometry = buffered.geometry.coordinates.map(a => a.map(b => b.map(c => fromLonLat(c, projection))));
          drawPolygon = new MultiPolygon(featureGeometry);
        } else {
          featureGeometry = buffered.geometry.coordinates.map(a => a.map(b => fromLonLat(b, projection)));
          drawPolygon = new Polygon(featureGeometry);
        }
        const feature = new Feature(drawPolygon);
        feature.setStyle(bufferStyle);
        this.source.addFeature(feature);
      })
    }
  }

  createFeature(rowData, hove = false) {
    try {
      const { geometryType, geometry } = rowData;
      let feature;
      if (geometryType === 'esriGeometryPoint') {
        const ring = geometry;
        const coordinate = [ring.x, ring.y];
        let point = new Point(coordinate);
        feature = new Feature({
          geometry: point,
          name: 'Null Island',
          population: 4000,
          rainfall: 500
        });
        feature.setStyle(iconStyle);
      } else if (geometryType === 'esriGeometryPolyline') {
        let multilineData = new MultiLineString(geometry.paths);
        feature = new Feature(multilineData);
        feature.setStyle(style);
      } else {
        let drawPolygon = new Polygon(geometry.rings);
        feature = new Feature(drawPolygon);
        feature.setStyle(style);
      }
      return feature;
    } catch {
    }
  }

  getBuffer = () => {
    const { buffer } = this.state;
    const { selectedUnitType } = this.props;
    if (selectedUnitType === 'metric') {
      return buffer * 0.000621371;
    } else {
      return buffer * 0.000189394;
    }
  }

  handleBuffer = (e, { value }) => {
    if (value <= settings.maxBuffer) {
      this.setState({ buffer: value }, () => this.createFeatures());
    }
  }

  handleLayer = async (e, { value }) => {
    this.setState({
      layer: value
    })
  }

  toggleBuffer = async (e, { checked }) => {
    // setSlected(value);
    // dispatch(onLayerChange(selectedLayers[value]));
    this.setState({
      isBuffer: checked
    }, () => this.createFeatures())
  }

  handleSubmit = () => {
    const { isBuffer, buffer, layer } = this.state;
    const { selectedUnitType, selectedLayers, dispatch } = this.props;
    const distance = isBuffer && Number(buffer) ? buffer : 0;
    const units = selectedUnitType === 'metric' ? 'esriSRUnit_Meter' : 'esriSRUnit_Foot';
    const geometry = this.createRequestGeometry();
    let filter = {
      distance,
      units,
      ...geometry
    };
    if (!isBuffer) {
      filter = {
        ...geometry
      }
    }
    const data = {
      features: this.source.getFeatures(),
      layer,
      isBuffer,
      buffer,
      filter
    }
    dispatch(setActiveMenuItem('layerRecords'));
    dispatch(onLayerChangeSpaitalIntersection(selectedLayers[layer], data));
  }

  createRequestGeometry = () => {
    const { feature } = this.props;
    const { geometryType, geometry } = feature;
    if (geometryType === 'esriGeometryPoint') {
      return ({
        geometry: JSON.stringify({
          points: [[geometry.x, geometry.y]]
        }),
        geometryType: 'esriGeometryMultipoint'
      })
    } else if (geometryType === 'esriGeometryPolyline') {
      const rowsData = [];
      geometry.paths.map(path => rowsData.push(path));
      return ({
        geometry: JSON.stringify({
          paths: rowsData
        }),
        geometryType: 'esriGeometryPolyline'
      })
    } else {
      const rowsData = [];
      geometry.rings.map(path => rowsData.push(path));
      return ({
        geometry: JSON.stringify({
          rings: rowsData
        }),
        geometryType: 'esriGeometryPolygon',
        spatialRel: 'esriSpatialRelRelation',
        relationParam: 'T********'
      })
    }
  }

  render() {
    const { selectedLayers, translation, tocLayer, selectedUnitType } = this.props;
    const { buffer, isBuffer, layer } = this.state;
    const layers = Object.keys(selectedLayers).map(key => selectedLayers[key]);
    return (
      <SpaitalIntersection
        translation={translation}
        layer={layer}
        layers={layers}
        isBuffer={isBuffer}
        buffer={buffer}
        selectedUnitType={selectedUnitType}
        tocLayer={tocLayer}
        handleLayer={this.handleLayer}
        clearSource={this.clearSource}
        toggleBuffer={this.toggleBuffer}
        handleBuffer={this.handleBuffer}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default connect(
  state => ({
    selectedLayers: state.layers.selectedLayers,
    translation: state.translation.translation,
    // tocLayer: state.tocData.tocLayer,
    map: state.map.map,
    OIDName: state.tocData.OBJECTID,
    geometryType: state.tocData.geometryType,
    featuresGeometry: state.tocData.featuresGeometry,
    spaitalIntSecData: state.tocData.spaitalIntSecData,
    features: state.tocData.features,
    projection: state.map.projection,
    selectedUnitType: state.settings.selectedUnitType
  })
)(SpaitialIntersection);