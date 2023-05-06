import { mapData } from '../../config/settings'

const SET_MAP = 'basemap/SET_MAP';
const SET_COMPARE_MAP = 'basemap/SET_COMPARE_MAP';

const initialState = {
  map: null,
  compareMap: null,
  latestWkid: mapData.latestWkid,
  projection: mapData.projection
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MAP:
      return {...state, map: action.payload };
    case SET_COMPARE_MAP:
      return {...state, compareMap: action.payload };
    default:
      return state;
  }
}


// export const createMap = () => async (dispatch, getState, api) => {
//   // dispatch({ type: SET_MAP, payload: map });
// };

export const setMap = (map) => async (dispatch, getState, api) => {
  dispatch({ type: SET_MAP, payload: map });
};

export const setCompareMap = (map) => async (dispatch, getState, api) => {
  dispatch({ type: SET_COMPARE_MAP, payload: map });
};