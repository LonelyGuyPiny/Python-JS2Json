//#region Imports
// import superagent from 'superagent';
// import moment from 'moment';
import {
  getSearchDataForSpaital
} from './search';
import {
  filterLayer
} from './layers';
import {
  getQueryUrlForSpaital,
  fetchSearchQueryData
} from './urlQuery';
import {
  // getTokenForUrl,
  getTokenObj,
  // dateFunction,
  // downloadKMZFile,
  // createWhereCondition,
  compareValues
} from '../../utils/common';
// import {
//   transCordinates
// } from '../../utils/map'
import {
  createTocData_MIDDLEWARE,
  createTocLayerFields_MIDDLEWARE,
  fetchNextRecords_MIDDLEWARE,
  createFeature_MIDDLEWARE,
  createLinks_MIDDLEWARE,
  createDrawFeature_MIDDLEWARE,
  fetchAllRecords_MIDDLEWARE,
  createTocExport_MIDDLEWARE,
  createTocSorting_MIDDLEWARE,
  fetchCsvData_MIDDLEWARE,
  createCsvData_MIDDLEWARE,
  createFilterOptions_MIDDLEWARE,
  createFilterFeatures_MIDDLEWARE,
  createLayerDefinition_MIDDLEWARE,
  createSpatialIntersection_MIDDLEWARE,
  createLoadingFields_MIDDLEWARE,
  createCheckFieldType_MIDDLEWARE,
  createAllFetchedData_MIDDLEWARE,
  createWhereCondition_Middleware,
} from '../../middlewares/toc/toc_middleware';
import {
  createSpatialData_MIDDLEWARE,
  createReplacedSpatialData_MIDDLEWARE,
  createPopupSpatialData_MIDDLEWARE
} from '../../middlewares/spatialpopup/spatialpopup_middleware';
// import SOURCE from '../../middlewares/sources';
//#endregion

//#region Constants
const SET_FEATURES = 'toc/SET_FEATURES';
const SET_FEATURES_GEOMETRY = 'toc/SET_FEATURES_GEOMETRY';
const SET_ALL_FEATURES = 'toc/SET_ALL_FEATURES';
const SET_OBJECTID = 'toc/SET_OBJECTID';
const SET_GEOMETRY_TYPE = 'toc/SET_GEOMETRY_TYPE';
const SET_FIELDS = 'toc/SET_FIELDS';
const SET_VISIBLE_FIELDS = 'toc/SET_VISIBLE_FIELDS';
const SET_LOADING = 'toc/SET_LOADING';
const SET_TOTAL = 'toc/SET_TOTAL';
const SET_FILTER_TOTAL = 'toc/SET_FILTER_TOTAL';
const SET_LAYER = 'toc/SET_LAYER';
const SPATIAL_FILTER_STATE = 'toc/SPATIAL_FILTER_STATE';
const SET_FIELD_OPTIONS = 'toc/SET_FIELD_OPTIONS';
const SET_ALL_FETCHED = 'toc/SET_ALL_FETCHED';
const SET_FILTERS_DATA = 'toc/SET_FILTERS_DATA';
const SET_GEOMETRY_FILTER_DATA = 'toc/SET_GEOMETRY_FILTER_DATA';
const SET_FILTER_IDS = 'toc/SET_FILTER_IDS';
const SET_IS_FILTER = 'toc/SET_IS_FILTER';
const SET_SORTING = 'toc/SET_SORTING';
const SET_DRAWING_DATA = 'toc/SET_DRAWING_DATA';
const SET_FILTER_OPTIONS_LOADING = 'toc/SET_FILTER_OPTIONS_LOADING';
const SET_SELECTED_FEATURES = 'toc/SET_SELECTED_FEATURES';
const SET_LAYERS_DATA = 'toc/SET_LAYERS_DATA';
const SET_UPDATED_AT = 'toc/SET_UPDATED_AT';
const FLUSH_TOC_DATA = 'toc/FLUSH_TOC_DATA';
const AVERAGE_DATA_TOC = 'toc/AVERAGE_DATA_TOC'
const DRAWING_STATE = 'toc/DRAWING_STATE';
const SET_BUFFER_DATA = 'toc/SET_BUFFER_DATA';
const SET_SPAITAL_INT_SEC_DATA = 'toc/SET_SPAITAL_INT_SEC_DATA';
const SET_AUTO_FOCUS = 'toc/SET_AUTO_FOCUS';
const SET_BUFFER_IDS = 'toc/SET_BUFFER_IDS';
const SET_DRAW_POPUP = 'toc/SET_DRAW_POPUP';
const SET_DRAWING_TYPE = 'toc/SET_DRAWING_TYPE';
const SET_TOC_DRAWING = 'toc/SET_TOC_DRAWING';
const SET_POINT_POPUP = 'toc/SET_POINT_POPUP';
const SET_CURRENT_LINKS = 'toc/SET_CURRENT_LINKS';
const SET_CRS = 'toc/SET_CRS';
const SET_FILTER_LOADER = 'toc/SET_FILTER_LOADER';
const SET_INTERSECTION_POPUP = 'toc/SET_INTERSECTION_POPUP';
const SET_OLD_LAYER = 'toc/SET_OLD_LAYER';
const SET_POPUP_INTERSECTION = 'toc/SET_POPUP_INTERSECTION';
//#endregion

//#region Initial State
const initialState = {
  // new 
  tableLimit: 100,
  features: [],
  Allfeatures: [],
  featuresGeometry: {},
  fields: [],
  geometryType: null,
  visibleFields: [],
  loading: false,
  total: 0,
  filterTotal: null,
  tocLayer: null,
  isDrawingState: false,
  filterOptions: {},
  isAllFetched: false,
  updatedAt: Date.now(),
  filtersData: {},
  OBJECTID: null,
  geometry: null,
  filteredIds: null,
  isFilter: false,
  sorting: null,
  drawingState: null,
  drawingData: null,
  isFilterOptionsLoading: false,
  selectedFeatures: [],
  isAllFeaturesSelected: false,
  layersData: {},
  bufferData: null,
  spaitalIntSecData: null,
  isAutoFocus: false,
  bufferIds: null,
  drawPopup: false,
  setDrawingType: 'Box',
  setTocDraw: false,
  pointPopup: false,
  currentLinks: [],
  crs: {},
  filterLoader: [],
  fieldOptions: {},
  intersectionPopup: false,
  oldTocLayer: null,
  popupIntersection: false
};
//#endregion

//#region Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_UPDATED_AT:
      return {
        ...state, updatedAt: Date.now()
      };
    case SET_FEATURES:
      return {
        ...state, features: action.payload
      };
    case SET_ALL_FEATURES:
      return {
        ...state, allFeatures: action.payload
      };
    case SET_FEATURES_GEOMETRY:
      return {
        ...state, featuresGeometry: action.payload
      };
    case SET_FIELDS:
      return {
        ...state, fields: action.payload
      };
    case SET_OBJECTID:
      return {
        ...state, OBJECTID: action.payload
      };
    case SET_GEOMETRY_TYPE:
      return {
        ...state, geometryType: action.payload
      };
    case SET_VISIBLE_FIELDS:
      return {
        ...state, visibleFields: action.payload
      };
    case SET_LOADING:
      return {
        ...state, loading: action.payload
      };
    case SET_TOTAL:
      return {
        ...state, total: action.payload
      };
    case SET_FILTER_TOTAL:
      return {
        ...state, filterTotal: action.payload
      };
    case SET_LAYER:
      return {
        ...state, tocLayer: action.payload
      };
    case SPATIAL_FILTER_STATE:
      return {
        ...state, isDrawingState: action.payload
      };
    case SET_FIELD_OPTIONS:
      return {
        ...state, fieldOptions: action.payload
      };
    case SET_ALL_FETCHED:
      return {
        ...state, isAllFetched: action.payload
      };
    case SET_FILTERS_DATA:
      return {
        ...state, filtersData: action.payload
      };
    case SET_GEOMETRY_FILTER_DATA:
      return {
        ...state, geometry: action.payload
      };
    case SET_FILTER_IDS:
      return {
        ...state, filteredIds: action.payload
      };
    case SET_IS_FILTER:
      return {
        ...state, isFilter: action.payload
      };
    case SET_SORTING:
      return {
        ...state, sorting: action.payload
      };
    case DRAWING_STATE:
      return {
        ...state, drawingState: action.payload
      };
    case SET_DRAWING_DATA:
      return {
        ...state, drawingData: action.payload
      };
    case SET_FILTER_OPTIONS_LOADING:
      return {
        ...state, isFilterOptionsLoading: action.payload
      };
    case SET_LAYERS_DATA:
      return {
        ...state, layersData: action.payload
      };
    case SET_BUFFER_DATA:
      return {
        ...state, bufferData: action.payload
      };
    case SET_SPAITAL_INT_SEC_DATA:
      return {
        ...state, spaitalIntSecData: action.payload
      };
    case SET_AUTO_FOCUS:
      return {
        ...state, isAutoFocus: action.payload
      };
    case SET_SELECTED_FEATURES:
      return {
        ...state,
        selectedFeatures: action.payload.selectedFeatures,
          isAllFeaturesSelected: action.payload.isAllFeaturesSelected
      };
    case SET_BUFFER_IDS:
      return {
        ...state,
        bufferIds: action.payload
      };
    case SET_DRAW_POPUP: 
      return {
        ...state, drawPopup: action.payload
      };
    case SET_DRAWING_TYPE:
      return {
        ...state, setDrawingType: action.payload
      }
    case SET_TOC_DRAWING:
      return {
        ...state, setTocDraw: action.payload
      }
    case SET_POINT_POPUP:
      return {
        ...state, pointPopup: action.payload
      }
    case SET_CURRENT_LINKS:
      return {
        ...state, currentLinks: action.payload
      }
    case SET_CRS:
      return {
        ...state, crs: action.payload
      }
    case SET_FILTER_LOADER:
      return {
        ...state,
        filterLoader: action.payload
      };
    case SET_INTERSECTION_POPUP:
      return {
        ...state,
        intersectionPopup: action.payload
      }
    case SET_OLD_LAYER:
      return {
        ...state,
        oldTocLayer: action.payload
      }
    case SET_POPUP_INTERSECTION:
      return {
        ...state,
        popupIntersection: action.payload
      }
    case FLUSH_TOC_DATA:
      return initialState;
    default:
      return state;
  }
}
//#endregion

