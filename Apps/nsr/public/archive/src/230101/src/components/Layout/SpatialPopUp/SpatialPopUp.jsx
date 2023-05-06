import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'semantic-ui-react';

import Overlay from 'ol/Overlay';
import { boundingExtent } from 'ol/extent';
import Polygon from 'ol/geom/Polygon';
import MultiLineString from 'ol/geom/MultiLineString';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon, Fill, Stroke, Circle } from 'ol/style';

import { Block, Svg } from '../../';
import { fetchingSpatialInformationForDashboard, setPointPopup } from '../../../redux/modules/toc';
import UrlLink from '../UrlLink';
import {
  transCordinates,
  getPixelSize,
  fitToMap,
  centerOnMap,
} from '../../../utils/map';
import { ismatch, fillTemplate, isFloat } from '../../../utils/common';
import conditionModule from '../../../config/conditions';
import PopUp from './PopUp';
import xyLinks from '../../../config/linksXY';

class SpatialPopUp extends Component {
  constructor(props) {
    super(props)
    const { map, projection, decDigits } = props;
    const xy = transCordinates(map.getView().getCenter(), this.props.spatialReference, projection);
    this.state = {
      openPopUp: false,
      isOpen: false,
      selectedLayersData: [],
      currentPosition: 0,
      X: xy[0].toFixed(decDigits || 4),
      Y: xy[1].toFixed(decDigits || 4),
      spatialCoordinates: [],
      positionCorner: false,
      zoomEnabled: false,
      spatialData: [],
      mapName: null,
      coordinates: null,
      filteredSpatialData : [],
      optionLayerId: null
    }
    this.source = new VectorSource();
    this.vectorSource = new VectorSource();
    this.map = props.map;
    this.compareMap = props.compareMap;
    this.mapOverlay = null;
    this.options = [];
  }

