// import store from 'store2';
import superagent from 'superagent';
// import tocApi from './../../constants/toc';
import {
  getTokenForUrl,
  getTokenObj
} from '../../utils/common';

import layersapi from '../../config/layer';
import {
  settings
} from '../../config/settings';
import {
  createLayerDataArray,
  // createGeoLayerDataArray,
  createLayer,
  createGeoLayer,
  addSelectedLayersCount,
  removeSelectedLayersCount,
  addCountToLayer,
  addSubLayersCount,
  getLayerParentIds,
  addLayerToSource,
  addGeoLayerToSource,
  removeLayerFromSource,
  removeGeoLayerFromSource
  // getLayersFromSource
} from './../../utils/layer';
import {
  SET_LOADING
} from './basemap';

import {
  setMap
} from './map';
import {
  getLayerDefination
} from './toc';
import {
  createLayer_MIDDLEWARE,
  createLayerData_MIDDLEWARE,
  createLayerLink_MIDDLEWARE
} from '../../middlewares/layers/layer_middleware';

const FETCH_LAYERS = 'layers/FETCH_LAYERS';
const SET_MAP_LAYERS = 'layers/SET_MAP_LAYERS';
const SET_COMPARE_MAP_LAYERS = 'layers/SET_COMPARE_MAP_LAYERS';
const SET_LAYERS = 'layers/SET_LAYERS';
const SET_ALL_LAYERS = 'layers/SET_ALL_LAYERS';
const SET_VISIBLE_LAYERS = 'layers/SET_VISIBLE_LAYERS';
const SET_SELECTED_LAYER_COUNT = 'layers/SET_SELECTED_LAYER_COUNT';
const SET_SELECTED_LAYERS = 'layers/SET_SELECTED_LAYERS';
const SET_LAYERS_OPACITY = 'layers/SET_LAYERS_OPACITY';
const SET_FILTER_LAYER = 'layers/SET_FILTER_LAYER';
const SET_ACTIVE_SUB_MENU = 'layers/SET_ACTIVE_SUB_MENU';
const SET_CURRENT_SCALE = 'layers/SET_CURRENT_SCALE';
const SET_ACTIVE_SELECTED_LAYER = 'layers/SET_ACTIVE_SELECTED_LAYER';
const EXPORT_LAYERS_CSV_DATA = 'layers/EXPORT_LAYERS_CSV_DATA';
const SET_TOC_FILTER = 'layers/SET_TOC_FILTER';
const SET_GEOMETRY_CONDITION = 'layers/SET_GEOMETRY_CONDITION';
const SET_LOADING_LAYER_IDS = 'layers/SET_LOADING_LAYER_IDS';
const SET_DRAWING_ENABLE = 'layers/SET_DRAWING_ENABLE';
const SET_UNAUTH_LAYER_IDS = 'layers/SET_UNAUTH_LAYER_IDS';
const SET_ACTIVE_FILTER_MENU = 'layers/SET_ACTIVE_FILTER_MENU';
const SET_FETCH_LAYER_PARENT_ID = 'layers/SET_FETCH_LAYER_PARENT_ID';


const initialState = {
  layers: null,
  visibleLayers: [],
  mapLayers: [],
  compareMapLayers: [],
  selectedLayerCounts: {},
  selectedLayers: {},
  opacity: settings.LayersOpacity,
  filterLayers: {},
  allLayers: [],
  activeSubMenu: [],
  scale: null,
  activeSelectedLayer: false,
  exportLayersCsvData: [],
  tocFilters: {},
  geometryCondition: null,
  loadingLayerIds: [],
  setDrawingEnable: false,
  unauthorisedLayers: [],
  setActiveFilterMenu: null,
  fetchLayerParentId: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LAYERS:
      return {
        ...state, layers: action.payload
      };
    case SET_MAP_LAYERS:
      return {
        ...state, mapLayers: action.payload
      };
    case SET_COMPARE_MAP_LAYERS:
      return {
        ...state, compareMapLayers: action.payload
      };
    case SET_VISIBLE_LAYERS:
      return {
        ...state, visibleLayers: action.payload
      };
    case SET_SELECTED_LAYER_COUNT:
      return {
        ...state, selectedLayerCounts: action.payload
      };
    case SET_SELECTED_LAYERS:
      return {
        ...state, selectedLayers: action.payload
      };
    case SET_LAYERS_OPACITY:
      return {
        ...state, opacity: action.payload
      };
    case SET_FILTER_LAYER:
      return {
        ...state, filterLayers: action.payload
      };
    case SET_LAYERS:
      return {
        ...state, layers: action.payload
      };
    case SET_ALL_LAYERS:
      return {
        ...state, allLayers: action.payload
      };
    case SET_ACTIVE_SUB_MENU:
      return {
        ...state, activeSubMenu: action.payload
      };
    case SET_CURRENT_SCALE:
      return {
        ...state, scale: action.payload
      };
    case SET_ACTIVE_SELECTED_LAYER:
      return {
        ...state, activeSelectedLayer: action.payload
      };
    case EXPORT_LAYERS_CSV_DATA:
      return {
        ...state, exportLayersCsvData: action.payload
      };
    case SET_GEOMETRY_CONDITION:
      return {
        ...state, geometryCondition: action.payload
      };
    case SET_LOADING_LAYER_IDS:
      return {
        ...state, loadingLayerIds: action.payload
      };
    case SET_UNAUTH_LAYER_IDS:
      return {
        ...state,
        unauthorisedLayers: action.payload
      };
    case SET_DRAWING_ENABLE:
      return {
        ...state, setDrawingEnable: action.payload
      }
    case SET_ACTIVE_FILTER_MENU:
      return {
        ...state, setActiveFilterMenu: action.payload
      }
    case SET_FETCH_LAYER_PARENT_ID:
      return {
        ...state, fetchLayerParentId: action.payload
      }
    default:
      return state;
  }
}

/**
* @function
* @name fetchLayers
* @description
* fetch all layers
* @param {Object} {data} layer config data
* @returns {layers}
*/

