// import store from 'store2';

import { formatArea, lengthFunction } from '../../utils/drawing'

const SET_LAYER = 'drawing/SET_LAYER';
const SET_DRAWING = 'drawing/SET_DRAWING';
const initialState = {
  data: null,
  drawingSet: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LAYER:
      return { ...state, data: action.payload };
    case SET_DRAWING:
      return { ...state, drawingSet: action.payload };
    default:
      return state;
  }
}

export const setDwaingLayer = (data) => async (dispatch, getState, api) => {
  // if (!getState().auth.user) {
  //   dispatch({ type: SET_LAYER, payload: null });
  //   return;
  // }
  dispatch({ type: SET_LAYER, payload: data });
};

export const updateMeasurementsOnLangChange = () => async (dispatch, getState, api) => {
  const { data } = getState().drawing;
  if (data) {
    const { translation } = getState().translation;
    Object.keys(data.measurements).forEach((featureId) => {
      const output = data.measurements[featureId];
      const measureTooltipElement = document.getElementById(`area${featureId}`);
      if (measureTooltipElement) {
        measureTooltipElement.innerHTML = `${output.value} ${translation[output.unit]}`;
      }
      const cMeasureTooltipElement = document.getElementById(`c-area${featureId}`);
      if (cMeasureTooltipElement) {
        cMeasureTooltipElement.innerHTML = `${output.value} ${translation[output.unit]}`;
      }
    });
  }
};

export const updateMeasurementsOnUnitChange = () => async (dispatch, getState, api) => {
  const { data } = getState().drawing;
  if (data) {
    const { translation } = getState().translation;
    
    Object.keys(data.measurements).forEach((featureId) => {
      const output = data.measurements[featureId];
      const selectedUnitType = getState().settings.selectedUnitType;
      let newOutput = output;

      if (output.type === 'AREA') {
        newOutput = formatArea(output.typeValue, selectedUnitType);
      } else if (output.type === 'LENGTH') {
        newOutput = lengthFunction(output.typeValue, selectedUnitType);
      }
      
      const measureTooltipElement = document.getElementById(`area${featureId}`);
      if (measureTooltipElement) {
        measureTooltipElement.innerHTML = `${newOutput.value} ${translation[newOutput.unit]}`;
      }

      data.measurements[featureId] = newOutput;
    });
    dispatch({ type: SET_LAYER, payload: data });
  }
};

export const setDraingState = (val) => async (dispatch, getState) => {
  dispatch({
    type: SET_DRAWING,
    payload: val
  })
}