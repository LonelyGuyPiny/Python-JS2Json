// import superagent from 'superagent';
import Group from 'ol/layer/Group';
// import XYZ from "ol/source/XYZ";
// import tileGrid from "ol/tilegrid/TileGrid";

// import WMTS, { optionsFromCapabilities } from "ol/source/WMTS";
// import WMTSCapabilities from "ol/format/WMTSCapabilities";

// import {
//   ImageArcGISRest,
//   // OSM
// } from 'ol/source';
import {
  Image as ImageLayer,
  // Tile as TileLayer
} from 'ol/layer';

// import {
//   getTokenObj
// } from '../../utils/common';
import basemapList from '../../config/basemaps';
import { settings } from '../../config/settings';
import { createBasemap_MIDDLEWARE } from '../../middlewares/basemaps/basemap_middleware';

// const parser = new WMTSCapabilities();

const SET_BASEMAP = 'basemap/SET_BASEMAP';
const SET_BASEMAP_LAYER = 'basemap/SET_BASEMAP_LAYER';
const SET_COMPARE_LAYER = 'basemap/SET_COMPARE_LAYER';
const SET_COMPAREM_MAP = 'basemap/SET_COMPAREM_MAP';
const SET_COMPARE_TYPE = 'basemap/SET_COMPARE_TYPE';
const SET_COMPARE_MAP_TYPE = 'basemap/SET_COMPARE_MAP_TYPE';
const SET_BASEMAP_LAYERS = 'basemap/SET_BASEMAP_LAYERS';
const SET_BASEMAP_TYPE = 'basemap/SET_BASEMAP_TYPE';
export const SET_LOADING = 'basemap/SET_LOADING';
const SET_LABEL_LAYER = 'basemap/SET_LABEL_LAYER';
const SET_COMPARE_LABEL_LAYER = 'basemap/SET_COMPARE_LABEL_LAYER';
const SET_LABEL_LAYER_VISIBLE = 'basemap/SET_LABEL_LAYER_VISIBLE';
const SET_BASEMAP_VISIBLE = 'basemap/SET_BASEMAP_VISIBLE';
const SET_UNAVAILABLE_BASEMAP = 'basemap/SET_UNAVAILABLE_BASEMAP';
const SET_BASEMAP_LOADING = 'basemap/SET_BASEMAP_LOADING';


const {
  default_basemap
} = basemapList;

const layers = [];
let defaultBasemapType = 'VECTOR';

const initialState = {
  list: basemapList,
  basemapLayers: null,
  isBasemapVisible: true,
  selectedBasemap: default_basemap,
  selectedCompareMap: null,
  selectedCompareLayer: null,
  selectedCompareType: 'SHARED_VIEW', // SWIPE | SHARED_VIEW
  selectedCompareBasemapType: null,
  selectedBasemapLayer: null,
  loading: 0,
  isBasemapLoading: false,
  labelLayer: null,
  cLabelLayer: null,
  islabelLayer: basemapList && basemapList.labelmap && basemapList.labelmap.defaultStatus ? true : false,
  basemapType: defaultBasemapType,
  isLabels: basemapList && basemapList.labelmap ? true : false,
  isMapComparison: settings.isMapComparison,
  unavailableBaseMaps: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_BASEMAP:
      return {
        ...state, selectedBasemap: action.payload
      };
    case SET_BASEMAP_LAYER:
      return {
        ...state, selectedBasemapLayer: action.payload
      };
    case SET_COMPAREM_MAP:
      return {
        ...state, selectedCompareMap: action.payload
      };
    case SET_COMPARE_LAYER:
      return {
        ...state, selectedCompareLayer: action.payload
      };
    case SET_COMPARE_TYPE:
      return {
        ...state, selectedCompareType: action.payload
      };
    case SET_COMPARE_MAP_TYPE:
      return {
        ...state, selectedCompareBasemapType: action.payload
      };
    case SET_BASEMAP_LAYERS:
      return {
        ...state, basemapLayers: action.payload
      };
    case SET_LOADING:
      return {
        ...state, loading: action.payload
      };
    case SET_BASEMAP_LOADING:
      return {
        ...state, isBasemapLoading: action.payload
      };
    case SET_LABEL_LAYER:
      return {
        ...state, labelLayer: action.payload
      };
    case SET_COMPARE_LABEL_LAYER:
      return {
        ...state, cLabelLayer: action.payload
      };
    case SET_LABEL_LAYER_VISIBLE:
      return {
        ...state, islabelLayer: action.payload
      };
    case SET_BASEMAP_VISIBLE:
      return {
        ...state, isBasemapVisible: action.payload
      };
    case SET_BASEMAP_TYPE:
      return {
        ...state, basemapType: action.payload
      };
    case SET_UNAVAILABLE_BASEMAP:
      return {
        ...state, unavailableBaseMaps: action.payload
      }
    default:
      return state;
  }
}