export const fetchLayers = () => async (dispatch, getState, api) => {
  const {
    latestWkid
  } = getState().map;
  const {
    links
  } = getState().links;

  try {
    let apiNameSpaceArr = [];
    let apiUrlArr = [];
    let nameSpaceGroupArr = [];
    const results = await Promise.all(layersapi.map(async api => {
      let apiData;
      if(api.group) {
        const apiNameSpace = api.group.split(':')[0];
        nameSpaceGroupArr.push(api.group);
        if(apiNameSpaceArr && apiNameSpaceArr.filter(l => l === apiNameSpace).length > 0 && apiUrlArr.filter(u => u === api.url).length> 0) {
          return
        }
        apiNameSpaceArr.push(apiNameSpace);
        apiUrlArr.push(api.url);
        apiData = {
          api,
          latestWkid,
          apiNameSpace: api.group.split(':')[0],
          nameSpaceGroupArr
        }
      } else {
        apiData = {
          api,
          latestWkid
        }
      }
      return await createLayer_MIDDLEWARE(apiData);
    }));
    const timeOutApis = [];
    let updateLayer = [];
    results.map((r, apisIndex) => {
      // const data = [];
      if (!r) {
        return false
      }
      if (r && r.isTimeOut) {
        timeOutApis.push(r.layerapi);
        return false;
      }
      const middlewareData = {
        source: r.serverType,
        text: r.text,
        url: layersapi[apisIndex].url,
        virtualGroup: layersapi[apisIndex].virtualGroup,
        export: r.export,
        nameSpaceGroupArr,
        length: updateLayer.length
      }
      const newLayers = createLayerData_MIDDLEWARE(middlewareData);
      updateLayer = [...updateLayer, ...newLayers];
      return true;
    });
    dispatch({
      type: FETCH_LAYERS,
      payload: updateLayer
    });

    let allLayers = [];
    const unauthorisedLayers = [];
    const createLayersArr = (l) => {
      const middlewareData = {
        source: l.type,
        links,
        name: l.name
      };
      const currentLinks = createLayerLink_MIDDLEWARE(middlewareData);
      allLayers.push({
        layerid: l.layerId,
        id: l.id,
        name: l.name,
        groupname: l.groupname,
        key: l.layerId,
        value: l.layerId,
        text: l.name,
        url: l.url,
        boundingbox: l.BoundingBox,
        // extent: l.extent,
        parentlayerids: l.parentLayerIds,
        sublayerids: l.subLayerIds,
        maxscaledenominator: l.MaxScaleDenominator,
        minscale: l.minScale,
        maxscale: l.maxScale,
        export: l.export,
        version: l.version,
        currentlinks: currentLinks,
        projection: l.projection,
        type: l.type
      });
      if (l.hasLayers) {
        l.layers.forEach(cl => {
          cl.type = l.type;
          createLayersArr(cl);
        });
      }
    }

    if (updateLayer && updateLayer.length) {
      updateLayer.forEach(pl => {
        pl.layers.forEach(l => {
          l.type = pl.type;
          createLayersArr(l);
        });
      });
    }

    const featureLayers = allLayers.filter(al => al.groupname && !al.sublayerids);
    await Promise.all(featureLayers.map(async (l) => {
      const authToken = getTokenObj(l.url);
      const authTokenData = authToken.token ? `&authkey=${authToken.token}` : '';
      const apiData = {
        api: {type: l.type},
        url: l.url,
        geomRequest: true,
        typeName: l.groupname,
        authTokenData
      };
      const featureTypeRes = await createLayer_MIDDLEWARE(apiData);
      if (!featureTypeRes.text.includes('<?xml')) {
        const featureTypes = JSON.parse(featureTypeRes.text).featureTypes;
        const geometry = featureTypes && featureTypes.length > 0 ? featureTypes[0].properties.find(f => f.type.substring(0, 3) === 'gml') : null;
        if (geometry) {
          const findArr = allLayers.find(fl => fl.layerid === l.layerid);
          findArr.geometrytype = geometry.name;
          return;
        }
        const findArr = allLayers.find(fl => fl.layerid === l.layerid);
        findArr.geometrytype = null;
        return;
      }
      const findArr = allLayers.find(fl => fl.layerid === l.layerid);
      findArr.geometrytype = null;
      unauthorisedLayers.push(l.layerid);
      allLayers = allLayers.filter(al => al.layerid !== l.layerid);
    }));

    await dispatch({
      type: SET_ALL_LAYERS,
      payload: allLayers
    });

    dispatch({
      type: SET_UNAUTH_LAYER_IDS,
      payload: unauthorisedLayers
    });

    dispatch(afterFetchLayers(allLayers, timeOutApis));
  } catch (err) {
    console.log("layer err", err);
  }
};

/**
* @function
* @name afterFetchLayers
* @description
* fetch all not responded layers
* @param {Object} {data} layer config data
* @returns {layers}
*/

export const afterFetchLayers = (allLayers, timeOutApis) => async (dispatch, getState, api) => {
  // await dispatch(fetchAllLayersData(allLayers));
  if (timeOutApis.length > 0) {
    dispatch(fetchTimeOutLayers(timeOutApis));
  }
}

/**
* @function
* @name fetchTimeOutLayers
* @description
* fetch all timed out layers
* @param {Object} {data} layer config data
* @returns {layers}
*/

export const fetchTimeOutLayers = (TimeoutLayerApis) => async (dispatch, getState, api) => {
  const {
    latestWkid
  } = getState().map;
  try {
    const results = await Promise.all(TimeoutLayerApis.map(async api => {
      const apiData = {
        api,
        latestWkid
      }
      return await createLayer_MIDDLEWARE(apiData);
    }));
    const data = [];
    results.map((r, apisIndex) => {
      if (!r) {
        return false
      }
      const layerData = JSON.parse(r.text);
      if (!layerData.error) {
        data.push({
          ...layerData,
          url: layersapi[apisIndex].url,
          export: layersapi[apisIndex].export,
          virtualGroup: layersapi[apisIndex].virtualGroup
        });
      }
      return true;
    });
    if (data && data.length === 0) {
      return;
    }
    const {
      layers,
      allLayers
    } = getState().layers;
    const newLayers = createLayerDataArray(data, layers.length);
    const updateLayer = [...layers, ...newLayers];
    dispatch({
      type: FETCH_LAYERS,
      payload: updateLayer
    });

    const newAllLayers = [];
    const createLayersArr = (l) => {
      newAllLayers.push({
        layerid: l.layerId,
        id: l.id,
        name: l.name,
        key: l.layerId,
        value: l.layerId,
        text: l.name,
        url: l.url,
        parentlayerids: l.parentLayerIds,
        sublayerids: l.subLayerIds,
        // extent: l.extent,
        minscale: l.minScale,
        maxscale: l.maxScale,
        // exportkmz: l.exportKMZ,
        // exportcsv: l.exportCSV
        export: l.export
      });
      if (l.hasLayers) {
        l.layers.forEach(cl => {
          createLayersArr(cl);
        });
      }
    }

    if (newLayers && newLayers.length) {
      newLayers.forEach(pl => {
        pl.layers.forEach(l => {
          createLayersArr(l);
        });
      });
    }

    // =======================================
    // const allLayersResults = await Promise.all(newAllLayers.map(async (layer) => {
    //   const res = await superagent.get(`${layer.url}/${layer.id}?f=json${getTokenForUrl(layer.url)}`)
    //   const layerData = JSON.parse(res.text);
    //   if (!layerData.error) {
    //     layer.extent = layerData.extent;
    //     layer.uniquefield = layerData.drawingInfo ? layerData.drawingInfo.renderer.field1 : '';
    //     layer.version = layerData.currentVersion;
    //   }
    //   return layer;
    // }));
    dispatch({
      type: SET_ALL_LAYERS,
      payload: [...allLayers, ...newAllLayers]
    });
    // =======================================
  } catch (err) {
    // console.log("err", err);
  }
};

export const fetchAllLayersData = (allLayers) => async (dispatch, getState, api) => {
  const {
    latestWkid
  } = getState().map;

  const results = await Promise.all(allLayers.map(async (layer) => {
    const res = await superagent.get(`${layer.url}/${layer.id}?f=json&inSR=${latestWkid}&outSR=${latestWkid}${getTokenForUrl(layer.url)}`)
    const layerData = JSON.parse(res.text);
    if (!layerData.error) {
      layer.extent = layerData.extent;
      layer.uniquefield = layerData.drawingInfo ? layerData.drawingInfo.renderer.field1 : '';
      layer.version = layerData.currentVersion;
    }
    return layer;
  }));
  await dispatch({
    type: SET_ALL_LAYERS,
    payload: results
  });
  return results;
}

/**
* @function
* @name showLayer
* @description
* show layer on map
* @param {Object} {data} layer data
* @returns {layer}
*/

