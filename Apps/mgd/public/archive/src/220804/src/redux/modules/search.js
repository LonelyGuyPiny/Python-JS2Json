// import store from 'store2';
// import superagent, {
//   // parse
// } from 'superagent';
import searchConfigData from '../../config/search';
// import { transCordinates } from '../../utils/map';
// import {
//   distinct,
//   // distinct,
//   // getTokenForUrl,
//   // getTokenObj
// } from '../../utils/common'
// import {
//   settings
// } from '../../config/settings';
import {
  createSearch_MIDDLEWARE,
  createSearchOptions_MIDDLEWARE,
  createSearchSpatialData_MIDDLEWARE
} from '../../middlewares/search/search_middleware';
// import WMSCapabilities from 'ol/format/WMSCapabilities';

const SET_SEARCH_DATA = 'search/SET_SEARCH_DATA';
const FETCH_LAYER_DATA = 'search/FETCH_LAYER_DATA';
const SET_ACTIVE_SEARCH = 'search/SET_ACTIVE_SEARCH';
const SET_PREV_ACTIVE_SEARCH = 'search/SET_PREV_ACTIVE_SEARCH';
const SET_ACTIVE_COMBOBOX = 'search/SET_ACTIVE_COMBOBOX';
const SET_QUERY_DATA = 'search/SET_QUERY_DATA';
const SET_VALUES = 'search/SET_VALUES';
const SET_LOADING = 'search/SET_LOADING';
const SET_COMBOBOX = 'search/SET_COMBOBOX';
const SET_COMBOBOX_VALUES = 'search/SET_COMBOBOX_VALUES';
const SET_SEARCHED_DATA = 'search/SET_SEARCHED_DATA';
const SET_COMBOBOX_LOADING = 'search/SET_COMBOBOX_LOADING';
const SET_COMBOBOX_OPTIONS = 'search/SET_COMBOBOX_OPTIONS';

const initialState = {
  searchData: searchConfigData,
  layersData: [],
  searchQueryData: {},
  activeSearchId: null,
  activeCbId: null,
  selectedValues: {},
  prevActiveSearchId: null,
  loading: false,
  combobox: {},
  comboboxValues: {},
  searchedData: {},
  comboboxLoading: {},
  comboboxUdatedAt: Date.now(),
  comboboxOptions: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LAYER_DATA:
      return {
        ...state, layersData: action.payload
      };
    case SET_SEARCH_DATA:
      return {
        ...state, searchData: action.payload
      };
    case SET_ACTIVE_SEARCH:
      return {
        ...state, activeSearchId: action.payload
      };
    case SET_PREV_ACTIVE_SEARCH:
      return {
        ...state, prevActiveSearchId: action.payload
      };
    case SET_ACTIVE_COMBOBOX:
      return {
        ...state, activeCbId: action.payload
      };
    case SET_QUERY_DATA:
      return {
        ...state, searchId: action.payload
      };
    case SET_VALUES:
      return {
        ...state, selectedValues: action.payload
      };
    case SET_LOADING:
      return {
        ...state, loading: action.payload
      };
    case SET_COMBOBOX:
      return {
        ...state, combobox: action.payload
      };
    case SET_COMBOBOX_VALUES:
      return {
        ...state, comboboxValues: action.payload
      };
    case SET_SEARCHED_DATA:
      return {
        ...state, searchedData: action.payload
      };
    case SET_COMBOBOX_LOADING:
      return {
        ...state, comboboxLoading: action.payload, comboboxUdatedAt: Date.now()
      };
    case SET_COMBOBOX_OPTIONS:
      return {
        ...state, comboboxOptions: action.payload
      }
    default:
      return state;
  }
}

/**
 * @function
 * @name setActiveSearch
 * @description
 * set active search
 * @param {Object} {params} (searchId, comboboxId)
 * @returns {search id, combobox id}
 */

export const setActiveSearch = (searchId, cb_id) => async (dispatch, getState) => {
  const {
    activeSearchId
  } = getState().search;
  dispatch({
    type: SET_PREV_ACTIVE_SEARCH,
    payload: activeSearchId
  });
  dispatch({
    type: SET_ACTIVE_SEARCH,
    payload: searchId
  });
  dispatch({
    type: SET_ACTIVE_COMBOBOX,
    payload: cb_id
  });
}