/**
* @function
* @name setLabelsVisible
* @description
* show hide label for basemap layer
* @param {Object} {basemap} basemap Object
* @returns {label}
*/
export const setLabelsVisible = (islabelLayer, onBasemapChange = false) => async (dispatch, getState, api) => {
  if (getState().basemap.isLabels) {
    const { labelLayer, cLabelLayer } = getState().basemap;
    labelLayer.setVisible(islabelLayer);
    cLabelLayer.setVisible(islabelLayer);
    if (!onBasemapChange) {
      dispatch({
        type: SET_LABEL_LAYER_VISIBLE,
        payload: islabelLayer
      });
    }
    dispatch({
      type: SET_LABEL_LAYER,
      payload: labelLayer
    });
    dispatch({
      type: SET_COMPARE_LABEL_LAYER,
      payload: cLabelLayer
    });
  }
}

// set label layer
// export const setLabelLayer = (labelLayer) => async (dispatch, getState, api) => {
//   dispatch({
//     type: SET_LABEL_LAYER,
//     payload: labelLayer
//   });
// }

/**
* @function
* @name createLabelLayer
* @description
* create label for basemap layer
* @param {Object} {basemap} basemap Object
* @returns {label}
*/
export const createLabelLayer = () => async (dispatch, getState, api) => {
  if (getState().basemap.isLabels && basemapList.labelmap) {
    const url = `${basemapList.labelmap.url}`;
    const labelMapData = {
      source: basemapList.labelmap.type,
      url
    }
    // const source = new ImageArcGISRest({
    //   url: url,
    //   ratio: 1,
    //   crossOrigin: "include",
    //   params: {
    //     FORMAT: 'PNG8',
    //     dpi: 96,
    //     ...getTokenObj(url)
    //   }
    // });

    const source = await createBasemap_MIDDLEWARE(labelMapData)
    handleLayerLoader(source, dispatch, getState);
    const layerObj = {
      source,
      visible: false,
      zIndex: 2,
      // opacity: 0.2
    };
    const labelLayer = new ImageLayer(layerObj)
    const cLabelLayer = new ImageLayer({ ...layerObj, zIndex: 4 })
    dispatch({
      type: SET_LABEL_LAYER,
      payload: labelLayer
    });
    dispatch({
      type: SET_COMPARE_LABEL_LAYER,
      payload: cLabelLayer
    });
    return [labelLayer, cLabelLayer];
  }
  return false;
};

/**
* @function
* @name setBasemap
* @description
* set the basemap layer
* @param {Object} {basemap} basemap Object
* @returns {basemap}
*/
export const setBasemap = (basemap, basemapType) => async (dispatch, getState, api) => {
  if (basemap) {
    dispatch({
      type: SET_BASEMAP,
      payload: basemap
    });
    const {
      basemapLayers,
      selectedBasemapLayer,
      basemapType: type,
      islabelLayer,
      selectedCompareMap
    } = getState().basemap;
    const { map } = getState().map;
    basemapLayers.getLayers().forEach((e) => {
      const isBasemap = e.get('title') === basemap;
      const isCompareMap = e.get('title') === selectedCompareMap;
      e.setVisible(isBasemap || isCompareMap);
      if (isBasemap) {
        e.setZIndex(1);
        dispatch({
          type: SET_BASEMAP_LAYER,
          payload: e
        });
        const source = e.getSource();
        handleLayerLoader(source, dispatch, getState);
        map.removeLayer(selectedBasemapLayer);
        map.removeLayer(e);
        map.addLayer(e);
      }
    });
    if (type !== basemapType) {
      dispatch({
        type: SET_BASEMAP_TYPE,
        payload: basemapType
      });
      dispatch(setLabelsVisible(basemapType === 'ARIAL' && islabelLayer, true))
    }
  }
};

/**
* @function
* @name setCompareBasemap
* @description
* set the comapre basemap layer
* @param {Object} {basemap} basemap Object
* @returns {basemap}
*/

export const setCompareBasemap = (basemap = null, compareBasemapType = null) => async (dispatch, getState, api) => {
  dispatch({
    type: SET_COMPAREM_MAP,
    payload: basemap
  });
  dispatch({
    type: SET_COMPARE_MAP_TYPE,
    payload: compareBasemapType
  });
  if (basemap) {
    const {
      basemapLayers,
      selectedBasemap
    } = getState().basemap;
    basemapLayers.getLayers().forEach((e) => {
      const isBasemap = e.get('title') === selectedBasemap
      const isCompareMap = e.get('title') === basemap;
      e.setVisible(isBasemap || isCompareMap);
      if (isCompareMap) {
        e.setZIndex(3);
        dispatch({
          type: SET_COMPARE_LAYER,
          payload: e
        });
        const source = e.getSource();
        handleLayerLoader(source, dispatch, getState);
      }
      if (isBasemap) {
        e.setZIndex(1);
      }
    });
  } else {
    const {
      basemapLayers,
      selectedBasemap
    } = getState().basemap;
    basemapLayers.getLayers().forEach((e) => {
      const isBasemap = e.get('title') === selectedBasemap;
      e.setVisible(isBasemap);
    });
  }
};

