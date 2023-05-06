import {
  Tile as TileLayer
} from 'ol/layer';

import XYZ from 'ol/source/XYZ';

/**
 * @function
 * @name createBaemap_XYZ
 * @description
 * create the XYZ map layer
 * @param {Object} {data} basemap config data
 * @returns {basemap}
 */
export const createBaemap_XYZ = async (data) => {
  try {
    return new TileLayer({
      preload: Infinity, //preloads tiles
      title: data.slug,
      source: new XYZ({
        attributions: data.attribution,
        url: data.url,
        projection: data.projection,
        crossOrigin: ''
      }),
    });
  } catch (err) {
    return data.slug;
  }
}
