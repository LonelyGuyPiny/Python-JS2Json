// import store from 'store2';
// import superagent from 'superagent';
import {
  arrangeLegendsinLayersOrder,
  getMainLayerParentId
} from './../../utils/layer'
import {
  fetchAllLayersDataByParentId
} from './layers';
// import {
//   containsExtent
// } from 'ol/extent';
// import {
//   getTokenForUrl
// } from '../../utils/common'
// import {
//   transExtent
// } from '../../utils/map'
import { createLegend_MIDDLEWARE } from '../../middlewares/legends/legend_middleware';


const SET_LAYER_LEGENDS = 'legends/SET_LAYER_LEGENDS';
const SHOW_SELECTED_LAYER_LEGENDS = 'legends/SHOW_SELECTED_LAYER_LEGENDS';
const SET_LOADING = 'legends/SET_LOADING';
const SET_CURRENT_VIEW_EXTENT = 'legends/SET_CURRENT_VIEW_EXTENT';


const initialState = {
  legends: [],
  selectedLayerLegends: [],
  loading: false,
  currentViewExtent: 'current'
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LAYER_LEGENDS:
      return {
        ...state, legends: action.payload
      };
    case SHOW_SELECTED_LAYER_LEGENDS:
      return {
        ...state, selectedLayerLegends: action.payload
      };
    case SET_LOADING:
      return {
        ...state, loading: action.payload
      };
    case SET_CURRENT_VIEW_EXTENT:
      return {
        ...state, currentViewExtent: action.payload
      }
    default:
      return state;
  }
}

/**
 * @function
 * @name fetchSelectedLayerLegends
 * @description
 * fetch legends for selected layer
 * @param {Object} {url, parentId, groupname, id} layer data object
 * @returns {legend}
 */

export const fetchSelectedLayerLegends = (type, url, parentId, name, id) => async (dispatch, getState) => {
  dispatch({
    type: SET_LOADING,
    payload: true
  });
  const {
    legends
  } = getState().legends;
  let legend = [];
  const requestData = {
    source: type,
    url,
    name,
    id,
    parentId,
    legend,
    legends
  }
  const { legends: fLegends, legend: flegend} = await createLegend_MIDDLEWARE(requestData);
  if (flegend) {
    dispatch({
      type: SET_LAYER_LEGENDS,
      payload: fLegends
    });
    dispatch({
      type: SET_LOADING,
      payload: false
    });
    return flegend;
  } else {
    dispatch({
      type: SET_LAYER_LEGENDS,
      payload: fLegends
    });
    dispatch({
      type: SET_LOADING,
      payload: false
    });
    return fLegends;
  }
}

/**
 * @function
 * @name showSelectedLayerLegends
 * @description
 * show the legends for selected layer
 * @param {Object} {url, id, parentId, groupname} layer data object
 * @returns {legend}
 */

