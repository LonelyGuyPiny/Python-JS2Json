import superagent from "superagent";
import {
  settings
} from '../../config/settings';
import {
  getTokenObj,
  getTokenForUrl
} from '../../utils/common';

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

        if (findlayersFields !== null) {
          layerFields = layersData.find(l => l.id === id).fields.map(f => {
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
    console.log("err", err);
  }
}