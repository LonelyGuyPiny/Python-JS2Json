import superagent from "superagent";
import { getTokenForUrl, getTokenObj, downloadKMZFile } from '../../utils/common';
import SOURCE from '../../middlewares/sources';
import {
  createLayerDataArray
} from '../../utils/layer';

/**
* @function
* @name createLayer_ARCGIS
* @description
* create the layer for arcgis
* @param {Object} {data} layer config data
* @returns {layer}
*/
export const createLayer_ARCGIS = async (requestData) => {
  try {
    let res;
    if (requestData.findByParent) {
      const postData = {
        f: 'json',
        ...getTokenObj(requestData.api.url)
      };
      res = await superagent.post(`${requestData.api.url}/${requestData.api.id}`).send(postData).set({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
    } else {
      const postData = {
        f: 'json',
        inSR: requestData.latestWkid,
        outSR: requestData.latestWkid,
        ...getTokenObj(requestData.api.url)
      };
      res = await superagent.post(`${requestData.api.url}`).send(postData).set({
        'Content-Type': 'application/x-www-form-urlencoded'
      }).timeout({
        response: 3000, // Wait 3 seconds for the server to start sending,
        deadline: 60000, // but allow 1 minute for the file to finish loading.
      });
      res.serverType = SOURCE.ARCGIS;
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
 * @name createLayerData_ARCGIS
 * @description
 * create the layer data for arcgis
 * @param {Object} {data} layer response data
 * @returns {layer}
 */
export const createLayerData_ARCGIS = (requestData) => {
  const layerData = JSON.parse(requestData.text);
  const data = [];
  if (!layerData.error) {
    data.push({
      ...layerData,
      url: requestData.url,
      virtualGroup: requestData.virtualGroup,
      export: requestData.export
    });
  }
  const layerRes = createLayerDataArray(data, requestData.length);
  layerRes.forEach(layer => {
    layer.type = SOURCE.ARCGIS;
  });
  return layerRes;
}

/**
 * @function
 * @name createLayerLink_ARCGIS
 * @description
 * create the layer link for arcgis
 * @param {Object} {data} layer link data
 * @returns {layer link}
 */
export const createLayerLink_ARCGIS = (requestData) => {
  const linkRes = requestData.links.filter(cl => cl.layerName === requestData.name && (cl.source === SOURCE.ARCGIS || cl.source === undefined));
  return linkRes;
}

/**
* @function
* @name export_ARCGIS
* @description
* export layer data for arcgis
* @param {Object} {data} layer data
* @returns {export data}
*/
export const export_ARCGIS = async(exportType, data) => {
  switch(exportType) {
    case 'csv':
      return export_CSV(data)
    case 'json':
      return export_GeoJSON(data)
    case 'kmz':
      return export_KMZ(data)
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
    const data = {
      where: '1=1',
      returnGeometry: false,
      returnTrueCurves: false,
      outFields: '*',
      f: `json`,
      ...getTokenObj(exportData.url)
    }

    let res = [];
    let fields = null;
    const getResult = async (offset = 0) => {
      data.resultOffset = offset;
      // console.log();
      const results = await superagent.post(`${exportData.url}/${exportData.id}/query`).send(data).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });

      const {
        features,
        fields: fieldsData,
        exceededTransferLimit
      } = JSON.parse(results.text);
      res = [...res, ...features];
      fields = fieldsData;

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
  } catch(err) {
    // console.log("err", err);
    return false;
  }
}

/**
* @function
* @name export_KMZ
* @description
* export kmz data for arcgis layer
* @param {Object} {data} layer data
* @returns {kmz data}
*/
export const export_KMZ = async(exportData) => {
  try {
    await downloadKMZFile(`${exportData.url}/${exportData.id}/query?where=1=1&outFields=*&f=kmz${getTokenForUrl(exportData.url)}`, 'kmz');
    return true;
  } catch (err) {
    // console.log("err", err);
    return false;
  }
}

/**
* @function
* @name export_GeoJSON
* @description
* export geojson data for arcgis layer
* @param {Object} {data} layer data
* @returns {geojson data}
*/
export const export_GeoJSON = async(exportData) => {
  try {
    await downloadKMZFile(`${exportData.url}/${exportData.id}/query?where=1=1&outFields=*&f=GeoJSON${getTokenForUrl(exportData.url)}`, 'json');
    return true;
  } catch(err) {
    // console.log("err", err);
    return false;
  }
}