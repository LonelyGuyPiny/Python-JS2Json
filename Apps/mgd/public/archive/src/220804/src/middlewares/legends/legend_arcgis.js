import superagent from 'superagent'
import { getTokenForUrl } from "../../utils/common";
import {
  fetchAllLayersDataByParentId
} from '../../redux/modules/layers';

/**
* @function
* @name createLegend_ARCGIS
* @description
* create the legend for arcgis
* @param {Object} {data} layer config data
* @returns {layer}
*/
export const createLegend_ARCGIS = async(data) => {
  try {
    if (data.filterExtent) {
      const url = `${data.url}/${data.layerId}/query?geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&f=json&returnGeometry=false&geometry=${data.extent}&inSR=${data.latestWkid}&outFields=${data.uniquefield}&returnDistinctValues=true&outSR=${data.latestWkid}&where=${data.uniquefield} IS NOT NULL${getTokenForUrl(data.url)}`;
      return await superagent.get(url);
    } else if (data.filterExtentWhere) {
      const url = `${data.url}/${data.layerId}/query?geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&f=json&returnGeometry=false&geometry=${data.extent}&inSR=${data.latestWkid}&outFields=${data.uniquefield}&returnDistinctValues=false&outSR=${data.latestWkid}&where=1=1${getTokenForUrl(data.url)}`;
      return await superagent.get(url);
    } else if (data.returnIdsOnly) {
      const url = `${data.url}/${data.layerId}/query?f=json&returnIdsOnly=true&returnCountOnly=true&returnGeometry=false&spatialRel=esriSpatialRelIntersects&geometry=${data.extent}&geometryType=esriGeometryEnvelope&inSR=${data.latestWkid}&outFields=*&returnDistinctValues=false&outSR=${data.latestWkid}${getTokenForUrl(data.url)}`;
      return await superagent.get(url);
    }
    await fetchAllLayersDataByParentId(data.parentId);
    const results = await superagent.get(`${data.url}/legend?f=json${getTokenForUrl(data.url)}`);
    const ind = data.legends.findIndex(lg => lg.parentId === data.parentId);
    if (ind === -1) {
      const result = JSON.parse(results.text);
      data.legends.push({
        ...result,
        'parentId': data.parentId,
        url: data.url,
        type: data.source
      });
    }
    return {
      legends: data.legends
    };
  } catch(err) {
    console.log("err", err);
  }
}