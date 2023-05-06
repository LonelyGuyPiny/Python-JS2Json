import {
  createPopupSpatialData_ARCGIS,
  createReplacedSpatialData_ARCGIS,
  createSpatialData_ARCGIS
} from './spatialpopup_arcgis';
import {
  createPopupSpatialData_GEOSERVER,
  createReplacedSpatialData_GEOSERVER,
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

/**
 * @function
 * @name createSpatialData_MIDDLEWARE
 * @description
 * middleware for spatial data fetching from different sources
 * @param {Object} {data} spatial config data
 * @returns {spatial data}
 */
export const createReplacedSpatialData_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createReplacedSpatialData_GEOSERVER(data);
    default:
      return createReplacedSpatialData_ARCGIS(data);
  }
}

/**
 * @function
 * @name createPopupSpatialData_MIDDLEWARE
 * @description
 * create popup data for different sources
 * @param {Object} {data} spatial data
 * @returns {spatial popup data}
 */
export const createPopupSpatialData_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createPopupSpatialData_GEOSERVER(data);
    default:
      return createPopupSpatialData_ARCGIS(data);
  }
}