// import store from 'store2';

import { formatArea, lengthFunction } from '../../utils/drawing';
import { JUST_MEASURE_INDEX } from '../../constants/drawing';
import store from 'store2';

const SET_LAYER = 'drawing/SET_LAYER';
const SET_DRAWING = 'drawing/SET_DRAWING';
const SET_DRAW_STYLE = 'drawing/SET_STYLE';
const SET_MEASURE_TYPE = 'drawing/SET_MEASURE_TYPE';
const SHOW_SEGMENT_LENGTH = 'drawing/SHOW_SEGMENT_LENGTH';
const CLEAR_PREVIOUS_MEASURE = 'drawing/CLEAR_PREVIOUS_MEASURE';
const SET_BOX_TAB = 'drawing/SET_BOX_TAB';
const SET_CIRCLE_TAB = 'drawing/SET_CIRCLE_TAB';
const SET_POLYGON_TAB = 'drawing/SET_POLYGON_TAB';
const SET_STORE_DATA = 'drawing/SET_STORE_DATA';
const SET_UPDATED_AT = 'drawing/SET_UPDATED_AT';
store('showSeg', true)
const initialState = {
  data: null,
  drawingSet: false,
  size: 5,
  color: '#ffffff',
  opacity: 1,
  drawType: 'Point',
  measureType: JUST_MEASURE_INDEX[0],
  showSegmentLength: true,
  clearPreviousMeasure: true,
  boxTab: 0,
  circleTab: 0,
  polygonTab: 0,
  storeData: {},
  updatedAt: Date.now()
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LAYER:
      return { ...state, data: action.payload };
    case SET_DRAWING:
      return { ...state, drawingSet: action.payload };
    case SET_DRAW_STYLE:
      return { ...state, drawType: action.payload };
    case SET_MEASURE_TYPE:
      return { ...state, measureType: action.payload };
    case SHOW_SEGMENT_LENGTH:
      return { ...state, showSegmentLength: action.payload };
    case CLEAR_PREVIOUS_MEASURE:
      return { ...state, clearPreviousMeasure: action.payload };
    case SET_BOX_TAB:
      return { ...state, boxTab: action.payload }
    case SET_CIRCLE_TAB:
      return { ...state, circleTab: action.payload }
    case SET_POLYGON_TAB:
      return { ...state, polygonTab: action.payload }
    case SET_STORE_DATA:
      return { ...state, storeData: action.payload }
    case SET_UPDATED_AT:
      return { ...state, updatedAt: Date.now() }
    default:
      return state;
  }
}

export const setDwaingLayer = (data) => async (dispatch, getState, api) => {
  // if (!getState().auth.user) {
  //   dispatch({ type: SET_LAYER, payload: null });
  //   return;
  // }
  //  console.log("data", data);
  // store('drawingData', data);
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

/**
 * @function
 * @name setDraingState
 * @description
 * set the state for drawing
 * @param {string} {val} size
 * @returns {drawing state}
 */

export const setDraingState = (val) => async (dispatch) => {
  dispatch({
    type: SET_DRAWING,
    payload: val
  })
}

/**
 * @function
 * @name setDrawStyle
 * @description
 * set the draw style for drawing
 * @param {string} {style} style
 * @returns {style}
 */
export const setDrawStyle = (style) => async (dispatch) => {
  dispatch({
    type: SET_DRAW_STYLE,
    payload: style
  })
}

/**
 * @function
 * @name setMeasureStyle
 * @description
 * set the measure style for measure
 * @param {string} {style} style
 * @returns {style}
 */
export const setMeasureStyle = (style) => async (dispatch) => {
  dispatch({
    type: SET_MEASURE_TYPE,
    payload: style
  })
}

/**
 * @function
 * @name showSegmentLength
 * @description
 * set the show Segment value for measure
 * @param {boolean} {value} val
 * @returns {boolean}
 */
export const showSegmentLength = (val) => async (dispatch) => {
  dispatch({
    type: SHOW_SEGMENT_LENGTH,
    payload: val
  })
  store('showSeg', val);
}

/**
 * @function
 * @name clearPreviousMeasure
 * @description
 * set the clear previous measure value for measure
 * @param {boolean} {value} val
 * @returns {boolean}
 */
export const clearPreviousMeasure = (val) => async (dispatch) => {
  dispatch({
    type: CLEAR_PREVIOUS_MEASURE,
    payload: val
  })
}

/**
 * @function
 * @name setBoxTab
 * @description
 * set the tab number for draw type
 * @param {number} {value} val
 * @returns {number}
 */
export const setBoxTab = (val) => async (dispatch) => {
  dispatch({
    type: SET_BOX_TAB,
    payload: val
  })
}

/**
 * @function
 * @name setCircleTab
 * @description
 * set the tab number for draw type
 * @param {number} {value} val
 * @returns {number}
 */
export const setCircleTab = (val) => async (dispatch) => {
  dispatch({
    type: SET_CIRCLE_TAB,
    payload: val
  })
}

/**
 * @function
 * @name setPolygonTab
 * @description
 * set the tab number for draw type
 * @param {number} {value} val
 * @returns {number}
 */
export const setPolygonTab = (val) => async (dispatch) => {
  dispatch({
    type: SET_POLYGON_TAB,
    payload: val
  })
}

/**
 * @function
 * @name setPolygonTab
 * @description
 * set the tab number for draw type
 * @param {number} {value} val
 * @returns {number}
 */
export const setStoreData = (data) => async (dispatch) => {
  // console.log("dispatch data", data);
  dispatch({
    type: SET_STORE_DATA,
    payload: data
  })
  // dispatch({
  //   type: SET_UPDATED_AT
  // })
  store('drawingData', data);
}

/**
 * @function
 * @name setPolygonTab
 * @description
 * set the tab number for draw type
 * @param {number} {value} val
 * @returns {number}
 */
export const removeStoreData = () => async (dispatch) => {
  // console.log("dispatch data", data);
  dispatch({
    type: SET_STORE_DATA,
    payload: {}
  })
  dispatch({
    type: SET_UPDATED_AT
  })
  store.remove('drawingData');
}