export const showLayer = (layer, parentLayer, subLayer) => async (dispatch, getState, api) => {
  const {
    layerId,
    groupname
  } = layer;
  const {
    visibleLayers,
    mapLayers,
    compareMapLayers,
    filterLayers,
    opacity,
    allLayers
  } = getState().layers;
  const parentLayerId = layer.parentLayerIds[0];
  const e = mapLayers.find(e => e.get('title') === parentLayerId);
  const ce = compareMapLayers.find(e => e.get('title') === parentLayerId);
  // show layer if added seprately for adjust opacity
  if (filterLayers[layerId]) {
    mapLayers.forEach(e => {
      if (e.get('title') === layerId) {
        e.setVisible(true);
      }
    });
    compareMapLayers.forEach(e => {
      if (e.get('title') === layerId) {
        e.setVisible(true);
      }
    });
    dispatch({
      type: SET_MAP_LAYERS,
      payload: mapLayers
    });
    dispatch({
      type: SET_COMPARE_MAP_LAYERS,
      payload: compareMapLayers
    });
  } else {
    if (e) {
      if(groupname) {
        const allLayersForMainParent = allLayers.filter(l => l.parentlayerids.includes(parentLayerId) && l.sublayerids === null);
        const allNames = allLayersForMainParent.map(l => l.groupname);
        const eParams = addGeoLayerToSource(e.getSource().getParams(), layer.groupname, null, allNames);
        const ceParams = addGeoLayerToSource(ce.getSource().getParams(), layer.groupname, null, allNames);
        e.getSource().updateParams(eParams);
        ce.getSource().updateParams(ceParams);
      } else {
        const eParams = addLayerToSource(e.getSource().getParams(), layer.id);
        const ceParams = addLayerToSource(ce.getSource().getParams(), layer.id);
        const layerDefs = await dispatch(getLayerDefination([layerId, ...visibleLayers.filter(v => v.includes(parentLayerId))]))
        eParams.layerDefs = layerDefs;
        ceParams.layerDefs = layerDefs;
        e.getSource().updateParams(eParams);
        ce.getSource().updateParams(ceParams);
      }
    } else {
      const {
        map,
        compareMap
      } = getState().map;
      if(groupname) {
        const [l, cl] = createGeoLayer(layer, parentLayerId, opacity);
        map.addLayer(l);
        compareMap.addLayer(cl);
        dispatch(setMap(map));
        mapLayers.push(l);
        compareMapLayers.push(cl);
        handleLayerLoader(l.getSource(), dispatch, getState);
      } else {
        const layerDefs = await dispatch(getLayerDefination([layerId, ...visibleLayers.filter(v => v.includes(parentLayerId))]))
        const [l, cl] = createLayer(layer, parentLayerId, opacity, null, layerDefs);
        handleLayerLoader(l.getSource(), dispatch, getState);
        map.addLayer(l);
        compareMap.addLayer(cl);
        dispatch(setMap(map));
        mapLayers.push(l);
        compareMapLayers.push(cl);
      }
      dispatch({
        type: SET_MAP_LAYERS,
        payload: mapLayers
      });
      dispatch({
        type: SET_COMPARE_MAP_LAYERS,
        payload: compareMapLayers
      });
    }
  }

  if (!visibleLayers.includes(layerId)) {
    dispatch(addSelectedLayers(layer));
    await dispatch(addSelectedLayerCounts(layer, parentLayer, subLayer));
    visibleLayers.push(layerId);
    dispatch({
      type: SET_VISIBLE_LAYERS,
      payload: visibleLayers
    });
  }
  dispatch({
    type: SET_DRAWING_ENABLE,
    payload: true
  });
  return true;
}

/**
* @function
* @name hideLayer
* @description
* hide layer on map
* @param {Object} {data} layer data
* @returns {layer}
*/

export const hideLayer = (layer, parentLayer, subLayer) => async (dispatch, getState, api) => {
  const {
    layerId,
    groupname
  } = layer;
  let {
    visibleLayers: oldLayers,
    mapLayers,
    compareMapLayers,
    filterLayers
  } = getState().layers;

  const parentLayerId = layer.parentLayerIds[0];
  const {
    map,
    compareMap
  } = getState().map;
  let isRemoveLayer = false;
  const e = mapLayers.find(l => l.get('title') === parentLayerId);
  const ce = compareMapLayers.find(l => l.get('title') === parentLayerId);
  if (e) {
    if(groupname) {
      const eParams = removeGeoLayerFromSource(e.getSource().getParams(), layer.groupname);
      e.getSource().updateParams(eParams);
      const ceParams = removeGeoLayerFromSource(ce.getSource().getParams(), layer.groupname);
      ce.getSource().updateParams(ceParams);
      if (eParams.LAYERS === '') {
        isRemoveLayer = true;
        map.removeLayer(e);
        compareMap.removeLayer(ce);
        dispatch(setMap(map));
      }
    } else {
      const eParams = removeLayerFromSource(e.getSource().getParams(), layer.id);
      e.getSource().updateParams(eParams);
      const ceParams = removeLayerFromSource(ce.getSource().getParams(), layer.id);
      ce.getSource().updateParams(ceParams);
      if (eParams.layers === 'show:-1') {
        isRemoveLayer = true;
        map.removeLayer(e);
        compareMap.removeLayer(ce);
        dispatch(setMap(map));
      }
    }
  }

  // mapLayers.forEach((e) => {
  //   const title = e.get('title');
  //   if (title === parentLayerId) {
  //     const eParams = removeLayerFromSource(e.getSource().getParams(), layer.id);
  //     e.getSource().updateParams(eParams);
  //     if (eParams.layers === 'show:-1') {
  //       isRemoveLayer = true;
  //       map.removeLayer(e);
  //       // compareMap.removeLayer(e);
  //       dispatch(setMap(map));
  //     }
  //   }
  // });

  if (isRemoveLayer) {
    mapLayers = mapLayers.filter(e => e.get('title') !== parentLayerId);
    compareMapLayers = compareMapLayers.filter(e => e.get('title') !== parentLayerId);
  }

  // hide layer if added seprately for adjust opacity
  if (filterLayers[layerId]) {
    mapLayers.forEach(e => {
      if (e.get('title') === layerId) {
        e.setVisible(false);
      }
    });
    compareMapLayers.forEach(e => {
      if (e.get('title') === layerId) {
        e.setVisible(false);
      }
    });
    filterLayers[layerId].isLocked = false;
    dispatch({
      type: SET_FILTER_LAYER,
      payload: filterLayers
    });
  }

  const visibleLayers = oldLayers.filter(lid => lid !== layerId);
  dispatch({
    type: SET_VISIBLE_LAYERS,
    payload: visibleLayers
  });
  dispatch({
    type: SET_MAP_LAYERS,
    payload: mapLayers
  });
  dispatch({
    type: SET_COMPARE_MAP_LAYERS,
    payload: compareMapLayers
  });
  dispatch(removeFromSelectedLayerCounts(layer, parentLayer, subLayer))
  dispatch(removeFromSelectedLayers(layer, parentLayer, subLayer))
  if(visibleLayers.length > 0) {
    dispatch({
      type: SET_DRAWING_ENABLE,
      payload: true
    });
  } else {
    dispatch({
      type: SET_DRAWING_ENABLE,
      payload: false
    });
  }
}

/**
* @function
* @name addSelectedLayerCounts
* @description
* add the layer count
* @param {Object} {data} layer data
* @returns {layercounter}
*/

export const addSelectedLayerCounts = (layer, parentLayer, subLayer) => async (dispatch, getState) => {
  const {
    selectedLayerCounts
  } = getState().layers;
  addSelectedLayersCount(parentLayer.layerId, selectedLayerCounts)

  if (subLayer) {
    let sl = selectedLayerCounts[subLayer.layerId];
    if (sl) {
      sl.count = sl.count + 1;
    } else {
      sl = {
        layerId: subLayer.layerId,
        parentLayerId: parentLayer.layerId,
        count: 1
      }
    }
    selectedLayerCounts[subLayer.layerId] = sl;
  }
  return dispatch({
    type: SET_SELECTED_LAYER_COUNT,
    payload: selectedLayerCounts
  });
}

/**
* @function
* @name addSelectedLayers
* @description
* add the selected layer
* @param {Object} {data} layer data
* @returns {layer}
*/

export const addSelectedLayers = (layer) => async (dispatch, getState) => {
  const {
    selectedLayers
  } = getState().layers;
  const parentLayerIds = layer.parentLayerIds;
  const {
    layerId,
    name,
    groupname,
    id,
    url,
    extent,
    minScale,
    maxScale,
    BoundingBox,
    MaxScaleDenominator,
    geometrytype,
    projection,
    type
  } = layer;
  selectedLayers[layerId] = {
    layerId,
    name,
    groupname,
    parentLayerId: parentLayerIds[0],
    subLayerId: parentLayerIds[parentLayerIds.length - 1],
    id,
    url,
    extent,
    minScale,
    maxScale,
    BoundingBox,
    MaxScaleDenominator,
    geometrytype,
    export: layer.export,
    projection,
    type
  };
  dispatch({
    type: SET_SELECTED_LAYERS,
    payload: selectedLayers
  });
}

/**
* @function
* @name removeFromSelectedLayerCounts
* @description
* remove the selected layer from count
* @param {Object} {data} layer data
* @returns {layercounter}
*/

