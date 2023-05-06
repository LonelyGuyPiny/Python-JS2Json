import superagent from "superagent";
import {
  Tile as TileLayer
} from 'ol/layer';
import WMTS, { optionsFromCapabilities } from "ol/source/WMTS";
import WMTSCapabilities from "ol/format/WMTSCapabilities";

const parser = new WMTSCapabilities();

/**
* @function
* @name geoservermap_create
* @description
* create the basemap layer for geo server
* @param {Object} {data} basemap config data
* @returns {basemap}
*/
export const createBasemap_GEOSERVER = async(data) => {
  try {
    const res = await superagent.get(data.url);
    const results = parser.read(res.text);

    const options = optionsFromCapabilities(results, {
      layer: data.layer
    });

    if(options === null) {
      return data.slug;
    }

    options['crossOrigin'] = ''

    return new TileLayer({
      preload: Infinity, //preloads tiles
      title: data.slug,
      visible: data.slug === data.defaultBasemap,
      opacity: 1,
      // zIndex: 1,
      source: new WMTS(options)
    })
  } catch(err) {
    return data.slug;
  }
}