/**
 * @function
 * @name setActiveSearchId
 * @description
 * Dset active search id
 * @param {Object} {param} (searchId)
 * @returns {searchId}
 */

export const setActiveSearchId = (searchId) => async (dispatch, getState) => {
  dispatch({
    type: SET_ACTIVE_SEARCH,
    payload: searchId
  });
}

/**
 * @function
 * @name setValues
 * @description
 * set value for search
 * @param {Object} {params} (searchId, values)
 * @returns {key:value} search pair object
 */

export const setValues = (searchId, values) => async (dispatch, getState) => {
  const {
    selectedValues
  } = getState().search;
  dispatch({
    type: SET_VALUES,
    payload: {
      ...selectedValues,
      [searchId]: values
    }
  });
}

/**
 * @function
 * @name fetchDataForSearch
 * @description
 * fetch data for search
 * @param {Object} {params} (searchId, combobox, comboboxValues, isParent)
 * @returns {search data}
 */

export const fetchDataForSearch = (searchId, combobox, comboboxValues, isParent, type, layer, layerField, timeOutApi=false) => async (dispatch, getState, api) => {
  try {
    const {
      latestWkid
    } = getState().map;
    const {
      searchQueryData,
      comboboxOptions,
      comboboxLoading
    } = getState().search;
    const {
      source,
      field,
      filters,
      cb_id
    } = combobox;

    if (isParent && searchQueryData[searchId] && searchQueryData[searchId][cb_id]) {
      return searchQueryData[searchId][cb_id];
    }

    const createValue = (attr, value) => {
      if (typeof value == 'number') {
        return (`${attr}=${value}`);
      } else if (value.includes("'")) {
        return (`${attr}='${value.replaceAll("'", "''")}'`);
      }
      return (`${attr}='${value}'`);
    }

    let where = '1=1';
    if (filters) {
      where = filters.filter(f => comboboxValues[f.cb_id] ? true : false).map(f => createValue(f.field, comboboxValues[f.cb_id]));
      if (where.length > 0) {
        where = where.join(' AND ')
      }
    }

    const middlewareData = {
      source: type,
      type: 'searchData',
      where,
      orderByFields: `${field} ASC`,
      inSR: latestWkid,
      outSR: latestWkid,
      url: source,
      layer,
      field: layerField,
      timeOutApi: timeOutApi
    };

    const results = await createSearch_MIDDLEWARE(middlewareData);
    if (results) {
      const data = JSON.parse(results.text);
      if (!data.error) {
        const middlewareData = {
          source: type,
          data,
          comboboxField: combobox.field
        };
        let options = [];
        if (data && data.features) {
          options = createSearchOptions_MIDDLEWARE(middlewareData);
        }
        searchQueryData[searchId] = searchQueryData[searchId] || {};
        comboboxOptions[searchId] = comboboxOptions[searchId] || {};
        searchQueryData[searchId][cb_id] = data;
        comboboxOptions[searchId][cb_id] = options;
        comboboxLoading[searchId] = {
          ...comboboxLoading[searchId], [cb_id]: false
        }

        dispatch({
          type: SET_QUERY_DATA,
          payload: searchQueryData
        });
        dispatch({
          type: SET_COMBOBOX_OPTIONS,
          payload: comboboxOptions
        });
        dispatch({
          type: SET_COMBOBOX_LOADING,
          payload: comboboxLoading
        })
        return data
      }
    }
    return null;
  } catch (err) {
    // console.log("error", err);
    return null;
  }
}

/**
 * @function
 * @name fetchInitialSearchLayersData
 * @description
 * fetch initial search data
 * @param {Object} {}
 * @returns {search data}
 */

export const fetchInitialSearchLayersData = () => async (dispatch, getState, api) => {
  await dispatch({
    type: SET_SEARCH_DATA,
    payload: searchConfigData
  });
  await dispatch({
    type: FETCH_LAYER_DATA,
    payload: []
  });
  const comboboxLoading = {};
  searchConfigData.forEach(({id}) => { comboboxLoading[id] = true });
  dispatch({
    type: SET_COMBOBOX_LOADING,
    payload: comboboxLoading
  });
  // return true;
  await dispatch(fetchSearchLayersData());
  await dispatch(fetchDataForAllComboboxes());
}