/**
* @function
* @name setCompareBasemapType
* @description
* set basemap type
* @param {Object} {type} basemap type
* @returns {type}
*/
export const setCompareBasemapType = (type) => async (dispatch, getState, api) => {
  dispatch({
    type: SET_COMPARE_TYPE,
    payload: type
  });
}

/**
* @function
* @name setBasemapVisible
* @description
* set basemap layers
* @param {Object} {state} basemap state
* @returns {state}
*/

export const setBasemapVisible = (isBasemapVisible) => async (dispatch, getState, api) => {
  const {
    islabelLayer,
    basemapType: type
  } = getState().basemap;
  if (islabelLayer) {
    dispatch(setLabelsVisible(islabelLayer && isBasemapVisible && type === 'ARIAL', true));
  }
  dispatch({
    type: SET_BASEMAP_VISIBLE,
    payload: isBasemapVisible
  });
  const {
    basemapLayers,
    selectedBasemap: basemap,
    selectedCompareMap
  } = getState().basemap;
  basemapLayers.getLayers().forEach((e) => {
    e.setVisible((e.get('title') === basemap || e.get('title') === selectedCompareMap) && isBasemapVisible)
  });
}

/**
* @function
* @name createArealMaps
* @description
* create all the basemap layers
* @param {Object} {map} map object
* @returns {basemaps}
*/
export const createArealMaps = (map) => async (dispatch, getState, api) => {
  // create vector map layers
  dispatch({
    type: SET_BASEMAP_LOADING,
    payload: true
  });
  let vectorLayers = [];
  let unavailableBaseMaps = [];
  if (basemapList.basemaps && basemapList.basemaps.length > 0) {
    vectorLayers = await Promise.all(basemapList.basemaps.map(async y => {
      try {
        if (y.slug === default_basemap) {
          dispatch({
            type: SET_BASEMAP_TYPE,
            payload: 'VECTOR'
          })
        }

        const middlewareData = {
          source: y.type,
          url: y.url,
          slug: y.slug,
          defaultBasemap: default_basemap,
          projection: y.projection,
          attribution: y.attribution
        }

        const basemapData = await createBasemap_MIDDLEWARE(middlewareData);

        if(basemapData === y.slug) {
          unavailableBaseMaps.push(y.slug);
        } else {
          return basemapData;
        }

      } catch(err) {
        unavailableBaseMaps.push(y.slug)
      }
    }));
  }
  // create arialMaps layers
  let arialLayers = [];
  if (basemapList.arialmaps && basemapList.arialmaps.length > 0) {
    arialLayers = await Promise.all(basemapList.arialmaps.map(async y => {
      try {
        if (y.slug === default_basemap) {
          dispatch({
            type: SET_BASEMAP_TYPE,
            payload: 'ARIAL'
          })
        }

        const middlewareData = {
          source: y.type,
          url: y.url,
          slug: y.slug,
          defaultBasemap: default_basemap,
          projection: y.projection,
          layer: y.layer,
          attribution: y.attribution
        }

        const basemapData = await createBasemap_MIDDLEWARE(middlewareData);

        // console.log("basemapData", basemapData);

        if(basemapData === y.slug) {
          unavailableBaseMaps.push(y.slug);
        } else {
          return basemapData;
        }
      } catch(err) {
        unavailableBaseMaps.push(y.slug)
      }
    }));
  }

  [...vectorLayers, ...arialLayers].forEach(l => {
    if(l) {
      layers.push(l)
    }
  });
  // arialLayers.map(l => layers.push(l));
  layers.map(l => {
    if (l.get('title') === default_basemap && !unavailableBaseMaps.includes(default_basemap)) {
      map.addLayer(l);
      dispatch({
        type: SET_BASEMAP_LAYER,
        payload: l
      });
    } else if(l.get('title') === 'osm_map' && unavailableBaseMaps.includes(default_basemap)) {
      l.setVisible(true)
      map.addLayer(l);
      dispatch({
        type: SET_BASEMAP_LAYER,
        payload: l
      });
      dispatch({
        type: SET_BASEMAP,
        payload: 'osm_map'
      });
    }
    return l;
  })
  const basemapLayers = new Group({
    layers
  });

  dispatch({
    type: SET_UNAVAILABLE_BASEMAP,
    payload: unavailableBaseMaps
  });
  dispatch({
    type: SET_BASEMAP_LAYERS,
    payload: basemapLayers
  });
  dispatch({
    type: SET_BASEMAP_LOADING,
    payload: false
  })
  return basemapLayers;
}

/**
* @function
* @name handleLayerLoader
* @description
* handle loader for basemap layers
* @param {Object} {source} basemap source object
* @returns {state}
*/
export const handleLayerLoader = (source, dispatch, getState) => {
  let i = 0,
    j = 0;
  source.on('tileloadstart', () => {
    i++;
  });
  const fn = () => {
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
  };
  source.on('tileloadend', fn);
  source.on('tileloaderror', fn);
}
