import superagent from "superagent";
import XYZ from "ol/source/XYZ";
import tileGrid from "ol/tilegrid/TileGrid";
import {
  Tile as TileLayer
} from 'ol/layer';

/**
* @function
* @name arcgis_create
* @description
* create the basemap layer for arcgis
* @param {Object} {data} basemap config data
* @returns {basemap}
*/
export const createBasemap_ARCGIS = async(data) => {
  try {
    const res = await superagent.get(`${data.url}?f=pjson`);
    const layer = JSON.parse(res.text);
    if(layer.error) {
      return data.slug;
    }
    const url = `${data.url}/tile/{z}/{y}/{x}`;
    const origin = [layer.tileInfo.origin.x, layer.tileInfo.origin.y];
    const resolutions = layer.tileInfo.lods.map(l => l.resolution);
    const extent = [
      layer.fullExtent.xmin,
      layer.fullExtent.ymin,
      layer.fullExtent.xmax,
      layer.fullExtent.ymax
    ]
    return new TileLayer({
      preload: Infinity, //preloads tiles
      title: data.slug,
      visible: data.slug === data.defaultBasemap,
      zIndex: 1,
      source: new XYZ({
        url,
        crossOrigin: 'anonymous',
        tileGrid: new tileGrid({
          origin,
          resolutions,
          extent,
        }),
        projection: data.projection //"spatialReference">>"latestWkid"
      })
    })
  } catch(err) {
    return data.slug;
  }
}