//#region Actions
/**
 * @function
 * @name manageLayerData
 * @description
 * manage layer data
 * @returns {layerdata}
 */
export const manageLayerData = () => async (dispatch, getState) => {
  try {
    const {
      tocLayer: {
        layerId
      },
      visibleFields,
      filtersData,
      geometry,
      isFilter,
      sorting,
      drawingState,
      drawingData,
      selectedFeatures,
      isAllFeaturesSelected,
      total,
      OBJECTID,
      filterTotal,
      layersData,
      tocLayer,
      filteredIds,
      bufferData,
      spaitalIntSecData
    } = getState().tocData;

    await dispatch({
      type: SET_LAYERS_DATA,
      payload: {
        ...layersData,
        [layerId]: {
          visibleFields,
          filtersData,
          geometry,
          isFilter,
          sorting,
          drawingState,
          drawingData,
          selectedFeatures,
          isAllFeaturesSelected,
          total,
          OBJECTID,
          filterTotal,
          tocLayer,
          filteredIds,
          bufferData,
          spaitalIntSecData
        }
      }
    })

    return true;
  } catch(err) {
    // console.log("manage layer data err", err);
  }
}

/**
 * @function
 * @name onLayerChange
 * @description
 * set feature on layer change
 * @param {object} layer object
 * @returns {features}
 */

export const onLayerChange = (layer) => async (dispatch, getState) => {
  // console.log("layer", layer);
  try {
    //#region clear data
    dispatch({
      type: SET_LOADING,
      payload: true
    });

    await dispatch(manageLayerData());

    const {
      url,
      id,
      layerId
    } = layer;
    const {
      links
    } = getState().links;
    const {
      layersData
    } = getState().tocData;

    if (layersData[layerId] && layersData[layerId].bufferData !== null) {
      return dispatch(onLayerChangeSpaitalIntersection(layer, layersData[layerId].bufferData, true));
    }

    dispatch({
      type: SET_GEOMETRY_TYPE,
      payload: null
    });
    dispatch({
      type: SET_FEATURES,
      payload: []
    });
    dispatch({
      type: SET_ALL_FEATURES,
      payload: []
    });
    dispatch({
      type: SET_FIELDS,
      payload: []
    });
    dispatch({
      type: SET_OBJECTID,
      payload: null
    });
    dispatch({
      type: SET_VISIBLE_FIELDS,
      payload: []
    });
    dispatch({
      type: SET_LAYER,
      payload: null
    });
    // dispatch({
    //   type:SET_OLD_LAYER,
    //   payload: null
    // })
    dispatch({
      type: SET_TOTAL,
      payload: 0
    });
    dispatch({
      type: SET_FILTERS_DATA,
      payload: {}
    });
    dispatch({
      type: SET_FILTER_TOTAL,
      payload: null
    });
    dispatch({
      type: SET_IS_FILTER,
      payload: false
    });
    dispatch({
      type: SET_GEOMETRY_FILTER_DATA,
      payload: null
    });
    dispatch({
      type: SET_DRAWING_DATA,
      payload: null
    });
    dispatch({
      type: SET_SORTING,
      payload: null
    });
    dispatch({
      type: SET_BUFFER_DATA,
      payload: null
    });
    dispatch({
      type: SET_SPAITAL_INT_SEC_DATA,
      payload: null
    });
    dispatch({
      type: SET_ALL_FETCHED,
      payload: false
    });
    dispatch({
      type: SET_CRS,
      payload: {}
    })
    //#endregion
    const latestWkid = getState().map.latestWkid;
    const {
      allLayers
    } = getState().layers;

    if (layersData[layerId]) {
      return dispatch(onOldLayerChange(layer));
    }
    const {
      tableLimit
    } = getState().tocData;

    const middlewareData = {
      source: layer.type,
      latestWkid,
      resultOffset: 0,
      tableLimit,
      url,
      id,
      layer: layer.groupname
    }

    let {
      geometryType,
      allFeatures,
      fields,
      exceededTransferLimit,
      OBJECTID,
      crs
    } = await createTocData_MIDDLEWARE(middlewareData);

    if (crs) {
      dispatch({
        type: SET_CRS,
        payload: crs
      })
    }

    const features = [],featuresGeometry = {};
    allFeatures.forEach(feature => {
      const featureMiddlewareData = {
        source: layer.type,
        feature,
        OBJECTID
      };
      const {
        attributes,
        geoMetry,
        featureKey
      } = createFeature_MIDDLEWARE(featureMiddlewareData);
      features.push({
        attributes: attributes
      });
      featuresGeometry[featureKey] = geoMetry;
    });

    dispatch({
      type: SET_SELECTED_FEATURES,
      payload: {
        selectedFeatures: [],
        isAllFeaturesSelected: false
      }
    });

    dispatch({
      type: SET_GEOMETRY_TYPE,
      payload: geometryType
    });
    dispatch({
      type: SET_FEATURES,
      payload: features
    });
    await dispatch({
      type: SET_ALL_FEATURES,
      payload: features
    });
    dispatch({
      type: SET_UPDATED_AT
    });
    dispatch({
      type: SET_FEATURES_GEOMETRY,
      payload: featuresGeometry
    });

    //Fields
    // let layerFields
    const layerFieldMiddlewareData = {
      source: layer.type,
      allLayers,
      layerId,
      fields
    };
    let {
      layerFields,
      field
    } = createTocLayerFields_MIDDLEWARE(layerFieldMiddlewareData);

    const linkMiddlewareData = {
      source: layer.type,
      links,
      name: layer.name
    };

    const layerLinks = createLinks_MIDDLEWARE(linkMiddlewareData);

    dispatch({
      type: SET_FIELDS,
      payload: layerFields
    });

    dispatch({
      type: SET_OBJECTID,
      payload: OBJECTID
    });

    dispatch({
      type: SET_VISIBLE_FIELDS,
      payload: field
    });

    dispatch({
      type: SET_LAYER,
      payload: layer
    });

    dispatch({
      type: SET_OLD_LAYER,
      payload: layer
    });

    dispatch({
      type: SET_CURRENT_LINKS,
      payload: layerLinks
    });

    let countTotal = features.length;
    if (exceededTransferLimit) {
      const middlewareData = {
        source: layer.type,
        exceededTransferLimit: true,
        url,
        id,
        layer: layer.groupname
      }
      countTotal = await createTocData_MIDDLEWARE(middlewareData);
    }

    dispatch({
      type: SET_TOTAL,
      payload: countTotal
    });
    dispatch({
      type: SET_LOADING,
      payload: false
    });
    if (countTotal <= 1000 && exceededTransferLimit) {
      dispatch(fetchAllRecords());
    } else if (exceededTransferLimit) {
      dispatch({
        type: SET_ALL_FETCHED,
        payload: false
      });
    } else {
      dispatch({
        type: SET_ALL_FETCHED,
        payload: true
      });
    }
    dispatch(getFilterOptions());
  } catch(err) {
    dispatch({
      type: SET_LOADING,
      payload: false
    });
    // console.log("onLayerChange err", err);
  }
}

/**
 * @function
 * @name onLayerChangeSpaitalIntersection
 * @description
 * spatial intersection feature on layer change
 * @param {object} layer object
 * @returns {spatial features}
 */

