import store from 'store2';
import spatialRefData from '../../config/spatialRef';

const SET_SPATIAL_REFERENCE = 'settings/SET_SPATIAL_REFERENCE';
const SET_SPATIAL_REF = 'settings/SET_SPATIAL_REF';
const SET_DISTANCE_UNIT = 'settings/SET_DISTANCE_UNIT';
const SET_AREA_UNIT = 'settings/SET_AREA_UNIT';
const SET_UNIT_TYPE = 'settings/SET_UNIT_TYPE';

const initialState = {
  selectedSpatialReference: store('spatialRefProj') || (spatialRefData && spatialRefData[0] ? spatialRefData[0].proj : ''),
  selectedDistanceUnit: store('distanceUnit') || '',
  selectedAreaUnit: store('areaUnit') || '',
  selectedUnitType: store('unitType') || 'metric',
  spatialRefData,
  selectedSpaitalRef: store('spatialRef') || (spatialRefData && spatialRefData[0] ? spatialRefData[0] : {})
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SPATIAL_REFERENCE:
      return {
        ...state, selectedSpatialReference: action.payload
      };
    case SET_SPATIAL_REF:
      return {
        ...state, selectedSpaitalRef: action.payload
      };
    case SET_DISTANCE_UNIT:
      return {
        ...state, selectedDistanceUnit: action.payload
      };
    case SET_AREA_UNIT:
      return {
        ...state, selectedAreaUnit: action.payload
      };
    case SET_UNIT_TYPE:
      return {
        ...state, selectedUnitType: action.payload
      };
    default:
      return state;
  }
}

export const setSpatialReference = (spatialRefProj) => async (dispatch, getState) => {
  const spatialRef = getState().settings.spatialRefData.find(s => s.proj === spatialRefProj);
  dispatch({
    type: SET_SPATIAL_REFERENCE,
    payload: spatialRefProj
  })
  dispatch({
    type: SET_SPATIAL_REF,
    payload: spatialRef
  });
  store('spatialRefProj', spatialRefProj);
  store('spatialRef', spatialRef);
}

export const saveMesasurement = (distanceUnit = null, areaUnit = null, unitType) => async (dispatch, getState) => {
  store('distanceUnit', distanceUnit);
  store('areaUnit', areaUnit);
  store('unitType', unitType);
  await dispatch({
    type: SET_UNIT_TYPE,
    payload: unitType
  });
  return unitType;
}