export const removeFromSelectedLayerCounts = (layer, parentLayer, subLayer) => async (dispatch, getState) => {
  const {
    selectedLayerCounts
  } = getState().layers;

  removeSelectedLayersCount(parentLayer.layerId, selectedLayerCounts)

  if (subLayer) {
    let sl = selectedLayerCounts[subLayer.layerId];
    if (sl) {
      sl.count = sl.count - 1;
    }
    selectedLayerCounts[subLayer.layerId] = sl;
  }
  dispatch({
    type: SET_SELECTED_LAYER_COUNT,
    payload: selectedLayerCounts
  });
}

/**
* @function
* @name removeFromSelectedLayers
* @description
* remove layer from selected layers
* @param {Object} {data} layer data
* @returns {layers}
*/

export const removeFromSelectedLayers = (layer, parentLayer, subLayer) => async (dispatch, getState) => {
  const {
    selectedLayers
  } = getState().layers;
  const {
    layerId
  } = layer;
  if (selectedLayers[layerId]) {
    delete selectedLayers[layerId];
  }
  dispatch({
    type: SET_SELECTED_LAYERS,
    payload: selectedLayers
  });
}

/**
* @function
* @name setLayersOpacity
* @description
* set the layer opacity
* @param {Object} {data} layer data
* @returns {layer with opacity}
*/

export const setLayersOpacity = ({
  opacity,
  mapLayers,
  compareMapLayers,
  filterLayers
}) => (dispatch, getState) => {
  // const {
  //   mapLayers,
  //   compareMapLayers,
  //   filterLayers
  // } = getState().layers;
  // const {
  //   map,
  //   compareMap
  // } = getState().map

  // mapLayers.forEach((e) => {
  //   const title = e.get('title');
  //   const filterLayer = filterLayers[title];
  //   if (filterLayer && filterLayer.isLocked === false) {
  //     delete filterLayers[title];
  //     const titleArr = title.split('-');
  //     const parentLayerId = getLayerParentIds(title)[0]
  //     const ep = mapLayers.find(e => e.get('title') === parentLayerId);
  //     if (ep) {
  //       const eParams = addLayerToSource(ep.getSource().getParams(), titleArr[titleArr.length - 1]);
  //       ep.getSource().updateParams(eParams);
  //     }
  //     map.removeLayer(e);
  //     // compareMap.removeLayer(e);
  //   } else if (!filterLayer) {
  //     e.setOpacity(opacity);
  //   }
  // });

  // compareMapLayers.forEach((e) => {
  //   const title = e.get('title');
  //   const filterLayer = filterLayers[title];
  //   if (filterLayer && filterLayer.isLocked === false) {
  //     delete filterLayers[title];
  //     const titleArr = title.split('-');
  //     const parentLayerId = getLayerParentIds(title)[0]
  //     const ep = compareMapLayers.find(e => e.get('title') === parentLayerId);
  //     if (ep) {
  //       const eParams = addLayerToSource(ep.getSource().getParams(), titleArr[titleArr.length - 1]);
  //       ep.getSource().updateParams(eParams);
  //     }
  //     // map.removeLayer(e);
  //     compareMap.removeLayer(e);
  //   } else if (!filterLayer) {
  //     e.setOpacity(opacity);
  //   }
  // });
  dispatch({
    type: SET_MAP_LAYERS,
    payload: mapLayers
  });
  dispatch({
    type: SET_COMPARE_MAP_LAYERS,
    payload: compareMapLayers
  });
  dispatch({
    type: SET_LAYERS_OPACITY,
    payload: opacity
  });
  dispatch({
    type: SET_FILTER_LAYER,
    payload: filterLayers
  });
}

/**
* @function
* @name selectAllLayersByParentId
* @description
* select all the child layer by it's parent
* @param {Object} {data} layer data
* @returns {layers}
*/

export const selectAllLayersByParentId = (layerId) => async (dispatch, getState) => {
  try {
    const {
      allLayers,
      visibleLayers,
      mapLayers,
      compareMapLayers,
      selectedLayerCounts,
      selectedLayers,
      filterLayers,
      opacity
    } = getState().layers;
  
    let geoLayer = false;
  
    let layer = allLayers.find(l => l.layerid === layerId);
    const cls = allLayers.filter(l => l.parentlayerids.includes(layerId) && l.sublayerids === null);
    const scls = allLayers.filter(l => l.parentlayerids.includes(layerId) && l.sublayerids);
    const parentLayerId = cls[0].parentlayerids[0];
    const allLayersForMainParent = allLayers.filter(l => l.parentlayerids.includes(parentLayerId) && l.sublayerids === null);
    const allNames = allLayersForMainParent.map(l => l.groupname).filter(f => f !== undefined);
    if(allNames.length > 0) {
      geoLayer = true;
    }
    const ids = [];
    const names = [];
    cls.forEach(l => {
      if (!filterLayers[l.layerid]) {
        if(l.groupname) {
          names.push(l.groupname)
        } else {
          ids.push(l.id)
        }
      } else {
        mapLayers.forEach(e => {
          if (e.get('title') === l.layerid) {
            e.setVisible(true)
          }
        });
        compareMapLayers.forEach(e => {
          if (e.get('title') === l.layerid) {
            e.setVisible(true)
          }
        });
      }
    });
  
    const e = mapLayers.find(e => e.get('title') === parentLayerId);
    const ce = compareMapLayers.find(e => e.get('title') === parentLayerId);
    if(geoLayer) {
      if (e) {
        const eParams = addGeoLayerToSource(e.getSource().getParams(), null, names, allNames);
        e.getSource().updateParams(eParams);
        const ceParams = addGeoLayerToSource(ce.getSource().getParams(), null, names, allNames);
        ce.getSource().updateParams(ceParams);
      } else {
        const {
          map,
          compareMap
        } = getState().map;
        const [l, cl] = createGeoLayer({
          url: cls[0].url,
          layerid: cls[0].layerid
        }, parentLayerId, opacity, names.reverse().join(','));
        handleLayerLoader(l.getSource(), dispatch, getState);
        map.addLayer(l);
        compareMap.addLayer(cl);
        dispatch(setMap(map));
        mapLayers.push(l);
        compareMapLayers.push(cl);
        dispatch({
          type: SET_MAP_LAYERS,
          payload: mapLayers
        });
        dispatch({
          type: SET_COMPARE_MAP_LAYERS,
          payload: compareMapLayers
        });
      }
    } else {
      const layerDefs = await dispatch(getLayerDefination([...cls.map(c => c.layerid), ...visibleLayers.filter(v => v.includes(parentLayerId))]));
      if (e) {
        const eParams = addLayerToSource(e.getSource().getParams(), null, ids);
        eParams.layerDefs = layerDefs;
        e.getSource().updateParams(eParams);
        const ceParams = addLayerToSource(ce.getSource().getParams(), null, ids);
        ceParams.layerDefs = layerDefs;
        ce.getSource().updateParams(ceParams);
      } else {
        const {
          map,
          compareMap
        } = getState().map;
        const [l, cl] = createLayer({
          url: cls[0].url
        }, parentLayerId, opacity, ids.join(','), layerDefs);
        handleLayerLoader(l.getSource(), dispatch, getState);
        map.addLayer(l);
        compareMap.addLayer(cl);
        dispatch(setMap(map));
        mapLayers.push(l);
        compareMapLayers.push(cl);
        dispatch({
          type: SET_MAP_LAYERS,
          payload: mapLayers
        });
        dispatch({
          type: SET_COMPARE_MAP_LAYERS,
          payload: compareMapLayers
        });
      }
    }
  
    let count = 0;
    if (cls && cls.length) {
      cls.forEach(l => {
        if (!visibleLayers.includes(l.layerid)) {
          count++;
          visibleLayers.push(l.layerid);
          selectedLayers[l.layerid] = {
            layerId: l.layerid,
            name: l.name,
            groupname: l.groupname,
            url: l.url,
            id: l.id,
            extent: l.extent,
            minScale: l.minscale,
            maxScale: l.maxscale,
            BoundingBox: l.boundingbox,
            MaxScaleDenominator: l.MaxScaleDenominator,
            geometrytype: l.geometrytype,
            export: l.export,
            projection: l.projection,
            type: l.type
          };
        }
      });
    }
  
    selectedLayerCounts[layerId] = {
      layerId,
      count: cls.length
    };
  
    if (layer && layer.parentlayerids.length) {
      layer.parentlayerids.forEach(id => {
        selectedLayerCounts[id] = addCountToLayer(selectedLayerCounts, id, count)
      });
    }
    if (scls && scls.length) {
      scls.forEach(sl => {
        selectedLayerCounts[sl.layerid] = addCountToLayer(selectedLayerCounts, sl.layerid, sl.sublayerids.length, false)
        addSubLayersCount(sl.sublayerids, sl.layerid, selectedLayerCounts, allLayers);
      });
    }
  
    dispatch({
      type: SET_VISIBLE_LAYERS,
      payload: visibleLayers
    });
  
    dispatch({
      type: SET_SELECTED_LAYER_COUNT,
      payload: selectedLayerCounts
    });
    dispatch({
      type: SET_SELECTED_LAYERS,
      payload: selectedLayers
    });
    dispatch({
      type: SET_DRAWING_ENABLE,
      payload: true
    });
  } catch(err) {
    // console.log("err", err);
  }
}