export const onLayerChangeSpaitalIntersection = (layer, bufferData = null, isPreviouslySelected = false) => async (dispatch, getState) => {
  // console.log("layer", layer);
  //#region
  await dispatch({
    type: SET_SPAITAL_INT_SEC_DATA,
    payload: {
      layer: bufferData.layer,
      buffer: bufferData.buffer,
      isBuffer: bufferData.isBuffer,
    }
  });
  dispatch({
    type: SET_LOADING,
    payload: true
  });
  dispatch({
    type: SET_INTERSECTION_POPUP,
    payload: false
  });
  dispatch({
    type: SET_POPUP_INTERSECTION,
    payload: bufferData.popupIntersection
  })
  const {
    tocLayer: cLayer,
    layersData
  } = getState().tocData;

  const {
    allLayers
  } = getState().layers;

  if (cLayer && cLayer.layerId !== layer.layerId) {
    await dispatch(manageLayerData());
    if (layersData[layer.layerId]) {
      const {
        visibleFields,
        sorting,
        filtersData
      } = layersData[layer.layerId];

      if (isPreviouslySelected) {
        dispatch({
          type: SET_FILTERS_DATA,
          payload: filtersData
        });
      }
      dispatch({
        type: SET_VISIBLE_FIELDS,
        payload: visibleFields
      });
      dispatch({
        type: SET_SORTING,
        payload: sorting
      });
      await dispatch({
        type: SET_SPAITAL_INT_SEC_DATA,
        payload: null
      });
    } else {
      dispatch({
        type: SET_VISIBLE_FIELDS,
        payload: []
      });
      dispatch({
        type: SET_SORTING,
        payload: null
      });
    }
    dispatch({
      type: SET_FEATURES,
      payload: []
    });
    dispatch({
      type: SET_ALL_FEATURES,
      payload: []
    });
    dispatch({
      type: SET_ALL_FETCHED,
      payload: false
    });
    dispatch({
      type: SET_FIELDS,
      payload: []
    });
    dispatch({
      type: SET_OBJECTID,
      payload: null
    });
    dispatch({
      type: SET_LAYER,
      payload: null
    });
    dispatch({
      type: SET_TOTAL,
      payload: 0
    });
    dispatch({
      type: SET_FILTER_TOTAL,
      payload: null
    });
    dispatch({
      type: SET_IS_FILTER,
      payload: false
    });
    dispatch({
      type: SET_GEOMETRY_FILTER_DATA,
      payload: null
    });
    dispatch({
      type: SET_DRAWING_DATA,
      payload: null
    });
    if (!isPreviouslySelected) {
      dispatch({
        type: SET_SORTING,
        payload: null
      });
      dispatch({
        type: SET_FILTERS_DATA,
        payload: {}
      });
    }
  }
  await dispatch({
    type: SET_SELECTED_FEATURES,
    payload: {
      selectedFeatures: [],
      isAllFeaturesSelected: false
    }
  });
  //#endregion

  try {
    //#region fetch ids
    const {
      url,
      id,
      type,
      layerId
    } = layer;
    const latestWkid = getState().map.latestWkid;

    let bufferObj = bufferData.filter;

    const {
      sorting,
      filtersData,
      tableLimit,
    } = getState().tocData;

    const orderByFields = {}
    if (sorting) {
      orderByFields.orderByFields = `${sorting.fieldName} ${sorting.type}`
    }

    const whereMiddlewareData = {
      source: type,
      filtersData,
      ids: null
    }

    const middlewareData = {
      source: type,
      idsOnly: true,
      // where: createWhereCondition(filtersData),
      where: createWhereCondition_Middleware(whereMiddlewareData),
      latestWkid,
      bufferObj,
      url,
      id,
      layer: layer.groupname
    }

    // console.log("bufferObj", bufferObj);

    const {
      OBJECTID,
      filteredIds,
      sortByField
    } = await createSpatialIntersection_MIDDLEWARE(middlewareData);

    // console.log("filteredIds", filteredIds);

    // const {
    //   objectIdFieldName: OBJECTID,
    //   objectIds: filteredIds
    // } = JSON.parse(resultIds.text);

    if (filteredIds === null) {
      dispatch({
        type: SET_INTERSECTION_POPUP,
        payload: true
      })
    } else {
      dispatch({
        type: SET_OLD_LAYER,
        payload: layer
      })
      dispatch({
        type: SET_BUFFER_DATA,
        payload: bufferData
      });
    }

    await dispatch({
      type: SET_FILTER_IDS,
      payload: filteredIds
    });
    await dispatch({
      type: SET_BUFFER_IDS,
      payload: filteredIds
    });
    //#endregion

    //#region fetch features
    const where = `${OBJECTID} IN (${filteredIds ? filteredIds.join(',') : 0})`;
    const data = {
      source: type,
      where,
      returnGeometry: true,
      returnTrueCurves: false,
      outFields: '*',
      resultOffset: 0,
      inSR: latestWkid,
      outSR: latestWkid,
      f: `json`,
      bufferObj,
      resultRecordCount: tableLimit,
      ...orderByFields,
      ...getTokenObj(url)
    }

    const resultMiddlewareData = {
      source: type,
      where,
      latestWkid,
      bufferObj,
      tableLimit,
      orderByFields,
      url,
      id,
      OBJECTID,
      filteredIds,
      layer: layer.groupname,
      sortByField
    };

    const {
      geometryType,
      features: allFeatures,
      fields,
      exceededTransferLimit,
      crs
    } = await createSpatialIntersection_MIDDLEWARE(resultMiddlewareData);

    // const {
    //   geometryType,
    //   features: allFeatures,
    //   fields,
    //   exceededTransferLimit
    // } = JSON.parse(result.text);

    if (crs) {
      dispatch({
        type: SET_CRS,
        payload: crs
      })
    }

    const features = [];
    const featuresGeometry = {};
    allFeatures.forEach(feature => {
      const featureMiddlewareData = {
        source: type,
        feature,
        OBJECTID
      };
      const {
        attributes,
        geoMetry,
        featureKey
      } = createFeature_MIDDLEWARE(featureMiddlewareData);
      features.push({
        attributes: attributes
      });
      featuresGeometry[featureKey] = geoMetry;
    });

    //Fields
    const layerFieldMiddlewareData = {
      source: type,
      allLayers,
      layerId,
      fields
    };
    let {
      layerFields,
      field
    } = createTocLayerFields_MIDDLEWARE(layerFieldMiddlewareData);

    dispatch({
      type: SET_GEOMETRY_TYPE,
      payload: geometryType
    });
    dispatch({
      type: SET_FEATURES,
      payload: features
    });
    await dispatch({
      type: SET_ALL_FEATURES,
      payload: features
    });
    dispatch({
      type: SET_FEATURES_GEOMETRY,
      payload: featuresGeometry
    });
    dispatch({
      type: SET_FIELDS,
      payload: layerFields
    });
    dispatch({
      type: SET_OBJECTID,
      payload: OBJECTID
    });
    dispatch({
      type: SET_VISIBLE_FIELDS,
      payload: field
    });
    dispatch({
      type: SET_LAYER,
      payload: layer
    });
    //#endregion

    //#region get total count
    const countDataMiddleware = {
      source: type,
      exceededTransferLimit: true,
      url,
      id,
      layer: layer.groupname,
      bufferObj
    };

    const countTotal = await createTocData_MIDDLEWARE(countDataMiddleware);
    //#endregion

    //#region get filter count
    if (bufferData) {
      dispatch({
        type: SET_FILTER_TOTAL,
        payload: filteredIds.length
      });
      await dispatch({
        type: SET_IS_FILTER,
        payload: true
      });
    }

    dispatch({
      type: SET_TOTAL,
      payload: countTotal
    });
    //#endregion

    if (filteredIds.length <= 1000 && exceededTransferLimit) {
      await dispatch(fetchAllFilteredRecords(data, true));
    }

    await dispatch({
      type: SET_AUTO_FOCUS,
      payload: true
    });

    await dispatch({
      type: SET_SELECTED_FEATURES,
      payload: {
        selectedFeatures: [],
        isAllFeaturesSelected: true
      }
    });

    await dispatch({
      type: SET_UPDATED_AT
    });

    await dispatch({
      type: SET_LOADING,
      payload: false
    });

    dispatch(getFilterOptions());
    dispatch(filterLayer(layer));
  } catch(err) {
    // console.log("spatial intersection err", err);
    dispatch({
      type: SET_LOADING,
      payload: false
    });
  }
}

export const clearLayerFilter = (layerId) => async (dispatch, getState) => {
  const {
    tocLayer,
    layersData
  } = getState().tocData;
  if (layersData[layerId]) {
    const layer = layersData[layerId].tocLayer;
    delete layersData[layerId];
    await dispatch({
      type: SET_LAYERS_DATA,
      payload: layersData
    });
    dispatch(filterLayer(layer));
  }
  if (layerId === tocLayer.layerId) {
    dispatch(filterFeatures({}, 'ALL'))
  }
}

/**
 * @function
 * @name onOldLayerChange
 * @description
 * set features on selecting previous layer
 * @param {object} layer object
 * @returns {features}
 */

