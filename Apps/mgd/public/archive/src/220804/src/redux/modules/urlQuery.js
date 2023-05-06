import superagent from 'superagent';

import {
  getTokenForUrl,
  getTokenObj,
  replaceAt
} from '../../utils/common';
import searchQueries from '../../config/searchQuery';
import searches from '../../config/search';
import {
  showLayer
} from './layers';
import {
  showSelectedLayerLegends
} from './legends';
import { settings } from '../../config/settings';


const SET_LAYER_DATA = 'url-query/FETCH_LAYER_DATA';
const SET_QUERY_DATA = 'url-query/SET_QUERY_DATA';
const SET_SEARCH_QUERY_DATA = 'url-query/SET_SEARCH_QUERY_DATA';

const initialState = {
  layerData: null,
  query: null,
  searchQuery: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LAYER_DATA:
      return {
        ...state, layerData: action.payload
      };
    case SET_QUERY_DATA:
      return {
        ...state, query: action.payload
      };
    case SET_SEARCH_QUERY_DATA:
      return {
        ...state, searchQuery: action.payload
      };
    default:
      return state;
  }
}


export const fetchQueryGeometry = (query) => async (dispatch, getState, api) => {
  try {
    const {
      layer,
      where
    } = query;
    const {
      allLayers
    } = getState().layers;
    const layerData = allLayers.find(l => l.name === layer);
    if (layerData) {
      dispatch({
        type: SET_LAYER_DATA,
        payload: layerData
      });
      dispatch({
        type: SET_QUERY_DATA,
        payload: query
      });
      const {
        latestWkid
      } = getState().map;
      const {
        url: source,
        id
      } = layerData;

      const results = await superagent.get(`${source}/${id}/query?where=${where}&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=*&f=json&inSR=${latestWkid}&outSR=${latestWkid}${getTokenForUrl(source)}`);
      const data = JSON.parse(results.text);
      if (!data.error) {
        return data
      }
    }
    return null;
  } catch (err) {
    return null;
  }
}

export const showVisibleLayers = (visibleLayers) => async (dispatch, getState, api) => {
  try {
    const {
      allLayers,
      layers
    } = getState().layers;
    visibleLayers.forEach(ln => {
      const lData = allLayers.find(l => l.name === ln);
      if (lData) {
        const pIds = lData.parentlayerids;
        const plData = getParentLayer(layers, pIds[0], pIds);
        dispatch(showLayer({
          layerId: lData.layerid,
          parentLayerIds: lData.parentlayerids,
          ...lData
        }, plData, null));
        dispatch(showSelectedLayerLegends(lData.url, lData.id, lData.parentlayerids[0]));
      }
    })

  } catch (err) {
    return null;
  }
}

export const clearData = () => async (dispatch, getState, api) => {
  try {
    dispatch({
      type: SET_LAYER_DATA,
      payload: null
    });
    dispatch({
      type: SET_QUERY_DATA,
      payload: null
    });
  } catch (err) {
    return null;
  }
}

export const getQueryUrlForSpaital = (coordinates) => async (dispatch, getState, api) => {
  try {
    const {
      layerData,
      query
    } = getState().urlQuery;

    if (layerData) {
      const {
        latestWkid
      } = getState().map;
      const {
        url: source,
        id,
        name: layerName
      } = layerData;
      const data = await superagent.get(`${source}/${id}/query?where=${query.where}&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&f=json&returnGeometry=true&geometry=${coordinates}&inSR=${latestWkid}&outFields=*&outSR=${latestWkid}${getTokenForUrl(source)}`);
      const queryData = JSON.parse(data.text);
      if (queryData.features && queryData.features.length > 0) {
        return ({
          ...queryData,
          layerName
        });
      }
    }
    return null;
    // }
  } catch (err) {
    return false;
  }
}

const getParentLayer = (layers, mainPId, pIds) => {
  const plData = layers.find(l => l.layerId === mainPId);
  if (plData.layerId === pIds[pIds.length - 1]) {
    return plData;
  }
  const findParentLayer = (layers, plIds) => {
    let nextLayers = layers;
    let layer = null;
    plIds.forEach(plId => {
      layer = nextLayers.find(l => l.layerId === plId)
      if (layer) {
        nextLayers = layer.layers;
      }
    })
    return layer;
  };

  return findParentLayer(plData.layers, pIds)
}

// export const fetchSearchQueryData = (coordinates) => async (dispatch, getState) => {
//   try {
//     const { searchQuery } = getState().urlQuery;
//     if (!searchQuery) {
//       return null;
//     }

//     const layerData = await superagent.post(`${searchQuery.url}`).send({
//       token: searchQuery.postData.token,
//       f: 'json'
//     }).set({
//       'Content-Type': 'application/x-www-form-urlencoded',
//     });

//     const layerRes = JSON.parse(layerData.text);