/**
* @function
* @name removeSelectedLayerByParentId
* @description
* remove all the child layer by it's parent
* @param {Object} {data} layer data
* @returns {layers}
*/

export const removeSelectedLayerByParentId = (count, layerId) => async (dispatch, getState) => {
  if (count) {
    let {
      allLayers,
      compareMapLayers,
      mapLayers,
      selectedLayers,
      selectedLayerCounts,
      filterLayers,
      visibleLayers: vLayers
    } = getState().layers;
    let visibleLayers = vLayers;
    const layer = allLayers.find(l => l.layerid === layerId);
    const cls = allLayers.filter(l => l.parentlayerids.includes(layerId) && l.sublayerids === null);
    const scls = allLayers.filter(l => l.parentlayerids.includes(layerId) && l.sublayerids);
    const parentLayerId = cls[0].parentlayerids[0];
    const ids = cls.map(l => l.id);
    const names = cls.map(l => l.groupname).filter(f => f !== undefined);

    let geoLayer = false;

    if(names.length > 0) {
      geoLayer = true;
    }

    // remove layer if added seprately for adjust opacity
    cls.forEach(l => {
      if (filterLayers[l.layerid]) {
        mapLayers.forEach(e => {
          if (e && e.get('title') === l.layerid) {
            e.setVisible(false);
          }
        });
        compareMapLayers.forEach(e => {
          if (e && e.get('title') === l.layerid) {
            e.setVisible(false);
          }
        });
        filterLayers[l.layerid].isLocked = false;
      }
    });

    let isRemoveLayer = false;
    const e = mapLayers.find(e => e.get('title') === parentLayerId);
    const ce = compareMapLayers.find(e => e.get('title') === parentLayerId);
    if(geoLayer) {
      if (e) {
        // console.log('ids =>', ids);
        const eParams = removeGeoLayerFromSource(e.getSource().getParams(), null, names);
        // console.log('eParams =>', eParams);
        e.getSource().updateParams(eParams);
        const ceParams = removeGeoLayerFromSource(ce.getSource().getParams(), null, names);
        ce.getSource().updateParams(ceParams);
        if (eParams.LAYERS === '') {
          isRemoveLayer = true;
          const {
            map,
            compareMap
          } = getState().map;
          map.removeLayer(e);
          compareMap.removeLayer(ce);
          dispatch(setMap(map));
        }
      }
    } else {
      if (e) {
        // console.log('ids =>', ids);
        const eParams = removeLayerFromSource(e.getSource().getParams(), null, ids);
        // console.log('eParams =>', eParams);
        e.getSource().updateParams(eParams);
        const ceParams = removeLayerFromSource(ce.getSource().getParams(), null, ids);
        ce.getSource().updateParams(ceParams);
        if (eParams.layers === 'show:-1') {
          isRemoveLayer = true;
          const {
            map,
            compareMap
          } = getState().map;
          map.removeLayer(e);
          compareMap.removeLayer(ce);
          dispatch(setMap(map));
        }
      }
    }

    if (isRemoveLayer) {
      mapLayers = mapLayers.filter(e => e.get('title') !== parentLayerId)
      compareMapLayers = compareMapLayers.filter(e => e.get('title') !== parentLayerId)
    }

    if (cls && cls.length) {
      cls.forEach(l => {
        if (visibleLayers.includes(l.layerid)) {
          visibleLayers = visibleLayers.filter(id => id !== l.layerid);
        }
        if (selectedLayers[l.layerid]) {
          delete selectedLayers[l.layerid];
        }
      });
    }

    if (layer && layer.parentlayerids.length) {
      layer.parentlayerids.forEach(id => {
        selectedLayerCounts[id] = {
          layerId,
          count: selectedLayerCounts[id].count - selectedLayerCounts[layerId].count
        };
      });
    }
    selectedLayerCounts[layerId] = undefined;
    if (scls && scls.length) {
      scls.forEach(sl => {
        selectedLayerCounts[sl.layerid] = undefined;
      });
    }

    if(Object.values(selectedLayers).length > 0) {
      dispatch({
        type: SET_DRAWING_ENABLE,
        payload: true
      });
    } else {
      dispatch({
        type: SET_DRAWING_ENABLE,
        payload: false
      });
    }

    dispatch({
      type: SET_VISIBLE_LAYERS,
      payload: visibleLayers
    });

    dispatch({
      type: SET_SELECTED_LAYERS,
      payload: selectedLayers
    });
    dispatch({
      type: SET_SELECTED_LAYER_COUNT,
      payload: selectedLayerCounts
    });
    dispatch({
      type: SET_FILTER_LAYER,
      payload: filterLayers
    });
    dispatch({
      type: SET_MAP_LAYERS,
      payload: mapLayers
    });
    dispatch({
      type: SET_COMPARE_MAP_LAYERS,
      payload: compareMapLayers
    });
  }
}

/**
* @function
* @name removeAllSelectedLayers
* @description
* remove all selected layers
* @returns {layers}
*/

export const removeAllSelectedLayers = () => async (dispatch, getState) => {
  const {
    mapLayers,
    compareMapLayers,
    filterLayers
  } = getState().layers;
  const {
    map,
    compareMap
  } = getState().map;
  dispatch(setMap(map));
  mapLayers.forEach((e) => {
    map.removeLayer(e);
  });
  compareMapLayers.forEach((e) => {
    compareMap.removeLayer(e);
  });
  dispatch(setMap(map));
  dispatch({
    type: SET_VISIBLE_LAYERS,
    payload: []
  });
  dispatch({
    type: SET_MAP_LAYERS,
    payload: []
  });
  dispatch({
    type: SET_COMPARE_MAP_LAYERS,
    payload: []
  });
  dispatch({
    type: SET_SELECTED_LAYERS,
    payload: {}
  });
  dispatch({
    type: SET_SELECTED_LAYER_COUNT,
    payload: {}
  });

  // hide layer if added seprately for adjust opacity
  Object.keys(filterLayers).forEach(layerId => {
    if (filterLayers[layerId]) {
      mapLayers.forEach(e => {
        if (e.get('title') === layerId) {
          e.setVisible(false)
        }
      });
      compareMapLayers.forEach(e => {
        if (e.get('title') === layerId) {
          e.setVisible(false)
        }
      });
      filterLayers[layerId].isLocked = false;
    }
  });
  dispatch({
    type: SET_FILTER_LAYER,
    payload: filterLayers
  });
  dispatch({
    type: SET_DRAWING_ENABLE,
    payload: false
  })
}

/**
* @function
* @name handleFilterLock
* @description
* handle the opacity filter lock
* @param {Object} {data} layer data
* @returns {locked layers}
*/