export const onOldLayerChange = (layer) => async (dispatch, getState) => {
  dispatch({
    type: SET_CRS,
    payload: {}
  });
  dispatch({
    type: SET_LOADING,
    payload: true
  });
  try {
    const {
      url,
      id,
      layerId,
      type
    } = layer;
    // console.log("layer", layer);
    const {latestWkid, projection} = getState().map;
    const {
      layersData,
      tableLimit,
      // bufferData
    } = getState().tocData;
    const {
      allLayers
    } = getState().layers;
    const { links } = getState().links;
    const {
      visibleFields,
      filtersData,
      geometry,
      isFilter,
      sorting,
      drawingData,
      selectedFeatures,
      isAllFeaturesSelected,
      total,
      OBJECTID,
      filterTotal,
      spaitalIntSecData,
      bufferData
    } = layersData[layerId];

    dispatch({
      type: SET_BUFFER_DATA,
      payload: bufferData
    });

    // const where = createWhereCondition(filtersData);
    const whereMiddlewareData = {
      source: type,
      filtersData,
      ids: null
    };
    const where = createWhereCondition_Middleware(whereMiddlewareData);
    let geometryData = {};
    if (geometry) {
      geometryData = {
        geometryType: geometry.type,
        geometry: geometry.coordinates,
        pointCoordinates: geometry.pointCoordinates
      }
    }

    const middlewareData = {
      source: layer.type,
      oldLayerChange: true,
      where,
      latestWkid,
      resultOffset: 0,
      tableLimit,
      orderByFields: sorting ? `${sorting.fieldName} ${sorting.type}` : OBJECTID,
      geometryData,
      url,
      id,
      layer: layer.groupname,
      tocLayer: layer,
      projection: projection,
      allLayers
    };

    let {
      geometryType,
      allFeatures,
      fields,
      exceededTransferLimit,
      crs
    } = await createTocData_MIDDLEWARE(middlewareData);

    if (crs) {
      dispatch({
        type: SET_CRS,
        payload: crs
      })
    }

    const features = []
    const featuresGeometry = {};
    allFeatures.forEach(feature => {
      const featureMiddlewareData = {
        source: layer.type,
        feature,
        OBJECTID
      };
      const {
        attributes,
        geoMetry,
        featureKey
      } = createFeature_MIDDLEWARE(featureMiddlewareData);
      features.push({
        attributes: attributes
      });
      featuresGeometry[featureKey] = geoMetry;
    });

    //Fields

    const layerFieldMiddlewareData = {
      source: layer.type,
      allLayers,
      layerId,
      fields
    };
    let {
      layerFields
    } = createTocLayerFields_MIDDLEWARE(layerFieldMiddlewareData);

    const linkMiddlewareData = {
      source: layer.type,
      links,
      name: layer.name
    };

    const layerLinks = createLinks_MIDDLEWARE(linkMiddlewareData);

    dispatch({
      type: SET_FIELDS,
      payload: layerFields
    });
    dispatch({
      type: SET_CURRENT_LINKS,
      payload: layerLinks
    })
    dispatch({
      type: SET_GEOMETRY_FILTER_DATA,
      payload: geometry
    })
    dispatch({
      type: SET_SORTING,
      payload: sorting
    })
    dispatch({
      type: SET_FILTER_TOTAL,
      payload: filterTotal
    })
    dispatch({
      type: SET_IS_FILTER,
      payload: isFilter
    })
    dispatch({
      type: SET_FILTERS_DATA,
      payload: filtersData
    })
    dispatch({
      type: SET_VISIBLE_FIELDS,
      payload: visibleFields
    })
    dispatch({
      type: SET_TOTAL,
      payload: total
    })
    dispatch({
      type: SET_OBJECTID,
      payload: OBJECTID
    })
    dispatch({
      type: SET_DRAWING_DATA,
      payload: drawingData
    })
    dispatch({
      type: SET_SELECTED_FEATURES,
      payload: {
        selectedFeatures,
        isAllFeaturesSelected
      }
    });

    await dispatch({
      type: SET_SPAITAL_INT_SEC_DATA,
      payload: spaitalIntSecData
    });

    dispatch({
      type: SET_GEOMETRY_TYPE,
      payload: geometryType
    });
    dispatch({
      type: SET_FEATURES,
      payload: features
    });
    dispatch({
      type: SET_ALL_FEATURES,
      payload: features
    });
    dispatch({
      type: SET_UPDATED_AT
    });
    dispatch({
      type: SET_FEATURES_GEOMETRY,
      payload: featuresGeometry
    });
    dispatch({
      type: SET_OBJECTID,
      payload: OBJECTID
    });
    dispatch({
      type: SET_LAYER,
      payload: layer
    });
    dispatch({
      type: SET_LOADING,
      payload: false
    });
    await dispatch({
      type: SET_ALL_FETCHED,
      payload: exceededTransferLimit ? false : true
    });
    dispatch(getFilterOptions());
    return true;
  } catch (err) {
    // console.log('oldLayer err', err);
    dispatch({
      type: SET_LOADING,
      payload: false
    });
  }
}

export const setVisibleFields = (fieldNames) => async (dispatch) => {
  dispatch({
    type: SET_VISIBLE_FIELDS,
    payload: fieldNames
  });
}

export const setAutoFocus = (isAutoFocus) => async (dispatch) => {
  dispatch({
    type: SET_AUTO_FOCUS,
    payload: isAutoFocus
  });
}

export const setSelectedFeatures = (selectedFeatures, isAllFeaturesSelected) => async (dispatch) => {
  dispatch({
    type: SET_SELECTED_FEATURES,
    payload: {
      selectedFeatures,
      isAllFeaturesSelected
    }
  });
}

export const setDrawingData = (drawingData) => async (dispatch) => {
  dispatch({
    type: SET_DRAWING_DATA,
    payload: drawingData
  });
}

/**
 * @function
 * @name fetchNextRecords
 * @description
 * fetch next 100 records for toc feature
 * @param {objects} (layer, offset, limit)
 * @returns {features}
 */

export const fetchNextRecords = (layer, offset, limit) => async (dispatch, getState) => {
  dispatch({
    type: SET_LOADING,
    payload: true
  });
  try {
    const {
      url,
      id,
      type
    } = layer;
    const {
      filtersData,
      geometry,
      sorting,
      OBJECTID,
      allFeatures,
      features: prevFeatures,
      featuresGeometry,
      bufferData
    } = getState().tocData;
    const latestWkid = getState().map.latestWkid;
    const whereMiddlewareData = {
      source: type,
      filtersData,
      ids: null
    }
    // const where = createWhereCondition(filtersData);
    const where = createWhereCondition_Middleware(whereMiddlewareData);
    let geometryData = {};
    if (geometry) {
      geometryData = {
        geometryType: geometry.type,
        geometry: geometry.coordinates
      }
    }

    const middlewareData = {
      source: type,
      where,
      offset,
      latestWkid,
      limit,
      sorting,
      geometryData,
      url,
      id,
      bufferData,
      OBJECTID,
      layer: layer.groupname
    };

    const results = await fetchNextRecords_MIDDLEWARE(middlewareData);

    const {
      features: featuresData
    } = JSON.parse(results.text);

    const features = [];

    featuresData.forEach(feature => {
      const featureMiddlewareData = {
        source: layer.type,
        feature,
        OBJECTID
      };
      const {
        attributes,
        geoMetry,
        featureKey
      } = createFeature_MIDDLEWARE(featureMiddlewareData);
      features.push({
        attributes: attributes
      });
      featuresGeometry[featureKey] = geoMetry;
    });

    dispatch({
      type: SET_FEATURES_GEOMETRY,
      payload: featuresGeometry
    });
    dispatch({
      type: SET_FEATURES,
      payload: [...prevFeatures, ...features]
    });
    dispatch({
      type: SET_ALL_FEATURES,
      payload: [...allFeatures, ...features]
    });
    dispatch({
      type: SET_LOADING,
      payload: false
    });

    return features;
  } catch (err) {
    // console.log("fetch next record err", err);
    dispatch({
      type: SET_LOADING,
      payload: false
    });
  }
}

/**
* @function
* @name fetchingSpatialInformationForDashboard
* @description
* function for fetch spatial info for new design
* @param {Object} {key:value} pair of selected layers objects
* @returns {spatial info}
*/

