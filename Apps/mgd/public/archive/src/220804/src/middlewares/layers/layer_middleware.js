import {
  createLayer_ARCGIS,
  createLayerData_ARCGIS,
  createLayerLink_ARCGIS,
  export_ARCGIS
} from './layer_arcgis';
import {
  createLayer_GEOSERVER,
  createLayerData_GEOSERVER,
  createLayerLink_GEOSERVER,
  export_GEOSERVER
} from './layer_geoserver';
import SOURCE from '../../middlewares/sources';

/**
* @function
* @name createLayer_MIDDLEWARE
* @description
* middleware for layer loading from different sources
* @param {Object} {data} layer config data
* @returns {layers}
*/
export const createLayer_MIDDLEWARE = (data) => {
  switch (data.api.type) {
    case SOURCE.GEOSERVER:
        return createLayer_GEOSERVER(data);
    default:
      return createLayer_ARCGIS(data);
  }
}

/**
 * @function
 * @name createLayerData_MIDDLEWARE
 * @description
 * middleware for layer data from different sources
 * @param {Object} {data} layer response data
 * @returns {layers group}
 */
export const createLayerData_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createLayerData_GEOSERVER(data);
    default:
      return createLayerData_ARCGIS(data);
  }
}

/**
 * @function
 * @name createLayerLink_MIDDLEWARE
 * @description
 * middleware for layer link from different sources
 * @param {Object} {data} layer link data
 * @returns {layers link}
 */
export const createLayerLink_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createLayerLink_GEOSERVER(data);
    default:
      return createLayerLink_ARCGIS(data);
  }
}

/**
* @function
* @name export_MIDDLEWARE
* @description
* middleware for layer data exporting from different sources
* @param {Object} {data} layer data
* @returns {export data}
*/
export const export_MIDDLEWARE = (source, type, data) => {
  switch (source) {
    case SOURCE.GEOSERVER:
      return export_GEOSERVER(type, data);
    default:
      return export_ARCGIS(type, data);
  }
}