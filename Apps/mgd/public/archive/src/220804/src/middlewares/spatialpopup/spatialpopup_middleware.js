import {
  createSpatialData_ARCGIS
} from './spatialpopup_arcgis';
import {
  createSpatialData_GEOSERVER
} from './spatialpopup_geoserver';
import SOURCE from './sources';

/**
 * @function
 * @name createSpatialData_MIDDLEWARE
 * @description
 * middleware for spatial data fetching from different sources
 * @param {Object} {data} spatial config data
 * @returns {spatial data}
 */
export const createSpatialData_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createSpatialData_GEOSERVER(data);
    default:
      return createSpatialData_ARCGIS(data);
  }
}