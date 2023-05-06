import {
  login_ARCGIS
} from './login_arcgis';
import {
  login_GEOSERVER
} from './login_geoserver';
import SOURCE from '../sources';

/**
 * @function
 * @name login_MIDDLEWARE
 * @description
 * middleware for toc data fetching from different sources
 * @param {Object} {layer} layer config data
 * @returns {toc data}
 */
export const login_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return login_GEOSERVER(data);
    default:
      return login_ARCGIS(data);
  }
}