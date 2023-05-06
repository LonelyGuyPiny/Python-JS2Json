import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from 'store2';
import { Menu, Button, Label } from 'semantic-ui-react';

import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import Polygon from 'ol/geom/Polygon';
import { Circle } from 'ol/geom';
import Point from 'ol/geom/Point';
import Overlay from 'ol/Overlay';
import {
  Circle as CircleStyle,
  Fill,
  // RegularShape,
  Stroke,
  Style,
  Text,
} from 'ol/style';
import {
  // fromLonLat,
  toLonLat
} from "ol/proj";
import {
  point,
  distance,
  // circle
} from "@turf/turf";

import { Block, Svg } from './../../components';
import SideSubMenu from './SideSubMenu';
import { Swipe, SharedView, BasemapCompare } from './SideSubMenu/Basemap';
import { NavButton, ModalMenu } from './';
import { logout, loginAll } from '../../redux/modules/auth';
// import { setDwaingLayer } from '../../redux/modules/drawing';
import { setActiveMenuItem } from '../../redux/modules/menu';
import {
  topMenu,
  // mainMenu,
  bottomMenu
} from '../../constants/mainMenuItems';
import mainMenu from '../../config/mainMenu';
import BottomBar from './BottomBar/BottomBar';
// import SpatialPopUp from './SpatialPopUp';
import UrlQuery from './UrlQuery';
import SearchUrlQuery from './SearchUrlQuery';
import CoordinatesUrlQuery from './CoordinatesUrlQuery';
import logomain from '../../assets/images/mainlogo.png';
import { fetchLayers } from '../../redux/modules/layers';
import { fetchInitialSearchLayersData, fetchSearchLayersData } from '../../redux/modules/search';
import {
  // setStoreData,
  getStoreData
} from '../../redux/modules/drawing';
// import { setLayersGeometry } from '../../redux/modules/layers';
import { settings } from '../../config/settings';
import appHeader from '../../config/appHeader';

/**
 * Component
 * @name MenuSidebar
 * @description
 * This is the menu sidebar component of the application. 
 * On application startup, this component is loaded
 */
class MenuSidebar extends Component {
  state = { open: false }

  constructor(props) {
    super(props);
    this.state = {
      mobMenu: false,
      activeNav: this.props.activeMenuItem,
      hideActiveMenu: false,
      hover: false,
      isMianNavOpen: false,
      isMianNavOpenLock: true,
      moreMenuActive: false,
    };
    this.storeCounter = -1;
    this.map = this.props.map;
    this.compareMap = this.props.compareMap;
    this.counterVar = 1;
    this.vectorSource = null;
    this.updatedAt = null;
    this.language = this.props.language;
    this.unitType = this.props.selectedUnitType;
  }

  componentDidMount = async () => {
    const { updatedAt } = this.props;
    this.updatedAt = updatedAt;
    if (!settings.login) {
      await this.props.dispatch(loginAll());
    }
    this.props.dispatch(fetchLayers());
    this.props.dispatch(fetchInitialSearchLayersData());
    // this.props.dispatch(fetchSearchLayersData());
    if (document.body.offsetWidth < 640) {
      this.setState({
        mobMenu: true
      })
    }
  }