export const fetchingSpatialInformationForDashboard = (selectedLayers, coordinates, bboxCordinate, geoMetryType) => async (dispatch, getState) => {
  try {
    const {latestWkid, projection} = getState().map;
    const {
      allLayers
    } = getState().layers;
    const { links } = getState().links;
    const { map } = getState().map;
    const mapExtent = map.getView().calculateExtent(map.getSize());
    const mapSize = map.getSize();

    let tocData = [];
    let urlArr = [];
    let dataArr = [];
    selectedLayers.forEach(layer => {
      urlArr.push(layer.url);
    });
    const uniqueUrlArr = new Set(urlArr);
    uniqueUrlArr.forEach(url => {
      const filteredLayer = selectedLayers.filter(fl => fl.url === url);
      let idArr = [];
      let groupnameArr = [];
      let geometryType = null;
      let layerType = null;
      let layerProjection = null;
      filteredLayer.forEach(flGroup => {
        layerType = flGroup.type;
        layerProjection = flGroup.projection;
        if (flGroup.groupname) {
          groupnameArr.push(flGroup.groupname);
          geometryType = flGroup.geometryType;
        } else {
          idArr.push(flGroup.id);
        }
      });
      const dataObject = {
        url,
        ids: idArr,
        groupnames: groupnameArr,
        geometryType,
        type: layerType,
        layerProjection
      };
      dataArr.push(dataObject);
    });
    let feildRequest = [];
    await Promise.all(dataArr.map(async ({
      url,
      ids,
      groupnames,
      type,
      layerProjection
    }) => {
      const middlewareData = {
        source: type,
        imageDisplay: `${mapSize.toString()},96`,
        geometry: coordinates,
        geometryType: geoMetryType,
        sr: latestWkid,
        mapExtent: mapExtent.join(','),
        layers: `visible:${ids.join(',')}`,
        url,
        allLayers,
        bboxCordinate,
        links,
        projection,
        layerProjection,
        groupnames,
        ids,
        type
      };
      const {
        responseData,
        fieldRequest
      } = await createSpatialData_MIDDLEWARE(middlewareData);
      responseData.forEach(rData => {
        tocData.push(rData);
      });
      if (fieldRequest && fieldRequest.length > 0) {
        fieldRequest.forEach(fr => {
          feildRequest.push(fr);
        })
      }
    }));

    await Promise.all(feildRequest.map(async ({
      url,
      id,
      type
    }) => {
      const middlewareData = {
        source: type,
        fieldRequest: true,
        url,
        id
      }
      const resdata = await createSpatialData_MIDDLEWARE(middlewareData);
      const filedsdata = JSON.parse(resdata.text).fields;

      const replaceMiddlewareData = {
        source: type,
        tocData,
        filedsdata,
        id
      };

      tocData = createReplacedSpatialData_MIDDLEWARE(replaceMiddlewareData);

      // const replaceData = tocData.find(toc => toc.layer.id === id && !toc.geoServer);
      // const tocIndex = tocData.findIndex(toc => toc.layer.id === id && !toc.geoServer);
      // replaceData.features.forEach((feature, i) => {
      //   Object.keys(feature.attributes).forEach(fieldName => {
      //     const fieldReturn = filedsdata.find(fl => fl.name === fieldName);
      //     if(fieldReturn) {
      //       return null;
      //     }
      //     const fieldNameNew = filedsdata.find(fl => fl.alias === fieldName);
      //     if(fieldNameNew) {
      //       tocData[tocIndex].features[i].attributes[fieldNameNew.name] = tocData[tocIndex].features[i].attributes[fieldNameNew.alias];
      //       delete tocData[tocIndex].features[i].attributes[fieldNameNew.alias];
      //     }
      //   });
      // });
    }));

    const searchResult = await dispatch(getSearchDataForSpaital(coordinates, bboxCordinate, geoMetryType));
    if (searchResult) {
      tocData.push(searchResult);
    }
    const queryResult = await dispatch(getQueryUrlForSpaital(coordinates));
    if (queryResult) {
      tocData.push(queryResult);
    }
    const searchQueryResult = await dispatch(fetchSearchQueryData(coordinates, geoMetryType));
    if (searchQueryResult) {
      tocData.push(searchQueryResult);
    }

    // console.log("tocData", tocData);

    let spatialData = [];
    tocData.forEach(layerData => {
      if (layerData.features.length > 0) {
        const popupMiddlewareData = {
          source: layerData.type,
          layerData
        };
        const popupRes = createPopupSpatialData_MIDDLEWARE(popupMiddlewareData);
        spatialData = [...spatialData, ...popupRes];
      }
    });

    // console.log("spatialData", spatialData);

    return ({
      spatialData
    });
  } catch (error) {
    // console.log("spatialData error", error);
    return ({
      spatialData: []
    });
  }

}

/**
 * @function
 * @name fetchExportRecords
 * @description
 * fetch all feature records for csv export
 * @returns {export feature data}
 */
export const fetchExportRecords = () => async (dispatch, getState) => {
  try {
    const {
      tocLayer: {
        url,
        id,
        type
      },
      filtersData,
      geometry,
      fields,
      bufferData,
      tocLayer
    } = getState().tocData;
    const latestWkid = getState().map.latestWkid;

    // const where = createWhereCondition(filtersData);
    const whereMiddlewareData = {
      source: type,
      filtersData,
      ids: null
    }
    const where = createWhereCondition_Middleware(whereMiddlewareData)
    let geometryData = {};
    if (geometry) {
      geometryData = {
        geometryType: geometry.type,
        geometry: geometry.coordinates
      }
    }

    // const data = {
    //   where,
    //   returnGeometry: false,
    //   returnTrueCurves: false,
    //   outFields: '*',
    //   inSR: latestWkid,
    //   outSR: latestWkid,
    //   f: `json`,
    //   ...geometryData,
    //   ...getTokenObj(url),
    //   ...(bufferData ? bufferData.filter : {})
    // }

    const middlewareData = {
      source: type,
      where,
      latestWkid,
      geometryData,
      url,
      id,
      bufferData,
      tocLayer
    }

    let res = [];
    // let isAllFetched = true;
    const getResult = async (offset = 0) => {
      // data.resultOffset = offset;
      // const results = await superagent.post(`${url}/${id}/query`).send(data).set({
      //   'Content-Type': 'application/x-www-form-urlencoded',
      // });
      middlewareData.offset = offset;
      const results = await fetchCsvData_MIDDLEWARE(middlewareData);

      const {
        features,
        exceededTransferLimit
      } = JSON.parse(results.text);
      res = [...res, ...features];

      if (exceededTransferLimit) {
        return getResult(res.length);
      }
      return res;
    }
    await getResult();
    const featureMiddlewareData = {
      source: type,
      features: res,
      fields
    };
    const features = createCsvData_MIDDLEWARE(featureMiddlewareData);
    // const features = res.map(feature => {
    //   const obj = {};
    //   fields.forEach(f => {
    //     obj[f.alias] = feature.attributes[f.name]
    //   })
    //   return obj;
    // })
    return features;
  } catch(err) {
    // console.log("fetchExportRecords err", err);
  }
}

/**
 * @function
 * @name fetchAllRecords
 * @description
 * fetch all feature records for layer
 * @returns {features}
 */
export const fetchAllRecords = () => async (dispatch, getState) => {
  dispatch({
    type: SET_LOADING,
    payload: true
  });
  try {
    const maxLimit = 10000; // ten thousand
    const {
      tocLayer: {
        url,
        id,
        type,
        groupname
      },
      OBJECTID
    } = getState().tocData;
    const latestWkid = getState().map.latestWkid;
    // const data = {
    //   where: '1=1',
    //   returnGeometry: true,
    //   returnTrueCurves: false,
    //   outFields: '*',
    //   inSR: latestWkid,
    //   outSR: latestWkid,
    //   f: `json`,
    //   ...getTokenObj(url)
    // }

    let allFeatures = [];
    let isAllFetched = true;
    const getResult = async (offset = 0) => {
      // data.resultOffset = offset;
      // const results = await superagent.post(`${url}/${id}/query`).send(data).set({
      //   'Content-Type': 'application/x-www-form-urlencoded',
      // });

      // const {
      //   features,
      //   exceededTransferLimit
      // } = JSON.parse(results.text);
      const middlewareData = {
        source: type,
        latestWkid,
        url,
        id,
        layer: groupname
      }
      const {
        features,
        exceededTransferLimit
      } = await fetchAllRecords_MIDDLEWARE(middlewareData);
      allFeatures = [...allFeatures, ...features];
      if (exceededTransferLimit && allFeatures.length >= maxLimit) {
        isAllFetched = false;
        return allFeatures;
      }
      if (exceededTransferLimit) {
        return getResult(allFeatures.length);
      }
      return allFeatures;
    }
    await getResult();

    const features = [],
    featuresGeometry = {};
    // allFeatures.forEach(feature => {
    //   features.push({
    //     attributes: feature.attributes
    //   });
    //   featuresGeometry[feature.attributes[OBJECTID]] = feature.geometry;
    // });
    allFeatures.forEach(feature => {
      const featureMiddlewareData = {
        source: type,
        feature,
        OBJECTID
      };
      const {
        attributes,
        geoMetry,
        featureKey
      } = createFeature_MIDDLEWARE(featureMiddlewareData);
      features.push({
        attributes: attributes
      });
      featuresGeometry[featureKey] = geoMetry;
    });

    dispatch({
      type: SET_FEATURES,
      payload: features
    });
    dispatch({
      type: SET_ALL_FEATURES,
      payload: features
    });
    // dispatch({
    //   type: SET_UPDATED_AT
    // });
    dispatch({
      type: SET_FEATURES_GEOMETRY,
      payload: featuresGeometry
    });

    dispatch({
      type: SET_LOADING,
      payload: false
    });

    dispatch({
      type: SET_ALL_FETCHED,
      payload: isAllFetched
    });
    // return allFeatures;
  } catch (err) {
    // console.log("fetch all records err", err);
    dispatch({
      type: SET_LOADING,
      payload: false
    });
  }
}

/**
* @function
* @name downloadKMZ
* @description
* download the kmz file
* @param {Object} {data} layer data
* @returns {kmz file}
*/

