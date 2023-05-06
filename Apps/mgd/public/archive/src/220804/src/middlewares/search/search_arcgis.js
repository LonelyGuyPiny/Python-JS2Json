import superagent from 'superagent'
import {
  getTokenObj,
  distinct
} from "../../utils/common";
import {
  settings
} from '../../config/settings';
import SOURCE from '../../middlewares/sources';

/**
 * @function
 * @name createSearch_ARCGIS
 * @description
 * create the search for arcgis
 * @param {Object} {data} search config data
 * @returns {search}
 */
export const createSearch_ARCGIS = async (data) => {
  try {
    let results = null;
    if(data.type === 'searchData') {
      const reqData = {
        where: data.where,
        returnGeometry: true,
        spatialRel: 'esriSpatialRelIntersects',
        outFields: '*',
        orderByFields: data.orderByFields,
        f: 'json',
        inSR: data.inSR,
        outSR: data.outSR,
        ...getTokenObj(data.url)
      }
      results = await superagent.post(`${data.url}/query`).send(reqData).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
    } else {
      const reqData = {
        f: 'json',
        ...getTokenObj(data.url)
      }
      const layerData = await superagent.post(data.url).send(reqData).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      results = JSON.parse(layerData.text);
    }
    return results;
  } catch (err) {
    console.log("err", err);
  }
}

/**
 * @function
 * @name createSearch_ARCGIS
 * @description
 * create the search for arcgis
 * @param {Object} {data} search config data
 * @returns {search}
 */
export const createSearchSpatial_ARCGIS = async (requestData) => {
  try {
    const findtheLayer = requestData.allLayers.find(al => al.name === requestData.layerName && al.groupname === undefined);
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
      layerDefs: requestData.layerDefs,
      ...getTokenObj(requestData.tokenSource)
    }
    let urlArrValues = requestData.combobox.source.split('/');
    urlArrValues.pop();
    let results = await superagent.post(`${urlArrValues.join('/')}/identify`).send(postData).set({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    let queryData = JSON.parse(results.text);
    queryData.fields = requestData.layer.layerData.fields;
      queryData.features = queryData.results;
      queryData.layer = {
        layerId: requestData.layer.layerData.id,
        id: requestData.layer.layerData.id,
        url: requestData.layer.source,
        name: requestData.layerName,
        cb_id: requestData.layer.cb_id,
        currentLinks: findtheLayer.currentlinks
      }
    return queryData;
  } catch(err) {
    console.log("err", err);
  }
}

/**
 * @function
 * @name createSearchOptions_ARCGIS
 * @description
 * create the search options for arcgis
 * @param {Object} {data} search data
 * @returns {search options}
 */
export const createSearchOptions_ARCGIS = (searchData) => {
  try {
    let options = searchData.data.features.map((feature, i) => ({
      key: i,
      value: feature.attributes[searchData.comboboxField],
      text: feature.attributes[searchData.comboboxField],
      geometry: feature.geometry
    }));
    options = distinct(options, 'value');
    options.sort((a, b) => a.value - b.value);
    return options;
  } catch(err) {
    console.log("err", err);
  }
}

/**
 * @function
 * @name createSearchLink_ARCGIS
 * @description
 * create the search link for arcgis
 * @param {Object} {data} link data
 * @returns {search link}
 */
export const createSearchRowData_ARCGIS = (rowData) => {
  try {
    let row = rowData.comboboxData[rowData.cb_id].features.filter(f => f.attributes[rowData.field] === rowData.value).map(f => f.attributes);
    return {
      row
    };
  } catch (err) {
    console.log("err", err);
  }
}

/**
 * @function
 * @name createSearchLink_ARCGIS
 * @description
 * create the search link for arcgis
 * @param {Object} {data} link data
 * @returns {search link}
 */
export const createSearchLink_ARCGIS = (linkData) => {
  try {
    const linkRes = linkData.links.filter(l => l.layerName === linkData.layerName && (l.source === SOURCE.ARCGIS || l.source === undefined));
    return linkRes;
  } catch (err) {
    console.log("err", err);
  }
}

/**
 * @function
 * @name createSearchGeometry_ARCGIS
 * @description
 * create the search geometry for arcgis
 * @param {Object} {data} geometry data
 * @returns {search geometry}
 */
export const createSearchGeometry_ARCGIS = (geometryData) => {
  try {
    const geometry = geometryData.comboboxData[geometryData.cb_id].features.filter(f => f.attributes[geometryData.field] === geometryData.value).map(f => f.geometry);
    geometry[0].type = geometryData.comboboxData[geometryData.cb_id].geometryType;
    return geometry;
  } catch (err) {
    console.log("err", err);
  }
}