export const showSelectedLayerLegends = (selectedLayer, url, id, parentId, layerName) => async (dispatch, getState) => {
  let {
    legends,
    selectedLayerLegends
  } = getState().legends;
  const {
    allLayers
  } = getState().layers;
  const { map } = getState().map;
  // console.log("layer", selectedLayer);
  let layer = null;
  if(layerName !== undefined) {
    let legend = legends.find(lg => lg.name === layerName);
    if (legend) {
      if (legend.name === layerName) {
        layer = legend
      } else {
        layer = null;
      }
    } else {
      const result = await dispatch(fetchSelectedLayerLegends(selectedLayer.type, url, parentId, layerName, id));
      layer = result[0];
    }
  } else {
    await dispatch(fetchAllLayersDataByParentId(parentId));
    let legend = legends.find(lg => lg.parentId === parentId);
    if (legend) {
      layer = legend.layers.find(l => l.layerId === id);
    } else {
      const result = await dispatch(fetchSelectedLayerLegends(selectedLayer.type, url, parentId, layerName, id));
      if (result) {
        legend = result.find(l => l.parentId === parentId);
        if (legend) {
          layer = legend.layers.find(l => l.layerId === id);
        }
      }
    }
  }

  if (layerName) {
    const slayer = allLayers.find(l => l.groupname === layerName);
    if (layer && slayer) {
      const index = selectedLayerLegends.findIndex(l => l.id === slayer.layerid);
      var mapExtent = map.getView().calculateExtent(map.getSize());
      if (index === -1) {
        selectedLayerLegends.push({
          id: slayer.layerid,
          name: layerName,
          layerName: slayer.name,
          minScale: slayer.minScale,
          maxScale: slayer.maxScale,
          maxScaleDenominator: slayer.maxscaledenominator,
          layerId: slayer.layerid,
          extent: slayer.extent,
          legends: layer,
          url,
          parentId,
          currentExtent: mapExtent,
          inCurrentExtent: true,
          geoLegend: true,
          type: slayer.type
        });
      }
    }
  } else {
    const slayer = allLayers.find(l => l.id === id && l.url === url);
    if (layer && slayer) {
      const index = selectedLayerLegends.findIndex(l => l.id === slayer.layerid);
      if (index === -1) {
        selectedLayerLegends.push({
          id: slayer.layerid,
          name: layer.layerName,
          minScale: layer.minScale,
          maxScale: layer.maxScale,
          layerId: layer.layerId,
          extent: Object.values(slayer.extent),
          legends: layer.legend,
          url,
          parentId,
          uniquefield: slayer.uniquefield,
          inCurrentExtent: true,
          type: slayer.type
        });
      }
    }
  }
  const sortedSelectedLegends = arrangeLegendsinLayersOrder(selectedLayerLegends);
  dispatch({
    type: SHOW_SELECTED_LAYER_LEGENDS,
    payload: sortedSelectedLegends
  })
}

/**
 * @function
 * @name hideSelectedLayerLegends
 * @description
 * hide the legends for selected layer
 * @param {Object} {name, layerId} layer data object
 * @returns {legend}
 */

export const hideSelectedLayerLegends = (name, layerId) => async (dispatch, getState) => {
  const {
    selectedLayerLegends
  } = getState().legends;
  let filteredLayerLegends = [];
  if (selectedLayerLegends) {
    filteredLayerLegends = selectedLayerLegends.filter(l => l.id !== layerId);
  }
  dispatch({
    type: SHOW_SELECTED_LAYER_LEGENDS,
    payload: filteredLayerLegends
  })
}

/**
 * @function
 * @name showAllLayerLegendsByParentId
 * @description
 * show the legends for all selected layers by parent
 * @param {Object} {url, parentLayerId} layer data object
 * @returns {legend}
 */

export const showAllLayerLegendsByParentId = (selectedLayer, url, parentLayerId) => async (dispatch, getState) => {
  const {
    selectedLayerLegends,
    legends
  } = getState().legends;
  const {
    allLayers
  } = getState().layers;
  await dispatch(fetchAllLayersDataByParentId(parentLayerId));
  const childLayers = allLayers.filter(l => l.parentlayerids.includes(parentLayerId) && l.sublayerids === null);
  const childLayerIds = childLayers.map(l => l.id);
  const parentId = getMainLayerParentId(parentLayerId);
  let legend = legends.find(lg => lg.parentId === parentId);
  if (!legend) {
    const result = await dispatch(fetchSelectedLayerLegends(selectedLayer.type, url, parentId));
    legend = result.find(l => l.parentId === parentId);
  }
  if (legend && legend.layers) {
    legend.layers.forEach(l => {
      if (!childLayerIds.includes(l.layerId)) {
        return false;
      }
      const slayer = childLayers.find(layer => layer.id === l.layerId && layer.url === url);
      // console.log("slayer", slayer);
      if (slayer) {
        const index = selectedLayerLegends.findIndex(l => l.id === slayer.layerid);
        if (l && index === -1) {
          selectedLayerLegends.push({
            id: slayer.layerid,
            name: l.layerName,
            minScale: l.minScale,
            maxScale: l.maxScale,
            layerId: l.layerId,
            extent: Object.values(slayer.extent),
            legends: l.legend,
            url,
            parentId: parentId,
            uniquefield: slayer.uniquefield,
            inCurrentExtent: true,
            type: slayer.type
          });
        }
      }
    });
  }
  const sortedSelectedLegends = arrangeLegendsinLayersOrder(selectedLayerLegends);
  dispatch({
    type: SHOW_SELECTED_LAYER_LEGENDS,
    payload: sortedSelectedLegends
  })
}