/**
 * @function
 * @name fetchSearchLayersData
 * @description
 * fetch serach layer data
 * @param {Object} {}
 * @returns {search data}
 */

export const fetchSearchLayersData = () => async (dispatch, getState, api) => {
  try {
    dispatch({
      type: SET_LOADING,
      payload: true
    })
    const {
      searchData,
      layersData,
    } = getState().search;
    if (layersData && layersData.length > 0) {
      dispatch({
        type: SET_LOADING,
        payload: false
      })
      return;
    }
    const layers = []
    searchData.forEach(search => {
      search.comboboxes.forEach(cb => {
        layers.push({
          type: search.type,
          id: search.id,
          cb_id: cb.cb_id,
          source: cb.source,
          layer: cb.layer,
          field: cb.field,
          group: search.group
        });
      });
    });

    const payload = [];
    const errorSearch = [];
    const timeOutApis = [];
    await Promise.all(layers.map(async cb => {
      try {
        const middlewareData = {
          source: cb.type,
          url: cb.source,
          layer: cb.layer,
          field: cb.field,
          group: cb.group
        };
        const layerData = await createSearch_MIDDLEWARE(middlewareData);
        if (!layerData.error) {
          payload.push({
            ...cb,
            layerData
          });
        } else if (layerData.error) {
          if (!errorSearch.includes(cb.id)) {
            errorSearch.push(cb.id);
          }
        }
      } catch(err) {
        if(err.timeout) {
          errorSearch.push(cb.id);
          // timeOutApis.push(cb);
        }
        // timeOutApis.push(cb);
      }
    }));

    dispatch({
      type: SET_LOADING,
      payload: false
    });
    dispatch({
      type: FETCH_LAYER_DATA,
      payload
    });
    dispatch({
      type: SET_SEARCH_DATA,
      payload: searchData.filter(s => !errorSearch.includes(s.id))
    });
    dispatch(afterFetchLayers(payload, timeOutApis));
    return payload;
  } catch (err) {
    // console.log('fetchSearchLayersData', err)
    return [];
  }
}

/**
 * @function
 * @name afterFetchLayers
 * @description
 * fetch after timeout api data
 * @param {Object} {param} (timeOutApis)
 * @returns {timeOutApis}
 */

export const afterFetchLayers = (payload, timeOutApis) => async (dispatch) => {
  if (timeOutApis.length > 0) {
    dispatch(fetchTimeOutLayers(timeOutApis));
  }
}

/**
 * @function
 * @name fetchTimeOutLayers
 * @description
 * fetch timeout apis data
 * @param {Object} {param} (TimeoutLayerApis)
 * @returns {search data}
 */

export const fetchTimeOutLayers = (TimeoutLayerApis) => async (dispatch, getState, api) => {
  const {
    comboboxValues
  } = getState().search;
  await Promise.all(TimeoutLayerApis.map(async cb => {
    const searchConfigCombo = searchConfigData.find(scd => scd.id === cb.id);
    const combobox = searchConfigCombo.comboboxes.find(cmb => cmb.cb_id === cb.cb_id);
    dispatch(fetchDataForSearch(cb.id, combobox, comboboxValues, false, cb.type, cb.layer, cb.field, true))
  }));

  return true;
}

/**
 * @function
 * @name getSearchDataForSpaital
 * @description
 * fetch the spatial popup data for search
 * @param {params} (coordinates and geometryType)
 * @returns {state}
 */

