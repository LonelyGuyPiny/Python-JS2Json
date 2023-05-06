import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Label } from 'semantic-ui-react';
import { Block, Svg } from '../..';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Fill, Stroke, Circle } from 'ol/style';
import { boundingExtent } from 'ol/extent';
import Polygon from 'ol/geom/Polygon';
import MultiLineString from 'ol/geom/MultiLineString';
import LineString from 'ol/geom/LineString';
import MultiPolygon from 'ol/geom/MultiPolygon';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import { Style, Icon } from 'ol/style';
import { Transition } from 'semantic-ui-react'
// import { boundingExtent } from 'ol/extent';
import Draw, { createBox } from 'ol/interaction/Draw';
import {
  fetchingSpatialInformationForDashboard,
  setCrs,
  // setDrawingData,
  setDrawPopup, setDrawType, setPointPopup
} from '../../../redux/modules/toc';
import { dashboardDrawingOptions } from '../../../constants';
import {
  transCordinates,
  getPixelSize,
  fitToMap,
  centerOnMap,
} from '../../../utils/map';
import PopUp from '../SpatialPopUp/PopUp';
import { ismatch, fillTemplate, isFloat } from '../../../utils/common';
import conditionModule from '../../../config/conditions';
import UrlLink from '../UrlLink';
import xyLinks from '../../../config/linksXY';


/**
 * Component
 * @name SpatialPopupNew
 * @description
 * This is the SpatialPopup component of the application. 
 * On click on Draw on Dashboard, this component is loaded
 */

class SpatialPopupNew extends Component {
  constructor(props) {
    super(props);
    // const { map, projection, decDigits } = props;
    // const xy = transCordinates(map.getView().getCenter(), this.props.spatialReference, projection);
    this.state = {
      openClass: false,
      type: 'Box',
      drawPopup: false,
      openPopUp: false,
      isOpen: false,
      selectedLayersData: [],
      currentPosition: 0,
      X: null,
      Y: null,
      // spatialCoordinates: [],
      positionCorner: false,
      zoomEnabled: false,
      spatialData: [],
      mapName: null,
      coordinates: null,
      filteredSpatialData: [],
      optionLayerId: null,
      effectvisible: false
    };
    this.draw = null;
    this.compareDraw = null;
    this.source = new VectorSource();
    this.compareSource = new VectorSource();
    this.geometrySource = new VectorSource();
    this.comapreGeometrySource = new VectorSource();
    this.map = props.map;
    this.compareMap = props.compareMap;
    this.options = [];
  }

  componentDidMount = () => {
    this.createVectorLayer();
    const { setTocDraw, drawingSet } = this.props;
    if (setTocDraw || drawingSet) {
      this.map.removeInteraction(this.draw)
      this.compareMap.removeInteraction(this.compareDraw);
      this.source.clear();
      this.geometrySource.clear();
      this.setState({ openClass: false, isOpen: false, drawPopup: false });
      return;
    }
  }

