//#region Imports
import superagent from 'superagent';
import moment from 'moment';
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
  getTokenForUrl,
  getTokenObj,
  dateFunction,
  downloadKMZFile,
  createWhereCondition,
  compareValues
} from '../../utils/common';
// import {
//   transCordinates
// } from '../../utils/map'
import {
  createSpatialData_MIDDLEWARE
} from '../../middlewares/spatialpopup/spatialpopup_middleware';
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
  pointPopup: false
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
        ...state, pointPopup:action.payload
      }
    case FLUSH_TOC_DATA:
      return initialState;
    default:
      return state;
  }
}
//#endregion

//#region Actions
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
  } catch {}
}

export const onLayerChange = (layer) => async (dispatch, getState) => {
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
    layersData
  } = getState().tocData;

  if (layersData[layerId] && layersData[layerId].bufferData) {
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
  //#endregion
  try {
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
    const data = {
      where: '1=1',
      returnGeometry: true,
      returnTrueCurves: false,
      outFields: '*',
      resultOffset: 0,
      inSR: latestWkid,
      outSR: latestWkid,
      f: `json`,
      resultRecordCount: tableLimit,
      ...getTokenObj(url)
    }

    const results = await superagent.post(`${url}/${id}/query`).send(data).set({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const {
      geometryType,
      features: allFeatures,
      fields,
      exceededTransferLimit
    } = JSON.parse(results.text);
    const OBJECTID = fields.find(f => f.type === 'esriFieldTypeOID').name;

    const features = [],
      featuresGeometry = {};
    allFeatures.forEach(feature => {
      features.push({
        attributes: feature.attributes
      });
      featuresGeometry[feature.attributes[OBJECTID]] = feature.geometry;
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
    const layerFields = allLayers.find(l => l.layerid === layerId).fields.map(f => {
      if (f.domain && f.domain.codedValues) {
        f.domainValues = f.domain.codedValues.reduce((obj, curr) => {
          obj[curr.code] = curr.name;
          return obj;
        }, {});
      } else {
        f.domainValues = null;
      }
      return f;
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
      payload: fields.filter(f => f.type !== 'esriFieldTypeOID').map(f => f.name)
    });
    dispatch({
      type: SET_LAYER,
      payload: layer
    });

    let countTotal = features.length;
    if (exceededTransferLimit) {
      const countData = await superagent.post(`${url}/${id}/query`).send({
        where: '1=1',
        returnCountOnly: true,
        outFields: '*',
        f: `json`,
        ...getTokenObj(url)
      }).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      countTotal = JSON.parse(countData.text).count;
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
  } catch (err) {
    // console.log('err', err);
    dispatch({
      type: SET_LOADING,
      payload: false
    });
  }
}

export const onLayerChangeSpaitalIntersection = (layer, bufferData = null, isPreviouslySelected = false) => async (dispatch, getState) => {
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
  dispatch({
    type: SET_BUFFER_DATA,
    payload: bufferData
  });
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

    const dataIds = {
      where: createWhereCondition(filtersData),
      returnIdsOnly: true,
      resultOffset: 0,
      inSR: latestWkid,
      outSR: latestWkid,
      f: `json`,
      ...bufferObj,
      ...getTokenObj(url)
    }

    const resultIds = await superagent.post(`${url}/${id}/query`).send(dataIds).set({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const {
      objectIdFieldName: OBJECTID,
      objectIds: filteredIds
    } = JSON.parse(resultIds.text);

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
      where,
      returnGeometry: true,
      returnTrueCurves: false,
      outFields: '*',
      resultOffset: 0,
      inSR: latestWkid,
      outSR: latestWkid,
      f: `json`,
      resultRecordCount: tableLimit,
      ...orderByFields,
      ...getTokenObj(url)
    }

    const result = await superagent.post(`${url}/${id}/query`).send(data).set({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const {
      geometryType,
      features: allFeatures,
      fields,
      exceededTransferLimit
    } = JSON.parse(result.text);

    const features = [];
    const featuresGeometry = {};
    allFeatures.forEach(feature => {
      features.push({
        attributes: feature.attributes
      });
      featuresGeometry[feature.attributes[OBJECTID]] = feature.geometry;
    });

    //Fields
    const layerFields = allLayers.find(l => l.layerid === layer.layerId).fields.map(f => {
      if (f.domain && f.domain.codedValues) {
        f.domainValues = f.domain.codedValues.reduce((obj, curr) => {
          obj[curr.code] = curr.name;
          return obj;
        }, {});
      } else {
        f.domainValues = null;
      }
      return f;
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
      payload: fields.filter(f => f.type !== 'esriFieldTypeOID').map(f => f.name)
    });
    dispatch({
      type: SET_LAYER,
      payload: layer
    });
    //#endregion

    //#region get total count
    const countData = await superagent.post(`${url}/${id}/query`).send({
      where: '1=1',
      returnCountOnly: true,
      outFields: '*',
      f: `json`,
      ...getTokenObj(url)
    }).set({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const countTotal = JSON.parse(countData.text).count;
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
  } catch {
    dispatch({
      type: SET_LOADING,
      payload: false
    });
  }
}

// export const onLayerChangeSpaitalIntersection = (layer, bufferData = null, isPreviouslySelected = false) => async (dispatch, getState) => {
//   //#region
//   try {
//     const {
//       url,
//       id,
//       layerId
//     } = layer;
//     const latestWkid = getState().map.latestWkid;
//     const {
//       layersData,
//       tableLimit
//     } = getState().tocData;
//     const {
//       visibleFields,
//       filtersData,
//       geometry,
//       isFilter,
//       sorting,
//       drawingData,
//       selectedFeatures,
//       isAllFeaturesSelected,
//       total,
//       OBJECTID,
//       filterTotal,
//       spaitalIntSecData
//     } = layersData[layerId];

//     const where = createWhereCondition(filtersData);
//     let geometryData = {};
//     if (geometry) {
//       geometryData = {
//         geometryType: geometry.type,
//         geometry: geometry.coordinates
//       }
//     }
//     const data = {
//       where,
//       returnGeometry: true,
//       returnTrueCurves: false,
//       outFields: '*',
//       resultOffset: 0,
//       inSR: latestWkid,
//       outSR: latestWkid,
//       f: `json`,
//       resultRecordCount: tableLimit,
//       orderByFields: sorting ? `${sorting.fieldName} ${sorting.type}` : OBJECTID,
//       ...geometryData,
//       ...getTokenObj(url)
//     }

//     const results = await superagent.post(`${url}/${id}/query`).send(data).set({
//       'Content-Type': 'application/x-www-form-urlencoded',
//     });

//     const {
//       geometryType,
//       features: allFeatures,
//       fields,
//       exceededTransferLimit
//     } = JSON.parse(results.text);

//     const features = []
//     const featuresGeometry = {};
//     allFeatures.forEach(feature => {
//       features.push({
//         attributes: feature.attributes
//       });
//       featuresGeometry[feature.attributes[OBJECTID]] = feature.geometry;
//     });

//     dispatch({
//       type: SET_FIELDS,
//       payload: fields
//     });
//     dispatch({
//       type: SET_GEOMETRY_FILTER_DATA,
//       payload: geometry
//     })
//     dispatch({
//       type: SET_SORTING,
//       payload: sorting
//     })
//     dispatch({
//       type: SET_FILTER_TOTAL,
//       payload: filterTotal
//     })
//     dispatch({
//       type: SET_IS_FILTER,
//       payload: isFilter
//     })
//     dispatch({
//       type: SET_FILTERS_DATA,
//       payload: filtersData
//     })
//     dispatch({
//       type: SET_VISIBLE_FIELDS,
//       payload: visibleFields
//     })
//     dispatch({
//       type: SET_TOTAL,
//       payload: total
//     })
//     dispatch({
//       type: SET_OBJECTID,
//       payload: OBJECTID
//     })
//     dispatch({
//       type: SET_DRAWING_DATA,
//       payload: drawingData
//     })
//     dispatch({
//       type: SET_SELECTED_FEATURES,
//       payload: {
//         selectedFeatures,
//         isAllFeaturesSelected
//       }
//     });

//     await dispatch({
//       type: SET_SPAITAL_INT_SEC_DATA,
//       payload: spaitalIntSecData
//     });

//     dispatch({
//       type: SET_GEOMETRY_TYPE,
//       payload: geometryType
//     });
//     dispatch({
//       type: SET_FEATURES,
//       payload: features
//     });
//     dispatch({
//       type: SET_ALL_FEATURES,
//       payload: features
//     });
//     dispatch({
//       type: SET_UPDATED_AT
//     });
//     dispatch({
//       type: SET_FEATURES_GEOMETRY,
//       payload: featuresGeometry
//     });
//     dispatch({
//       type: SET_OBJECTID,
//       payload: OBJECTID
//     });
//     dispatch({
//       type: SET_LAYER,
//       payload: layer
//     });
//     dispatch({
//       type: SET_LOADING,
//       payload: false
//     });
//     await dispatch({
//       type: SET_ALL_FETCHED,
//       payload: exceededTransferLimit ? false : true
//     });
//     dispatch(getFilterOptions());
//     return true;
//   } catch (err) {
//     // console.log('err', err);
//     dispatch({
//       type: SET_LOADING,
//       payload: false
//     });
//   }
// }

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

export const onOldLayerChange = (layer) => async (dispatch, getState) => {
  try {
    const {
      url,
      id,
      layerId
    } = layer;
    const latestWkid = getState().map.latestWkid;
    const {
      layersData,
      tableLimit
    } = getState().tocData;
    const {
      allLayers
    } = getState().layers;
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
      spaitalIntSecData
    } = layersData[layerId];

    const where = createWhereCondition(filtersData);
    let geometryData = {};
    if (geometry) {
      geometryData = {
        geometryType: geometry.type,
        geometry: geometry.coordinates
      }
    }
    const data = {
      where,
      returnGeometry: true,
      returnTrueCurves: false,
      outFields: '*',
      resultOffset: 0,
      inSR: latestWkid,
      outSR: latestWkid,
      f: `json`,
      resultRecordCount: tableLimit,
      orderByFields: sorting ? `${sorting.fieldName} ${sorting.type}` : OBJECTID,
      ...geometryData,
      ...getTokenObj(url)
    }

    const results = await superagent.post(`${url}/${id}/query`).send(data).set({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const {
      geometryType,
      features: allFeatures,
      // fields,
      exceededTransferLimit
    } = JSON.parse(results.text);

    const features = []
    const featuresGeometry = {};
    allFeatures.forEach(feature => {
      features.push({
        attributes: feature.attributes
      });
      featuresGeometry[feature.attributes[OBJECTID]] = feature.geometry;
    });

    //Fields
    const layerFields = allLayers.find(l => l.layerid === layerId).fields.map(f => {
      if (f.domain && f.domain.codedValues) {
        f.domainValues = f.domain.codedValues.reduce((obj, curr) => {
          obj[curr.code] = curr.name;
          return obj;
        }, {});
      } else {
        f.domainValues = null;
      }
      return f;
    });

    dispatch({
      type: SET_FIELDS,
      payload: layerFields
    });
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
    // console.log('err', err);
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

export const fetchNextRecords = (layer, offset, limit) => async (dispatch, getState) => {
  dispatch({
    type: SET_LOADING,
    payload: true
  });
  try {
    const {
      url,
      id
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
    const where = createWhereCondition(filtersData);
    let geometryData = {};
    if (geometry) {
      geometryData = {
        geometryType: geometry.type,
        geometry: geometry.coordinates
      }
    }
    const data = {
      where,
      returnGeometry: true,
      returnTrueCurves: false,
      outFields: '*',
      resultOffset: offset,
      inSR: latestWkid,
      outSR: latestWkid,
      f: `json`,
      resultRecordCount: limit,
      orderByFields: sorting ? `${sorting.fieldName} ${sorting.type}` : OBJECTID,
      ...geometryData,
      ...getTokenObj(url),
      ...(bufferData ? bufferData.filter : {})
    }

    const results = await superagent.post(`${url}/${id}/query`).send(data).set({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const {
      features: featuresData
    } = JSON.parse(results.text);

    const features = [];
    featuresData.forEach(feature => {
      features.push({
        attributes: feature.attributes
      });
      featuresGeometry[feature.attributes[OBJECTID]] = feature.geometry;
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
    // console.log(err);
    dispatch({
      type: SET_LOADING,
      payload: false
    });
  }
}

export const fetchingSpatialInformationData = (selectedLayers, coordinates) => async (dispatch, getState) => {
  try {
    const latestWkid = getState().map.latestWkid;
    const {
      tocLayer,
      layersData
    } = getState().tocData;
    const {
      allLayers
    } = getState().layers;
    const tocData = [];
    await Promise.all(selectedLayers.map(async ({
      url,
      id,
      text,
      key: layerId
    }) => {
      // let geometryData = {};
      let where = '1=1';
      let geometry = null,
        filtersData = {},
        filteredIds = null,
        bufferData = null,
        OBJECTID = null;
      if (tocLayer && tocLayer.layerId === layerId) {
        geometry = getState().tocData.geometry;
        filtersData = getState().tocData.filtersData;
        OBJECTID = getState().tocData.OBJECTID;
        filteredIds = getState().tocData.filteredIds;
        bufferData = getState().tocData.bufferData;
      } else if (layersData[layerId]) {
        geometry = layersData[layerId].geometry;
        filtersData = layersData[layerId].filtersData;
        OBJECTID = layersData[layerId].OBJECTID;
        filteredIds = layersData[layerId].filteredIds;
        bufferData = layersData[layerId].bufferData;
      }

      if (geometry && Object.keys(filtersData).length > 0) {
        where = createWhereCondition(filtersData);
        const layerWhereString = `${OBJECTID} IN (${filteredIds ? filteredIds.join(',') : 0})`;
        where += ` AND ${layerWhereString}`;
      } else if (geometry || bufferData) {
        where = `${OBJECTID} IN (${filteredIds ? filteredIds.join(',') : 0})`;
      } else if (Object.keys(filtersData).length > 0) {
        where = createWhereCondition(filtersData);
      }

      const postData = {
        where,
        geometryType: 'esriGeometryEnvelope',
        spatialRel: 'esriSpatialRelIntersects',
        f: 'json',
        returnGeometry: true,
        geometry: coordinates,
        inSR: latestWkid,
        outSR: latestWkid,
        outFields: '*',
        ...getTokenObj(url)
      }

      const res = await superagent.post(`${url}/${id}/query`).send(postData).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      const data = JSON.parse(res.text);

      if (!data.error) {
        const layerFields = allLayers.find(l => l.layerid === layerId).fields.map(f => {
          if (f.domain && f.domain.codedValues) {
            f.domainValues = f.domain.codedValues.reduce((obj, curr) => {
              obj[curr.code] = curr.name;
              return obj;
            }, {});
          } else {
            f.domainValues = null;
          }
          return f;
        });
        data.fields = layerFields;
        tocData.push({
          ...data,
          layerName: text,
          layer: {
            layerId,
            id,
            url,
            name: text
          }
        });
      }
    }));

    const searchResult = await dispatch(getSearchDataForSpaital(coordinates));
    if (searchResult) {
      tocData.push(searchResult);
    }
    const queryResult = await dispatch(getQueryUrlForSpaital(coordinates));
    if (queryResult) {
      tocData.push(queryResult);
    }
    const searchQueryResult = await dispatch(fetchSearchQueryData(coordinates));
    if (searchQueryResult) {
      tocData.push(searchQueryResult);
    }

    let spatialData = [];
    tocData.forEach(layerData => {
      if (layerData.features.length > 0) {
        layerData.features.forEach((feature) => {
          const row = {};
          row.attributes = Object.keys(feature.attributes).map(fieldName => {
            const fieldData = layerData.fields.find(f => f.name === fieldName);
            let value = feature.attributes[fieldName];
            if (fieldData.type === 'esriFieldTypeDate') {
              value = feature.attributes[fieldName] ? dateFunction(feature.attributes[fieldName]) : null;
            }
            return ({
              fieldName,
              value,
              fieldAlias: fieldData.alias,
              fieldType: fieldData.type,
              domainValues: fieldData.domainValues,
            });
          });
          row.geometry = feature.geometry;
          row.geometryType = layerData.geometryType;
          row.layerName = layerData.layerName;
          const fieldData = layerData.fields.find(f => f.type === 'esriFieldTypeOID');
          row.OIDName = fieldData.name !== fieldData.alias ? fieldData.alias : fieldData.name;
          row.layer = layerData.layer
          spatialData.push(row);
        });
      }
    });

    return ({
      spatialData
    });
  } catch (error) {
    // console.log(error);
    return ({
      spatialData: []
    });
  }

}

/**
* @function
* @name fetchingSpatialInformationDataForNewPopup
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

    const tocData = [];
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
      const replaceData = tocData.find(toc => toc.layer.id === id && !toc.geoServer);
      const tocIndex = tocData.findIndex(toc => toc.layer.id === id && !toc.geoServer);
      replaceData.features.forEach((feature, i) => {
        Object.keys(feature.attributes).forEach(fieldName => {
          const fieldReturn = filedsdata.find(fl => fl.name === fieldName);
          if(fieldReturn) {
            return null;
          }
          const fieldNameNew = filedsdata.find(fl => fl.alias === fieldName);
          if(fieldNameNew) {
            tocData[tocIndex].features[i].attributes[fieldNameNew.name] = tocData[tocIndex].features[i].attributes[fieldNameNew.alias];
            delete tocData[tocIndex].features[i].attributes[fieldNameNew.alias];
          }
        });
      });
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

    let spatialData = [];
    tocData.forEach(layerData => {
      if (layerData.features.length > 0) {
        layerData.features.forEach((feature) => {
          const row = {};
          if (layerData.geoServer) {
            row.crs = layerData.crs;
            row.attributes = Object.keys(feature.properties).map(fieldName => {
              let value = feature.properties[fieldName];
              return ({
                fieldName,
                value,
                fieldAlias: fieldName
              });
            });
            row.geometry = feature.geometry;
            row.geometryType = feature.geometry.type;
            row.layerName = layerData.layer.name;
            row.layer = layerData.layer;
            row.geoServer = true;
          } else {
            row.attributes = Object.keys(feature.attributes).map(fieldName => {
              const fieldData = layerData.fields.find(f => f.name === fieldName || f.alias === fieldName);
              let value = feature.attributes[fieldName];
              // if (fieldData && fieldData.type === 'esriFieldTypeDate') {
              //   value = feature.attributes[fieldName] ? dateFunction(feature.attributes[fieldName]) : null;
              // }
              return ({
                fieldName: fieldData ? fieldData.name : fieldName,
                value,
                fieldAlias: fieldData ? fieldData.alias : fieldName,
                // fieldType: fieldData ? fieldData.type : null,
                // domainValues: fieldData ? fieldData.domainValues: null,
              });
            });
            row.geometry = feature.geometry;
            row.geometryType = feature.geometryType;
            row.layerName = layerData.layerName;
            // const fieldData = layerData.fields.find(f => f.type === 'esriFieldTypeOID');
            // row.OIDName = fieldData.name !== fieldData.alias ? fieldData.alias : fieldData.name;
            row.layer = layerData.layer;
          }
          spatialData.push(row);
        });
      }
    });

    // console.log("spatialData", spatialData);

    return ({
      spatialData
    });
  } catch (error) {
    // console.log("error", error);
    return ({
      spatialData: []
    });
  }

}

export const fetchExportRecords = () => async (dispatch, getState) => {
  try {
    const {
      tocLayer: {
        url,
        id
      },
      filtersData,
      geometry,
      fields,
      bufferData
    } = getState().tocData;
    const latestWkid = getState().map.latestWkid;

    const where = createWhereCondition(filtersData);
    let geometryData = {};
    if (geometry) {
      geometryData = {
        geometryType: geometry.type,
        geometry: geometry.coordinates
      }
    }

    const data = {
      where,
      returnGeometry: false,
      returnTrueCurves: false,
      outFields: '*',
      inSR: latestWkid,
      outSR: latestWkid,
      f: `json`,
      ...geometryData,
      ...getTokenObj(url),
      ...(bufferData ? bufferData.filter : {})
    }

    let res = [];
    // let isAllFetched = true;
    const getResult = async (offset = 0) => {
      data.resultOffset = offset;
      const results = await superagent.post(`${url}/${id}/query`).send(data).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });

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
    const features = res.map(feature => {
      const obj = {};
      fields.forEach(f => {
        obj[f.alias] = feature.attributes[f.name]
      })
      return obj;
    })
    return features;
  } catch {}
}

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
        id
      },
      OBJECTID
    } = getState().tocData;
    const latestWkid = getState().map.latestWkid;
    const data = {
      where: '1=1',
      returnGeometry: true,
      returnTrueCurves: false,
      outFields: '*',
      inSR: latestWkid,
      outSR: latestWkid,
      f: `json`,
      ...getTokenObj(url)
    }

    let allFeatures = [];
    let isAllFetched = true;
    const getResult = async (offset = 0) => {
      data.resultOffset = offset;
      const results = await superagent.post(`${url}/${id}/query`).send(data).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });

      const {
        features,
        exceededTransferLimit
      } = JSON.parse(results.text);
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
    allFeatures.forEach(feature => {
      features.push({
        attributes: feature.attributes
      });
      featuresGeometry[feature.attributes[OBJECTID]] = feature.geometry;
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
    // console.log(err);
    dispatch({
      type: SET_LOADING,
      payload: false
    });
  }
}

export const getObjectIds = () => async (dispatch, getState) => {
  try {
    const {
      tocLayer: {
        url,
        id
      },
      filtersData,
      geometry,
      bufferData
    } = getState().tocData;
    const {
      latestWkid
    } = getState().map;

    const where = createWhereCondition(filtersData);
    let geometryData = {};
    if (geometry) {
      geometryData = {
        geometryType: geometry.type,
        geometry: geometry.coordinates
      }
    }

    const geometryIdsData = await superagent.post(`${url}/${id}/query`).send({
      where,
      inSR: latestWkid,
      outSR: latestWkid,
      returnIdsOnly: true,
      f: `json`,
      ...geometryData,
      ...getTokenObj(url),
      ...(bufferData ? bufferData.filter : {})
    }).set({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const {
      // objectIdFieldName,
      objectIds
    } = JSON.parse(geometryIdsData.text);
    return objectIds;
  } catch (err) {
    // console.log(err);
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
        id
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

    let where = createWhereCondition(filtersData, ids);
    let geometryData = '';

    if (bufferData) {
      where = `${OBJECTID} IN (${filteredIds ? filteredIds.join(',') : 0})`;
    } else if (geometry) {
      geometryData = `&geometryType=${geometry.type}&geometry=${geometry.coordinates}`;
    }

    const path = `${url}/${id}/query?where=${where}${geometryData}&f=kmz&inSR=${latestWkid}&outFields=*&${getTokenForUrl(url)}`;
    await downloadKMZFile(path, 'kmz');
    return true;
  } catch (err) {
    // console.log(err);
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
        id
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

    let where = createWhereCondition(filtersData, ids);
    let geometryData = '';

    if (bufferData) {
      where = `${OBJECTID} IN (${filteredIds ? filteredIds.join(',') : 0})`;
    } else if (geometry) {
      geometryData = `&geometryType=${geometry.type}&geometry=${geometry.coordinates}`;
    }

    const path = `${url}/${id}/query?where=${where}${geometryData}&f=GeoJSON&inSR=${latestWkid}&outFields=*&${getTokenForUrl(url)}`;
    await downloadKMZFile(path, 'json');
    return true;
  } catch (err) {
    // console.log(err);
  }
}

export const getFilterOptions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SET_FILTER_OPTIONS_LOADING,
      payload: true
    });
    const {
      fields,
      tocLayer: {
        url,
        id
      },
      filtersData,
      geometry,
      bufferData,
      filteredIds,
      OBJECTID
    } = getState().tocData;
    // const {
    //   // latestWkid
    // } = getState().map;

    let geometryData = {};
    if (geometry) {
      geometryData = {
        geometryType: geometry.type,
        geometry: geometry.coordinates
      }
    }
    // console.log('where', where, filtersData);
    let data = {
      returnGeometry: false,
      // returnTrueCurves: false,
      // inSR: latestWkid,
      // outSR: latestWkid,
      f: `json`,
      returnDistinctValues: true,
      ...geometryData,
      ...getTokenObj(url)
    }

    let fieldOptions = {}
    // console.log('fields =>>>>>>>', fields);
    for (const field of fields.filter(field => field.type === 'esriFieldTypeString' || field.domainValues)) {
      const filters = {};
      Object.keys(filtersData).forEach(key => {
        if (key !== field.name) {
          filters[key] = filtersData[key]
        }
      });

      let where = createWhereCondition(filters);
      if (bufferData) {
        const whereBuffer = `${OBJECTID} IN (${filteredIds ? filteredIds.join(',') : 0})`;

        if (where.trim() === '1=1') {
          where = whereBuffer;
        } else {
          where += ` AND ${whereBuffer}`;
        }
      }

      data = {
        ...data,
        where,
        outFields: field.name,
        orderByFields: field.name
      }

      const results = await superagent.post(`${url}/${id}/query`).send(data).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      const {
        features
      } = JSON.parse(results.text);
      if (features) {
        fieldOptions[field.name] = features.map(f => f.attributes[field.name]).filter(f => f !== "" && f !== null);
      }
    }

    dispatch({
      type: SET_FIELD_OPTIONS,
      payload: fieldOptions
    });
    dispatch({
      type: SET_FILTER_OPTIONS_LOADING,
      payload: false
    });
  } catch {}
}

export const filterFeatures = (data = {}, clearField = null, geometryNew = null, clearGeomtry = false) => async (dispatch, getState) => {
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
    } else if (clearField && filtersData[clearField]) {
      delete filtersData[clearField];
    } else if (data) {
      filtersData = {
        ...filtersData,
        ...data
      };
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
      // let features = [];
      let features = allFeatures.filter(f => {
        let isRow = true;
        Object.keys(filtersData).forEach(field => {
          let isFeature = true;
          if (filtersData[field].type === 'esriFieldTypeString') {
            if (filtersData[field].condition === 'same') {
              isFeature = filtersData[field].value.includes(f.attributes[field]);
            } else if (filtersData[field].condition === 'differ') {
              isFeature = !filtersData[field].value.includes(f.attributes[field]);
            }
          } else if (filtersData[field].type === 'esriFieldTypeDouble' || filtersData[field].type === 'esriFieldTypeSingle') {
            if (filtersData[field].isRange) {
              if (filtersData[field].condition === 'showInRange') {
                isFeature = (
                  Number(f.attributes[field].toFixed(2)) >= filtersData[field].value.min &&
                  Number(f.attributes[field].toFixed(2)) <= filtersData[field].value.max
                )
              } else {
                isFeature = (
                  Number(f.attributes[field].toFixed(2)) <= filtersData[field].value.min ||
                  Number(f.attributes[field].toFixed(2)) >= filtersData[field].value.max
                )
              }
            } else {
              if (filtersData[field].condition === 'same') {
                isFeature = Number(f.attributes[field].toFixed(2)) === filtersData[field].value;
              } else if (filtersData[field].condition === 'differ') {
                isFeature = (Number(f.attributes[field].toFixed(2)) !== filtersData[field].value);
              } else if (filtersData[field].condition === 'greater') {
                isFeature = (Number(f.attributes[field]) > filtersData[field].value);
              } else if (filtersData[field].condition === 'less') {
                isFeature = (Number(f.attributes[field]) < filtersData[field].value);
              }
            }
          } else if (['esriFieldTypeInteger', 'esriFieldTypeSmallInteger', 'esriFieldTypeOID'].includes(filtersData[field].type)) {
            if (filtersData[field].isRange) {
              if (filtersData[field].condition === 'showInRange') {
                isFeature = (
                  Number(f.attributes[field]) >= filtersData[field].value.min &&
                  Number(f.attributes[field]) <= filtersData[field].value.max
                )
              } else {
                isFeature = (
                  Number(f.attributes[field]) <= filtersData[field].value.min ||
                  Number(f.attributes[field]) >= filtersData[field].value.max
                )
              }
            } else {
              if (filtersData[field].condition === 'same') {
                isFeature = Number(f.attributes[field]) === filtersData[field].value;
              } else if (filtersData[field].condition === 'differ') {
                isFeature = (Number(f.attributes[field]) !== filtersData[field].value);
              } else if (filtersData[field].condition === 'greater') {
                isFeature = (Number(f.attributes[field]) >= filtersData[field].value);
              } else if (filtersData[field].condition === 'less') {
                isFeature = (Number(f.attributes[field]) <= filtersData[field].value);
              }
            }
          } else if (filtersData[field].type === 'esriFieldTypeDouble' || filtersData[field].type === 'esriFieldTypeSingle') {
            if (filtersData[field].isRange) {
              if (filtersData[field].condition === 'showInRange') {
                isFeature = (
                  Number(f.attributes[field]) >= filtersData[field].value.min &&
                  Number(f.attributes[field]) <= filtersData[field].value.max
                )
              } else {
                isFeature = (
                  Number(f.attributes[field]) <= filtersData[field].value.min ||
                  Number(f.attributes[field]) >= filtersData[field].value.max
                )
              }
            } else {
              if (filtersData[field].condition === 'same') {
                isFeature = dateFunction(f.attributes[field]) === dateFunction(filtersData[field].value);
              } else if (filtersData[field].condition === 'differ') {
                isFeature = dateFunction(f.attributes[field]) !== dateFunction(filtersData[field].value);
              } else if (filtersData[field].condition === 'greater') {
                isFeature = (Number(f.attributes[field]) >= filtersData[field].value);
              } else if (filtersData[field].condition === 'less') {
                isFeature = (Number(f.attributes[field]) <= filtersData[field].value);
              }
            }
          } else if (filtersData[field].type === 'esriFieldTypeDate') {
            if (filtersData[field].isRange) {
              const minDate = moment(filtersData[field].value.min).format('YYYY-MM-DD');
              const maxDate = moment(filtersData[field].value.max).format('YYYY-MM-DD');
              const min = moment(minDate + ' 00:00', 'YYYY-MM-DD hh:mm').unix() * 1000;
              const max = moment(maxDate + ' 23:59', 'YYYY-MM-DD hh:mm').unix() * 1000;
              if (filtersData[field].condition === 'showInRange') {
                isFeature = (
                  Number(f.attributes[field]) >= min &&
                  Number(f.attributes[field]) <= max
                )
              } else {
                isFeature = (
                  Number(f.attributes[field]) <= min ||
                  Number(f.attributes[field]) >= max
                )
              }
            } else {
              const date = moment(filtersData[field].value).format('YYYY-MM-DD');
              const min = moment(date + ' 00:00', 'YYYY-MM-DD hh:mm').unix() * 1000;
              const max = moment(date + ' 23:59', 'YYYY-MM-DD hh:mm').unix() * 1000;
              if (filtersData[field].condition === 'same') {
                isFeature = (
                  Number(f.attributes[field]) >= min &&
                  Number(f.attributes[field]) <= max
                )
              } else if (filtersData[field].condition === 'differ') {
                isFeature = (
                  Number(f.attributes[field]) <= min ||
                  Number(f.attributes[field]) >= max
                )
              } else if (filtersData[field].condition === 'greater') {
                isFeature = Number(f.attributes[field]) >= min
              } else if (filtersData[field].condition === 'less') {
                isFeature = Number(f.attributes[field]) <= max
              }
            }
          }
          if (isFeature && isRow) {
            isRow = true;
          } else {
            isRow = false;
          }
        });
        return isRow;
      });

      dispatch({
        type: SET_FEATURES,
        payload: features
      });
      dispatch({
        type: SET_FILTER_TOTAL,
        payload: features.length
      });
      const where = createWhereCondition(filtersData);
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
      if (geometry) {
        geometryData = {
          geometryType: geometry.type,
          geometry: geometry.coordinates
        }
      }

      let where = createWhereCondition(filtersData);
      if (bufferData) {
        const whereBuffer = `${OBJECTID} IN (${bufferIds ? bufferIds.join(',') : 0})`;
        if (where.trim() === '1=1') {
          where = whereBuffer;
        } else {
          where += ` AND ${whereBuffer}`;
        }
      }

      const data = {
        where,
        returnGeometry: true,
        returnTrueCurves: false,
        outFields: '*',
        resultOffset: 0,
        inSR: latestWkid,
        outSR: latestWkid,
        f: `json`,
        resultRecordCount: tableLimit,
        orderByFields: sorting && sorting.fieldName ? `${sorting.fieldName} ${sorting.type}` : OBJECTID,
        ...geometryData,
        ...getTokenObj(url),
        // ...(bufferData ? bufferData.filter : {})
      }

      const results = await superagent.post(`${url}/${id}/query`).send(data).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });

      const {
        features: allFeatures,
        exceededTransferLimit
      } = JSON.parse(results.text);

      const features = [];
      const featuresGeometry = {};
      allFeatures.forEach(feature => {
        features.push({
          attributes: feature.attributes
        });
        featuresGeometry[feature.attributes[OBJECTID]] = feature.geometry;
      });

      countTotal = features.length;
      if (exceededTransferLimit) {
        const countData = await superagent.post(`${url}/${id}/query`).send({
          where,
          returnCountOnly: true,
          inSR: latestWkid,
          outSR: latestWkid,
          f: `json`,
          ...geometryData,
          ...getTokenObj(url),
          // ...(bufferData ? bufferData.filter : {})
        }).set({
          'Content-Type': 'application/x-www-form-urlencoded',
        });
        countTotal = JSON.parse(countData.text).count;
      }

      if (geometry || bufferData) {
        const geometryIdsData = await superagent.post(`${url}/${id}/query`).send({
          where,
          inSR: latestWkid,
          outSR: latestWkid,
          returnIdsOnly: true,
          f: `json`,
          ...geometryData,
          ...getTokenObj(url),
          // ...(bufferData ? bufferData.filter : {})
        }).set({
          'Content-Type': 'application/x-www-form-urlencoded',
        });
        const {
          objectIds
        } = JSON.parse(geometryIdsData.text);

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
        await dispatch(fetchAllFilteredRecords(data));
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
    dispatch(getFilterOptions());
    dispatch(filterLayer(tocLayer));
    if (isAllFetched && geometry) {
      dispatch({
        type: SET_ALL_FETCHED,
        payload: false
      });
    }
  } catch (err) {
    // console.log('err', err);
  }
}

const fetchAllFilteredRecords = (data) => async (dispatch, getState) => {
  try {
    const {
      tocLayer: {
        url,
        id
      },
      OBJECTID
    } = getState().tocData;
    delete data.resultRecordCount;

    const features = [];
    const featuresGeometry = {};
    const fetchAll = async () => {
      data.resultOffset = features.length;
      const results = await superagent.post(`${url}/${id}/query`).send(data).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      const {
        features: allFeatures,
        exceededTransferLimit
      } = JSON.parse(results.text);

      allFeatures.forEach(feature => {
        features.push({
          attributes: feature.attributes
        });
        featuresGeometry[feature.attributes[OBJECTID]] = feature.geometry;
      });
      if (exceededTransferLimit) {
        return fetchAll();
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
  } catch {}
}

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
        filteredIds
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
        let where = createWhereCondition(filtersData);
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
        const data = {
          where,
          returnGeometry: true,
          returnTrueCurves: false,
          outFields: '*',
          resultOffset: 0,
          inSR: latestWkid,
          outSR: latestWkid,
          f: `json`,
          resultRecordCount: tableLimit,
          orderByFields: `${fieldName} ${sorting.type}`,
          ...geometryData,
          ...getTokenObj(url)
        }

        let result = await superagent.post(`${url}/${id}/query`).send(data).set({
          'Content-Type': 'application/x-www-form-urlencoded',
        });

        result = JSON.parse(result.text);
        const featuresData = result.features;
        features = []
        const featuresGeometry = {};
        featuresData.forEach(feature => {
          features.push({
            attributes: feature.attributes
          });
          featuresGeometry[feature.attributes[OBJECTID]] = feature.geometry;
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
    // console.log('err', err);
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

export const getLayerDefination = (layerIds = []) => async (dispatch, getState) => {
  let layerDefs = {};
  try {
    const {
      layersData,
      tocLayer
    } = getState().tocData;
    layerIds.forEach(layerId => {
      let where = '';
      let geometry = null,
        filtersData = {},
        filteredIds = null,
        OBJECTID = null,
        layer = null,
        bufferData = null;
      if (tocLayer && tocLayer.layerId === layerId) {
        geometry = getState().tocData.geometry;
        filtersData = getState().tocData.filtersData;
        OBJECTID = getState().tocData.OBJECTID;
        filteredIds = getState().tocData.filteredIds;
        bufferData = getState().tocData.bufferData;
        layer = tocLayer
      } else if (layersData[layerId]) {
        layer = layersData[layerId].tocLayer
        geometry = layersData[layerId].geometry;
        filtersData = layersData[layerId].filtersData;
        OBJECTID = layersData[layerId].OBJECTID;
        filteredIds = layersData[layerId].filteredIds;
        bufferData = layersData[layerId].bufferData;
      }

      if (geometry && Object.keys(filtersData).length > 0) {
        where = createWhereCondition(filtersData);
        const layerWhereString = `${OBJECTID} IN (${filteredIds ? filteredIds.join(',') : 0})`;
        where += ` AND ${layerWhereString}`;
      } else if (geometry || bufferData) {
        where = `${OBJECTID} IN (${filteredIds ? filteredIds.join(',') : 0})`;
      } else if (Object.keys(filtersData).length > 0) {
        where = createWhereCondition(filtersData);
      }
      if (layer) {
        layerDefs[layer.id] = where;
      }
    })

    return JSON.stringify(layerDefs);
  } catch (err) {
    // console.log(err);
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

//#endregion
