import Axios from 'axios';
import FileDownload from 'js-file-download';
import superagent from 'superagent';
import exportList from '../../config/export';
import { getTokenObj } from '../../utils/common';

const SET_EXPORT_DATA = 'export/SET_EXPORT_DATA';
const SET_FILE_TYPE = 'export/SET_FILE_TYPE';
const SET_CURRENT_TITLE = 'export/SET_CURRENT_TITLE';
const SET_CURRENT_EXPORT_TAB = 'export/SET_CURRENT_EXPORT_TAB';
const SET_CURRENT_PAGE_SIZE = 'export/SET_CURRENT_PAGE_SIZE';
const SET_LEGEND_OPTION = 'export/SET_LEGEND_OPTION';
const SET_LOADING = 'export/SET_LOADING';
const SET_DPI_VAL = 'export/SET_DPI_VAL';
const SET_SCALE_VAL = 'export/SET_SCALE_VAL';
const SET_FORMAT_VAL = 'export/SET_FORMAT_VAL';

const initialState = {
  setExportData: {},
  selectedFileType : '',
  currentTitle: '',
  exportTab: 'horizontal',
  pageSize: '',
  legendOption: true,
  loading: false,
  dpi: exportList[0].dpi[0].default,
  scale:  'current',
  format: exportList[0].output_formats[0],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_EXPORT_DATA:
      return {
        ...state, setExportData: action.payload
      };
    case SET_FILE_TYPE:
      return {
        ...state, selectedFileType: action.payload
      };
    case SET_CURRENT_TITLE:
      return {
        ...state, currentTitle: action.payload
      }
    case SET_CURRENT_EXPORT_TAB:
      return {
        ...state, exportTab: action.payload
      };
    case SET_CURRENT_PAGE_SIZE:
      return {
        ...state, pageSize: action.payload
      }
    case SET_LEGEND_OPTION:
      return {
        ...state, legendOption: action.payload
      }
    case SET_LOADING:
      return {
        ...state, loading: action.payload
      }
    case SET_DPI_VAL: 
    return {
      ...state, dpi: action.payload
    };
    case SET_SCALE_VAL:
      return {
        ...state, scale: action.payload
      };
    case SET_FORMAT_VAL:
      return {
        ...state, format: action.payload
      };
    default:
      return state;
  }
}

/**
* @function
* @name exportdataToApi
* @description
* function download the exported file
* @param {Object} {key:value} pair of data objects
* @returns {none}
*/

export const exportdataToApi = (data, fileType) => async (dispatch, getState, api) => {
  // const res = await api.post(`/export`, { data });
  Axios({
    url: 'https://gis-intertown-api.symple.co.in/export',
   // url: 'http://localhost:8000/export',
    method: 'POST',
    data,
    responseType: 'blob', // important
  }).then((response) => {
    FileDownload(response.data, `export.${fileType}`);
  });
  dispatch({
    type: SET_EXPORT_DATA,
    payload: data
  })
  return true;
}

/**
* @function
* @name createExport
* @description
* function open the pdf in new tab
* @param {Object} {key:value} pair of json objects
* @returns {none}
*/

export const createExport = (jsonObject, layout_template, format) => async (dispatch, getState, api) => {
  dispatch({
    type: SET_LOADING,
    payload: true
  })
  const jsonData = {
    Web_Map_as_JSON: jsonObject,
    Format: format,
    Layout_Template: `${layout_template}`,
    f: 'json',
    ...getTokenObj(exportList[0].url)
  }
  const res = await superagent.post(`${exportList[0].url}`).send(jsonData).set({'Content-Type': 'application/x-www-form-urlencoded',
  });
  const response = JSON.parse(res.text);
  if (response.error) {
    dispatch({
      type: SET_LOADING,
      payload: false
    })
    return false;
  }
  let url = response.results && response.results[0].value.url;
  if(format === 'pdf' || format === 'PDF') {
    window.open(url)
  } else {
    const formatArr = response.results[0].value.url.split('.');
    await Axios({
      url,
      method: 'GET',
      responseType: 'blob', // Important
    }).then((response) => {
        FileDownload(response.data, `map.${formatArr[formatArr.length-1]}`);
    });
  }
  dispatch({
    type: SET_LOADING,
    payload: false
  })
  return true;
}

/**
* @function
* @name setTitle
* @description
* set the current title of export
* @param {param} title
* @returns {state} title
*/

export const setTitle = (title) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_TITLE,
    payload: title
  })
}

/**
* @function
* @name setExportTab
* @description
* set the current tab of export
* @param {param} tabName
* @returns {state} tab
*/

export const setExportTab = (tab) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_EXPORT_TAB,
    payload: tab
  })
}

/**
* @function
* @name setPageSize
* @description
* set the current page size of export
* @param {param} size
* @returns {state} pageSize
*/

export const setPageSize = (size) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_PAGE_SIZE,
    payload: size
  })
}

/**
* @function
* @name setLegendValue
* @description
* set the legend value of export
* @param {boolean} legend
* @returns {state} legend
*/

export const setLegendValue = (legend) => async (dispatch) => {
  dispatch({
    type: SET_LEGEND_OPTION,
    payload: legend
  })
}

/**
* @function
* @name setDPIValue
* @description
* set the dpi value of export
* @param {number} dpi
* @returns {state} dpi
*/

export const setDPIValue = (dpi) => async (dispatch) => {
  dispatch({
    type: SET_DPI_VAL,
    payload: dpi
  })
}

/**
* @function
* @name setScaleValue
* @description
* set the scale value of export
* @param {string} scale
* @returns {state} scale
*/

export const setScaleValue = (scale) => async (dispatch) => {
  dispatch({
    type: SET_SCALE_VAL,
    payload: scale
  })
}

/**
* @function
* @name setFormatValue
* @description
* set the format value of export
* @param {string} format
* @returns {state} format
*/

export const setFormatValue = (format) => async (dispatch) => {
  dispatch({
    type: SET_FORMAT_VAL,
    payload: format
  })
}