  createVectorLayer = () => {
    const style = new Style({
      stroke: new Stroke({
        color: `rgb(0,0,255, 1.0)`,
        width: 3
      }),
      fill: new Fill({
        color: `rgb(153,204,255, 0.5)`
      }),
      image: new Circle({
        radius: 7,
        fill: new Fill({
          color: '#ffcc33'
        })
      })
    });
    const styles = {
      'Point': new Style({
        image: new Icon(({
          anchor: [0.4, 59],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          opacity: 1,
          height: 400,
          width: 658,
          src: require("../../../assets/images/marker-spatial.png")
        }))
      }),
      'LineString': new Style({
        stroke: new Stroke({
          color: 'rgb(0,0,0, 1.0)',
          lineDash: [10],
          width: 2
        })
      }),
      'Polygon': new Style({
        stroke: new Stroke({
          color: 'rgb(0,0,0, 1.0)',
          lineDash: [10],
          width: 3
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 0, 0.3)'
        })
      }),
    }
    this.vectorLayer = new VectorLayer({
      source: this.source,
      zIndex: 505,
      title: 'spatial-draw',
      style: (feature) => {
        switch (feature.getGeometry().getType()) {
          case 'Point':
            return styles['Point']
          case 'Polygon':
            return styles['Polygon'];
          case 'LineString':
            return styles['LineString'];
          default:
            return styles['LineString']
        }
      }
    });
    this.geometryVectorLayer = new VectorLayer({
      source: this.geometrySource,
      zIndex: 501,
      title: 'spatial-feature',
      style
    });
    this.compareVectorLayer = new VectorLayer({
      source: this.compareSource,
      zIndex: 505,
      title: 'spatial-draw',
      style: (feature) => {
        switch (feature.getGeometry().getType()) {
          case 'Point':
            return styles['Point']
          case 'Polygon':
            return styles['Polygon'];
          case 'LineString':
            return styles['LineString'];
          default:
            return styles['LineString']
        }
      }
    });
    this.compareGeometryVectorLayer = new VectorLayer({
      source: this.comapreGeometrySource,
      zIndex: 501,
      title: 'spatial-feature',
      style
    });
    this.map.addLayer(this.vectorLayer);
    this.map.addLayer(this.geometryVectorLayer);
    this.compareMap.addLayer(this.compareVectorLayer);
    this.compareMap.addLayer(this.compareGeometryVectorLayer);
    this.map.on('singleclick', this.onMapSingleClick('MAP'));
    this.compareMap.on('singleclick', this.onMapSingleClick('MAP_COMPARE'));
  }

  getLayersData = () => {
    const data = []
    const { selectedLayers } = this.props;
    // console.log("selectedLayers", selectedLayers);
    if (selectedLayers) {
      Object.keys(selectedLayers).forEach(item => {
        data.push({
          key: item,
          value: selectedLayers[item].layerId,
          text: selectedLayers[item].name,
          parentlayer: selectedLayers[item].parentLayerId,
          url: selectedLayers[item].url,
          id: selectedLayers[item].id,
          geometryType: selectedLayers[item].geometrytype,
          groupname: selectedLayers[item].groupname,
          projection: selectedLayers[item].projection,
          type: selectedLayers[item].type
        })
      });
    }
    return data;
  }

  onMapSingleClick = (mapName) => async (evt) => {
    const { dispatch, isDrawingState, activeMenuItem, projection, decDigits, selectedLayers, drawPopup } = this.props;
    const { zoomEnabled, optionLayerId } = this.state;
    const geometryType = 'esriGeometryPoint';
    if (isDrawingState || activeMenuItem === 'draw' || drawPopup) {
      return false;
    }
    dispatch(setPointPopup(true));
    this.source.clear();
    this.compareSource.clear();
    this.geometrySource.clear();
    this.comapreGeometrySource.clear();
    const xy = transCordinates(evt.coordinate, this.props.spatialReference, projection);
    const point = new Point(evt.coordinate);
    const feature = new Feature({
      geometry: point,
      name: 'Null Island',
      population: 4000,
      rainfall: 500,
      // zIndex: 600
    });
    const iconStyle = new Style({
      image: new Icon(({
        anchor: [0.4, 59],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 1,
        height: 400,
        width: 658,
        src: require("../../../assets/images/marker-spatial.png")
      }))
    });
    feature.setStyle(iconStyle);
    this.source.addFeature(feature);
    this.compareSource.addFeature(feature);
    this.setState((prevState) => ({
      effectvisible: !prevState.effectvisible,
      X: xy[0].toFixed(decDigits || 4),
      Y: xy[1].toFixed(decDigits || 4),
      loading: true,
      spatialData: [],
      isOpen: true,
      mapName,
      coordinates: evt.coordinate,
      filteredSpatialData: []
    }));
    const x = evt.pixel[0];
    const y = evt.pixel[1];
    const map = mapName === 'MAP' ? this.map : this.compareMap;
    const pixelSize = getPixelSize(map);
    let coordinate = boundingExtent([
      map.getCoordinateFromPixel([x - pixelSize, y - pixelSize]),
      map.getCoordinateFromPixel([x + pixelSize, y - pixelSize]),
      map.getCoordinateFromPixel([x + pixelSize, y + pixelSize]),
      map.getCoordinateFromPixel([x - pixelSize, y + pixelSize])
    ]);

    if (coordinate) {
      const res = await dispatch(fetchingSpatialInformationForDashboard(this.getLayersData(), evt.coordinate.toString(), coordinate, geometryType));
      const {
        spatialData
      } = res;
      const filData = spatialData;
      this.options = [];
      let layerData = [];
      let layerId = null;
      let searchLayerID = null;
      if (Object.values(selectedLayers).length > 0) {
        Object.values(selectedLayers).forEach(layer => {
          const recordCount = filData.filter(rc => rc.layer.layerId === layer.layerId)
          const layerObj = { key: layer.layerId, text: layer.name, value: layer.layerId, description: recordCount.length };
          if (recordCount && recordCount.length > 0) {
            this.options.push(layerObj)
          }
        });
        if (optionLayerId !== null && this.options.length > 0) {
          const indexExist = this.options.findIndex(op => op.value === optionLayerId);
          if (indexExist !== -1) {
            layerId = optionLayerId;
          } else {
            layerId = this.options[0].value;
          }
          layerData = filData.filter(spl => spl.layer.layerId === layerId);
        } else if (this.options.length > 0) {
          layerId = this.options[0].value;
          layerData = filData.filter(spl => spl.layer.layerId === layerId);
        }
      } else if (Object.values(selectedLayers).length === 0 && filData.length > 0) {
        const recordCount = filData.length;
        const layerObj = { key: filData[0].layer.layerId, text: filData[0].layer.name, value: filData[0].layer.layerId, description: recordCount };
        if (recordCount && recordCount > 0) {
          this.options.push(layerObj)
        }
        if (optionLayerId !== null && this.options.length > 0) {
          const indexExist = this.options.findIndex(op => op.value === optionLayerId);
          if (indexExist !== -1) {
            layerId = optionLayerId;
          } else {
            layerId = this.options[0].value;
          }
          layerData = filData;
        } else if (this.options.length > 0) {
          layerId = this.options[0].value;
          layerData = filData;
        }
      }
      Object.values(selectedLayers).length > 0 && filData.forEach((layer, i) => {
        const searchData = filData.find(fld => fld.layer.cb_id !== undefined);
        if (layer.layer.cb_id !== null && layer.layer.cb_id !== undefined) {
          layerData.length = 0;
          if (searchLayerID !== layer.layer.layerId) {
            const recordCount = 1;
            const layerObj = { key: `${layer.layer.layerId}-${layer.layer.cb_id}`, text: layer.layer.name, value: layer.layer.cb_id, description: recordCount };
            if (recordCount && recordCount > 0) {
              this.options.push(layerObj)
            }
            const optionIndex = this.options.findIndex(op => op.value === layer.layer.cb_id)
            layerId = this.options[optionIndex].value;
            layerData.push(searchData);
          }
          searchLayerID = layer.layer.layerId;
        }
      });
      this.setState({
        filteredSpatialData: layerData,
        optionLayerId: layerId,
        loading: false,
        spatialData,
        currentPosition: 0,
      });
      if (layerData.length > 0) {
        this.createFeature(layerData[0], zoomEnabled);
        if (layerData[0].crs) {
          this.props.dispatch(setCrs(layerData[0].crs))
        }
      }
      // return;
    }
  }

  drawShape = type => () => {
    const { dispatch, selectedLayers, decDigits, projection } = this.props;

    dispatch(setDrawType(type));

    this.setState({ type });
    const self = this;

    if (this.draw) {
      this.map.removeInteraction(this.draw);
    }
    if (this.compareDraw) {
      this.compareMap.removeInteraction(this.compareDraw);
    }
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

    this.compareDraw = new Draw({
      source: this.compareSource,
      type,
      geometryFunction
    })

    this.map.addInteraction(this.draw);
    this.compareMap.addInteraction(this.compareDraw);
    this.intrection = true;
    // dispatch(setMap(map));

    // on start draw clear source
    this.draw.on('drawstart', async function (evt) {
      self.source.clear();
      self.compareSource.clear();
      self.geometrySource.clear();
      self.comapreGeometrySource.clear();
    });

    // on compare map start draw clear source
    this.compareDraw.on('drawstart', async function (evt) {
      self.source.clear();
      self.compareSource.clear();
      self.geometrySource.clear();
      self.comapreGeometrySource.clear();
    });

    this.draw.on('drawend', async function (evt) {
      self.compareSource.addFeature(evt.feature);
      const { zoomEnabled, optionLayerId } = self.state;
      self.setState((prevState) => ({
        effectvisible: !prevState.effectvisible,
        loading: true,
        isOpen: true,
        filteredSpatialData: []
      }));
      let flatCordinates = evt.feature.getGeometry().flatCoordinates;
      let pointCoordinates;
      let geometryType = 'esriGeometryPoint';

      if (type === 'Point') {
        const coordinate = flatCordinates;
        const xy = transCordinates(coordinate, self.props.spatialReference, projection);
        flatCordinates = coordinate.toString();
        const pixels = evt.target.downPx_;
        const x = pixels[0];
        const y = pixels[1];
        const map = self.map;
        const pixelSize = getPixelSize(map);
        pointCoordinates = boundingExtent([
          map.getCoordinateFromPixel([x - pixelSize, y - pixelSize]),
          map.getCoordinateFromPixel([x + pixelSize, y - pixelSize]),
          map.getCoordinateFromPixel([x + pixelSize, y + pixelSize]),
          map.getCoordinateFromPixel([x - pixelSize, y + pixelSize])
        ]);
        self.setState({
          coordinates: coordinate,
          X: xy[0].toFixed(decDigits || 4),
          Y: xy[1].toFixed(decDigits || 4)
        });
      } else if (type === 'Polygon') {
        geometryType = 'esriGeometryPolygon';
        pointCoordinates = flatCordinates;
        const newArray = flatCordinates.reduce(function (coordinates, coordinate, i) {
          if (i % 2 === 0) {
            coordinates.push([coordinate, flatCordinates[i + 1]]);
          }
          return coordinates;
        }, []);
        flatCordinates = ` {"rings": ${JSON.stringify([newArray])}}`;
        self.setState({
          X: null,
          Y: null
        });
      } else if (type === 'LineString') {
        geometryType = 'esriGeometryPolyline';
        pointCoordinates = flatCordinates;
        const newArray = flatCordinates.reduce(function (coordinates, coordinate, i) {
          if (i % 2 === 0) {
            coordinates.push([coordinate, flatCordinates[i + 1]]);
          }
          return coordinates;
        }, []);
        flatCordinates = ` {"paths": ${JSON.stringify([newArray])}}`;
        self.setState({
          X: null,
          Y: null
        });
      } else {
        geometryType = 'esriGeometryEnvelope';
        flatCordinates = evt.feature.getGeometry().getExtent();
        pointCoordinates = flatCordinates;
        const coordinate = flatCordinates;
        flatCordinates = coordinate.toString();
        self.setState({
          X: null,
          Y: null
        });
      }
      const data = await dispatch(fetchingSpatialInformationForDashboard(self.getLayersData(), flatCordinates, pointCoordinates, geometryType));
      const {
        spatialData
      } = data;
      const filData = spatialData;
      self.options = [];
      Object.values(selectedLayers).forEach(layer => {
        const recordCount = filData.filter(rc => rc.layer.layerId === layer.layerId);
        const layerObj = { key: layer.layerId, text: layer.name, value: layer.layerId, description: recordCount.length };
        if (recordCount && recordCount.length > 0) {
          self.options.push(layerObj);
        }
      });
      let layerData = [];
      let layerId = null;
      let searchLayerID = null;
      if (optionLayerId !== null && self.options.length > 0) {
        const indexExist = self.options.findIndex(op => op.value === optionLayerId);
        if (indexExist !== -1) {
          layerId = optionLayerId;
        } else {
          layerId = self.options[0].value;
        }
        layerData = filData.filter(spl => spl.layer.layerId === layerId);
      } else if (self.options.length > 0) {
        layerId = self.options[0].value;
        layerData = filData.filter(spl => spl.layer.layerId === layerId);
      }
      filData.forEach(layer => {
        const searchData = filData.find(fld => fld.layer.cb_id !== undefined);
        if (layer.layer.cb_id !== null && layer.layer.cb_id !== undefined) {
          layerData.length = 0;
          if (searchLayerID !== layer.layer.layerId) {
            const recordCount = 1;
            const layerObj = { key: `${layer.layer.layerId}-${layer.layer.cb_id}`, text: layer.layer.name, value: layer.layer.cb_id, description: recordCount };
            if (recordCount && recordCount > 0) {
              self.options.push(layerObj)
            }
            const optionIndex = self.options.findIndex(op => op.value === layer.layer.cb_id)
            layerId = self.options[optionIndex].value;
            layerData.push(searchData);
          }
          searchLayerID = layer.layer.layerId;
        }
      });
      self.setState({
        filteredSpatialData: layerData,
        optionLayerId: layerId,
        loading: false,
        spatialData,
        // spatialCoordinates: evt.coordinate,
        currentPosition: 0,
      });
      if (layerData.length > 0) {
        self.createFeature(layerData[0], zoomEnabled);
        if (layerData[0].crs) {
          self.props.dispatch(setCrs(layerData[0].crs))
        }
      }
    });

    this.compareDraw.on('drawend', async function (evt) {
      self.source.addFeature(evt.feature);
      const { zoomEnabled, optionLayerId } = self.state;
      self.setState((prevState) => ({
        effectvisible: !prevState.effectvisible,
        loading: true,
        isOpen: true,
        filteredSpatialData: []
      }));
      let flatCordinates = evt.feature.getGeometry().flatCoordinates;
      let geometryType = 'esriGeometryPoint';
      let pointCoordinates;

      if (type === 'Point') {
        const coordinate = flatCordinates;
        const xy = transCordinates(coordinate, self.props.spatialReference, projection);
        flatCordinates = coordinate.toString();
        const pixels = evt.target.downPx_;
        const x = pixels[0];
        const y = pixels[1];
        const map = self.map;
        const pixelSize = getPixelSize(map);
        pointCoordinates = boundingExtent([
          map.getCoordinateFromPixel([x - pixelSize, y - pixelSize]),
          map.getCoordinateFromPixel([x + pixelSize, y - pixelSize]),
          map.getCoordinateFromPixel([x + pixelSize, y + pixelSize]),
          map.getCoordinateFromPixel([x - pixelSize, y + pixelSize])
        ]);
        self.setState({
          coordinates: coordinate,
          X: xy[0].toFixed(decDigits || 4),
          Y: xy[1].toFixed(decDigits || 4)
        });
      } else if (type === 'Polygon') {
        geometryType = 'esriGeometryPolygon';
        pointCoordinates = flatCordinates;
        const newArray = flatCordinates.reduce(function (coordinates, coordinate, i) {
          if (i % 2 === 0) {
            coordinates.push([coordinate, flatCordinates[i + 1]]);
          }
          return coordinates;
        }, []);
        flatCordinates = ` {"rings": ${JSON.stringify([newArray])}}`;
        self.setState({
          X: null,
          Y: null
        });
      } else if (type === 'LineString') {
        geometryType = 'esriGeometryPolyline';
        pointCoordinates = flatCordinates;
        const newArray = flatCordinates.reduce(function (coordinates, coordinate, i) {
          if (i % 2 === 0) {
            coordinates.push([coordinate, flatCordinates[i + 1]]);
          }
          return coordinates;
        }, []);
        flatCordinates = ` {"paths": ${JSON.stringify([newArray])}}`;
        self.setState({
          X: null,
          Y: null
        });
      } else {
        geometryType = 'esriGeometryEnvelope';
        flatCordinates = evt.feature.getGeometry().getExtent();
        pointCoordinates = flatCordinates;
        const coordinate = flatCordinates;
        flatCordinates = coordinate.toString();
        self.setState({
          X: null,
          Y: null
        });
      }
      const data = await dispatch(fetchingSpatialInformationForDashboard(self.getLayersData(), flatCordinates, pointCoordinates, geometryType));
      const {
        spatialData
      } = data;
      const filData = spatialData;
      self.options = [];
      Object.values(selectedLayers).forEach(layer => {
        const recordCount = filData.filter(rc => rc.layer.layerId === layer.layerId)
        const layerObj = { key: layer.layerId, text: layer.name, value: layer.layerId, description: recordCount.length };
        if (recordCount && recordCount.length > 0) {
          self.options.push(layerObj)
        }
      });
      let layerData = [];
      let layerId = null;
      let searchLayerID = null;
      if (optionLayerId !== null && self.options.length > 0) {
        const indexExist = self.options.findIndex(op => op.value === optionLayerId);
        if (indexExist !== -1) {
          layerId = optionLayerId;
        } else {
          layerId = self.options[0].value;
        }
        layerData = filData.filter(spl => spl.layer.layerId === layerId);
      } else if (self.options.length > 0) {
        layerId = self.options[0].value;
        layerData = filData.filter(spl => spl.layer.layerId === layerId);
      }
      filData.forEach(layer => {
        const searchData = filData.find(fld => fld.layer.cb_id !== undefined);
        if (layer.layer.cb_id !== null && layer.layer.cb_id !== undefined) {
          layerData.length = 0;
          if (searchLayerID !== layer.layer.layerId) {
            const recordCount = 1;
            const layerObj = { key: `${layer.layer.layerId}-${layer.layer.cb_id}`, text: layer.layer.name, value: layer.layer.cb_id, description: recordCount };
            if (recordCount && recordCount > 0) {
              self.options.push(layerObj)
            }
            const optionIndex = self.options.findIndex(op => op.value === layer.layer.cb_id)
            layerId = self.options[optionIndex].value;
            layerData.push(searchData);
          }
          searchLayerID = layer.layer.layerId;
        }
      })
      self.setState({
        filteredSpatialData: layerData,
        optionLayerId: layerId,
        loading: false,
        spatialData,
        // spatialCoordinates: evt.coordinate,
        currentPosition: 0,
      });
      if (layerData.length > 0) {
        self.createFeature(layerData[0], zoomEnabled);
        if (layerData[0].crs) {
          self.props.dispatch(setCrs(layerData[0].crs))
        }
      }
    });
  }

  handleOpenClose = () => {
    const { openClass, drawPopup } = this.state;
    const { dispatch, selectedLayers, setDrawingType } = this.props;
    if (selectedLayers && Object.values(selectedLayers).length > 0) {
      // this.setState({ openClass: !openClass, isOpen: false, drawPopup: !drawPopup })
      this.setState({ openClass: !openClass, drawPopup: !drawPopup })
      dispatch(setDrawPopup(!drawPopup))
      dispatch(setPointPopup(false));
      this.source.clear();
      this.compareSource.clear();
      this.map.removeInteraction(this.draw);
      this.compareMap.removeInteraction(this.compareDraw);
    }
    if (setDrawingType !== null && !openClass && Object.values(selectedLayers).length > 0) {
      const self = this;
      dispatch(setDrawPopup(true));
      let type = setDrawingType;

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

      this.compareDraw = new Draw({
        source: this.compareSource,
        type,
        geometryFunction
      })

      this.map.addInteraction(this.draw);
      this.compareMap.addInteraction(this.compareDraw);
      this.intrection = true;
      // dispatch(setMap(map));

      // on start draw clear source
      this.draw.on('drawstart', async function (evt) {
        self.source.clear();
        self.compareSource.clear();
        self.geometrySource.clear();
        self.comapreGeometrySource.clear();
      });

      // on compare map start draw clear source
      this.compareDraw.on('drawstart', async function (evt) {
        self.source.clear();
        self.compareSource.clear();
        self.geometrySource.clear();
        self.comapreGeometrySource.clear();
      });

      this.draw.on('drawend', async function (evt) {
        self.compareSource.addFeature(evt.feature)
        const { zoomEnabled, optionLayerId } = self.state;
        self.setState((prevState) => ({
          effectvisible: !prevState.effectvisible,
          loading: true,
          isOpen: true,
          filteredSpatialData: []
        }));
        let flatCordinates = evt.feature.getGeometry().flatCoordinates;
        let geometryType = 'esriGeometryEnvelope';

        flatCordinates = evt.feature.getGeometry().getExtent();
        const pointCoordinates = flatCordinates;
        const coordinate = flatCordinates;
        flatCordinates = coordinate.toString();
        self.setState({
          X: null,
          Y: null
        });

        const data = await dispatch(fetchingSpatialInformationForDashboard(self.getLayersData(), flatCordinates, pointCoordinates, geometryType));
        const {
          spatialData
        } = data;
        const filData = spatialData;
        self.options = [];
        Object.values(selectedLayers).forEach(layer => {
          const recordCount = filData.filter(rc => rc.layer.layerId === layer.layerId);
          const layerObj = { key: layer.layerId, text: layer.name, value: layer.layerId, description: recordCount.length };
          if (recordCount && recordCount.length > 0) {
            self.options.push(layerObj);
          }
        });
        let layerData = [];
        let layerId = null;
        let searchLayerID = null;
        if (optionLayerId !== null && self.options.length > 0) {
          const indexExist = self.options.findIndex(op => op.value === optionLayerId);
          if (indexExist !== -1) {
            layerId = optionLayerId;
          } else {
            layerId = self.options[0].value;
          }
          layerData = filData.filter(spl => spl.layer.layerId === layerId);
        } else if (self.options.length > 0) {
          layerId = self.options[0].value;
          layerData = filData.filter(spl => spl.layer.layerId === layerId);
        }
        filData.forEach(layer => {
          const searchData = filData.find(fld => fld.layer.cb_id !== undefined);
          if (layer.layer.cb_id !== null && layer.layer.cb_id !== undefined) {
            layerData.length = 0;
            if (searchLayerID !== layer.layer.layerId) {
              const recordCount = 1;
              const layerObj = { key: `${layer.layer.layerId}-${layer.layer.cb_id}`, text: layer.layer.name, value: layer.layer.cb_id, description: recordCount };
              if (recordCount && recordCount > 0) {
                self.options.push(layerObj)
              }
              const optionIndex = self.options.findIndex(op => op.value === layer.layer.cb_id)
              layerId = self.options[optionIndex].value;
              layerData.push(searchData);
            }
            searchLayerID = layer.layer.layerId;
          }
        });
        self.setState({
          filteredSpatialData: layerData,
          optionLayerId: layerId,
          loading: false,
          spatialData,
          // spatialCoordinates: evt.coordinate,
          currentPosition: 0,
        });
        if (layerData.length > 0) {
          self.createFeature(layerData[0], zoomEnabled);
          if (layerData[0].crs) {
            self.props.dispatch(setCrs(layerData[0].crs))
          }
        }
      });

      this.compareDraw.on('drawend', async function (evt) {
        self.source.addFeature(evt.feature);
        const { zoomEnabled, optionLayerId } = self.state;
        self.setState((prevState) => ({
          effectvisible: !prevState.effectvisible,
          loading: true,
          isOpen: true,
          filteredSpatialData: []
        }));
        let flatCordinates = evt.feature.getGeometry().flatCoordinates;
        let geometryType = 'esriGeometryEnvelope';

        flatCordinates = evt.feature.getGeometry().getExtent();
        const pointCoordinates = flatCordinates;
        const coordinate = flatCordinates;
        flatCordinates = coordinate.toString();
        self.setState({
          X: null,
          Y: null
        });

        const data = await dispatch(fetchingSpatialInformationForDashboard(self.getLayersData(), flatCordinates, pointCoordinates, geometryType));
        const {
          spatialData
        } = data;
        const filData = spatialData;
        self.options = [];
        Object.values(selectedLayers).forEach(layer => {
          const recordCount = filData.filter(rc => rc.layer.layerId === layer.layerId)
          const layerObj = { key: layer.layerId, text: layer.name, value: layer.layerId, description: recordCount.length };
          if (recordCount && recordCount.length > 0) {
            self.options.push(layerObj)
          }
        });
        let layerData = [];
        let layerId = null;
        let searchLayerID = null;
        if (optionLayerId !== null && self.options.length > 0) {
          const indexExist = self.options.findIndex(op => op.value === optionLayerId);
          if (indexExist !== -1) {
            layerId = optionLayerId;
          } else {
            layerId = self.options[0].value;
          }
          layerData = filData.filter(spl => spl.layer.layerId === layerId);
        } else if (self.options.length > 0) {
          layerId = self.options[0].value;
          layerData = filData.filter(spl => spl.layer.layerId === layerId);
        }
        filData.forEach(layer => {
          const searchData = filData.find(fld => fld.layer.cb_id !== undefined);
          if (layer.layer.cb_id !== null && layer.layer.cb_id !== undefined) {
            layerData.length = 0;
            if (searchLayerID !== layer.layer.layerId) {
              const recordCount = 1;
              const layerObj = { key: `${layer.layer.layerId}-${layer.layer.cb_id}`, text: layer.layer.name, value: layer.layer.cb_id, description: recordCount };
              if (recordCount && recordCount > 0) {
                self.options.push(layerObj)
              }
              const optionIndex = self.options.findIndex(op => op.value === layer.layer.cb_id)
              layerId = self.options[optionIndex].value;
              layerData.push(searchData);
            }
            searchLayerID = layer.layer.layerId;
          }
        })
        self.setState({
          filteredSpatialData: layerData,
          optionLayerId: layerId,
          loading: false,
          spatialData,
          // spatialCoordinates: evt.coordinate,
          currentPosition: 0,
        });
        if (layerData.length > 0) {
          self.createFeature(layerData[0], zoomEnabled);
          if (layerData[0].crs) {
            self.props.dispatch(setCrs(layerData[0].crs))
          }
        }
      });
    }
  }

  createFeature({ geometry, geometryType, crs }, zoomEnabled) {
    this.geometrySource.clear();
    this.comapreGeometrySource.clear();
    try {
      if (crs) {
        const { projection } = this.props;
        const coProj = crs.properties.name.split('::')
        if (geometryType === 'Point') {
          let coordinate = geometry.coordinates;
          coordinate = transCordinates(coordinate, projection, `EPSG:${coProj[1]}`);
          const point = new Point(coordinate);
          const feature = new Feature({
            geometry: point,
            name: 'Null Island',
            population: 4000,
            rainfall: 500
          });
          const iconStyle = new Style({
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
          this.geometrySource.addFeature(feature);
          this.comapreGeometrySource.addFeature(feature);
          if (zoomEnabled) {
            setTimeout(() => centerOnMap(coordinate, this.map, true), 20);
          }
        } else if (geometryType === 'LineString') {
          const cordinates = geometry.coordinates.map(cordArr => {
            return transCordinates(cordArr, projection, `EPSG:${coProj[1]}`);
          });
          let drawLine = new LineString(cordinates);
          const feature = new Feature(drawLine);
          this.geometrySource.addFeature(feature);
          this.comapreGeometrySource.addFeature(feature);
          if (zoomEnabled) {
            setTimeout(() => fitToMap(this.geometrySource.getExtent(), this.map), 20);
            setTimeout(() => fitToMap(this.comapreGeometrySource.getExtent(), this.map), 20);
          }
        } else if (geometryType === 'MultiLineString') {
          const cordinates = geometry.coordinates.map(cordArr => {
            return cordArr.map(coordinate => transCordinates(coordinate, projection, `EPSG:${coProj[1]}`))
          })
          // let coordinate = geometry.flatCoordinates;
          let drawLine = new MultiLineString(cordinates);
          const feature = new Feature(drawLine);
          this.geometrySource.addFeature(feature);
          this.comapreGeometrySource.addFeature(feature);
          if (zoomEnabled) {
            setTimeout(() => fitToMap(this.geometrySource.getExtent(), this.map), 20);
            setTimeout(() => fitToMap(this.comapreGeometrySource.getExtent(), this.map), 20);
          }
        } else if (geometryType === 'Polygon') {
          const cordinates = geometry.coordinates.map(cordArr => {
            return cordArr.map(childCordArr => {
              return transCordinates(childCordArr, projection, `EPSG:${coProj[1]}`);
            });
          })
          const polygon = new Polygon(cordinates);
          const feature = new Feature(polygon);
          this.geometrySource.addFeature(feature);
          this.comapreGeometrySource.addFeature(feature);
          if (zoomEnabled) {
            setTimeout(() => fitToMap(this.geometrySource.getExtent(), this.map), 20);
            setTimeout(() => fitToMap(this.comapreGeometrySource.getExtent(), this.map), 20);
          }
        } else {
          const cordinates = geometry.coordinates.map(cordArr => {
            return cordArr.map(childCordArr => {
              return childCordArr.map(coordinate => {
                return transCordinates(coordinate, projection, `EPSG:${coProj[1]}`);
              })
            })
          })
          const polygon = new MultiPolygon(cordinates);
          const feature = new Feature(polygon);
          this.geometrySource.addFeature(feature);
          this.comapreGeometrySource.addFeature(feature);
          if (zoomEnabled) {
            setTimeout(() => fitToMap(this.geometrySource.getExtent(), this.map), 20);
            setTimeout(() => fitToMap(this.comapreGeometrySource.getExtent(), this.map), 20);
          }
        }
      } else {
        if (geometryType === 'esriGeometryPoint') {
          const coordinate = [geometry.x, geometry.y];
          const point = new Point(coordinate);
          const feature = new Feature({
            geometry: point,
            name: 'Null Island',
            population: 4000,
            rainfall: 500
          });
          const iconStyle = new Style({
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
          this.geometrySource.addFeature(feature);
          this.comapreGeometrySource.addFeature(feature);
          if (zoomEnabled) {
            // setTimeout(() => centerOnMap(coordinate, this.map, true), 20);
            setTimeout(() => fitToMap(this.geometrySource.getExtent(), this.map), 20);
            setTimeout(() => fitToMap(this.comapreGeometrySource.getExtent(), this.map), 20);
          }
        } else if (geometryType === 'esriGeometryPolyline') {
          let coordinate = geometry.paths;
          let drawLine = new MultiLineString(coordinate);
          const feature = new Feature(drawLine);
          this.geometrySource.addFeature(feature);
          this.comapreGeometrySource.addFeature(feature);
          if (zoomEnabled) {
            setTimeout(() => fitToMap(this.geometrySource.getExtent(), this.map), 20);
            setTimeout(() => fitToMap(this.comapreGeometrySource.getExtent(), this.map), 20);
          }
        } else {
          const polygon = new Polygon(geometry.rings);
          const feature = new Feature(polygon);
          this.geometrySource.addFeature(feature);
          this.comapreGeometrySource.addFeature(feature);
          if (zoomEnabled) {
            setTimeout(() => fitToMap(this.geometrySource.getExtent(), this.map), 20);
            setTimeout(() => fitToMap(this.comapreGeometrySource.getExtent(), this.map), 20);
          }
        }
      }
    } catch (err) {
      // console.log("err", err);
    }
  }

  onPageChange = () => {
    const { currentPosition: cp, filteredSpatialData: sd, zoomEnabled } = this.state;
    if (sd && sd.length > 0) {
      this.createFeature(sd[cp], zoomEnabled);
    }
  }

  nextClick = (e) => {
    e.stopPropagation();
    this.setState(({ currentPosition: cp, filteredSpatialData: sd }) => {
      return ({
        currentPosition: cp === (sd.length - 1) ? 0 : cp + 1
      });
    }, () => this.onPageChange())
  }

  previousClick = (e) => {
    e.stopPropagation();
    this.setState(({ currentPosition: cp, filteredSpatialData: sd }) => {
      return ({
        currentPosition: cp === 0 ? (sd.length - 1) : cp - 1
      });
    }, () => this.onPageChange());
  }

  closePopUp = () => {
    this.source.clear();
    this.compareSource.clear();
    this.geometrySource.clear();
    this.comapreGeometrySource.clear();
    // document.getElementById('popup').style.display = 'none';
    // document.getElementById('popup-compare').style.display = 'none';
    this.setState({ isOpen: false, effectvisible: false });
  };

  zoomInOut = (checked) => {
    this.setState({
      zoomEnabled: checked
    }, () => {
      this.onPageChange();
    });
  }

  selectedLayer = layerid => {
    const { spatialData } = this.state;
    const filData = spatialData;
    const newSpatialData = filData.filter(spl => spl.layer.layerId === layerid)

    const filterOptionIndex = this.options.findIndex(option => option.value === layerid)
    this.renderSpatialData(newSpatialData[filterOptionIndex]);
    this.setState({ filteredSpatialData: newSpatialData, optionLayerId: layerid });
    this.setState(({ currentPosition: cp }) => {
      return ({
        currentPosition: cp === 0 ? 0 : 0
      });
    }, () => this.onPageChange());
  }

  renderSpatialData = currentSpatialData => {
    // const { links } = this.props;
    if (currentSpatialData) {
      let currentLinks = [];
      const layerName = currentSpatialData.layerName || '';

      if (layerName && currentSpatialData.layer.currentLinks && currentSpatialData.layer.currentLinks.length > 0) {
        currentLinks = currentSpatialData.layer.currentLinks;
      }
      let attributes = currentSpatialData && currentSpatialData.attributes;
      attributes = attributes.filter(a => a.fieldType !== 'esriFieldTypeOID');

      return (
        <Block>
          {attributes && attributes.length > 0 ?
            <Block>
              <Block className="field-col col5">
                {attributes.map((attribute, i) => {
                  let value = attribute.value;
                  if (attribute.fieldName === 'Shape' || attribute.fieldName === 'SHAPE' || attribute.fieldName === 'OBJECTID' || attribute.fieldName === 'OBJECTID_1' || value === 'Null' || value === '') {
                    return null;
                  }
                  if (typeof value === 'string' || value instanceof String) {
                    if (ismatch(value, conditionModule[0].linkConditions)) {
                      value = <a className="button-black-rounded" href={value}
                        // eslint-disable-next-line
                        target="_blank"
                      // rel="noopener noreferrer"
                      ><Svg className="linkicon" name="linkicon" /></a>
                    } else {
                      value = <div dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br/><br/>') }} />
                    }
                  }

                  if (attribute && attribute.domainValues) {
                    value = attribute.domainValues[value];
                  }

                  if (value) {
                    return (
                      <Block key={i} className="popUpInner">
                        {value && <Label>{attribute.fieldAlias}</Label>}
                        {value && <Label>{isFloat(value) ? value.toFixed(2) : value}</Label>}
                      </Block>
                    )
                  } else {
                    return null;
                  }

                })}
              </Block>
            </Block>
            : null}
          {currentLinks && currentLinks.length > 0 &&
            <Block className="popUplist">
              {currentLinks.map((l, i) => {
                const vars = {};
                attributes.map(({ fieldName, value }) => vars[fieldName.replaceAll('.', '_')] = value);
                const link = fillTemplate(l.url, vars);
                return (
                  <Label key={i}>
                    <UrlLink
                      link={link}
                      type={l.type}
                      text={l.text}
                    />
                  </Label>
                );
              })}
            </Block>
          }
        </Block>
      );
    }
  }

  handleClick = () => {
    this.setState({ positionCorner: !this.state.positionCorner });
  }

  renderXYLinks = () => {
    const { lang, projection } = this.props;
    const { coordinates } = this.state;
    if (coordinates)
      return xyLinks.map((link, i) => {
        const [x, y] = transCordinates(coordinates, link.projection, projection);
        const path = fillTemplate(link.url, { x, y });
        return (<a key={i} href={path}
          // eslint-disable-next-line
          target="_blank"
          // rel="noopener noreferrer"
          className="btn red">{link[`title_${lang}`]}</a>
        )
      });
  }

  componentDidUpdate = () => {
    const { openClass,
      // isOpen
    } = this.state;
    const { drawingSet, setTocDraw,
      // pointPopup,
      selectedLayers, dispatch } = this.props;
    if (openClass && (drawingSet || setTocDraw || Object.values(selectedLayers).length === 0)) {
      this.source.clear();
      this.geometrySource.clear();
      this.map.removeInteraction(this.draw);
      this.compareMap.removeInteraction(this.compareDraw);
      this.setState({ openClass: !openClass, isOpen: false, filteredSpatialData: [] });
      dispatch(setDrawPopup(false));
      // } else if(isOpen && pointPopup) {
      //   this.source.clear();
      //   this.geometrySource.clear();
      //   this.map.removeInteraction(this.draw);
      //   this.compareMap.removeInteraction(this.compareDraw);
      //   this.setState({ isOpen: false, filteredSpatialData: [] });
      // } else if(Object.values(selectedLayers).length > 0) {
      //   dispatch(setDrawPopup(true));
    }
  }

  render() {
    const { translation, direction, setDrawingEnable, drawingSet, setTocDraw } = this.props;
    const { isOpen, type, openClass, loading, filteredSpatialData, X, Y, currentPosition, zoomEnabled, optionLayerId, effectvisible } = this.state;
    const disableDrawing = setDrawingEnable && !drawingSet && !setTocDraw ? '' : 'disable-drawing';
    // const showPoints = type === 'Point' ? false : true;
    let showPoints = true;
    if (X !== null && Y !== null) {
      showPoints = false
    } else {
      showPoints = true;
    }
    return (
      <Block className="drawonmap-components">
        <Block onClick={this.handleOpenClose} className={`drawonmap ${openClass && 'active-drawing'} ${disableDrawing} cursor-pointer`} data-tooltip={translation.identifydraw} data-position={`${direction === 'RTL' ? 'bottom left' : 'bottom right'}`}>
          <span>
            <Svg name="drawingmap" className="draw-anchor" />
            <Svg className="close-icon" name="close-icon" />
          </span>
        </Block>
        <Block className={`drawonmap-elements ${openClass ? 'drawonmap-elements-open' : ''}`}>
          <Block className="d-flex justify-space-between drawingTabSecond align-item-center">
            {/* <Block>
              <span onClick={this.handleOpenClose}>
                <Svg name="close-new" className="mr-1 cursor-pointer" />
              </span>
            </Block> */}
            {
              dashboardDrawingOptions.map((element) =>
                <Block key={element.value}>
                  <Button className={`background-grey btn-sm ${type === element.text ? 'active' : ''}`} onClick={this.drawShape(element.text)} value={element.value}>
                    <Svg name={element.value} />
                  </Button>
                </Block>
              )
            }
            {/* <Button key="LineString" className="background-grey mr-1 btn-sm" >
              <Svg name="Line" />
            </Button>
            <Button key="Polygon" className="background-grey mr-1 btn-sm">
              <Svg name="Polygon" />
            </Button>
            <Button key="Box" className="background-grey  btn-sm">
              <Svg name="Square" />
            </Button> */}
            <Block id={`is-${isOpen ? 'popup-fixed' : ''}`} />

          </Block>
        </Block>
        {isOpen &&
          <Block className="drawShapes">
            <Block className="ol-popup">
              <Transition
                animation='pulse'
                duration={500}
                visible={effectvisible}
              >
                <Block id="popup-fixed" className="spatal-popup">
                  <PopUp
                    loading={loading}
                    spatialData={filteredSpatialData}
                    X={X}
                    Y={Y}
                    renderSpatialData={this.renderSpatialData}
                    closePopUp={this.closePopUp}
                    zoomInOut={this.zoomInOut}
                    currentPosition={currentPosition}
                    previousClick={this.previousClick}
                    nextClick={this.nextClick}
                    zoomEnabled={zoomEnabled}
                    translation={translation}
                    // handleClick={this.handleClick}
                    renderXYLinks={this.renderXYLinks}
                    selectedLayer={this.selectedLayer}
                    options={this.options}
                    drawingPopup={showPoints}
                    optionIndex={optionLayerId}
                    direction={direction}
                  // blockStyle="block"
                  />
                </Block>
              </Transition>
            </Block>
          </Block>
        }
      </Block>
    );
  }
}
export default connect((state) => {
  return ({
    translation: state.translation.translation,
    direction: state.translation.direction,
    map: state.map.map,
    compareMap: state.map.compareMap,
    projection: state.map.projection,
    center: state.map.center,
    decDigits: state.settings.selectedSpaitalRef.dec_digits,
    spatialReference: state.settings.selectedSpatialReference,
    drawingData: state.tocData.drawingData,
    selectedLayers: state.layers.selectedLayers,
    links: state.links.links,
    drawPopup: state.tocData.drawPopup,
    setDrawingType: state.tocData.setDrawingType,
    setTocDraw: state.tocData.setTocDraw,
    drawingSet: state.drawing.drawingSet,
    pointPopup: state.tocData.pointPopup,
    // selectedLayerCounts: state.layers.selectedLayerCounts,
    setDrawingEnable: state.layers.setDrawingEnable,
    selectedCompareMap: state.basemap.selectedCompareMap,
    lang: state.translation.language,
    isDrawingState: state.tocData.isDrawingState,
    activeMenuItem: state.menu.activeMenuItem
  })
})(SpatialPopupNew);