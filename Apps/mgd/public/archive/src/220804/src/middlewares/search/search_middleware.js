import {
  createSearch_ARCGIS,
  createSearchOptions_ARCGIS,
  createSearchRowData_ARCGIS,
  createSearchLink_ARCGIS,
  createSearchGeometry_ARCGIS,
  createSearchSpatial_ARCGIS
} from './search_arcgis';
import {
  createSearch_GEOSERVER,
  createSearchOptions_GEOSERVER,
  createSearchRowData_GEOSERVER,
  createSearchLink_GEOSERVER,
  createSearchGeometry_GEOSERVER,
  createSearchSpatial_GEOSERVER
} from './search_geoserver';
import SOURCE from '../../middlewares/sources';

/**
 * @function
 * @name createSearch_MIDDLEWARE
 * @description
 * middleware for serach loading from different sources
 * @param {Object} {data} search config data
 * @returns {search}
 */
export const createSearch_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createSearch_GEOSERVER(data);
    default:
      return createSearch_ARCGIS(data);
  }
}

/**
 * @function
 * @name createSearchSpatial_MIDDLEWARE
 * @description
 * middleware for serach spatial data from different sources
 * @param {Object} {data} search config data
 * @returns {search}
 */
export const createSearchSpatialData_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createSearchSpatial_GEOSERVER(data);
    default:
      return createSearchSpatial_ARCGIS(data);
  }
}

/**
 * @function
 * @name createSearchOptions_MIDDLEWARE
 * @description
 * middleware for serach options making from different sources
 * @param {Object} {data} search data
 * @returns {search options}
 */
export const createSearchOptions_MIDDLEWARE = (data) => {
  // console.log("data", data);
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createSearchOptions_GEOSERVER(data);
    default:
      return createSearchOptions_ARCGIS(data);
  }
}

/**
 * @function
 * @name createSearchRowData_MIDDLEWARE
 * @description
 * middleware for serach row data from different sources
 * @param {Object} {data} row data
 * @returns {search row data}
 */
export const createSearchRowData_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createSearchRowData_GEOSERVER(data);
    default:
      return createSearchRowData_ARCGIS(data);
  }
}

/**
 * @function
 * @name createSearchLinks_MIDDLEWARE
 * @description
 * middleware for serach link from different sources
 * @param {Object} {data} link data
 * @returns {search links}
 */
export const createSearchLinks_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createSearchLink_GEOSERVER(data);
    default:
      return createSearchLink_ARCGIS(data);
  }
}

/**
 * @function
 * @name createSearchGeomerty_MIDDLEWARE
 * @description
 * middleware for serach geometry from different sources
 * @param {Object} {data} geometry data
 * @returns {search geometry}
 */
export const createSearchGeomerty_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createSearchGeometry_GEOSERVER(data);
    default:
      return createSearchGeometry_ARCGIS(data);
  }
}