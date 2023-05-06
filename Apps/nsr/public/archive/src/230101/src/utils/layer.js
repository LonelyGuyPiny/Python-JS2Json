import ImageLayer from 'ol/layer/Image';
import {
  ImageWMS,
  ImageArcGISRest
} from 'ol/source';

import {
  getTokenObj,
  createWhereCondition
} from './common';

const createLayerObj = (layers, layer, layerId, url, d) => {
  let hasLayers = false;
  let layersArr = null;
  if (layer.subLayerIds) {
    hasLayers = true;
    layersArr = []
    layer.subLayerIds.forEach(id => {
      const childLayer = layers.find(l => l.id === id);
      if (childLayer) {
        const subLayer = createLayerObj(layers, childLayer, `${layerId}-${id}`, url, d);
        layersArr.push(subLayer);
      }
    });
  }
  const layerData = {
    ...layer,
    hasLayers,
    layers: layersArr,
    layerId,
    parentLayerIds: getLayerParentIds(layerId),
    url,
    extent: d.initialExtent,
    exportKMZ: d.kmz,
    exportCSV: d.csv,
    export: d.export,
    version: d.currentVersion
  }

  return layerData;
}

const createGeoLayerObj = (layers, layer, layerId, url, d, id = 0, proj = null) => {
  const groupProjection = layer.CRS[0]
  let hasLayers = false;
  let layersArr = null;
  let subLayerIds = null;
  if (layer.Layer && layer.Layer.length > 0) {
    hasLayers = true;
    layersArr = [];
    subLayerIds = [];
    layer.Layer.forEach((childLayer, i) => {
      if (childLayer) {
        const subLayerId = id + (i + 1);
        subLayerIds.push(subLayerId);
        const subLayer = createGeoLayerObj(layers, childLayer, `${layerId}-${subLayerId}`, url, d, subLayerId, groupProjection);
        layersArr.push(subLayer);
      }
    });
  }

  const layerData = {
    ...layer,
    id: id === 0 ? -1 : id,
    hasLayers,
    subLayerIds,
    name: layer.Title,
    groupname: layer.Name,
    layers: layersArr,
    layerId,
    parentLayerIds: getLayerParentIds(layerId),
    url,
    extent: d.initialExtent,
    exportShapeZip: d.shapezip,
    exportKml: d.kml,
    exportExcel: d.excel,
    exportCSV: d.csv,
    exportJson: d.json,
    export: d.export,
    version: d.currentVersion,
    projection: proj
  }

  return layerData;
}

const createLayerDataArray = (data, i = 0) => {
  const layersData = [];
  data.forEach((d) => {
    let layers = d.layers;
    if (d.virtualGroup) {
      layers.unshift({
        id: -1,
        name: d.virtualGroup,
        subLayerIds: layers.filter(l => l.parentLayerId === -1).map(l => l.id),
        parentLayerId: -1,
        defaultVisibility: false,
        minScale: d.minScale,
        maxScale: d.maxScale
      });
      d.layers = layers;

      const id = `layer-${++i}`;
      const layer = createLayerObj(layers, layers[0], id, d.url, d);
      layersData.push(layer);

    } else {
      layers.forEach(l => {
        if (l.parentLayerId === -1) {
          const id = `layer-${++i}`;
          const layer = createLayerObj(layers, l, id, d.url, d);
          layersData.push(layer);
        }
      });
    }
  });
  return layersData;
}

const createGeoLayerDataArray = (data, nameSpaceGroupArr, i = 0) => {
  const layersData = [];
  data.forEach((d) => {
    let layers = d.Capability.Layer.Layer;
    if(layers) {
      nameSpaceGroupArr.forEach(l => {
        const existLayer = layers.find(ls => ls.Name === l)
        if(existLayer) {
          const id = `layer-${++i}`;
          const layer = createGeoLayerObj(layers, existLayer, id, d.url, d);
          layersData.push(layer);
        }
      })
    }
  });
  return layersData;
}

