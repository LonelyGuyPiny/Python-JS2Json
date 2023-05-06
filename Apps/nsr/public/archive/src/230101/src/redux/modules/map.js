import { mapData } from '../../config/settings';
import store from 'store2';

const basepath = sessionStorage.getItem("basepath");

const SET_MAP = 'basemap/SET_MAP';
const SET_COMPARE_MAP = 'basemap/SET_COMPARE_MAP';
const SET_VIEW_DATA = 'basemap/SET_VIEW_DATA';

const initialState = {
  map: null,
  compareMap: null,
  latestWkid: mapData.latestWkid,
  projection: mapData.projection,
  ViewData: store(`${basepath}-ViewData`) ? store(`${basepath}-ViewData`) : null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MAP:
      return {...state, map: action.payload };
    case SET_COMPARE_MAP:
      return {...state, compareMap: action.payload };
    case SET_VIEW_DATA:
      return { ...state, ViewData: action.payload }
    default:
      return state;
  }
}


// export const createMap = () => async (dispatch, getState, api) => {
//   // dispatch({ type: SET_MAP, payload: map });
// };

/**
 * @function
 * @name setMap
 * @description
 * set the map
 * @param {Object} {map} map Object
 * @returns {map}
 */

export const setMap = (map) => async (dispatch, getState, api) => {
  dispatch({ type: SET_MAP, payload: map });
};

/**
 * @function
 * @name setCompareMap
 * @description
 * set the comapre map
 * @param {Object} {comapremap} basemap Object
 * @returns {comapre map}
 */

export const setCompareMap = (map) => async (dispatch, getState, api) => {
  dispatch({ type: SET_COMPARE_MAP, payload: map });
};

/**
 * @function
 * @name setMapData
 * @description
 * set the map data
 * @param {Object} {data} data Object
 * @returns {data}
 */

export const setMapData = (data) => async(dispatch) => {
  dispatch({
    type: SET_VIEW_DATA,
    payload: data
  });
  store(`${basepath}-ViewData`, data);
}