export const handleFilterLock = (layerId, isLocked, opacity, layer) => async (dispatch, getState) => {
  const {
    filterLayers,
  } = getState().layers;
  if (filterLayers[layerId]) {
    filterLayers[layerId].isLocked = isLocked;
    dispatch({
      type: SET_FILTER_LAYER,
      payload: filterLayers
    });
  } else {
    dispatch(handleLayerOpacity(layer, opacity, isLocked))
  }
}

/**
* @function
* @name hideSelectedLayer
* @description
* hhide the selected layer
* @param {Object} {data} layer data
* @returns {layers}
*/

export const hideSelectedLayer = (selectedLayer) => async (dispatch, getState) => {
  let {
    visibleLayers,
    selectedLayers,
    selectedLayerCounts,
    mapLayers,
    compareMapLayers,
    filterLayers
  } = getState().layers;

  const parentLayerId = selectedLayer.parentlayerids[0];
  const e = mapLayers.find(e => e.get('title') === parentLayerId);
  const ce = compareMapLayers.find(e => e.get('title') === parentLayerId);
  let isRemoveLayer = false;
  if (e) {
    if(selectedLayer.groupname) {
      const eParams = removeGeoLayerFromSource(e.getSource().getParams(), selectedLayer.groupname);
      e.getSource().updateParams(eParams);
      const ceParams = removeGeoLayerFromSource(ce.getSource().getParams(), selectedLayer.groupname);
      ce.getSource().updateParams(ceParams);
      if (eParams.LAYERS === '') {
        isRemoveLayer = true;
        const {
          map,
          compareMap
        } = getState().map;
        map.removeLayer(e);
        compareMap.removeLayer(ce);
        dispatch(setMap(map));
      }
    } else {
      const eParams = removeLayerFromSource(e.getSource().getParams(), selectedLayer.id);
      e.getSource().updateParams(eParams);
      const ceParams = removeLayerFromSource(ce.getSource().getParams(), selectedLayer.id);
      ce.getSource().updateParams(ceParams);
      if (eParams.layers === 'show:-1') {
        isRemoveLayer = true;
        const {
          map,
          compareMap
        } = getState().map;
        map.removeLayer(e);
        compareMap.removeLayer(ce);
        dispatch(setMap(map));
      }
    }
  }

  if (isRemoveLayer) {
    mapLayers = mapLayers.filter(e => e.get('title') !== parentLayerId);
    compareMapLayers = compareMapLayers.filter(e => e.get('title') !== parentLayerId);
  }

  // remove layer if added seprately for adjust opacity
  if (filterLayers[selectedLayer.layerid]) {
    mapLayers.forEach(e => {
      if (e.get('title') === selectedLayer.layerid) {
        e.setVisible(false)
      }
    });
    compareMapLayers.forEach(e => {
      if (e.get('title') === selectedLayer.layerid) {
        e.setVisible(false)
      }
    });
  }

  let filteredVisibleLayers = [];
  //remove from visible layers
  filteredVisibleLayers = visibleLayers.filter(l => l !== selectedLayer.layerid);
  //remove from selectedLAyers
  delete selectedLayers[selectedLayer.layerid];
  //set selectedLayerCounts
  selectedLayer.parentlayerids.forEach(layerId => {
    let sl = selectedLayerCounts[layerId];
    if (sl) {
      sl.count = sl.count - 1;
    }
  })
  dispatch({
    type: SET_VISIBLE_LAYERS,
    payload: filteredVisibleLayers
  });
  dispatch({
    type: SET_SELECTED_LAYERS,
    payload: selectedLayers
  });
  dispatch({
    type: SET_MAP_LAYERS,
    payload: mapLayers
  });
  dispatch({
    type: SET_COMPARE_MAP_LAYERS,
    payload: compareMapLayers
  });
}

/**
* @function
* @name showSearchLayer
* @description
* show the layre by search key
* @param {Object} {data} layer data
* @returns {layer}
*/

export const showSearchLayer = (selectedLayer) => async (dispatch, getState) => {
  const {
    visibleLayers,
    selectedLayers,
    selectedLayerCounts,
    mapLayers,
    compareMapLayers,
    filterLayers,
    opacity,
    allLayers
  } = getState().layers;
  // console.log('selectedLayer', selectedLayer)

  const {
    layerid,
    groupname
  } = selectedLayer;

  const parentLayerId = selectedLayer.parentlayerids[0];
  const e = mapLayers.find(e => e.get('title') === parentLayerId);
  const ce = compareMapLayers.find(e => e.get('title') === parentLayerId);
  const layerDefs = await dispatch(getLayerDefination([layerid, ...visibleLayers.filter(v => v.includes(parentLayerId))]));
  if (filterLayers[layerid]) {
    mapLayers.forEach(e => {
      if (e.get('title') === selectedLayer.layerid) {
        e.setVisible(true)
      }
    });
    compareMapLayers.forEach(e => {
      if (e.get('title') === selectedLayer.layerid) {
        e.setVisible(true)
      }
    });
    dispatch({
      type: SET_MAP_LAYERS,
      payload: mapLayers
    });
    dispatch({
      type: SET_COMPARE_MAP_LAYERS,
      payload: compareMapLayers
    });
    
  } else {
    if(groupname) {
      if (e) {
        const allLayersForMainParent = allLayers.filter(l => l.parentlayerids.includes(parentLayerId) && l.sublayerids === null);
        const allNames = allLayersForMainParent.map(l => l.groupname);
        const eParams = addGeoLayerToSource(e.getSource().getParams(), groupname, null, allNames);
        const ceParams = addGeoLayerToSource(ce.getSource().getParams(), groupname, null, allNames);
        e.getSource().updateParams(eParams);
        ce.getSource().updateParams(ceParams);
      } else {
        const {
          map,
          compareMap
        } = getState().map;
        const [l, cl] = createGeoLayer(selectedLayer, parentLayerId, opacity);
        map.addLayer(l);
        compareMap.addLayer(cl);
        dispatch(setMap(map));
        mapLayers.push(l);
        compareMapLayers.push(cl);
        handleLayerLoader(l.getSource(), dispatch, getState);
      }
    } else {
      if (e) {
        const eParams = addLayerToSource(e.getSource().getParams(), selectedLayer.id);
        eParams.layerDefs = layerDefs;
        e.getSource().updateParams(eParams);
        const ceParams = addLayerToSource(ce.getSource().getParams(), selectedLayer.id);
        ceParams.layerDefs = layerDefs;
        ce.getSource().updateParams(ceParams);
      } else {
        const {
          map,
          compareMap
        } = getState().map;
        const [l, cl] = createLayer(selectedLayer, parentLayerId, opacity, null, layerDefs);
        handleLayerLoader(l.getSource(), dispatch, getState);
        map.addLayer(l);
        compareMap.addLayer(cl);
        dispatch(setMap(map));
        mapLayers.push(l);
        compareMapLayers.push(cl);
        dispatch({
          type: SET_MAP_LAYERS,
          payload: mapLayers
        });
        dispatch({
          type: SET_COMPARE_MAP_LAYERS,
          payload: compareMapLayers
        });
      }
    }
  }

  if (!visibleLayers.includes(layerid)) {
    visibleLayers.push(layerid);
    let sl = selectedLayers[layerid];
    if (!sl) {
      selectedLayers[layerid] = {
        layerId: layerid,
        name: selectedLayer.name,
        groupname: selectedLayer.groupname,
        url: selectedLayer.url,
        id: selectedLayer.id,
        extent: selectedLayer.extent,
        minScale: selectedLayer.minscale,
        maxScale: selectedLayer.maxscale,
        maxscaledenominator: selectedLayer.MaxScaleDenominator,
        export: selectedLayer.export,
        type: selectedLayer.type,
        projection: selectedLayer.projection,
      }
    }

    addSelectedLayersCount(selectedLayer.layerid, selectedLayerCounts);
    dispatch({
      type: SET_VISIBLE_LAYERS,
      payload: visibleLayers
    });
    dispatch({
      type: SET_SELECTED_LAYERS,
      payload: selectedLayers
    });
    dispatch({
      type: SET_SELECTED_LAYER_COUNT,
      payload: selectedLayerCounts
    });
  }
  return true;
}