  createDrawingData = () => {
    const { projection, translation, storeData, language, selectedUnitType, dispatch } = this.props;
    const drawingdata = Object.keys(storeData).length > 0 ? storeData : dispatch(getStoreData());;
    if (!drawingdata) {
      if (this.vectorSource) {
        this.vectorSource.clear();
      }
      for(let i = 0; i < 50; i++) {
        this.map.getLayers().forEach(layer => {
          if (layer && layer.get('name') === 'drawvectorlayer') {
            this.map.removeLayer(layer);
          }
        });
        this.compareMap.getLayers().forEach(layer => {
          if (layer && layer.get('name') === 'drawvectorlayer') {
            this.compareMap.removeLayer(layer)
          }
        });
      }
      return;
    }
    if (drawingdata.clearPreviousMeasure) {
      if (this.vectorSource) {
        this.vectorSource.clear();
      }
      for (let i = 0; i < 50; i++) {
        this.map.getLayers().forEach(layer => {
          if (layer && layer.get('name') === 'drawvectorlayer') {
            this.map.removeLayer(layer);
          }
        });
        this.compareMap.getLayers().forEach(layer => {
          if (layer && layer.get('name') === 'drawvectorlayer') {
            this.compareMap.removeLayer(layer)
          }
        });
      }
    }
    if (this.language !== language) {
      if (this.vectorSource) {
        this.vectorSource.clear();
      }
      for (let i = 0; i < 50; i++) {
        this.map.getLayers().forEach(layer => {
          if (layer && layer.get('name') === 'drawvectorlayer') {
            this.map.removeLayer(layer);
          }
        });
        this.compareMap.getLayers().forEach(layer => {
          if (layer && layer.get('name') === 'drawvectorlayer') {
            this.compareMap.removeLayer(layer)
          }
        });
      }
    }
    if (this.unitType !== selectedUnitType) {
      if (this.vectorSource) {
        this.vectorSource.clear();
      }
      for (let i = 0; i < 50; i++) {
        this.map.getLayers().forEach(layer => {
          if (layer && layer.get('name') === 'drawvectorlayer') {
            this.map.removeLayer(layer);
          }
        });
        this.compareMap.getLayers().forEach(layer => {
          if (layer && layer.get('name') === 'drawvectorlayer') {
            this.compareMap.removeLayer(layer)
          }
        });
      }
    }
    if (drawingdata) {
      try {
        Object.keys(drawingdata.overlays).forEach(o => {
          const element = document.getElementById(`area${o}`);
          if (element) {
            element.remove();
          }
        });

        drawingdata.vectorFeatures.forEach(feature => {
          this.vectorSource = new VectorSource();
          if (feature.shape !== 'Text') {
            var vectorObject = {
              source: this.vectorSource,
              zIndex: 505,
              // title: 'drawvectorlayer',
              name: 'drawvectorlayer',
              style: new Style({
                fill: new Fill({
                  color: `rgba(${feature.fill.color.r}, ${feature.fill.color.g}, ${feature.fill.color.b}, ${feature.fill.opacity})`,
                }),
                stroke: new Stroke({
                  color: `rgba(${feature.outline.color.r}, ${feature.outline.color.g}, ${feature.outline.color.b}, ${feature.outline.opacity})`,
                  width: feature.outline.size,
                }),
                image: new CircleStyle({
                  radius: feature.outline.size,
                  fill: new Fill({
                    color: `rgba(${feature.outline.color.r}, ${feature.outline.color.g}, ${feature.outline.color.b}, ${feature.outline.opacity})`,
                  }),
                }),
              })
            }
          } else {
            const font = `${feature.text.isBold ? 'bold' : 'normal'} ${feature.text.size}px/1 ${feature.text.font}`;
            vectorObject = {
              source: this.vectorSource,
              zIndex: 505,
              // title: 'drawvectorlayer',
              name: 'drawvectorlayer',
              style: new Style({
                text: new Text({
                  fill: new Fill({
                    color: `rgba(${feature.text.color.r}, ${feature.text.color.g}, ${feature.text.color.b}, ${feature.text.opacity})`,
                  }),
                  stroke: new Stroke({
                    color: `rgba(${feature.text.strokeColor.r}, ${feature.text.strokeColor.g}, ${feature.text.strokeColor.b}, ${feature.text.opacity})`,
                    width: feature.text.strokeSize || 1,
                  }),
                  textAlign: undefined,
                  textBaseline: "middle",
                  font,
                  text: feature.text.text,
                  offsetX: 0,
                  offsetY: 0,
                  placement: "point",
                  maxAngle: 0,
                  overflow: false,
                  rotation: Number(feature.text.rotation) * 0.0174533,
                })
              })
            }
          }
          const vectorLayer = new VectorLayer(vectorObject);
          const compareVectorLayer = new VectorLayer(vectorObject);

          const findOverlay = drawingdata.overlays[feature.id];
          const measurementObj = drawingdata.measurements[feature.id];
          const showMeasurement = drawingdata.showMeasurement[feature.id];
          if (measurementObj) {
            let measurement;
            if(feature.shape === 'Box' || feature.shape === 'Polygon') {
              let area = measurementObj.typeValue;
              let output;
              output = `${(Math.round(area * 100) / 100)}`;
              if (selectedUnitType === 'imperial') {
                let squareFeets = output * 10.76391042;
                if (squareFeets > 27878400) {
                  let miles = squareFeets / 27878400;
                  output = { number: miles.toFixed(2), unit: 'milesSqaure', unitType: 'imperial' };
                } else {
                  output = { number: squareFeets.toFixed(2), unit: 'feetSqaure', unitType: 'imperial' };
                }
              } else {
                if (area > 1000000) {
                  output = { number: (Math.round(area / 1000000 * 100) / 100), unit: 'kmSquare', unitType: 'metric' };
                } else {
                  output = { number: (Math.round(area * 100) / 100), unit: 'mSqaure', unitType: 'metric' };
                }
              }
              const measurementValue = output.number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              const measurementUnit = output.unit;
              measurement = `${measurementValue} ${translation[measurementUnit]}`;
            } else if (feature.shape === 'LineString') {
              let length = measurementObj.typeValue;
              let output;
              output = Math.round(length * 100) / 100;
              if (store('unitType') === 'imperial') {
                let feets = output * 3.2808;
                if (feets > 5280) {
                  let miles = feets / 5280;
                  output = { number: miles.toFixed(2), unit: 'mi', unitType: 'imperial' };
                } else {
                  output = { number: feets.toFixed(2), unit: 'ft', unitType: 'imperial' };
                }
              } else {
                if (length > 1000) {
                  output = { number: (Math.round(length / 1000 * 100) / 100), unit: 'km', unitType: 'metric' };
                } else {
                  output = { number: length.toFixed(2), unit: 'm', unitType: 'metric' };
                }
              }
              const measurementValue = output.number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              const measurementUnit = output.unit;
              measurement = `${measurementValue} ${translation[measurementUnit]}`;
            } else if(feature.shape === 'Circle') {
              let output;
              let ciclrArea = measurementObj.typeValue;
              if (selectedUnitType === 'imperial') {
                let squareFeets = ciclrArea * 10.76391042;
                if (squareFeets > 27878400) {
                  let miles = squareFeets / 27878400;
                  output = { number: miles.toFixed(2), unit: 'milesSqaure', unitType: 'imperial' };
                } else {
                  output = { number: squareFeets.toFixed(2), unit: 'feetSqaure', unitType: 'imperial' };
                }
              } else {
                if (ciclrArea > 1000000) {
                  output = { number: (Math.round(ciclrArea / 1000000 * 100) / 100), unit: 'kmSquare', unitType: 'metric' };
                } else {
                  output = { number: (Math.round(ciclrArea * 100) / 100), unit: 'mSqaure', unitType: 'metric' };
                }
              }
              const measurementValue = output.number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              const measurementUnit = output.unit;
              measurement = `${measurementValue} ${translation[measurementUnit]}`;
            }
            //tooltip
            if (showMeasurement) {
              this.measureTooltipElement = document.createElement('div');
              this.measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
              this.cMeasureTooltipElement = document.createElement('div');
              this.cMeasureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
              const overlayObj = {
                id: `draw-overlay-${feature.id}`,
                element: this.measureTooltipElement,
                offset: [0, -15],
                positioning: 'bottom-center',
              };
              this.measureTooltip = new Overlay(overlayObj);
              this.map.addOverlay(this.measureTooltip);

              this.cMeasureTooltip = new Overlay({ ...overlayObj, id: `c-draw-overlay-${feature.id}`, element: this.cMeasureTooltipElement });
              this.compareMap.addOverlay(this.cMeasureTooltip);

              this.measureTooltipElement.innerHTML = measurement;
              this.measureTooltipElement.id = `area${feature.id}`;
              this.measureTooltip.setPosition(findOverlay);
              this.cMeasureTooltipElement.innerHTML = measurement;
              this.cMeasureTooltipElement.id = `c-area${feature.id}`;
              this.cMeasureTooltip.setPosition(findOverlay);
            }
          //#endregion
          }
          if (feature.shape === 'Point') {
            let drawPoint = new Point(feature.geometry.flatCoordinates);
            const pointFeature = new Feature({
              geometry: drawPoint,
              id: feature.id,
              fill: feature.fill,
              outline: feature.outline,
              shape: feature.shape,
              isMeasurement: feature.isMeasurement,
              name: 'Draw Feature'
            });
            this.vectorSource.addFeature(pointFeature);
          } else if(feature.shape === 'Text') {
            let drawText = new Point(feature.geometry.flatCoordinates);
            const textFeature = new Feature({
              geometry: drawText,
              id: feature.id,
              shape: feature.shape,
              text: feature.text,
              isMeasurement: feature.isMeasurement
            });
            this.vectorSource.addFeature(textFeature);
          } else if (feature.shape === 'Box' || feature.shape === 'Polygon') {
            const newArray = feature.geometry.flatCoordinates.reduce(function (
              coordinates,
              coordinate,
              i
            ) {
              if (i % 2 === 0) {
                coordinates.push([coordinate, feature.geometry.flatCoordinates[i + 1]]);
              }
              return coordinates;
            }, []);
            let drawPolygon = new Polygon([newArray]);
            const polygonFeature = new Feature({
              geometry: drawPolygon,
              id: feature.id,
              fill: feature.fill,
              outline: feature.outline,
              shape: feature.shape,
              isMeasurement: feature.isMeasurement,
            });
            this.vectorSource.addFeature(polygonFeature);
          } else if (feature.shape === 'Circle') {
            const flatCordinates = feature.geometry.flatCoordinates;
            const from = point(toLonLat([flatCordinates[0], flatCordinates[1]]), projection);
            const to = point(toLonLat([flatCordinates[2], flatCordinates[3]]), projection);
            const options = { units: "kilometers" };
            const dist = distance(from, to, options);
            var coordinates = [flatCordinates[0], flatCordinates[1]];
            var radius = dist * 1000;
            const circleFeature = new Feature({
              geometry: new Circle(coordinates, radius),
              id: feature.id,
              fill: feature.fill,
              outline: feature.outline,
              shape: feature.shape,
              isMeasurement: feature.isMeasurement,
            });
            this.vectorSource.addFeature(circleFeature);
          } else if (feature.shape === 'LineString') {
            const newArray = feature.geometry.flatCoordinates.reduce(function (
              coordinates,
              coordinate,
              i
            ) {
              if (i % 2 === 0) {
                coordinates.push([coordinate, feature.geometry.flatCoordinates[i + 1]]);
              }
              return coordinates;
            }, []);
            let drawLine = new LineString(newArray);
            const lineFeature = new Feature({
              geometry: drawLine,
              id: feature.id,
              fill: feature.fill,
              outline: feature.outline,
              shape: feature.shape,
              isMeasurement: feature.isMeasurement,
            });
            this.vectorSource.addFeature(lineFeature);
          }
          this.map.addLayer(vectorLayer);
          this.compareMap.addLayer(compareVectorLayer);
        });
      } catch (err) {
        // console.log("drawing data err", err);
      }
    }
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    const { activeMenuItem: oldNav } = this.props;
    const { activeMenuItem } = nextProps;
    if (oldNav !== activeMenuItem) {
      this.setState({ activeNav: activeMenuItem });
    }
  }