export const downloadKMZ = (ids) => async (dispatch, getState) => {
  try {
    const {
      tocLayer: {
        url,
        id,
        type
      },
      filtersData,
      geometry,
      bufferData,
      filteredIds,
      OBJECTID
    } = getState().tocData;
    const {
      latestWkid
    } = getState().map;

    // let where = createWhereCondition(filtersData, ids);
    const whereMiddlewareData = {
      source: type,
      filtersData,
      ids
    }
    let where = createWhereCondition_Middleware(whereMiddlewareData);
    let geometryData = '';

    if (bufferData) {
      where = `${OBJECTID} IN (${filteredIds ? filteredIds.join(',') : 0})`;
    } else if (geometry) {
      geometryData = `&geometryType=${geometry.type}&geometry=${geometry.coordinates}`;
    }

    const middlewareData = {
      source: type,
      url,
      id,
      where,
      geometryData,
      latestWkid,
      f: 'kmz',
      format: 'kmz'
    };

    return await createTocExport_MIDDLEWARE(middlewareData);

    // const path = `${url}/${id}/query?where=${where}${geometryData}&f=kmz&inSR=${latestWkid}&outFields=*&${getTokenForUrl(url)}`;
    // await downloadKMZFile(path, 'kmz');
    // return true;
  } catch (err) {
    // console.log("downloadKMZ err", err);
  }
}

/**
 * @function
 * @name exportFeatures
 * @description
 * download the features file
 * @param {Object} {data} layer data
 * @returns {features file}
 */

export const exportFeatures = (ids, extension) => async (dispatch, getState) => {
  try {
    const {
      tocLayer: {
        url,
        id,
        type
      },
      filtersData,
      geometry,
      bufferData,
      filteredIds,
      OBJECTID,
      tocLayer
    } = getState().tocData;
    const {
      latestWkid,
      projection
    } = getState().map;
    const {
      allLayers
    } = getState().layers;

    // let where = createWhereCondition(filtersData, ids);
    const whereMiddlewareData = {
      source: type,
      filtersData,
      ids
    }
    let where = createWhereCondition_Middleware(whereMiddlewareData);
    // let geometryData = '';

    if (bufferData) {
      where = `${OBJECTID} IN (${filteredIds ? filteredIds.join(',') : 0})`;
    }
    // else if (geometry) {
    //   geometryData = `&geometryType=${geometry.type}&geometry=${geometry.coordinates}`;
    // }

    const middlewareData = {
      source: type,
      tocLayer,
      url,
      id,
      where,
      geometry,
      latestWkid,
      f: extension,
      type: extension,
      projection,
      allLayers
    };
    return await createTocExport_MIDDLEWARE(middlewareData);
  } catch (err) {
    // console.log("exportFeatures err", err);
  }
}

/**
* @function
* @name downloadGeoJSON
* @description
* download the geojson file
* @param {Object} {data} layer data
* @returns {geojson file}
*/

export const downloadGeoJSON = (ids) => async (dispatch, getState) => {
  try {
    const {
      tocLayer: {
        url,
        id,
        type
      },
      filtersData,
      geometry,
      bufferData,
      filteredIds,
      OBJECTID
    } = getState().tocData;
    const {
      latestWkid
    } = getState().map;

    // let where = createWhereCondition(filtersData, ids);
    const whereMiddlewareData = {
      source: type,
      filtersData,
      ids
    }
    let where = createWhereCondition_Middleware(whereMiddlewareData);
    let geometryData = '';

    if (bufferData) {
      where = `${OBJECTID} IN (${filteredIds ? filteredIds.join(',') : 0})`;
    } else if (geometry) {
      geometryData = `&geometryType=${geometry.type}&geometry=${geometry.coordinates}`;
    }

    const middlewareData = {
      source: type,
      url,
      id,
      where,
      geometryData,
      latestWkid,
      f: 'GeoJSON',
      format: 'json'
    };

    return await createTocExport_MIDDLEWARE(middlewareData);

    // const path = `${url}/${id}/query?where=${where}${geometryData}&f=GeoJSON&inSR=${latestWkid}&outFields=*&${getTokenForUrl(url)}`;
    // await downloadKMZFile(path, 'json');
    // return true;
  } catch (err) {
    // console.log("downloadGeoJSON err", err);
  }
}

/**
 * @function
 * @name getFilterOptions
 * @description
 * create the field filter options
 * @returns {filter options}
 */

export const getFilterOptions = (filterapp = false) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SET_FILTER_OPTIONS_LOADING,
      payload: true
    });
    const {
      fields,
      tocLayer: {
        url,
        id,
        type,
        groupname
      },
      filtersData,
      geometry,
      bufferData,
      filteredIds,
      OBJECTID,
      // features,
      fieldOptions,
      tocLayer
    } = getState().tocData;
    const {
      // latestWkid,
      projection
    } = getState().map;
    // console.log("features state", features);

    const {allLayers} = getState().layers;

    let geometryData = {};
    if (geometry) {
      geometryData = {
        geometryType: geometry.type,
        geometry: geometry.coordinates,
        pointCoordinates: geometry.pointCoordinates
      }
    }
    // console.log('where', where, filtersData);
    // let data = {
    //   source: type,
    //   returnGeometry: false,
    //   // returnTrueCurves: false,
    //   // inSR: latestWkid,
    //   // outSR: latestWkid,
    //   f: `json`,
    //   returnDistinctValues: true,
    //   ...geometryData,
    //   ...getTokenObj(url)
    // }

    let middlewareData = {
      source: type,
      allLayers,
      projection,
      geometryData,
      tocLayer,
      url,
      id,
      layer: groupname
    }

    let fieldOption = {}
    let fieldArray = [];
    // console.log('fields =>>>>>>>', fields);
    const loadingMiddlewareData = {
      source: type,
      fields
    }
    fieldArray = createLoadingFields_MIDDLEWARE(loadingMiddlewareData);
    dispatch({
      type: SET_FILTER_LOADER,
      payload: fieldArray
    });
    const fieldCheckMiddlewareData = {
      source: type,
      fields
    };
    const fieldRes = createCheckFieldType_MIDDLEWARE(fieldCheckMiddlewareData);
    for (const field of fieldRes) {
      const filters = {};
      Object.keys(filtersData).forEach(key => {
        if (key !== field.name) {
          filters[key] = filtersData[key]
        }
      });

      // let where = createWhereCondition(filters);
      const whereMiddlewareData = {
        source: type,
        filtersData: filters,
        ids: null
      };
      let where = createWhereCondition_Middleware(whereMiddlewareData);
      if (bufferData) {
        const whereBuffer = `${OBJECTID} IN (${filteredIds ? filteredIds.join(',') : 0})`;

        if (where.trim() === '1=1') {
          where = whereBuffer;
        } else {
          where += ` AND ${whereBuffer}`;
        }
      }

      // data = {
      //   ...data,
      //   where,
      //   outFields: field.name,
      //   orderByFields: field.name
      // }

      middlewareData = {
        ...middlewareData,
        where,
        name: field.name,
        filterapp,
        fieldOptions
      }

      // const results = await superagent.post(`${url}/${id}/query`).send(data).set({
      //   'Content-Type': 'application/x-www-form-urlencoded',
      // });
      // const {
      //   features
      // } = JSON.parse(results.text);
      // console.log("features", features);
      const resFeatures = await createFilterOptions_MIDDLEWARE(middlewareData);
      // console.log("resFeatures", resFeatures);
      const featureMiddlewareData = {
        source: type,
        features: resFeatures,
        field
      };
      if (resFeatures) {
        // fieldOptions[field.name] = features.map(f => f.attributes[field.name]).filter(f => f !== "" && f !== null);
        const optionData = createFilterFeatures_MIDDLEWARE(featureMiddlewareData);
        
        // console.log("optionData", optionData);
        let uniqueOptionsData = [...new Set(optionData)];
        // uniqueOptionsData = uniqueOptionsData.sort((a,b) => a - b);
        uniqueOptionsData = uniqueOptionsData.sort(function(a, b) {
          if (typeof a === 'number') {
            return a - b;
          }
          return a.localeCompare(b);
        });
        fieldOption[field.name] = uniqueOptionsData;
      }
      fieldArray = fieldArray.filter(fa => fa !== field.name)
      dispatch({
        type: SET_FILTER_LOADER,
        payload: fieldArray
      });
      dispatch({
        type: SET_FIELD_OPTIONS,
        payload: fieldOption
      });
    }

    // console.log("fieldOptions", fieldOptions);

    // dispatch({
    //   type: SET_FIELD_OPTIONS,
    //   payload: fieldOption
    // });
    dispatch({
      type: SET_FILTER_OPTIONS_LOADING,
      payload: false
    });
  } catch(err) {
    // console.log("fields filter err", err);
  }
}

/**
 * @function
 * @name filterFeatures
 * @description
 * filter features for draw layer data
 * @param {} 
 * @returns {features}
 */