export const getSearchDataForSpaital = (coordinates, bboxCordinate, geometryType) => async (dispatch, getState, api) => {
  try {
    const {
      searchData,
      activeSearchId,
      activeCbId,
      layersData,
      selectedValues,
      // combobox,
      // comboboxValues,
      // searchQueryData
    } = getState().search;

    const {
      map,
      projection
    } = getState().map;
    const {allLayers} = getState().layers;
    const mapExtent = map.getView().calculateExtent(map.getSize());
    const mapSize = map.getSize();

    const search = searchData.find(s => s.id === activeSearchId);
    if (search) {
      const latestWkid = getState().map.latestWkid;
      const layer = layersData.find(l => l.id === activeSearchId && l.cb_id === activeCbId);
      const layerName = layer.layerData.name || layer.layerData.Title;
      const combobox = search.comboboxes.find(cb => cb.cb_id === activeCbId);
      const urlArr = combobox.source.split('/');
      const layerid = urlArr[urlArr.length - 1];
      let cqlFilter;

      const createValue = (attr, value) => {
        if (typeof value == 'number') {
          return (`${attr}=${value}`);
        } else if (value.includes("'")) {
          return (`${attr}='${value.replaceAll("'", "''")}'`);
        }
        return (`${attr}='${value}'`);
      }

      let where = [];
      if (combobox.filters) {
        where = combobox.filters.filter(f => selectedValues[activeSearchId][f.cb_id] && f.required === true ? true : false).map(f => createValue(f.field, selectedValues[activeSearchId][f.cb_id]));
      }

      if (selectedValues[activeSearchId][combobox.cb_id] !== undefined) {
        where.push(createValue(combobox.field, selectedValues[activeSearchId][combobox.cb_id]));
      }
      if (where.length > 0) {
        where = where.join(' AND ')
      }

      const middlewareData = {
        source: search.type,
        allLayers,
        combobox,
        imageDisplay: `${mapSize.toString()},96`,
        geometry: coordinates,
        projection: projection,
        bboxCordinate,
        geometryType: geometryType,
        sr: latestWkid,
        mapExtent: mapExtent.join(','),
        layers: `all:${layerid}`,
        layerDefs: `{"${layerid}":"${where}"}`,
        tokenSource: combobox.source,
        url: combobox.source,
        where,
        cqlFilter,
        typeNames: combobox.layer,
        layerName,
        layer
      }
      const queryData = await createSearchSpatialData_MIDDLEWARE(middlewareData);
      if (queryData.features && queryData.features.length > 0) {
        dispatch({
          type: SET_SEARCHED_DATA,
          payload: {
            ...queryData,
            layerName
          }
        });
        return ({
          ...queryData,
          layerName
        });
      }
      return null;
    }
  } catch (err) {
    console.log('err', err);
    return false;
  }
}

/**
 * @function
 * @name fetchDataForAllComboboxes
 * @description
 * fetch the all comboxes data
 * @param {Object} {}
 * @returns {comboboxes data}
 */

export const fetchDataForAllComboboxes = () => async (dispatch, getState) => {
  const res = await Promise.all(searchConfigData.map(async ({
    id,
    comboboxes,
    type
  }) => {
    const result = await dispatch(fetchDataForComboboxes(id, comboboxes, type));
    const { comboboxLoading } = getState().search;
    comboboxes.forEach(combobox => {
      comboboxLoading[id] = {
        ...comboboxLoading[id],
        [combobox.cb_id]: false
      };
    })
    dispatch({
      type: SET_COMBOBOX_LOADING,
      payload: comboboxLoading
    });
    return result;
  }))
  return res;
}

/**
 * @function
 * @name fetchDataForComboboxes
 * @description
 * fetch the data for combobox
 * @param {Object} {params} (searchId, comboboxes, isParent)
 * @returns {combobox data}
 */

const fetchDataForComboboxes = (searchId, comboboxes, type, isParent = true) => async (dispatch, getState) => {
  const { comboboxLoading } = getState().search;
  const res = await Promise.all(comboboxes.map(combobox => {
    comboboxLoading[searchId] = {...comboboxLoading[searchId], [combobox.cb_id]: true};
    if (combobox.filters && combobox.filters.length > 0) {
      const filter = combobox.filters.find(f => f.cb_id !== null);
      if (filter) {
        const isFetch = combobox.filters.filter(f => f.required === true).map(f => {
          return false;
        });
        if (!isFetch.includes(false)) {
          return dispatch(fetchDataForSearch(searchId, combobox, {}, isParent, type, combobox.layer, combobox.field))
        }
      }
      return true;
    } else {
      return dispatch(fetchDataForSearch(searchId, combobox, {}, isParent, type, combobox.layer, combobox.field));
    }
  }));
  return res;
}