  logout = () => {
    const { dispatch } = this.props;
    dispatch(setActiveMenuItem(null));
    // dispatch(setDwaingLayer(null));
    dispatch(logout());
  }

  handleMenu = () => {
    this.setState(({ isMianNavOpenLock }) => ({
      isMianNavOpenLock: !isMianNavOpenLock
    }));
  }

  handleNavButton = activeNav => () => {
    this.setState({ activeNav, isMianNavOpenLock: false, moreMenuActive: false });
    this.props.dispatch(setActiveMenuItem(activeNav));
    if (activeNav === 'search') {
      // this.props.dispatch(setLayersGeometry());
      this.props.dispatch(fetchSearchLayersData());
    }
  }

  onMenuToggle = (hideActiveMenu, isSubMenu) => {
    this.setState({
      hideActiveMenu: hideActiveMenu
    });
    if (!isSubMenu) {
      const activeNav = null;
      this.setState({ activeNav });
      this.props.dispatch(setActiveMenuItem(activeNav));
    }
  }


  handleHover = () => {
    this.setState({
      hover: !this.state.hover
    })
  }

  handleNavOver = () => {
    if (!this.state.isMianNavOver) {
      this.setState({ isMianNavOver: true });
      const self = this;
      if (!self.state.isMianNavOpen) {
        setTimeout(() => {
          if (self.state.isMianNavOver) {
            self.setState({
              isMianNavOpen: true
            });
          }
        }, 5000);
      }
    }
  }

