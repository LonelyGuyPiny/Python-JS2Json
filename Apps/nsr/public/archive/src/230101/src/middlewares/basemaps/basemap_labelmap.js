import { ImageArcGISRest } from 'ol/source';
import { getTokenObj } from '../../utils/common';
/**
* @function
* @name createBasemap_LABELMAP
* @description
* create the basemap layer for label map
* @param {Object} {data} labelmap config data
* @returns {labelmap}
*/
export const createBasemap_LABELMAP = async(data) => {
  try {
    const source = new ImageArcGISRest({
      url: data.url,
      ratio: 1,
      crossOrigin: "include",
      params: {
        FORMAT: 'PNG8',
        dpi: 96,
        ...getTokenObj(data.url)
      }
    });
    return source;
  } catch(err) {
    return data.slug;
  }
}