/**
 * @function
 * @name hideAllLayerLegendsByParentId
 * @description
 * hide the legends for all selected layers by parent
 * @param {Object} {parentLayerId} layer data object
 * @returns {legend}
 */

export const hideAllLayerLegendsByParentId = (parentLayerId) => async (dispatch, getState) => {
  const {
    selectedLayerLegends
  } = getState().legends;
  const {
    allLayers
  } = getState().layers;
  const childLayers = allLayers.filter(l => l.parentlayerids.includes(parentLayerId) && l.sublayerids === null);
  const childLayerIds = childLayers.map(l => l.id);
  let filteredSelectedLayerLegends = [];
  if (selectedLayerLegends) {
    filteredSelectedLayerLegends = selectedLayerLegends.filter(l => l.parentId !== parentLayerId && !childLayerIds.includes(l.layerId));
  }
  dispatch({
    type: SHOW_SELECTED_LAYER_LEGENDS,
    payload: filteredSelectedLayerLegends
  });
}

// export const fetchLegendsData = (extent) => async (dispatch, getState) => {
//   const {
//     selectedLayerLegends
//   } = getState().legends;
//   const legendsbyParentLayer = [...new Map(selectedLayerLegends.map(item => [item['parentId'], item])).values()];
//   const results = await Promise.all(legendsbyParentLayer.map(api =>
//     superagent.get(`${api.url}/${api.parentId}?f=json${getTokenForUrl(api.url)}`)));
//   const extentResult = results.map((r) => {
//     const result = JSON.parse(r.text);
//     return {
//       layerId: result.id,
//       extent: Object.values(result.extent)
//     }
//   });
//   let legends = [];
//   extentResult.forEach(layer => {
//     // layer.extent.pop();
//     if (containsExtent(extent, layer.extent)) {
//       let filtredLegends = selectedLayerLegends.filter(l => parseInt(l.parentId) === layer.layerId);
//       filtredLegends.forEach(legend => {
//         legends.push(legend);
//       })
//     }
//   })
//   const sortedSelectedLegends = arrangeLegendsinLayersOrder(legends);
//   return sortedSelectedLegends;
// }

/**
 * @function
 * @name filterLegendsForExtent
 * @description
 * filter the legends for all selected layers by extent
 * @param {Object} {extent} layer data object
 * @returns {legend}
 */