export const filterFeatures = (data = {}, clearField = null, geometryNew = null, clearGeomtry = false, bboxCordinate = null) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SET_LOADING,
      payload: true
    });
    dispatch({
      type: SET_SELECTED_FEATURES,
      payload: {
        selectedFeatures: [],
        isAllFeaturesSelected: false
      }
    });

    let {
      isAllFetched,
      allFeatures,
      filtersData,
      tocLayer,
      geometry,
      bufferData,
      bufferIds
    } = getState().tocData;
    const {
      allLayers
    } = getState().layers;
    const {
      projection
    } = getState().map;
    let filteroptions = false;
    const prevBufferData = getState().tocData.bufferData; 
    if (clearField === 'ALL') {
      filtersData = {};
      dispatch({
        type: SET_DRAWING_DATA,
        payload: null
      });
      dispatch({
        type: SET_BUFFER_DATA,
        payload: null
      });
      filteroptions = false;
    } else if (clearField && filtersData[clearField]) {
      delete filtersData[clearField];
      filteroptions = false;
    } else if (data) {
      filtersData = {
        ...filtersData,
        ...data
      };
      filteroptions = true;
    }

    geometry = clearGeomtry || clearField === 'ALL' ? null : geometryNew || geometry;
    if (clearGeomtry || clearField === 'ALL' || geometryNew) {
      bufferData = null;
      dispatch({
        type: SET_BUFFER_DATA,
        payload: null
      })
    }

    let countTotal = 0;
    if (isAllFetched && !geometry && !clearGeomtry && !bufferData && !prevBufferData) {
      const allFeatchedMiddlewareData = {
        source: tocLayer.type,
        allFeatures,
        filtersData
      }
      const features = createAllFetchedData_MIDDLEWARE(allFeatchedMiddlewareData);

      dispatch({
        type: SET_FEATURES,
        payload: features
      });
      dispatch({
        type: SET_FILTER_TOTAL,
        payload: features.length
      });
      // const where = createWhereCondition(filtersData);
      const whereMiddlewareData = {
        source: tocLayer.type,
        filtersData,
        ids: null
      }
      const where = createWhereCondition_Middleware(whereMiddlewareData);
      dispatch(filterLayer(tocLayer, where));
    } else {
      // const where = createWhereCondition(filtersData);
      const {
        tocLayer: layer,
        tableLimit,
        OBJECTID,
        sorting
      } = getState().tocData;
      const latestWkid = getState().map.latestWkid;
      const {
        url,
        id
      } = layer;

      let geometryData = {};
      // console.log("geometry", geometry);
      if (geometry) {
        geometryData = {
          geometryType: geometry.type,
          geometry: geometry.coordinates,
          pointCoordinates: geometry.pointCoordinates
        }
      }

      // console.log("filtersData", filtersData);

      // let where = createWhereCondition(filtersData);
      const whereMiddlewareData = {
        source: tocLayer.type,
        filtersData,
        ids: null
      }
      let where = createWhereCondition_Middleware(whereMiddlewareData);
      // console.log("final where", where);
      if (bufferData) {
        const whereBuffer = `${OBJECTID} IN (${bufferIds ? bufferIds.join(',') : 0})`;
        if (where.trim() === '1=1') {
          where = whereBuffer;
        } else {
          where += ` AND ${whereBuffer}`;
        }
      }

      // console.log("bboxCordinate", bboxCordinate);

      // const data = {
      //   where,
      //   returnGeometry: true,
      //   returnTrueCurves: false,
      //   outFields: '*',
      //   resultOffset: 0,
      //   inSR: latestWkid,
      //   outSR: latestWkid,
      //   f: `json`,
      //   resultRecordCount: tableLimit,
      //   orderByFields: sorting && sorting.fieldName ? `${sorting.fieldName} ${sorting.type}` : OBJECTID,
      //   ...geometryData,
      //   ...getTokenObj(url),
      //   // ...(bufferData ? bufferData.filter : {})
      // }

      // let results;

      // if(tocLayer.type === 'arcgis') {
      //   results = await superagent.post(`${url}/${id}/query`).send(data).set({
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   });
      // }

      const middlewareData = {
        source: tocLayer.type,
        where,
        latestWkid,
        resultRecordCount: tableLimit,
        sorting,
        OBJECTID,
        geometryData,
        url,
        id,
        bboxCordinate,
        allLayers,
        tocLayer,
        projection,
        clearGeomtry,
        clearField
      };

      const {
        features: allFeatures,
        exceededTransferLimit
      } = await createDrawFeature_MIDDLEWARE(middlewareData);

      // const {
      //   features: allFeatures,
      //   exceededTransferLimit
      // } = JSON.parse(results.text);

      const features = [];
      const featuresGeometry = {};
      // allFeatures.forEach(feature => {
      //   features.push({
      //     attributes: feature.attributes
      //   });
      //   featuresGeometry[feature.attributes[OBJECTID]] = feature.geometry;
      // });

      allFeatures.forEach(feature => {
        const featureMiddlewareData = {
          source: tocLayer.type,
          feature,
          OBJECTID
        };
        const {
          attributes,
          geoMetry,
          featureKey
        } = createFeature_MIDDLEWARE(featureMiddlewareData);
        features.push({
          attributes: attributes
        });
        featuresGeometry[featureKey] = geoMetry;
      });

      countTotal = features.length;
      if (exceededTransferLimit) {
        // const data = {
        //   where,
        //   returnCountOnly: true,
        //   inSR: latestWkid,
        //   outSR: latestWkid,
        //   f: `json`,
        //   ...geometryData,
        //   ...getTokenObj(url),
        //   // ...(bufferData ? bufferData.filter : {})
        // };
        // const countData = await superagent.post(`${url}/${id}/query`).send(data).set({
        //   'Content-Type': 'application/x-www-form-urlencoded',
        // });
        // countTotal = JSON.parse(countData.text).count;

        const middlewareData = {
          source: tocLayer.type,
          exceededTransferLimit: true,
          where,
          latestWkid,
          geometryData,
          url,
          id,
          tocLayer,
          sorting,
          OBJECTID
        };
        countTotal = await createDrawFeature_MIDDLEWARE(middlewareData);
      }

      if (geometry || bufferData) {
        // const geometryIdsData = await superagent.post(`${url}/${id}/query`).send({
        //   where,
        //   inSR: latestWkid,
        //   outSR: latestWkid,
        //   returnIdsOnly: true,
        //   f: `json`,
        //   ...geometryData,
        //   ...getTokenObj(url),
        //   // ...(bufferData ? bufferData.filter : {})
        // }).set({
        //   'Content-Type': 'application/x-www-form-urlencoded',
        // });
        // const {
        //   objectIds
        // } = JSON.parse(geometryIdsData.text);

        const middlewareData = {
          source: tocLayer.type,
          allLayers,
          bufferData: true,
          where,
          latestWkid,
          geometryData,
          url,
          id,
          tocLayer
        };

        const objectIds = await createDrawFeature_MIDDLEWARE(middlewareData);

        dispatch({
          type: SET_FILTER_IDS,
          payload: objectIds
        });
      } else {
        dispatch({
          type: SET_FILTER_IDS,
          payload: null
        })
      }

      dispatch({
        type: SET_FILTER_TOTAL,
        payload: countTotal
      });
      dispatch({
        type: SET_FEATURES,
        payload: features
      });
      await dispatch({
        type: SET_ALL_FEATURES,
        payload: features
      });
      dispatch({
        type: SET_FEATURES_GEOMETRY,
        payload: featuresGeometry
      });
      if (countTotal <= 1000) {
        await dispatch(fetchAllFilteredRecords(middlewareData));
      }
    }

    const isFilter = (geometry || Object.keys(filtersData).length > 0 || bufferData) ? true : false;
    if (isFilter && countTotal <= 1000) {
      dispatch({
        type: SET_SELECTED_FEATURES,
        payload: {
          selectedFeatures: [],
          isAllFeaturesSelected: true
        }
      });
      dispatch({
        type: SET_AUTO_FOCUS,
        payload: true
      });
    }

    // console.log("filtersData", filtersData);

    await dispatch({
      type: SET_FILTERS_DATA,
      payload: filtersData
    });
    dispatch({
      type: SET_GEOMETRY_FILTER_DATA,
      payload: geometry
    });
    dispatch({
      type: SET_LOADING,
      payload: false
    });
    dispatch({
      type: SET_UPDATED_AT
    });
    await dispatch({
      type: SET_IS_FILTER,
      payload: isFilter
    });
    dispatch(getFilterOptions(filteroptions));
    dispatch(filterLayer(tocLayer));
    if (isAllFetched && geometry) {
      dispatch({
        type: SET_ALL_FETCHED,
        payload: false
      });
    }
  } catch (err) {
    // console.log('drawing err', err);
  }
}

/**
 * @function
 * @name fetchAllFilteredRecords
 * @description
 * fetch all records after applying a filter
 * @param {data} filter data
 * @returns {features}
 */

