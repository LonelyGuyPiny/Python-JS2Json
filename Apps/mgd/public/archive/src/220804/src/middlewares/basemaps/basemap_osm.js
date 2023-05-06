import {
  Tile as TileLayer
} from 'ol/layer';
import {
  OSM
} from 'ol/source';

/**
* @function
* @name createBaemap_OSM
* @description
* create the OSM layer
* @param {Object} {data} basemap config data
* @returns {basemap}
*/
export const createBaemap_OSM = async(data) => {
  try {
    if(data.url === 'OSM') {
      return new TileLayer({
        preload: Infinity,
        source: new OSM(),
        title: data.slug,
        visible: data.slug === data.defaultBasemap,
        opacity: 1,
        // zIndex: 1,
      });
    } else {
      return new TileLayer({
        preload: Infinity,
        source: new OSM({
          url: data.url
        }),
        title: data.slug,
        visible: data.slug === data.defaultBasemap,
        opacity: 1,
        // zIndex: 1,
      });
    }
  } catch(err) {
    return data.slug;
  }
}