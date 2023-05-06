import { createLegend_ARCGIS, } from './legend_arcgis';
import { createLegend_GEOSERVER } from './legend_geoserver';
import SOURCE from '../../middlewares/sources';

/**
* @function
* @name createLayer_MIDDLEWARE
* @description
* middleware for layer loading from different sources
* @param {Object} {data} layer config data
* @returns {layers}
*/
export const createLegend_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createLegend_GEOSERVER(data);
    default:
      return createLegend_ARCGIS(data);
  }
}