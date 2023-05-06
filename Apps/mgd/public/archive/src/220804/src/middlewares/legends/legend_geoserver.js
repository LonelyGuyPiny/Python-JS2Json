import ImageWMS from 'ol/source/ImageWMS';
import {
  getRemoteFileSize
} from '../../utils/common'
/**
* @function
* @name createLegend_GEOSERVER
* @description
* create the legend for geoserver
* @param {Object} {data} layer config data
* @returns {layer}
*/
export const createLegend_GEOSERVER = async(data) => {
  try {
    if (data.filterExtent) {
      const url = `${data.url}/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&FORMAT=image%2Fpng&LAYER=${data.name}&bbox=${data.extent}&srcwidth=768&srcheight=330&srs=EPSG:${data.latestWkid}&format=image/png&legend_options=countMatched:true;fontAntiAliasing:true;hideEmptyRules:true`;
      const remoteImage = await getRemoteFileSize(url);
      return remoteImage;
    }
    const wmsSource = new ImageWMS({
      url: `${data.url}/wms`,
      params: {
        'LAYERS': data.name
      },
      ratio: 1,
      serverType: 'geoserver',
    });

    // const bboxExtent = map.getView().calculateExtent(map.getSize())
    let graphicUrl = wmsSource.getLegendUrl();
    // console.log("graphicUrl", graphicUrl)
    // const graphicUrl = `${url}/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&FORMAT=image%2Fpng&LAYER=${name}&bbox=${bboxExtent}&srcwidth=768&srcheight=330&srs=EPSG:2039&format=image/png&legend_options=countMatched:true;fontAntiAliasing:true;hideEmptyRules:true`
    // console.log("extent", map.getView().calculateExtent(map.getSize()))
    const ind = data.legends.findIndex(lg => lg.name === data.name);
    if (ind === -1) {
      data.legends.push({
        'graphicUrl': graphicUrl,
        'name': data.name,
        'id': data.id,
        'parentId': data.parentId,
        url: data.url,
        type: data.source
      });
      data.legend.push({
        'graphicUrl': graphicUrl,
        'name': data.name,
        'id': data.id,
        'parentId': data.parentId,
        url: data.url,
        type: data.source
      })
    }
    return {
      legends: data.legends,
      legend: data.legend
    };
  } catch(err) {
    console.log("err", err);
  }
}