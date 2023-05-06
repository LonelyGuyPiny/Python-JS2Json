import superagent from "superagent";
import {
  settings
} from '../../config/settings';
import {
  getTokenObj,
  getTokenForUrl
} from '../../utils/common';
import SOURCE from '../sources';

/**
 * @function
 * @name createSpatialData_ARCGIS
 * @description
 * create the spatial popup data for arcgis
 * @param {Object} {data} layer config data
 * @returns {spatial data}
 */
export const createSpatialData_ARCGIS = async (requestData) => {
  try {
    if (requestData.fieldRequest) {
      return await superagent.get(`${requestData.url}/${requestData.id}?f=pjson${getTokenForUrl(requestData.url)}`);
    }
    const postData = {
      f: 'json',
      tolerance: settings.tolerance || 8,
      returnGeometry: true,
      returnFieldName: false,
      returnUnformattedValues: false,
      imageDisplay: requestData.imageDisplay,
      geometry: requestData.geometry,
      geometryType: requestData.geometryType,
      sr: requestData.sr,
      mapExtent: requestData.mapExtent,
      layers: requestData.layers,
      ...getTokenObj(requestData.url)
    }
    const res = await superagent.post(`${requestData.url}/identify`).send(postData).set({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const resData = JSON.parse(res.text);
    const fieldRequest = [];
    const responseData = [];
    if (!resData.error) {
      requestData.ids.forEach(id => {
        const filterData = resData.results.filter(dr => dr.layerId === id);
        const layersData = requestData.allLayers.filter(sl => sl.url === requestData.url);
        const newLayerData = layersData.find(ld => ld.id === id);
        const currentLinks = requestData.links.findIndex(l => l.layerName === newLayerData.text || l.groupUrl === requestData.url);
        if (currentLinks !== -1) {
          const fieldObject = {
            url: requestData.url,
            id,
            type: requestData.type
          }
          fieldRequest.push(fieldObject);
        }

        const findlayersFields = layersData.find(l => l.id === id).fields;

        let layerFields = [];

        if (findlayersFields !== null && findlayersFields !== undefined) {
          layerFields = findlayersFields.map(f => {
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
        }
        resData.fields = layerFields;
        resData.features = filterData;
        resData.type = SOURCE.ARCGIS;
        responseData.push({
          ...resData,
          layerName: newLayerData.text,
          layer: {
            layerId: newLayerData.key,
            id,
            url: requestData.url,
            name: newLayerData.text,
            currentLinks: newLayerData.currentlinks
          }
        });
      });
    }
    return {
      fieldRequest,
      responseData
    };
  } catch (err) {
    // console.log("createSpatialData_ARCGIS err", err);
  }
}

/**
 * @function
 * @name createReplacedSpatialData_ARCGIS
 * @description
 * create replaced spatial data for arcgis sources
 * @param {Object} {data} spatial data
 * @returns {spatial replaced data}
 */

export const createReplacedSpatialData_ARCGIS = (requestData) => {
  try {
    const replaceData = requestData.tocData.find(toc => toc.layer.id === requestData.id && toc.type === SOURCE.ARCGIS);
    const tocIndex = requestData.tocData.findIndex(toc => toc.layer.id === requestData.id && toc.type === SOURCE.ARCGIS);
    const tocData = requestData.tocData;
    replaceData.features.forEach((feature, i) => {
      Object.keys(feature.attributes).forEach(fieldName => {
        const fieldReturn = requestData.filedsdata.find(fl => fl.name === fieldName);
        if (fieldReturn) {
          return null;
        }
        const fieldNameNew = requestData.filedsdata.find(fl => fl.alias === fieldName);
        if (fieldNameNew) {
          tocData[tocIndex].features[i].attributes[fieldNameNew.name] = tocData[tocIndex].features[i].attributes[fieldNameNew.alias];
          delete tocData[tocIndex].features[i].attributes[fieldNameNew.alias];
        }
      });
    });
    return tocData;
  } catch(err) {
    // console.log("replace data err", err);
  }
}

/**
 * @function
 * @name createPopupSpatialData_ARCGIS
 * @description
 * create spatial popup data for arcgis sources
 * @param {Object} {data} spatial data
 * @returns {spatial popup data}
 */

export const createPopupSpatialData_ARCGIS = (requestData) => {
  try {
    const layerData = requestData.layerData;
    const spatialData = [];
    layerData.features.forEach((feature) => {
      const row = {};
      row.attributes = Object.keys(feature.attributes).map(fieldName => {
        const fieldData = layerData.fields.find(f => f.name === fieldName || f.alias === fieldName);
        let value = feature.attributes[fieldName];
        return ({
          fieldName: fieldData ? fieldData.name : fieldName,
          value,
          fieldAlias: fieldData ? fieldData.alias : fieldName,
        });
      });
      row.geometry = feature.geometry;
      row.geometryType = feature.geometryType;
      row.layerName = layerData.layerName;
      row.layer = layerData.layer;
      spatialData.push(row);
    });
    return spatialData;
  } catch(err) {
    // console.log("popup data err", err);
  }
}