export const setActiveSubMenu = (layerId) => async (dispatch, getState) => {
  let arr = getState().layers.activeSubMenu;
  const index = arr.findIndex(l => l === layerId);
  if (index !== -1) {
    arr.splice(index, arr.length - index);
  } else {
    arr = getLayerParentIds(layerId);
    arr.push(layerId);
  }
  dispatch({
    type: SET_ACTIVE_SUB_MENU,
    payload: arr
  });
}

export const setCurrentScale = (scale) => async (dispatch, getState) => {
  dispatch({
    type: SET_CURRENT_SCALE,
    payload: scale
  });
}

export const setActiveSelectedLayer = (activeSelectedLayer) => async (dispatch, getState) => {
  dispatch({
    type: SET_ACTIVE_SELECTED_LAYER,
    payload: activeSelectedLayer
  })
}

export const resetActiveSubMenu = () => async (dispatch) => {
  dispatch({
    type: SET_ACTIVE_SUB_MENU,
    payload: []
  })
}

// export const layersCsvData = ({
//   url,
//   id
// }) => async (dispatch) => {
//   try {
//     const data = {
//       where: '1=1',
//       returnGeometry: false,
//       returnTrueCurves: false,
//       outFields: '*',
//       f: `json`,
//       ...getTokenObj(url)
//     }

//     let res = [];
//     let fields = null;
//     const getResult = async (offset = 0) => {
//       data.resultOffset = offset;
//       // console.log();
//       const results = await superagent.post(`${url}/${id}/query`).send(data).set({
//         'Content-Type': 'application/x-www-form-urlencoded',
//       });

//       const {
//         features,
//         fields: fieldsData,
//         exceededTransferLimit
//       } = JSON.parse(results.text);
//       res = [...res, ...features];
//       fields = fieldsData;

//       if (exceededTransferLimit) {
//         return getResult(res.length);
//       }
//       return res;
//     }
//     await getResult();
//     const features = res.map(feature => {
//       const obj = {};
//       fields.forEach(f => {
//         obj[f.alias] = feature.attributes[f.name]
//       })
//       return obj;
//     })
//     return features;
//   } catch {}
// }

export const emptyLayersCsvData = () => async (dispatch) => {
  dispatch({
    type: EXPORT_LAYERS_CSV_DATA,
    payload: []
  })
}

/**
* @function
* @name handleLayerOpacity
* @description
* handle layer opcaity
* @param {Object} {data} layer data
* @returns {layer with opacity}
*/

export const handleLayerOpacity = (layer, opacity, isLocked = false) => async (dispatch, getState) => {
  const {
    layerId,
    groupname
  } = layer;
  const {
    filterLayers,
    mapLayers,
    compareMapLayers,
    // tocFilters,
    // opacity
  } = getState().layers;

  // begin new code transparency bar
  if (!filterLayers[layerId]) {
    // add layer seprately
    const {
      map,
      compareMap
    } = getState().map;
    if(groupname) {
      const [l, cl] = createGeoLayer(layer, layerId, opacity, null);
      const eParams = l.getSource().getParams();
      l.getSource().updateParams(eParams);
      handleLayerLoader(l.getSource(), dispatch, getState);
      map.addLayer(l);
      compareMap.addLayer(cl);
      dispatch(setMap(map));
      mapLayers.push(l);
      compareMapLayers.push(cl);

      // remove layer from group
      const parentLayerId = getLayerParentIds(layerId)[0];
      // console.log('parentLayerId', parentLayerId, layer);
      mapLayers.forEach((e) => {
        const title = e.get('title');
        if (title === parentLayerId) {
          const eParams = removeGeoLayerFromSource(e.getSource().getParams(), layer.groupname);
          e.getSource().updateParams(eParams);
        }
      });
      compareMapLayers.forEach((e) => {
        const title = e.get('title');
        if (title === parentLayerId) {
          const eParams = removeGeoLayerFromSource(e.getSource().getParams(), layer.groupname);
          e.getSource().updateParams(eParams);
        }
      });
    } else {
      const layerDefs = await dispatch(getLayerDefination([layerId]))
      const [l, cl] = createLayer(layer, layerId, opacity, null, layerDefs);
      const eParams = l.getSource().getParams();
      eParams.layerDefs = layerDefs;
      l.getSource().updateParams(eParams);
      handleLayerLoader(l.getSource(), dispatch, getState);
      map.addLayer(l);
      compareMap.addLayer(cl);
      dispatch(setMap(map));
      mapLayers.push(l);
      compareMapLayers.push(cl);

      // remove layer from group
      const parentLayerId = getLayerParentIds(layerId)[0];
      // console.log('parentLayerId', parentLayerId, layer);
      mapLayers.forEach((e) => {
        const title = e.get('title');
        if (title === parentLayerId) {
          const eParams = removeLayerFromSource(e.getSource().getParams(), layer.id);
          e.getSource().updateParams(eParams);
        }
      });
      compareMapLayers.forEach((e) => {
        const title = e.get('title');
        if (title === parentLayerId) {
          const eParams = removeLayerFromSource(e.getSource().getParams(), layer.id);
          e.getSource().updateParams(eParams);
        }
      });
    }

    // add to filter array
    filterLayers[layerId] = {
      layerId,
      opacity,
      isLocked
    };
  } else {
    filterLayers[layerId].opacity = opacity;
  }
  // end new code transparency bar

  mapLayers.forEach((e) => {
    if (e.get('title') === layerId) {
      e.setOpacity(opacity);
    }
  });
  compareMapLayers.forEach((e) => {
    if (e.get('title') === layerId) {
      e.setOpacity(opacity);
    }
  });

  dispatch({
    type: SET_MAP_LAYERS,
    payload: mapLayers
  });
  dispatch({
    type: SET_COMPARE_MAP_LAYERS,
    payload: compareMapLayers
  });
  dispatch({
    type: SET_FILTER_LAYER,
    payload: filterLayers
  });
}

export const filterLayerOld = (layer, filterData) => async (dispatch, getState) => {
  const {
    key: layerId,
    id
  } = layer;
  const {
    filterLayers,
    mapLayers,
    tocFilters,
    geometryCondition
  } = getState().layers;
  const {
    layerFilterData,
    tocGeometry
  } = getState().tocData;
  let e;
  if (filterLayers[layerId]) {
    e = mapLayers.find(e => e.get('title') === layerId);
  } else {
    const parentLayerId = getLayerParentIds(layerId)[0];
    // console.log('parentLayerId', parentLayerId);
    e = mapLayers.find(e => e.get('title') === parentLayerId);
  }
  // console.log(tocGeometry, '----here is the geometrty ')
  if (e) {
    const {
      fieldsData
    } = getState().tocData;
    let stringToProcess = [];
    const eParams = e.getSource().getParams();
    layerFilterData && layerFilterData.forEach(filterDatainLoop => {
      let string = '';
      const {
        name,
        value,
        type,
        fieldType,
        isRange,
        minRange,
        maxRange
      } = filterDatainLoop;

      if (
        fieldType === 'esriFieldTypeOID' || fieldType === 'esriFieldTypeDouble' ||
        fieldType === 'esriFieldTypeInteger' || fieldType === 'esriFieldTypeSmallInteger' ||
        fieldType === 'esriFieldTypeSingle'
      ) {
        if (isRange) {
          if (type === 'showInRange') {
            string = `${fieldsData[name]} >= ${minRange} AND ${fieldsData[name]} <= ${maxRange}`;
          } else {
            string = `${fieldsData[name]} < ${minRange} OR ${fieldsData[name]} > ${maxRange}`;
          }
        } else {
          if (type === 'differ') {
            string = `${fieldsData[name]} <> ${value}`;
          } else if (type === 'less') {
            string = `${fieldsData[name]} <= ${value}`;
          } else if (type === 'greater') {
            string = `${fieldsData[name]} >= ${value}`;
          } else {
            string = `${fieldsData[name]} = ${value}`;
          }
        }
      } else if (fieldType === 'esriFieldTypeDate') {
        if (isRange) {
          if (type === 'showInRange') {
            string = `${fieldsData[name]} >= ${minRange} AND ${fieldsData[name]} <= ${maxRange}`;
          } else {
            string = `${fieldsData[name]} < ${minRange} OR ${fieldsData[name]} > ${maxRange}`;
          }
        } else {
          if (type === 'differ') {
            string = `${fieldsData[name]} <> ${value}`;
          } else if (type === 'less') {
            string = `${fieldsData[name]} < ${value}`;
          } else if (type === 'greater') {
            string = `${fieldsData[name]} > ${value}`;
          } else {
            string = `${fieldsData[name]} = ${value}`;
          }
        }
      } else if (fieldType === 'esriFieldTypeString') {
        if (type === 'differ') {
          string = `${fieldsData[name]}<>'${value}'`;
        } else {
          string = `${fieldsData[name]}='${value}'`;
        }
      }
      stringToProcess.push(string);
    })
    let string = '';

    if (tocGeometry.type !== "") {
      stringToProcess.push(geometryCondition);
      // console.log(geometryCondition, '-----print the value for the condition here');
      string = stringToProcess.reduce((a, c) => `${a} AND ${c}`);
      string = `${id}: ${string}`;
    } else {
      string = stringToProcess.reduce((a, c) => `${a} AND ${c}`);
      string = `${id}: ${string}`;
    }
    //console.log(string, '----print the value opf string');
    eParams.layerDefs = string;
    if (eParams.layerDefs) {
      tocFilters[layerId] = eParams.layerDefs;
    }
    e.getSource().updateParams(eParams);
    dispatch({
      type: SET_MAP_LAYERS,
      payload: mapLayers
    });
    dispatch({
      type: SET_TOC_FILTER,
      payload: tocFilters
    });
  }
}

