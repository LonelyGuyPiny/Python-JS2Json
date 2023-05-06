import { createBasemap_OSM } from './basemap_osm';
import { createBasemap_GEOSERVER } from './basemap_geoserver';
import { createBasemap_ARCGIS } from './basemap_arcgis';
import { createBasemap_LABELMAP } from './basemap_labelmap';
import SOURCE from '../../middlewares/sources';
import { createBaemap_XYZ } from './basemap_xyz';

/**
* @function
* @name createBasemap_MIDDLEWARE
* @description
* middleware for basemap loading from different sources
* @param {Object} {data} basemap config data
* @returns {basemap}
*/
export const createBasemap_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.OSM:
      return createBasemap_OSM(data);
    case SOURCE.WMTS:
      return createBasemap_GEOSERVER(data);
    case SOURCE.LABELMAP:
      return createBasemap_LABELMAP(data);
    case SOURCE.XYZ:
      return createBaemap_XYZ(data);
    default:
      return createBasemap_ARCGIS(data);
  }
}