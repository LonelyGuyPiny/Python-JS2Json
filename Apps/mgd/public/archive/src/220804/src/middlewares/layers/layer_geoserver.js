import superagent from "superagent";
import SOURCE from '../../middlewares/sources';
import WMSCapabilities from 'ol/format/WMSCapabilities';
import { createGeoLayerDataArray } from '../../utils/layer';
import { downloadFile } from '../../utils/common';

/**
* @function
* @name createLayer_GEOSERVER
* @description
* create the layer for geoserver
* @param {Object} {data} layer config data
* @returns {layer}
*/
export const createLayer_GEOSERVER = async(requestData) => {
  try {
    let res;
    if (requestData.geomRequest) {
      const postData = {
        version: '2.0.0',
        request: 'describeFeatureType',
        service: 'wfs',
        typeName: requestData.typeName,
        outputFormat: 'application/json'
      };
      res = await superagent.post(`${requestData.url}/wfs`).send(postData).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
    } else {
      const postData = {
        service: 'wms',
        version: '1.3.0',
        request: 'GetCapabilities',
        namespace: requestData.apiNameSpace
      };
      res = await superagent.post(`${requestData.api.url}/ows`).send(postData).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      }).timeout({
        response: 3000, // Wait 3 seconds for the server to start sending,
        deadline: 60000, // but allow 1 minute for the file to finish loading.
      });
      res.serverType = SOURCE.GEOSERVER;
      res.export = requestData.api.export;
    }
    return res;
  } catch(err) {
    // console.log("err", err);
    if (err.timeout) {
      return {
        layerapi: requestData.api,
        isTimeOut: true,
        isError: false
      }
    }
    return null;
  }
}

/**
 * @function
 * @name createLayerData_GEOSERVER
 * @description
 * create the layer data for geoserver
 * @param {Object} {data} layer response data
 * @returns {layer}
 */
export const createLayerData_GEOSERVER = (requestData) => {
const parser = new WMSCapabilities();
  const layerData = parser.read(requestData.text);
  const data = [];
  if (!layerData.error) {
    data.push({
      ...layerData,
      url: requestData.url,
      virtualGroup: requestData.virtualGroup,
      export: requestData.export
    });
  }
  const layerRes = createGeoLayerDataArray(data, requestData.nameSpaceGroupArr, requestData.length);
  layerRes.forEach(layer => {
    layer.type = SOURCE.GEOSERVER;
  });
  return layerRes;
}

/**
 * @function
 * @name createLayerData_GEOSERVER
 * @description
 * create the layer data for geoserver
 * @param {Object} {data} layer response data
 * @returns {layer}
 */
export const createLayerLink_GEOSERVER = (requestData) => {
  const linkRes = requestData.links.filter(cl => cl.layerName === requestData.name && cl.source === SOURCE.GEOSERVER);
  return linkRes;
}

/**
* @function
* @name export_GEOSERVER
* @description
* export layer data for geoserver
* @param {Object} {data} layer data
* @returns {export data}
*/
export const export_GEOSERVER = async(exportType, data) => {
  switch(exportType) {
    case 'shapezip':
      return export_SHAPEZIP(data)
    case 'json':
      return export_JSON(data)
    case 'kml':
      return export_KML(data)
    case 'excel':
      return export_EXCEL(data)
    case 'csv':
      return export_CSV(data)
    case 'gml3':
      return export_gml3(data)
    default:
    return data
  }
}

/**
* @function
* @name export_CSV
* @description
* export csv data for arcgis layer
* @param {Object} {data} layer data
* @returns {csv data}
*/
export const export_CSV = async(exportData) => {
  try {
    await downloadFile(exportData.path, exportData.name, 'csv');
    return true;
  } catch(err) {
    // console.log("err", err);
    return false;
  }
}

/**
* @function
* @name export_JSON
* @description
* export json data for arcgis layer
* @param {Object} {data} layer data
* @returns {json data}
*/
export const export_JSON = async(exportData) => {
  try {
    await downloadFile(exportData.path, exportData.name, 'json');
    return true;
  } catch(err) {
    // console.log("err", err);
    return false;
  }
}

/**
* @function
* @name export_KML
* @description
* export kml data for arcgis layer
* @param {Object} {data} layer data
* @returns {kml data}
*/
export const export_KML = async(exportData) => {
  try {
    await downloadFile(exportData.path, exportData.name, 'kml');
    return true;
  } catch(err) {
    // console.log("err", err);
    return false;
  }
}

/**
* @function
* @name export_EXCEL
* @description
* export excel data for arcgis layer
* @param {Object} {data} layer data
* @returns {excel data}
*/
export const export_EXCEL = async(exportData) => {
  try {
    await downloadFile(exportData.path, exportData.name, 'xlsx');
    return true;
  } catch(err) {
    // console.log("err", err);
    return false;
  }
}

/**
* @function
* @name export_SHAPEZIP
* @description
* export zip data for arcgis layer
* @param {Object} {data} layer data
* @returns {zip data}
*/
export const export_SHAPEZIP = async(exportData) => {
  try {
    await downloadFile(exportData.path, exportData.name, 'zip');
    return true;
  } catch(err) {
    // console.log("err", err);
    return false;
  }
}

/**
 * @function
 * @name export_gml3
 * @description
 * export gml3 data for arcgis layer
 * @param {Object} {data} layer data
 * @returns {gml3 data}
 */
export const export_gml3 = async (exportData) => {
  try {
    await downloadFile(exportData.path, exportData.name, 'gml');
    return true;
  } catch (err) {
    // console.log("err", err);
    return false;
  }
}