export const filterLegendsForExtent = (extent) => async (dispatch, getState) => {
  const {
    selectedLayerLegends
  } = getState().legends;
  const {
    allLayers
  } = getState().layers;
  const latestWkid = getState().map.latestWkid;

  const results = await Promise.all(selectedLayerLegends.map(async (layer, i) => {
    if (layer.geoLegend) {
      const middlewareData = {
        source: layer.type,
        filterExtent: true,
        url: layer.url,
        name: layer.name,
        extent,
        latestWkid
      }
      const remoteImage = await createLegend_MIDDLEWARE(middlewareData)
      let imageWidth = remoteImage.width;
      let imageHeight = remoteImage.height;
      return imageWidth + ":" + imageHeight;
    } else {
      if (layer.legends && layer.legends.length > 1) {
        let uniquefield = layer.uniquefield;
        if (!uniquefield) {
          const slayer = allLayers.find(l => l.layerid === layer.id);
          uniquefield = slayer.uniquefield;
          selectedLayerLegends[i].uniquefield = uniquefield;
        }
        const middlewareData = {
          source: layer.type,
          filterExtent: true,
          url: layer.url,
          layerId: layer.layerId,
          extent: extent.join(','),
          latestWkid,
          uniquefield: layer.uniquefield
        }
        let res = await createLegend_MIDDLEWARE(middlewareData)
        let layerData = JSON.parse(res.text);
        if (layerData.error || (layerData.features && layerData.features.length === 0)) {
          const middlewareData = {
            source: layer.type,
            filterExtentWhere: true,
            url: layer.url,
            layerId: layer.layerId,
            extent: extent.join(','),
            latestWkid,
            uniquefield: layer.uniquefield
          }
          res = await createLegend_MIDDLEWARE(middlewareData)
          layerData = JSON.parse(res.text);
          if (!layerData.error) {
            layerData.features = layerData.features.filter((feature, index, self) =>
              index === self.findIndex((t) => (
                feature.attributes[layer.uniquefield] === t.attributes[layer.uniquefield]
              ))
            )
            res.text = JSON.stringify(layerData);
            return res;
          } else {
            return null;
          }
        }
        res.text = JSON.stringify(layerData);
        return res;
      } else {
        const dataMiddleware = {
          source: layer.type,
          returnIdsOnly: true,
          url: layer.url,
          layerId: layer.layerId,
          extent: extent.join(','),
          latestWkid
        }
        return await createLegend_MIDDLEWARE(dataMiddleware)
      }
    }
  }));
  results.forEach((r, i) => {
    if(r === null) {
      return null;
    }
    if (r.text) {
      const layerData = JSON.parse(r.text);
      if (selectedLayerLegends[i].legends && selectedLayerLegends[i].legends.length > 1) {
        const field = layerData && layerData.fields ? layerData.fields[0].name : '';
        const arr = [];
        if (layerData && layerData.features) {
          layerData.features.forEach(f => {
            arr.push(f.attributes[field] ? f.attributes[field].toString() : null);
          })
        }
        selectedLayerLegends[i].legends.forEach((legend, j) => {
          if (legend && legend.values) {
            let inCurrentExtent = false;
            legend.values.forEach(v => v.split(',').forEach(vs => {
              if (arr.includes(vs)) {
                inCurrentExtent = true
              }
            }));
            selectedLayerLegends[i].legends[j].inCurrentExtent = inCurrentExtent;
          }
        })
      } else if (selectedLayerLegends[i].legends && selectedLayerLegends[i].legends.length) {
        selectedLayerLegends[i].legends[0].inCurrentExtent = layerData.count > 0;
      }
    } else {
      if (selectedLayerLegends[i].legends) {
        const whArr = r.split(":")
        const imgWidth = whArr[0];
        const imgHeight = whArr[1];
        if (imgWidth < 20 && imgHeight < 20) {
          selectedLayerLegends[i].currentExtent = extent;
          selectedLayerLegends[i].inCurrentExtent = false;
        } else {
          selectedLayerLegends[i].currentExtent = extent;
          selectedLayerLegends[i].inCurrentExtent = true;
        }
      }
    }
  });
  const sortedSelectedLegends = arrangeLegendsinLayersOrder(selectedLayerLegends);

  dispatch({
    type: SHOW_SELECTED_LAYER_LEGENDS,
    payload: sortedSelectedLegends
  })
  return sortedSelectedLegends;
}

/**
 * @function
 * @name hideAllSelectedLayerLegends
 * @description
 * hide the legends for all selected layers
 * @param {Object} {}
 * @returns {no legend}
 */

export const hideAllSelectedLayerLegends = () => async (dispatch, getState) => {
  dispatch({
    type: SHOW_SELECTED_LAYER_LEGENDS,
    payload: []
  })
}

/**
 * @function
 * @name setViewExtentMenu
 * @description
 * set the view extent menu for legends
 * @param {Object} {viewExtent}
 * @returns {viewExtent}
 */

export const setViewExtentMenu = (viewExtent) => async (dispatch, getState) => {
  dispatch({
    type: SET_CURRENT_VIEW_EXTENT,
    payload: viewExtent
  })
}