  componentDidMount = () => {
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

    this.sourceLayer = new VectorLayer({
      source: this.source,
      zIndex: 110,
      title: 'marker',
      style
    })

    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      zIndex: 101,
      title: 'polygon',
      style
    });

    this.compareVectorLayer = new VectorLayer({
      source: this.vectorSource,
      zIndex: 101,
      title: 'polygon',
      style
    });

    this.map.addLayer(this.vectorLayer);
    this.map.addLayer(this.sourceLayer);
    this.compareMap.addLayer(this.compareVectorLayer);
    this.compareMap.addLayer(this.sourceLayer);
    this.map.on('singleclick', this.onMapSingleClick('MAP'));
    this.compareMap.on('singleclick', this.onMapSingleClick('MAP_COMPARE'));
    this.setOverlayDirection();

    // create overlay for popup
    this.mapOverlay = new Overlay({
      id: 1,
      element: document.getElementById('popup'),
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });
    this.mapCompareOverlay = new Overlay({
      id: 2,
      element: document.getElementById('popup-compare'),
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });
    this.map.addOverlay(this.mapOverlay);
    this.compareMap.addOverlay(this.mapCompareOverlay);
  }

  componentWillUnmount = () => {
    this.map.un('singleclick', this.onMapSingleClick('MAP'));
    this.map.removeLayer(this.vectorLayer);
    this.compareMap.un('singleclick', this.onMapSingleClick('MAP_COMPARE'));
    this.compareMap.removeLayer(this.compareVectorLayer);
    this.vectorSource.clear();
  }

  setOverlayDirection = () => {
    const classList = document.querySelectorAll('.ol-overlaycontainer-stopevent');
    classList.forEach((a, i) => {
      classList[i].dir = 'ltr';
    });
  }

  onMapSingleClick = (mapName) => async (evt) => {
    const { dispatch, isDrawingState, activeMenuItem, projection, decDigits, selectedLayers, drawPopup } = this.props;
    const { zoomEnabled, optionLayerId } = this.state;
    const geometryType = 'esriGeometryPoint';
    if (isDrawingState || activeMenuItem === 'drawing' || drawPopup) {
      this.source.clear();
      this.vectorSource.clear();
      this.setState({ isOpen: false })
      return false;
    }
    dispatch(setPointPopup(true));
    this.source.clear();
    this.vectorSource.clear();
    const xy = transCordinates(evt.coordinate, this.props.spatialReference, projection);
    const point = new Point(evt.coordinate);
    const feature = new Feature({
      geometry: point,
      name: 'Null Island',
      population: 4000,
      rainfall: 500
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
    this.setState({
      X: xy[0].toFixed(decDigits || 4),
      Y: xy[1].toFixed(decDigits || 4),
      loading: true,
      spatialData: [],
      isOpen: true,
      mapName,
      coordinates: evt.coordinate,
      filteredSpatialData: []
    });
    // return;
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
      // if (mapName === 'MAP') {
      //   const container = document.getElementById('popup');
      //   container.style.display = 'block';
      //   this.mapOverlay.setPosition(evt.coordinate);
      // } else {
      //   const container = document.getElementById('popup-compare');
      //   container.style.display = 'block';
      //   this.mapCompareOverlay.setPosition(evt.coordinate);
      // }
      // const coordinates = coordinate.toString();
      const res = await dispatch(fetchingSpatialInformationForDashboard(this.getLayersData(), evt.coordinate.toString(), geometryType));
      const {
        spatialData
      } = res;
      const filData = spatialData;
      this.options = [];
      let layerData = [];
      let layerId = null;
      let searchLayerID = null;
      if(Object.values(selectedLayers).length > 0) {
        Object.values(selectedLayers).forEach(layer => {
          const recordCount = filData.filter(rc => rc.layer.layerId === layer.layerId)
          const layerObj = {key: layer.layerId, text: layer.name, value: layer.layerId, description: recordCount.length};
          if(recordCount && recordCount.length > 0) {
            this.options.push(layerObj)
          }
        });
        if(optionLayerId !== null && this.options.length > 0) {
          const indexExist = this.options.findIndex(op => op.value === optionLayerId);
          if(indexExist !== -1) {
            layerId = optionLayerId;
          } else {
            layerId = this.options[0].value;
          }
          layerData = filData.filter(spl => spl.layer.layerId === layerId);
        } else if(this.options.length > 0) {
          layerId = this.options[0].value;
          layerData = filData.filter(spl => spl.layer.layerId === layerId);
        }
      } else if(Object.values(selectedLayers).length === 0 && filData.length > 0) {
        const recordCount = filData.length;
        const layerObj = {key: filData[0].layer.layerId, text: filData[0].layer.name, value: filData[0].layer.layerId, description: recordCount};
        if(recordCount && recordCount > 0) {
          this.options.push(layerObj)
        }
        if(optionLayerId !== null && this.options.length > 0) {
          const indexExist = this.options.findIndex(op => op.value === optionLayerId);
          if(indexExist !== -1) {
            layerId = optionLayerId;
          } else {
            layerId = this.options[0].value;
          }
          layerData = filData;
        } else if(this.options.length > 0) {
          layerId = this.options[0].value;
          layerData = filData;
        }
      }
      Object.values(selectedLayers).length > 0 && filData.forEach((layer, i)=> {
        const searchData = filData.find(fld => fld.layer.cb_id !== undefined);
        if(layer.layer.cb_id !== null && layer.layer.cb_id !== undefined) {
          layerData.length = 0;
          if(searchLayerID !== layer.layer.layerId) {
            const recordCount = 1;
            const layerObj = {key: `${layer.layer.layerId}-${layer.layer.cb_id}`, text: layer.layer.name, value: layer.layer.cb_id, description: recordCount};
            if(recordCount && recordCount > 0) {
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
        currentPosition: 0
      });
      if(layerData.length > 0) {
        this.createFeature(layerData[0], zoomEnabled);
      }
      return;
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

  onPageChange = () => {
    const { currentPosition: cp, filteredSpatialData: sd, zoomEnabled } = this.state;
    this.vectorSource.clear();
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
    this.vectorSource.clear();
    // document.getElementById('popup').style.display = 'none';
    // document.getElementById('popup-compare').style.display = 'none';
    this.setState({ isOpen: false, filteredSpatialData: [] });
  };

  zoomInOut = (checked) => {
    this.setState({
      zoomEnabled: checked
    }, () => {
      this.onPageChange();
    });
  }

  handleClick = () => {
    this.setState({ positionCorner: !this.state.positionCorner });
  }

  renderXYLinks = () => {
    const { lang, projection } = this.props;
    const { coordinates } = this.state;
    return xyLinks.map((link, i) => {
      const [x, y] = transCordinates(coordinates, link.projection, projection);
      const path = fillTemplate(link.url, { x, y });
      return (<a key={i} href={path}
        // eslint-disable-next-line
        target="_blank"
      // rel="noopener noreferrer"
      className="btn red">{link[`title_${lang}`]}</a>)
    });
  }

  renderSpatialData = currentSpatialData => {
    const { links } = this.props;
    if (currentSpatialData) {
      let currentLinks = [];
      const layerName = currentSpatialData.layerName || '';
      const url = currentSpatialData.layer ? currentSpatialData.layer.url : null;
      
      if (layerName) {
        currentLinks = links.filter(l => l.layerName === layerName || l.groupUrl === url);
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
                  if(attribute.fieldName === 'Shape' || attribute.fieldName === 'SHAPE' || attribute.fieldName === 'OBJECTID' || value === 'Null') {
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
                  // console.log('attribute', attribute);
                  return (
                    <Block key={i} className="popUpInner">
                      <Label>{attribute.fieldAlias}</Label>
                      <Label>{isFloat(value) ? value.toFixed(2) : value}</Label>
                    </Block>
                  )
                }
                )}
              </Block>
            </Block>
            : null}
          {currentLinks && currentLinks.length > 0 &&
            <Block className="popUplist">
              {currentLinks.map((l, i) => {
                const vars = {};
                attributes.map(({ fieldName, value }) => vars[fieldName.replaceAll('.', '_')] = value);
                // console.log("l.url, vars", l.url, vars)
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
              }
              )}
            </Block>
          }
        </Block>
      );
    }

  }

  createFeature({ geometry, geometryType }, zoomEnabled) {
    try {
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
        this.vectorSource.addFeature(feature);
        if (zoomEnabled) {
          setTimeout(() => centerOnMap(coordinate, this.map, true), 20);
        }
      } else if (geometryType === 'esriGeometryPolyline') {
        let coordinate = geometry.paths;
        let drawLine = new MultiLineString(coordinate);
        const feature = new Feature(drawLine);
        this.vectorSource.addFeature(feature);
        if (zoomEnabled) {
          setTimeout(() => fitToMap(this.vectorSource.getExtent(), this.map), 20);
        }
      } else {
        const polygon = new Polygon(geometry.rings);
        const feature = new Feature(polygon);
        this.vectorSource.addFeature(feature);
        if (zoomEnabled) {
          setTimeout(() => fitToMap(this.vectorSource.getExtent(), this.map), 20);
        }
      }
    } catch (err) { }
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

  render() {
    const {
      translation, direction
      // drawPopup
    } = this.props;
    const { isOpen, zoomEnabled, X, Y, loading,
      // positionCorner,
      currentPosition,
      // mapName,
      filteredSpatialData, optionLayerId } = this.state;
    // const blockStyle = drawPopup ? 'none' : 'block';
    // console.log("filteredSpatialData", filteredSpatialData)
    return (
      <Block className="drawShapes">
        
        {/* <Block id={`is-${isOpen && !positionCorner ? (mapName === 'MAP' ? 'popup' : 'popup-compare') : ''}${isOpen && positionCorner ? 'popup-fixed' : ''}`} /> */}
        <Block id={`is-${isOpen ? 'popup-fixed' : ''}`} />
        {/* <Block className="ol-popup" style={{ display: "none" }}>
          <Block id="popup" className={`spatal-popup ${positionCorner || mapName === 'MAP_COMPARE' ? 'spatialHide' : ''}`} style={{ display: `${blockStyle}`}}>
            {mapName === 'MAP' &&
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
                handleClick={this.handleClick}
                renderXYLinks={this.renderXYLinks}
                selectedLayer={this.selectedLayer}
                options={this.options}
                drawingPopup={false}
                // blockStyle={blockStyle}
              />
            }
          </Block>
          <Block id="popup-compare" className={`spatal-popup ${positionCorner || mapName === 'MAP' ? 'spatialHide' : ''}`}>
            {mapName === 'MAP_COMPARE' &&
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
                handleClick={this.handleClick}
                renderXYLinks={this.renderXYLinks}
                selectedLayer={this.selectedLayer}
                options={this.options}
                drawingPopup={false}
                // blockStyle={blockStyle}
              />
            }
          </Block>
        </Block> */}
        {/* {positionCorner && isOpen &&
          <Block id="popup-fixed" className="spatal-popup spatialFixed">
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
              handleClick={this.handleClick}
              renderXYLinks={this.renderXYLinks}
              selectedLayer={this.selectedLayer}
              options={this.options}
              drawingPopup={false}
              // blockStyle={blockStyle}
            />
          </Block>
        } */}
        {isOpen &&
          <Block id="popup-fixed" className="spatal-popup spatialFixed">
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
              handleClick={this.handleClick}
              renderXYLinks={this.renderXYLinks}
              selectedLayer={this.selectedLayer}
              options={this.options}
              drawingPopup={false}
              optionIndex={optionLayerId}
              direction={direction}
              // blockStyle={blockStyle}
            />
          </Block>
        }
      </Block>
    )
  }
}

export default connect(
  state => ({
    map: state.map.map,
    compareMap: state.map.compareMap,
    projection: state.map.projection,
    center: state.map.center,
    translation: state.translation.translation,
    selectedLayers: state.layers.selectedLayers,
    spatialLayersName: state.tocData.spatialLayersName,
    spatialReference: state.settings.selectedSpatialReference,
    isDrawingState: state.tocData.isDrawingState,
    activeMenuItem: state.menu.activeMenuItem,
    links: state.links.links,
    lang: state.translation.language,
    decDigits: state.settings.selectedSpaitalRef.dec_digits,
    drawPopup: state.tocData.drawPopup,
    direction: state.translation.direction
  })
)(SpatialPopUp);