export const filterLayer = (layer) => async (dispatch, getState) => {
  const {
    layerId
  } = layer;
  const {
    filterLayers,
    mapLayers,
    visibleLayers
  } = getState().layers;
  let e;

  const parentLayerId = getLayerParentIds(layerId)[0];
  if (filterLayers[layerId]) {
    e = mapLayers.find(e => e.get('title') === layerId);
  } else {
    e = mapLayers.find(e => e.get('title') === parentLayerId);
  }

  if (e) {
    const layerDefs = await dispatch(getLayerDefination(visibleLayers.filter(v => v.includes(parentLayerId))));
    const eParams = e.getSource().getParams();
    eParams.layerDefs = layerDefs;
    e.getSource().updateParams(eParams);
    dispatch({
      type: SET_MAP_LAYERS,
      payload: mapLayers
    });
  }
}

export const clearLayerFilter = (layer) => async (dispatch, getState) => {
  const {
    key: layerId
  } = layer;
  const {
    filterLayers,
    mapLayers
  } = getState().layers;

  let e;
  if (filterLayers[layerId]) {
    e = mapLayers.find(e => e.get('title') === layerId);
  } else {
    const parentLayerId = getLayerParentIds(layerId)[0];
    e = mapLayers.find(e => e.get('title') === parentLayerId);
  }

  if (e) {
    const eParams = e.getSource().getParams();
    delete eParams.layerDefs;
    delete eParams.spatialFilter;
    delete eParams.clipping;
    e.getSource().updateParams(eParams);
  }

  dispatch({
    type: SET_MAP_LAYERS,
    payload: mapLayers
  });
}

export const layerDrawingFilter = () => (dispatch, getState) => {
  const objectIds = getState().tocData.drawingObjectIds;
  const layer = getState().tocData.selectedLayerToc;
  const OIDName = getState().tocData.OIDName;
  const {
    key: layerId,
    id
  } = layer;
  const {
    filterLayers,
    mapLayers,
    tocFilters
  } = getState().layers;
  let e;
  if (filterLayers[layerId]) {
    e = mapLayers.find(e => e.get('title') === layerId);
  } else {
    const parentLayerId = getLayerParentIds(layerId)[0];
    e = mapLayers.find(e => e.get('title') === parentLayerId);
  }
  if (e && objectIds && objectIds.length) {
    const eParams = e.getSource().getParams();
    eParams.layerDefs = `${id}:  ${OIDName} in (${objectIds.join(',')})`;
    let geometryCondition = `${OIDName} in (${objectIds.join(',')})`
    tocFilters[layerId] = eParams.layerDefs;
    e.getSource().updateParams(eParams);
    dispatch({
      type: SET_TOC_FILTER,
      payload: tocFilters
    });
    dispatch({
      type: SET_GEOMETRY_CONDITION,
      payload: geometryCondition
    });
  }
}

/**
* @function
* @name handleLayerLoader
* @description
* handle layer loader
* @param {Object} {data} source data
* @returns {loader}
*/
export const handleLayerLoader = (source, dispatch, getState) => {
  let i = 0,
    j = 0;
  source.on('imageloadstart', () => {
    if (i === 0) {
      dispatch({
        type: SET_LOADING,
        payload: 60
      });
    }
    i++;
  });
  source.on('imageloadend', () => {
    j++;
    const loading = getState().basemap.loading;
    dispatch({
      type: SET_LOADING,
      payload: loading < 100 ? loading + 5 : loading
    });
    if (i === j) {
      i = 0;
      j = 0;
      dispatch({
        type: SET_LOADING,
        payload: 100
      });
      setTimeout(() => {
        dispatch({
          type: SET_LOADING,
          payload: 0
        });
      }, 1000)
    }
  });
}

/**
 * @function
 * @name fetchAllLayersDataByParentId
 * @description
 * fetch all the layer by parentId
 * @param {Object} {parentId} parentId
 * @returns {layers}
 */

export const fetchAllLayersDataByParentId = (parentId) => async (dispatch, getState) => {
  try {
    const {
      allLayers,
      loadingLayerIds,
      fetchLayerParentId
    } = getState().layers;
    // console.log("fetchLayerParentId", fetchLayerParentId);
    if (fetchLayerParentId.includes(parentId)) {
      return allLayers;
    }
    const layersToFetch = allLayers.filter(l => l.parentlayerids.includes(parentId));

    const newLoadingLayerIds = [...loadingLayerIds, ...layersToFetch.map(l => l.layerid)];
    await dispatch({
      type: SET_LOADING_LAYER_IDS,
      payload: newLoadingLayerIds
    });
    dispatch({
      type:SET_FETCH_LAYER_PARENT_ID,
      payload: [...fetchLayerParentId, parentId]
    })

    await Promise.all(layersToFetch.map(async (layer) => {
      if (layer.groupname) {
        const middlewareData = {
          api: {
            type: layer.type,
            url: layer.url
          },
          apiNameSpace: layer.groupname.split(':')[0]
        }
        await createLayer_MIDDLEWARE(middlewareData);
      } else {
        const middlewareData = {
          api: {
            type: layer.type,
            url: layer.url,
            id: layer.id
          },
          findByParent: true,
        }
        const res = await createLayer_MIDDLEWARE(middlewareData);
        const layerData = JSON.parse(res.text);
        if (!layerData.error) {
          const layerIndex = allLayers.findIndex(l => l.layerid === layer.layerid);
          allLayers[layerIndex].extent = layerData.extent;
          allLayers[layerIndex].fields = layerData.fields;
          allLayers[layerIndex].uniquefield = layerData.drawingInfo ? layerData.drawingInfo.renderer.field1 : '';
          // allLayers[layerIndex].version = layerData.currentVersion;
          // console.log('allLayers[layerIndex].uniquefield', allLayers[layerIndex]);
        }
      }
    }));

    await dispatch({
      type: SET_LOADING_LAYER_IDS,
      payload: getState().layers.loadingLayerIds.filter(li => !newLoadingLayerIds.includes(li))
    });
    await dispatch({
      type: SET_ALL_LAYERS,
      payload: allLayers
    });
    return allLayers;
  } catch (err) {
    console.log("err", err);
  }
}

/**
 * @function
 * @name setFilterMenuActive
 * @description
 * set the filter menu active
 * @param {Object} {menuId} parentId
 * @returns {menuId}
 */

export const setFilterMenuActive = (value) => (dispatch) => {
  dispatch({
    type: SET_ACTIVE_FILTER_MENU,
    payload: value
  })
}
