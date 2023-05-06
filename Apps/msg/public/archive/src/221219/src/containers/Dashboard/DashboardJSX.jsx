import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from 'store2';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { defaults as defaultInteractions, DragRotateAndZoom } from 'ol/interaction';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import {
  OverviewMap,
  // Rotate
  // defaults as defaultControls
} from 'ol/control';
import Rotate from 'ol/control/Rotate';

import { Block, Loading, Language, PreLoader } from '../../components';
import { MenuSidebar, Magnifier, MapHistory, ZoomButtons, SpatialPopupNew } from '../../components/Layout';
import { setMap, setCompareMap } from '../../redux/modules/map';
// import { getPadding } from '../../utils/map';
import { setCurrentScale } from '../../redux/modules/layers';
import { createLabelLayer, createArealMaps, setLabelsVisible } from '../../redux/modules/basemap';
import { changeLanguage } from '../../redux/modules/translation';
import {
  // LoadingBar,
  TopLoaderBar
} from '../../components/Dashboard';
import { mapData, settings } from '../../config/settings';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import allSpatialRef from '../../config/spatialRef';
// import SpatialPopupNew from '../../components/Layout';

/**
 * Component
 * @name Dashboard
 * @description
 * This is dashboard component of the application. 
 * On application startup, this component is loaded
 */
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      controls: {},
      compareMap: null,
      showHide: false,
      showLoader: true
    };
  }

  componentDidMount = async () => {
    await this.createMap(this.props);
    setTimeout(() => {
      this.setState({ showLoader: false });
    }, 1000)
    this.habndleMapLoading();
    const lang = store('LANG') ? store('LANG') : settings.defaultLanguage
    this.props.dispatch(changeLanguage(lang))
  }

  componentWillUnmount = () => {
    const { map } = this.state;
    if (map) {
      map.setTarget(null);
      map.un('loadstart', this.handleMapLoadStart);
      map.un('loadend', this.handleMapLoadend);
    }
  }

  habndleMapLoading = () => {
    const { map } = this.state;
    // console.log("map", map);
    if (map) {
      map.on('loadstart', this.handleMapLoadStart);
      map.on('loadend', this.handleMapLoadend);
    }
  }

  handleMapLoadStart = () => {
    const { showHide } = this.state;
    if (!showHide) {
      this.setState({ showHide: !showHide });
    }
  }

  handleMapLoadend = () => {
    const { showHide } = this.state;
    if (showHide) {
      this.setState({ showHide: false });
    }
  }

  createMap = async (selfProps) => {
    const { dispatch } = selfProps;
    // const zoomslider = new ZoomSlider();

    // register all spatial ref from config file
    if (allSpatialRef && allSpatialRef.length > 0) {
      allSpatialRef.map(s => (proj4.defs(s.proj, s.proj4js)));
      register(proj4);
    }

    const viewObj = {
      center: [mapData.centerX, mapData.centerY],
      // rotation: Math.PI / 6,
      zoom: mapData.default_zoom,
      minZoom: mapData.min_zoom,
      maxZoom: mapData.max_zoom,
      projection: mapData.projection,
      // padding: getPadding()
    };

    if (mapData.extent) {
      viewObj.extent = [mapData.minx, mapData.miny, mapData.maxx, mapData.maxy];
    }

    const view = new View(viewObj);

    // const interactions = defaultInteractions().extend([
    //   new DragRotateAndZoom()
    // ]);

    const overviewMapControl = new OverviewMap({
      tipLabel: '',
      layers: [
        new TileLayer({
          source: new OSM(),
        })
      ],
    });

    const map = new Map({
      // controls: defaultControls({ attribution: false }).extend([overviewMapControl]),
      controls: [overviewMapControl, new Rotate()],
      target: "map",
      view,
      interactions: defaultInteractions().extend([
        new DragRotateAndZoom()
      ])
    });

    const compareMap = new Map({
      // controls: defaultControls({ attribution: false }).extend([overviewMapControl]),
      constrols: [overviewMapControl, new Rotate()],
      target: 'map-compare',
      layers: [
        // new TileLayer({
        //   source: new OSM(),
        //   opacity: 0
        //   // visible: false
        // })
      ],
      view,
      interactions: defaultInteractions().extend([
        new DragRotateAndZoom()
      ])
    });

    const buttonAttr = document.getElementsByClassName('ol-rotate-reset')[0];
    buttonAttr.setAttribute('data-tooltip', 'Reset Rotation');
    buttonAttr.setAttribute('title', '');
    // buttonAttr.appendChild('<p>test</p>')
    var node = document.createElement('div');
    node.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="close-icon" width="15.744" height="15.744" viewBox="0 0 15.744 15.744"><path id="close" d="M10.47,7.872,15.341,3a1.377,1.377,0,0,0,0-1.948L14.691.4a1.377,1.377,0,0,0-1.948,0l-4.87,4.87L3,.4A1.377,1.377,0,0,0,1.054.4L.4,1.053A1.377,1.377,0,0,0,.4,3L5.275,7.872l-4.87,4.87a1.377,1.377,0,0,0,0,1.948l.649.649A1.377,1.377,0,0,0,3,15.34l4.871-4.871,4.87,4.871a1.377,1.377,0,0,0,1.948,0l.649-.649a1.377,1.377,0,0,0,0-1.948Zm0,0" transform="translate(0 0)" fill="#fff"></path></svg>';               // Create a <li> node
    // Create a text node
    buttonAttr.appendChild(node);
    // map.addLayer(selfProps.basemapLayers);

    // map.addControl(this.scaleControl());
    // map.addControl(zoomslider);

    this.setState({ map });
    this.setState({ compareMap });
    dispatch(setMap(map));
    dispatch(setCompareMap(compareMap));
    await dispatch(createArealMaps(map));
    // overviewMapControl.setProperties({ layers: basemaps })
    // map.addLayer(basemaps);
    const labelLayers = await dispatch(createLabelLayer());
    if (labelLayers) {
      const [labelLayer, cLabelLayer] = labelLayers;
      map.addLayer(labelLayer);
      compareMap.addLayer(cLabelLayer);
    }
    dispatch(setMap(map));
    if (this.props.basemapType === 'ARIAL' && labelLayers !== null) {
      this.props.dispatch(setLabelsVisible(this.props.islabelLayer));
    }
    this.setScale(map);
  }

  setScale = (map) => {
    const { dispatch } = this.props;
    const cres = map.getView().getResolution()
    const scale = Math.round(39.3701 * (25.4 / 0.28) * cres);
    dispatch(setCurrentScale(scale));
  }

  render() {
    const { loading, map, showHide, showLoader } = this.state;
    const { compareMap, compareMapType, translation, direction } = this.props;

    let buttonAttr = document.getElementsByClassName('ol-rotate-reset')[0];
    if (buttonAttr) {
      buttonAttr.setAttribute('data-tooltip', translation.resetrotation);
      buttonAttr.setAttribute('data-position', `${direction === 'RTL' ? 'right' : 'left'} center`);
      buttonAttr.setAttribute('title', '');
    }

    let overView = document.getElementsByClassName('ol-overviewmap')[0];
    if (overView) {
      overView.setAttribute('data-tooltip', translation.overviewmap);
      overView.setAttribute('data-position', `top ${direction === 'RTL' ? 'left' : 'right'}`);
    }
    return (
      <Block className="container-main">
        <Language />
        {loading && <Loading />}
        {map && <MenuSidebar compareMap={this.state.compareMap} />}
        <Block id="map-block" className="map-container">
          {/* <LoadingBar /> */}
          <TopLoaderBar showHide={showHide} />
          {map && <SpatialPopupNew />}
          {map && <ZoomButtons map={map} />}
          {map && <Magnifier />}
          {/* {map && <GeoLocation map={map} />} */}
          {map && <MapHistory map={map} compareMap={this.state.compareMap} />}
          {showLoader &&
            <PreLoader />
          }
          <Block id="map" className={compareMap && compareMapType === 'SHARED_VIEW' ? 'halfWidth' : ''}>
          </Block>
          <Block id="map-compare" className={compareMap && compareMapType === 'SHARED_VIEW' ? 'halfWidth' : ''}></Block>
        </Block>
      </Block>
    );
  }
}

export default connect(
  state => ({
    basemapLayers: state.basemap.basemapLayers,
    center: state.map.center,
    compareMap: state.basemap.selectedCompareMap,
    compareMapType: state.basemap.selectedCompareType,
    translation: state.translation.translation,
    direction: state.translation.direction,
    islabelLayer: state.basemap.islabelLayer,
    basemapType: state.basemap.basemapType,
    compareBasemapType: state.basemap.selectedCompareBasemapType,
  }))(Dashboard);