const createLayer = (l, title, opacity = 1, ids = undefined, layerDefs) => {
  const zIndex = 100 - Number(title.split('-')[1]);
  const source = new ImageArcGISRest({
    url: l.url,
    crossOrigin: 'anonymous',
    ratio: 1,
    params: {
      // dpi: 96,
      FORMAT: 'PNG8',
      layers: `show:${ids || l.id}`,
      layerDefs,
      ...getTokenObj(l.url)
    },
    imageLoadFunction: function (image, src) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.addEventListener("loadend", function (evt) {
        var data = this.response;
        if (data) {
          var img = image.getImage();
          var url = URL.createObjectURL(data);
          img.addEventListener("loadend", function () {
            URL.revokeObjectURL(url);
          });
          img.src = url;
        }
      });
      var split = src.split("?");
      xhr.open("POST", split[0]);
      xhr.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      xhr.send(split[1]);
    }
  });

  const layerObj = {
    preload: Infinity,
    source,
    visible: true,
    title,
    zIndex,
    opacity
  };

  const layer = new ImageLayer(layerObj);
  const cLayer = new ImageLayer(layerObj);
  return [layer, cLayer];
}

const createGeoLayer = (l, title, opacity = 1, names = undefined, layerDefs = null) => {
  const zIndex = 100 - Number((l.layerId || l.layerid).split('-')[1]);
  const sourceObj = {
    url: `${l.url}/wms`,
    crossOrigin: 'anonymous',
    ratio: 1,
    serverType: 'geoserver',
    params: {
      LAYERS: names || l.groupname,
      CQL_FILTER: layerDefs
    },
    imageLoadFunction: function (image, src) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.addEventListener("loadend", function (evt) {
        var data = this.response;
        if (data) {
          var img = image.getImage();
          var url = URL.createObjectURL(data);
          img.addEventListener("loadend", function () {
            URL.revokeObjectURL(url);
          });
          img.src = url;
        }
      });
      var split = src.split("?");
      xhr.open("POST", split[0]);
      xhr.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      xhr.send(split[1]);
    }
  };
  // console.log('sourceObj =>>', sourceObj);

  // if (typeof layerDefs !== 'object' && typeof layerDefs !== 'string') {
    // sourceObj.params.CQL_FILTER = layerDefs;
  // }

  const layerObj = {
    preload: Infinity,
    source: new ImageWMS(sourceObj),
    visible: true,
    title,
    zIndex,
    opacity,
    parentLayerIds: l.parentLayerIds ? l.parentLayerIds[0] : title
  };
  // console.log('layerObj =>>', layerObj);
  const layer = new ImageLayer(layerObj);
  const cLayer = new ImageLayer(layerObj);
  return [layer, cLayer];
}

const addSelectedLayersCount = (layerId, selectedLayerCounts) => {
  let layerIds = splitLayerId(layerId);
  layerIds.forEach(Id => {
    let pl = selectedLayerCounts[Id];
    if (pl) {
      pl.count = pl.count + 1;
    } else {
      pl = {
        layerId: Id,
        parentLayerId: 0,
        count: 1
      }
    }
    selectedLayerCounts[Id] = pl;
  });
}

const removeSelectedLayersCount = (layerId, selectedLayerCounts) => {
  let layerIds = splitLayerId(layerId);
  layerIds.forEach(id => {
    let pl = selectedLayerCounts[id];
    if (pl) {
      pl.count = pl.count - 1;
    }
    selectedLayerCounts[id] = pl;
  })
}

const splitLayerId = (layerId) => {
  let i;
  let j = [];
  i = layerId.split('-');
  i.forEach((item, index) => {
    if (index > 0) {
      let b = 'layer';
      for (let a = 1; a <= index; a++) {
        b += `-${i[a]}`;
      }
      j.push(b);
    }
  })
  return j
}

const getLayerParentIds = (layerId) => {
  let i;
  let j = [];
  i = layerId && layerId.split('-');
  i.forEach((item, index) => {
    if (index > 0 && i.length !== (index + 1)) {
      let b = 'layer';
      for (let a = 1; a <= index; a++) {
        b += `-${i[a]}`;
      }
      j.push(b);
    }
  });
  return j
}

const getAllLayerParentIds = (layerId) => {
  let i;
  let j = [];
  i = layerId && layerId.split('-');
  i.forEach((item, index) => {
    if (index > 0) {
      let b = 'layer';
      for (let a = 1; a <= index; a++) {
        b += `-${i[a]}`;
      }
      j.push(b);
    }
  });
  return j
}

const getMainLayerParentId = (layerId) => {
  return getAllLayerParentIds(layerId)[0];
}

const getLayerParentId = (layerId) => {
  return getLayerParentIds(layerId)[0];
}

const getLayerId = (layerId) => {
  const ids = layerId.split('-');
  return Number(ids[ids.length - 1]);
}