const fetchAllFilteredRecords = (data) => async (dispatch, getState) => {
  // console.log("data", data);
  try {
    const {
      // tocLayer: {
      //   url,
      //   id
      // },
      OBJECTID
    } = getState().tocData;
    delete data.resultRecordCount;

    const features = [];
    const featuresGeometry = {};
    const fetchAll = async (exceed = null) => {
      data.resultOffset = features.length;
      data.exceededTransferLimit = exceed;
      // const results = await superagent.post(`${url}/${id}/query`).send(data).set({
      //   'Content-Type': 'application/x-www-form-urlencoded',
      // });
      // const {
      //   features: allFeatures,
      //   exceededTransferLimit
      // } = JSON.parse(results.text);

      const {
        features: allFeatures,
        exceededTransferLimit
      } = await createDrawFeature_MIDDLEWARE(data);

      // allFeatures.forEach(feature => {
      //   features.push({
      //     attributes: feature.attributes
      //   });
      //   featuresGeometry[feature.attributes[OBJECTID]] = feature.geometry;
      // });

      allFeatures.forEach(feature => {
        const featureMiddlewareData = {
          source: data.tocLayer.type,
          feature,
          OBJECTID
        };
        const {
          attributes,
          geoMetry,
          featureKey
        } = createFeature_MIDDLEWARE(featureMiddlewareData);
        features.push({
          attributes: attributes
        });
        featuresGeometry[featureKey] = geoMetry;
      });
      if (exceededTransferLimit) {
        return fetchAll(exceededTransferLimit);
      }
      return features;
    }

    await fetchAll();

    dispatch({
      type: SET_FEATURES,
      payload: features
    });
    dispatch({
      type: SET_ALL_FEATURES,
      payload: features
    });
    await dispatch({
      type: SET_FEATURES_GEOMETRY,
      payload: featuresGeometry
    });

    return features;
  } catch(err) {
    // console.log("featchallRecords err", err);
  }
}

/**
 * @function
 * @name handleSorting
 * @description
 * handle sorting of TOC
 * @param {fieldName} fieldname
 * @returns {features}
 */

export const handleSorting = (fieldName = null) => async (dispatch, getState) => {
  try {
    if (fieldName) {
      dispatch({
        type: SET_LOADING,
        payload: true
      });
      let {
        sorting,
        filtersData,
        geometry,
        isAllFetched,
        features,
        filterTotal,
        isFilter,
        bufferData,
        filteredIds,
        tocLayer
      } = getState().tocData;
      if (sorting && sorting.fieldName === fieldName && sorting.type === 'ASC') {
        sorting.type = 'DESC';
      } else {
        sorting = {
          fieldName,
          type: 'ASC'
        }
      }
      if (isAllFetched || (isFilter && filterTotal <= 1000)) {
        features = features.sort(compareValues(fieldName));
        if (sorting.type === 'DESC') {
          features.reverse();
        }
        dispatch({
          type: SET_FEATURES,
          payload: features
        });
      } else {
        const {
          tocLayer: layer,
          tableLimit,
          OBJECTID
        } = getState().tocData;
        const latestWkid = getState().map.latestWkid;
        const {
          url,
          id
        } = layer;

        // let where = createWhereCondition(filtersData);
        const whereMiddlewareData = {
          source: tocLayer.type,
          filtersData,
          ids: null
        }
        let where = createWhereCondition_Middleware(whereMiddlewareData);

        let geometryData = {};
        if (geometry) {
          geometryData = {
            geometryType: geometry.type,
            geometry: geometry.coordinates
          }
        }

        if (bufferData) {
          where = `${OBJECTID} IN (${filteredIds ? filteredIds.join(',') : 0})`;
        }
        // const data = {
        //   where,
        //   returnGeometry: true,
        //   returnTrueCurves: false,
        //   outFields: '*',
        //   resultOffset: 0,
        //   inSR: latestWkid,
        //   outSR: latestWkid,
        //   f: `json`,
        //   resultRecordCount: tableLimit,
        //   orderByFields: `${fieldName} ${sorting.type}`,
        //   ...geometryData,
        //   ...getTokenObj(url)
        // }

        // let result = await superagent.post(`${url}/${id}/query`).send(data).set({
        //   'Content-Type': 'application/x-www-form-urlencoded',
        // });

        const middlewareData = {
          source: tocLayer.type,
          where,
          latestWkid,
          tableLimit,
          fieldName,
          sortingType: sorting.type,
          geometryData,
          url,
          id,
          tocLayer
        };

        let result = await createTocSorting_MIDDLEWARE(middlewareData);

        result = JSON.parse(result.text);
        const featuresData = result.features;
        features = [];
        const featuresGeometry = {};
        // featuresData.forEach(feature => {
        //   features.push({
        //     attributes: feature.attributes
        //   });
        //   featuresGeometry[feature.attributes[OBJECTID]] = feature.geometry;
        // });
        featuresData.forEach(feature => {
          const featureMiddlewareData = {
            source: tocLayer.type,
            feature,
            OBJECTID
          };
          const {
            attributes,
            geoMetry,
            featureKey
          } = createFeature_MIDDLEWARE(featureMiddlewareData);
          features.push({
            attributes: attributes
          });
          featuresGeometry[featureKey] = geoMetry;
        });
        dispatch({
          type: SET_FEATURES_GEOMETRY,
          payload: featuresGeometry
        });
        dispatch({
          type: SET_FEATURES,
          payload: features
        });
        dispatch({
          type: SET_ALL_FEATURES,
          payload: features
        });
      }
      dispatch({
        type: SET_UPDATED_AT
      });
      dispatch({
        type: SET_SORTING,
        payload: sorting
      });
      dispatch({
        type: SET_LOADING,
        payload: false
      });
      return features;
    }
  } catch (err) {
    // console.log('handle sorting err', err);
  }
}

export const updateDrawingState = (drawingState) => async (dispatch) => {
  dispatch({
    type: DRAWING_STATE,
    payload: drawingState
  });
}

export const setSpatialFilterState = (isDrawingState) => async (dispatch) => {
  dispatch({
    type: SPATIAL_FILTER_STATE,
    payload: isDrawingState
  });
  return;
}

/**
 * @function
 * @name getLayerDefination
 * @description
 * create the layer definition
 * @param {layerIds} layerIds
 * @returns {layer definition}
 */

export const getLayerDefination = (layerIds = [], eParams = '') => async (dispatch, getState) => {
  let layerDefs = {};
  try {
    const {
      layersData,
      tocLayer,
      // filtersData
    } = getState().tocData;
    const {projection} = getState().map;
    const {allLayers} = getState().layers;
    // console.log("projection", projection);
    // console.log("allLayers", allLayers);
    const layerType = allLayers.find(al => al.layerid === layerIds[0]);
    // console.log("layerType", layerType);
    const middlewareData = {
      source: layerType.type,
      layerIds,
      tocLayer,
      geometry: getState().tocData.geometry,
      filtersData: getState().tocData.filtersData,
      OBJECTID: getState().tocData.OBJECTID,
      filteredIds: getState().tocData.filteredIds,
      bufferData: getState().tocData.bufferData,
      layersData,
      eParams,
      allLayers,
      projection
    };
    layerDefs = createLayerDefinition_MIDDLEWARE(middlewareData);
    return layerDefs;
  } catch (err) {
    // console.log("module layer definition err", err);
    return layerDefs;
  }
}

export const averageDataToc = (dataArray) => async (dispatch, getState) => {
  dispatch({
    type: AVERAGE_DATA_TOC,
    payload: dataArray
  });
}

/**
* @function
* @name setDrawPopup
* @description
* set the drawing popup state
* @param {state} popup state
* @returns {state}
*/

export const setDrawPopup = (drawPopup) => async (dispatch, getState) => {
  dispatch({
    type: SET_DRAW_POPUP,
    payload: drawPopup
  })
}

/**
* @function
* @name setDrawType
* @description
* set the drawing type state
* @param {state} draw state
* @returns {state}
*/

export const setDrawType = (type) => async (dispatch, getState) => {
  dispatch({
    type: SET_DRAWING_TYPE,
    payload: type
  })
}

/**
* @function
* @name setTOCDrawing
* @description
* set the toc drawing state
* @param {state} drawing state
* @returns {state}
*/

export const setTOCDrawing = (val) => async (dispatch, getState) => {
  dispatch({
    type: SET_TOC_DRAWING,
    payload: val
  })
}

/**
* @function
* @name setPointPopup
* @description
* set the point popup state
* @param {state} popup state
* @returns {state}
*/

export const setPointPopup = (val) => async (dispatch, getState) => {
  dispatch({
    type: SET_POINT_POPUP,
    payload: val
  })
}

/**
 * @function
 * @name setCrs
 * @description
 * set the crs
 * @param {state} crs state
 * @returns {state}
 */

export const setCrs = (val) => (dispatch) => {
  dispatch({
    type: SET_CRS,
    payload: val
  })
}

/**
 * @function
 * @name setCrs
 * @description
 * set the crs
 * @param {state} crs state
 * @returns {state}
 */

export const setOldLayer = () => (dispatch, getState) => {
  try {
    const {
      oldTocLayer
    } = getState().tocData;
    // console.log("oldTocLayer", oldTocLayer);
    // dispatch(onOldLayerChange(oldTocLayer));
    if (oldTocLayer) {
      dispatch(onLayerChange(oldTocLayer));
    } else {
      dispatch({
        type: SET_LAYER,
        payload: null
      });
      dispatch({
        type: SET_FIELDS,
        payload: []
      })
    }
    dispatch({
      type: SET_INTERSECTION_POPUP,
      payload: false
    })
  } catch(err) {
    // console.log("setOldLayer err", err);
  }
}

//#endregion