  handleModalMenu = (menu) => {
    this.props.dispatch(setActiveMenuItem(menu));
    this.setState({ activeNav: menu, isMianNavOpenLock: false, moreMenuActive: true });
  }

  render() {
    const { translation, visibleLayers, compareBasemap, compareBasemapType, countLayers, compareMap, direction, language, updatedAt, selectedUnitType } = this.props;
    const { mobMenu, activeNav, hideActiveMenu, isMianNavOpen, isMianNavOpenLock, moreMenuActive } = this.state;

    const basepath = sessionStorage.getItem('basepath');
    const user = store(`${basepath}-authUser`)
    const appMainMenu = [...new Set(mainMenu.mainMenu)];
    let isImage = false;
    let imageName = '';
    let appHeaderText = '';
    let appHeaderBackground = false;
    var imagePath;
    if (appHeader.length > 0) {
      imageName = appHeader[0].appLogo;
      imagePath = imageName;
      appHeaderText = appHeader[0].appHeaderText[language];
      appHeaderBackground = appHeader[0].whiteBackground;
      if (imageName) {
        var image = new Image();
        try {
          imagePath = require('../../config/images/' + imageName);
        } catch (err) {
          imagePath = '';
        }
        image.src = imagePath;
        if (image.width === 0) {
          isImage = false;
        } else {
          isImage = true
        }
      }
    }
    if (this.counterVar === 1 || this.updatedAt !== updatedAt || this.language !== language || this.unitType !== selectedUnitType) {
      this.counterVar++;
      this.updatedAt = updatedAt;
      this.createDrawingData();
      this.language = language;
      this.unitType = selectedUnitType;
    }
    return (
      <Block id="aside-main-nav" className={`asideMain${hideActiveMenu ? ' no-child' : ''}${activeNav ? '' : ' hidden-menu'}`}>
        <Block className='sidebar'>
          <Menu
            className={`pointing secondary vertical${this.state.hover ? 'menuOpen' : ''} ${isMianNavOpenLock || isMianNavOpen ? 'expanded' : 'closed'}`}
          >
            <Block className="top-main-header">
              <Block className={`border-botton-base d-flex align-item-center bg-black-logo ${appHeaderBackground ? 'bg-white-logo' : ''} ${appHeaderText === '' ? 'without-text' : ''}`}>
                {/* <Svg name="logo"/> */}
                {isImage && <Block className="logo-block">
                  <img className="logo-main-size" alt="" src={require(`../../config/images/${imageName}`)} />
                </Block>}
                {!isImage && imagePath !== '' && <Block className="logo-block">
                  <img className="logo-main-size" alt="" src={logomain} />
                </Block>}
                <Block className="logo-header-text-dynamic">
                  {appHeaderText && <p>{appHeaderText}</p>}
                </Block>
                {topMenu && topMenu.map(item => (
                  <NavButton
                    key={item.name}
                    isActive={activeNav === item.name}
                    onClick={this.handleMenu}
                    svg={mobMenu ? 'mobile-menu' : item.name}
                    title={translation[item.title]}
                  />
                ))}
              </Block>
              <Block
                className="top-menu-items"
              >
                {appMainMenu && appMainMenu.map(item => (
                  <Block className="layer-button" key={item} data-tooltip={translation[item]} data-position={`${direction === 'RTL' ? 'left' : 'right'} center`}>
                    {item === 'layers' && visibleLayers > 0 && activeNav !== 'layers' &&
                      <Label circular className="label-counter cursor-pointer" onClick={this.handleNavButton(item)}  >
                        {visibleLayers}
                      </Label>
                    }
                    <NavButton
                      isActive={activeNav === item}
                      onClick={this.handleNavButton(item)}
                      svg={item}
                      title={translation[item]}
                      itemClassName={item}
                    />
                  </Block>
                ))}
                <ModalMenu moreMenuActive={moreMenuActive} activeModalMenu={this.handleModalMenu} hideActiveMenu={() => { this.onMenuToggle(false, false) }} activeNav={activeNav} />
              </Block>
            </Block>
            <Block
              className="bottom-menu-items last-menu"
            >
              {bottomMenu && bottomMenu.map(item => (
                <NavButton
                  key={item.name}
                  isActive={activeNav === item.name}
                  onClick={this.handleNavButton(item.name)}
                  svg={item.name}
                  title={translation[item.title]}
                  data-tooltip={translation[item.title]} data-position={`${direction === 'RTL' ? 'left' : 'right'} center`}
                />
              ))}
              {settings.login &&
                <Block className="login-menu">
                  <Button onClick={this.logout} className="user-login"><Svg className="user" name="new-user" />
                    <span className="d-flex logoutas">
                      <p className="logout-para">{translation.signedinas}</p> <p className="logout-para2">{user ? user.username : ''}</p>
                    </span>
                  </Button>
                  <Button onClick={this.logout} className="logout"><Svg className="logout" name="logout-new-icon" /> <p>{translation.logout}</p></Button>
                </Block>
              }
            </Block>
          </Menu>
          <SideSubMenu handleMenu={this.handleMenu} onMenuToggle={this.onMenuToggle} activeSubMenu={activeNav} />
        </Block>
        <BottomBar compareMap={compareMap} />
        <Block className="siderightMenuswrap">
          <Block className="siderightMenus sideRotateAngles">
            <Button className="arrowAngleleft"><Svg name="arrowAngleleft" /></Button>
            <Button className="arrowAngleright"><Svg name="arrowAngleright" /></Button>
          </Block>
          <Block className="siderightMenus sideMenuTop">
            <Button className="drawPlus"><Svg name="plus" /></Button>
            <Button className="drawMinus"><Svg name="minus" /></Button>
          </Block>
          <Block className="siderightMenus sideMenuBottom">
            <Button className="drawsearch"><Svg name="drawSearch" /></Button>
            <Button className="drawRotate"><Svg name="drawRotate" /></Button>
            <Button className="draw3d"><Svg name="draw3d" /></Button>
            <Button className="drawUser"><Svg name="drawUser" /></Button>
          </Block>
        </Block>
        {/* <SpatialPopUp /> */}
        {countLayers > 0 && <UrlQuery />}
        {countLayers > 0 && <SearchUrlQuery />}
        {countLayers > 0 && <CoordinatesUrlQuery />}
        {compareBasemap && compareBasemapType === 'SWIPE' && <Swipe compareBasemap={compareBasemap} activeNav={activeNav} />}
        {compareBasemap && compareBasemapType === 'SHARED_VIEW' && <SharedView />}
        {compareBasemap && <BasemapCompare />}
      </Block>
    );
  }
}

export default connect(
  state => {
    return ({
      translation: state.translation.translation,
      direction: state.translation.direction,
      countLayers: state.layers.allLayers.length,
      map: state.map.map,
      compareMap: state.map.compareMap,
      activeMenuItem: state.menu.activeMenuItem,
      compareBasemap: state.basemap.selectedCompareMap,
      compareBasemapType: state.basemap.selectedCompareType,
      visibleLayers: state.layers.visibleLayers.length,
      drawingData: state.drawing.data,
      language: state.translation.language,
      projection: state.map.projection,
      storeData: state.drawing.storeData,
      updatedAt: state.drawing.updatedAt,
      drawingSet: state.drawing.drawingSet,
      selectedUnitType: state.settings.selectedUnitType
    });
  })(MenuSidebar);