const addCountToLayer = (countObj, layerId, count, inc = true) => {
  if (countObj[layerId]) {
    if (!inc) {
      countObj[layerId].count = count;
    } else {
      countObj[layerId].count += count;
    }
    return countObj[layerId];
  } else {
    return ({
      layerId,
      count
    });
  }
}


const addSubLayersCount = (sublayerids, layerId, selectedLayerCounts, allLayers) => {
  sublayerids.forEach(id => {
    const slData = allLayers.find(l => l.parentlayerids.includes(layerId) && l.id === id);
    const slSubLayerCount = slData.sublayerids ? slData.sublayerids.length - 1 : 0;
    selectedLayerCounts[layerId].count += slSubLayerCount;
    if (slData.sublayerids) {
      addSubLayersCount(slData.sublayerids, layerId, selectedLayerCounts, allLayers)
    }
  });
}

const addLayerToSource = (eParams, id, ids = null) => {
  const layers = eParams.layers.split(':')[1].split(',').filter(id => Number(id) !== -1);
  // console.log('id', id);
  if (id && id >= 0) {
    if (!layers.includes(`${id}`)) {
      layers.push(id);
    }
  } else if (ids) {
    ids.forEach(lid => {
      if (!layers.includes(`${lid}`)) {
        layers.push(lid);
      }
    })
  }
  eParams.layers = `show:${layers.join(',')}`;
  return eParams;
}

const addGeoLayerToSource = (eParams, name, names = null, allNames = null) => {
  if (names) {
    eParams.LAYERS = `${eParams.LAYERS},${names.join(',')}`;
  } else {
    eParams.LAYERS = `${eParams.LAYERS},${name}`;
  }

  const array = eParams.LAYERS.split(',')
  let uniqueLayers = [...new Set(array)];
  if (allNames) {
    uniqueLayers = allNames.filter(n => uniqueLayers.includes(n)).reverse();
  }
  eParams.LAYERS = uniqueLayers.join(',')
  return eParams;
}

const getLayersFromSource = (eParams) => {
  return eParams.layers.split(':')[1].split(',');
}

const removeLayerFromSource = (eParams, id, ids = null) => {
  let layers = eParams.layers.split(':')[1].split(',');
  if (ids) {
    layers = layers.filter(lid => !ids.includes(Number(lid)));
  } else if (id >= 0) {
    layers = layers.filter(lid => Number(lid) !== id);
  }
  eParams.layers = `show:${layers.length ? layers.join(',') : "-1"}`;
  return eParams;
}

const removeGeoLayerFromSource = (eParams, name, names = null) => {
  // console.log("names", names)
  if (names) {
    eParams.LAYERS = eParams.LAYERS.split(',').filter(l => !names.includes(l)).join(',');
  } else {
    eParams.LAYERS = eParams.LAYERS.split(',').filter(l => l !== name).join(',');
  }
  // console.log("eParams", eParams)
  return eParams;
}

function compare(FirstLegend, SecondLegend) {
  // const firstParentId = parseInt(FirstLegend.parentId);
  // const secondParentId = parseInt(SecondLegend.parentId);
  const firstParent = FirstLegend.parentId.split('-')[FirstLegend.parentId.split('-').length-1];
  const secondParent = SecondLegend.parentId.split('-')[SecondLegend.parentId.split('-').length - 1];

  const firstParentId = parseInt(firstParent);
  const secondParentId = parseInt(secondParent);

  let comparison = 0;
  if (firstParentId < secondParentId) {
    comparison = -1;
  } else if (firstParentId > secondParentId) {
    comparison = 1;
  }
  return comparison;
}

const arrangeLegendsinLayersOrder = (legends) => {
  return legends.sort(compare);
}