//     const results = await superagent.post(`${searchQuery.url}/query`).send({
//       ...searchQuery.postData,
//       geometry: coordinates,
//       geometryType: 'esriGeometryEnvelope'
//     }).set({
//       'Content-Type': 'application/x-www-form-urlencoded',
//     });
//     const res = JSON.parse(results.text)
//     if (res.features && res.features.length > 0) {
//       return ({
//         ...res,
//         layerName: layerRes ? layerRes.name : ''
//       });
//     }
//   } catch(er) {
//   }
// }

export const fetchSearchQueryData = (coordinates, geometryType) => async (dispatch, getState) => {
  try {
    const { searchQuery } = getState().urlQuery;
    if (!searchQuery) {
      return null;
    }
    const { map } = getState().map;
    const mapExtent = map.getView().calculateExtent(map.getSize());
    const mapSize = map.getSize();
    const latestWkid = getState().map.latestWkid;
    const urlArr = searchQuery.url.split('/')
    const layerId = urlArr[urlArr.length-1];
    const where = searchQuery.postData.where;

    const postData = {
      f: 'json',
      tolerance: settings.tolerance || 8,
      returnGeometry: true,
      returnFieldName: false,
      returnUnformattedValues: false,
      imageDisplay: `${mapSize.toString()},96`,
      geometry: coordinates,
      geometryType: geometryType,
      sr: latestWkid,
      mapExtent: mapExtent.join(','),
      layers: `all:${layerId}`,
      layerDefs: `{"${layerId}":"${where}"}`,
      ...getTokenObj(searchQuery.url)
    }

    const data = await superagent.post(`${searchQuery.url.slice(0, -1)}identify`).send(postData).set({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    let queryData = JSON.parse(data.text);
    queryData.fields = Object.keys(queryData.results[0].attributes);
    queryData.features = queryData.results;
    queryData.layer = {
      layerId: layerId,
      id: layerId,
      url: searchQuery.url.slice(0, -1),
      name: queryData.results[0].layerName,
      cb_id: layerId
    }
    if (queryData.features && queryData.features.length > 0) {
      return ({
        ...queryData,
        layerName: queryData.results[0].layerName
      });
    }
  } catch(er) {
  }
}

export const fetchSearchQuery = (queryData) => async (dispatch, getState) => {
  try {
    const {
      latestWkid
    } = getState().map;

    const type = queryData.get('type');
    const searchData = searchQueries.find(q => q.type === type);
    if (searchData) {
      const search = searches.find(s => s.id === searchData.search_id);
      if (search) {
        const cb = search.comboboxes.find(c => c.cb_id === searchData.cb_id);
        if (cb) {
          const param_1 = searchData.params.field;
          const value_1 = queryData.get(param_1);
          const field_1 = cb.field;
          let where = [{
            field: field_1,
            value: value_1
          }];
          searchData.params.filters.forEach(filterItem => {
            const filter = cb.filters.find(f => f.id === filterItem.id);
            if (filter) {
              const param = filterItem.field;
              const field = filter.field;
              const value = queryData.get(param);
              // where += ` AND ${field}=${value}`;
              where.push({
                field,
                value
              });
            }
          });

          // const url = cb.source;

          const data = {
            // where,
            returnGeometry: true,
            returnTrueCurves: false,
            outFields: '*',
            resultOffset: 0,
            inSR: latestWkid,
            outSR: latestWkid,
            f: `json`,
            ...getTokenObj(cb.source)
          }

          const {
            text
          } = await superagent.post(`${cb.source}/query`).send({
            ...data,
            where: '1=1',
            resultRecordCount: 1
          }).set({
            'Content-Type': 'application/x-www-form-urlencoded',
          });

          const {
            fields
          } = JSON.parse(text);
          if (fields) {
            where = where.map(item => {
              const field = fields.find(f => f.name === item.field);
              if (field && field.type === "esriFieldTypeString") {
                if (item.value[0] === '"' || item.value[0] === "'") {
                  item.value = replaceAt(item.value, 0, "'");
                  item.value = replaceAt(item.value, item.value.length - 1, "'");
                } else {
                  item.value = `'${item.value}'`;
                }
              } else {
                item.value = item.value.replace(/['"]+/g, '');
              }
              return item;
            });
          }

          let whereCond = '';
          where.forEach((item, ind) => {
            if (ind !== 0) {
              whereCond += ' AND ';
            }
            whereCond += `${item.field}=${item.value}`
          });

          const results = await superagent.post(`${cb.source}/query`).send({
            ...data,
            where: whereCond
          }).set({
            'Content-Type': 'application/x-www-form-urlencoded',
          });
          const res = JSON.parse(results.text);
          if (!res.error) {
            dispatch({
              type: SET_SEARCH_QUERY_DATA,
              payload: {
                postData: {
                  ...data,
                  where: whereCond
                },
                url: cb.source
              }
            })
            return {
              ...res,
              visibleLayers: searchData.visibleLayers,
              basemap: searchData.basemap_slug
            };
          }
        }
      }
    }



    //   // const {
    //   //   // geometryType,
    //   //   features,
    //   //   // fields,
    //   //   // exceededTransferLimit
    //   // } = JSON.parse(results.text);

    //   // return features;
    //   return null;
  } catch (er) {
    return {};
  }
}