const updateLayersOpacity = (layersData, opacity) => {
  const {
    mapLayers,
    compareMapLayers,
    filterLayers,
    map,
    compareMap,
    tocData,
    visibleLayers,
    allLayers
  } = layersData

  mapLayers.forEach((e) => {
    const title = e.get('title');
    const filterLayer = filterLayers[title];
    if (filterLayer && filterLayer.isLocked === false) {
      delete filterLayers[title];
      const titleArr = title.split('-');
      const parentLayerId = getLayerParentIds(title)[0]
      const ep = mapLayers.find(e => e.get('title') === parentLayerId);
      const allLayersForMainParent = allLayers.filter(l => l.parentlayerids.includes(parentLayerId) && l.sublayerids === null);
      const allNames = allLayersForMainParent.map(l => l.groupname).filter(f => f !== undefined);
      let geoLayer = false;
      if(allNames.length > 0) {
        geoLayer = true;
      }
      if (ep) {
        if(geoLayer) {
          const eParams = addGeoLayerToSource(e.getSource().getParams(), title);
          ep.getSource().updateParams(eParams);
        } else {
          const eParams = addLayerToSource(ep.getSource().getParams(), titleArr[titleArr.length - 1]);
          const layerDefs = createLayerDefination([title, ...visibleLayers.filter(v => v.includes(parentLayerId))], tocData)
          eParams.layerDefs = layerDefs;
          ep.getSource().updateParams(eParams);
        }
      }
      map.removeLayer(e);
    } else if (!filterLayer) {
      e.setOpacity(opacity);
    }
  });

  compareMapLayers.forEach((e) => {
    const title = e.get('title');
    const filterLayer = filterLayers[title];
    if (filterLayer && filterLayer.isLocked === false) {
      delete filterLayers[title];
      const titleArr = title.split('-');
      const parentLayerId = getLayerParentIds(title)[0]
      const ep = compareMapLayers.find(e => e.get('title') === parentLayerId);
      const allLayersForMainParent = allLayers.filter(l => l.parentlayerids.includes(parentLayerId) && l.sublayerids === null);
      const allNames = allLayersForMainParent.map(l => l.groupname).filter(f => f !== undefined);
      let geoLayer = false;
      if(allNames.length > 0) {
        geoLayer = true;
      }
      if (ep) {
        if(geoLayer) {
          const eParams = addGeoLayerToSource(e.getSource().getParams(), title);
          ep.getSource().updateParams(eParams);
        } else {
          const eParams = addLayerToSource(ep.getSource().getParams(), titleArr[titleArr.length - 1]);
          const layerDefs = createLayerDefination([title, ...visibleLayers.filter(v => v.includes(parentLayerId))], tocData)
          eParams.layerDefs = layerDefs;
          ep.getSource().updateParams(eParams);
        }
      }
      compareMap.removeLayer(e);
    } else if (!filterLayer) {
      e.setOpacity(opacity);
    }
  });

  return ({
    mapLayers,
    compareMapLayers,
    opacity,
    filterLayers
  })
}

const createLayerDefination = (layerIds = [], tocData) => {
  let layerDefs = {};
  try {
    const {
      layersData,
      tocLayer
    } = tocData;
    layerIds.forEach(layerId => {
      let where = '';
      let geometry = null,
        filtersData = {},
        filteredIds = null,
        OBJECTID = null,
        layer = null;
      if (tocLayer && tocLayer.layerId === layerId) {
        geometry = tocData.geometry;
        filtersData = tocData.filtersData;
        OBJECTID = tocData.OBJECTID;
        filteredIds = tocData.filteredIds;
        layer = tocLayer
      } else if (layersData[layerId]) {
        layer = layersData[layerId].tocLayer
        geometry = layersData[layerId].geometry;
        filtersData = layersData[layerId].filtersData;
        OBJECTID = layersData[layerId].OBJECTID;
        filteredIds = layersData[layerId].filteredIds;
      }

      if (geometry && Object.keys(filtersData).length > 0) {
        where = createWhereCondition(filtersData);
        const layerWhereString = `${OBJECTID} IN (${filteredIds ? filteredIds.join(',') : 0})`;
        where += ` AND ${layerWhereString}`;
      } else if (geometry) {
        where = `${OBJECTID} IN (${filteredIds ? filteredIds.join(',') : 0})`;
      } else if (Object.keys(filtersData).length > 0) {
        where = createWhereCondition(filtersData);
      }
      if (layer) {
        layerDefs[layer.id] = where;
      }
    })
    return JSON.stringify(layerDefs);
  } catch (err) {
    return layerDefs;
  }
}

export {
  createLayerDataArray,
  createGeoLayerDataArray,
  createLayer,
  createGeoLayer,
  addSelectedLayersCount,
  removeSelectedLayersCount,
  getLayerParentIds,
  getLayerParentId,
  addCountToLayer,
  addSubLayersCount,
  addLayerToSource,
  addGeoLayerToSource,
  removeLayerFromSource,
  removeGeoLayerFromSource,
  arrangeLegendsinLayersOrder,
  getMainLayerParentId,
  getLayerId,
  updateLayersOpacity,
  getLayersFromSource
}
