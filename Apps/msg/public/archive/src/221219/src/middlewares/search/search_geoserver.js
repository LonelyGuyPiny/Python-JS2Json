import superagent from 'superagent';
import SOURCE from '../sources';
import {
  getTokenObj,
  distinct
} from '../../utils/common';
import {
  transCordinates
} from '../../utils/map';
import WMSCapabilities from 'ol/format/WMSCapabilities';
import {
  createLayer_MIDDLEWARE
} from '../../middlewares/layers/layer_middleware';
import links from '../../config/links';
/**
 * @function
 * @name createSearch_GEOSERVER
 * @description
 * create the search for geoserver
 * @param {Object} {data} search config data
 * @returns {search}
 */
export const createSearch_GEOSERVER = async (data) => {
  try {
    let results;
    if(data.type === 'searchData') {
      let layerGeoMetry = '';
      const featureTypeData = {
        typeName: data.layer,
        version: '2.0.0',
        request: 'describeFeatureType',
        service: 'wfs',
        outputFormat: 'application/json',
        ...getTokenObj(data.url)
      }
      const featureTypeRes = await superagent.post(`${data.url}/wfs`).send(featureTypeData).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      if (!featureTypeRes.text.includes('<?xml')) {
        const featureTypes = JSON.parse(featureTypeRes.text).featureTypes;
        const geometry = featureTypes && featureTypes.length > 0 ? featureTypes[0].properties.find(f => f.type.substring(0, 3) === 'gml') : null;
        if (geometry) {
          layerGeoMetry = geometry.name;
        }
      }
      const postData = {
        service: 'wfs',
        version: '2.0.0',
        request: 'getFeature',
        typename: data.layer,
        propertyName: `${data.orderByFields.split(' ')[0]},${layerGeoMetry}`,
        outputFormat: 'json'
      }
      if (data.where !== '1=1') {
        postData.CQL_FILTER = data.where;
      }

      results = await superagent.post(`${data.url}/wfs`).send(postData).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
    } else {
      const parser = new WMSCapabilities();
      results = await superagent.get(`${data.url}/ows?service=wms&version=1.3.0&request=GetCapabilities&namespace=${data.layer.split(':')[0]}`);
      const layerData = parser.read(results.text);
      layerData.Capability.Layer.Layer.forEach(cll => {
        if (cll.Layer) {
          const findLayer = cll.Layer.find(cl => cl.Name === data.layer);
          if (findLayer === undefined) {
            return;
          } else {
            results = findLayer;
          }
        } else if (cll.Name === data.layer) {
          results = cll;
        }
      });
    }
    return results;
  } catch (err) {
    // console.log("err", err);
  }
}

/**
 * @function
 * @name createSearch_GEOSERVER
 * @description
 * create the search for geoserver
 * @param {Object} {data} search config data
 * @returns {search}
 */
export const createSearchSpatial_GEOSERVER = async (requestData) => {
  try {
    let geoGeometrty = null;
    const findGeo = requestData.allLayers.find(al => al.groupname === requestData.combobox.layer);
    // if (findGeo) {
    //   var geoLayerId = findGeo.id;
    //   var layerProjection = findGeo.projection;
    // } else
    if (findGeo && findGeo.geometrytype) {
      var geoLayerId = findGeo.id;
      var layerProjection = findGeo.projection;
      geoGeometrty = findGeo.geometrytype;
    } else if (findGeo && !findGeo.geometrytype) {
      // console.log("inside request");
      geoLayerId = findGeo.id;
      layerProjection = findGeo.projection;
      const apiData = {
        api: {
          type: SOURCE.GEOSERVER
        },
        url: requestData.url,
        featureTypeRequest: true,
        typeName: requestData.typeNames
      };
      const featureTypeRes = await createLayer_MIDDLEWARE(apiData);
      if (!featureTypeRes.text.includes('<?xml')) {
        const featureTypes = JSON.parse(featureTypeRes.text).featureTypes;
        const geometry = featureTypes && featureTypes.length > 0 ? featureTypes[0].properties.find(f => f.type.substring(0, 3) === 'gml') : null;
        geoGeometrty = geometry.name;
        findGeo.geometrytype = geometry.name;
      }
    } else {
      geoLayerId = requestData.layer.id;
      layerProjection = requestData.layer.layerData.CRS[0];
      const apiData = {
        api: {
          type: SOURCE.GEOSERVER
        },
        url: requestData.url,
        featureTypeRequest: true,
        typeName: requestData.typeNames
      };
      const featureTypeRes = await createLayer_MIDDLEWARE(apiData);
      if (!featureTypeRes.text.includes('<?xml')) {
        const featureTypes = JSON.parse(featureTypeRes.text).featureTypes;
        const geometry = featureTypes && featureTypes.length > 0 ? featureTypes[0].properties.find(f => f.type.substring(0, 3) === 'gml') : null;
        geoGeometrty = geometry.name;
        // findGeo.geometrytype = geometry.name;
      }
    }
    // geoGeometrty = findGeo.geometrytype ? findGeo.geometrytype : '';
    let intersectGeometryType = '';
    let flatCordinates;
    if (requestData.geometryType === 'esriGeometryPoint') {
      intersectGeometryType = 'POLYGON';
      if (requestData.projection !== layerProjection) {
        const x1 = requestData.bboxCordinate[0];
        const y1 = requestData.bboxCordinate[1];
        const x2 = requestData.bboxCordinate[2];
        const y2 = requestData.bboxCordinate[3];
        const firstCord = [x1, y1];
        const secondCord = [x2, y2];
        const transFCord = transCordinates(firstCord, layerProjection, requestData.projection);
        const transSCord = transCordinates(secondCord, layerProjection, requestData.projection);
        const newx1 = transFCord[0];
        const newy1 = transFCord[1];
        const newx2 = transSCord[0];
        const newy2 = transSCord[1];
        flatCordinates = "(" + newx1 + " " + newy1 + "," + newx2 + " " + newy1 + "," + newx2 + " " + newy2 + "," + newx1 + " " + newy2 + "," + newx1 + " " + newy1 + ")";
      } else {
        const x1 = requestData.bboxCordinate[0];
        const y1 = requestData.bboxCordinate[1];
        const x2 = requestData.bboxCordinate[2];
        const y2 = requestData.bboxCordinate[3];
        flatCordinates = "(" + x1 + " " + y1 + "," + x2 + " " + y1 + "," + x2 + " " + y2 + "," + x1 + " " + y2 + "," + x1 + " " + y1 + ")";
      }
    } else if (requestData.geometryType === 'esriGeometryPolygon') {
      intersectGeometryType = 'POLYGON';
      if (requestData.projection !== layerProjection) {
        const finalCordArr = requestData.bboxCordinate.reduce(function (coordinates, coordinate, i) {
          if (i % 2 === 0) {
            coordinates.push([coordinate, requestData.bboxCordinate[i + 1]]);
          }
          return coordinates;
        }, []);
        // console.log("finalCord", finalCordArr);
        const transformedCordArr = finalCordArr.map(cordArr => {
          return transCordinates(cordArr, layerProjection, requestData.projection);
        });
        // console.log("transformedCordArr", transformedCordArr);
        // const finalArr = transformedCordArr.map(tc => {return tc.map(tca => { return tca })});
        const finalArr = [];
        transformedCordArr.forEach(tc => {
          tc.forEach(tca => {
            finalArr.push(tca);
          })
        });
        flatCordinates = "(";
        finalArr.forEach((coordinate, i) => {
          if (i === 0) {
            flatCordinates = flatCordinates + coordinate
          } else if (i % 2 === 0) {
            flatCordinates = flatCordinates + "," + coordinate;
          } else {
            flatCordinates = flatCordinates + " " + coordinate
          }
        });
        flatCordinates = flatCordinates + ")";
        // const firstArrCord = [requestData.bboxCordinate[0], requestData.bboxCordinate[1]];
        // const secondArrCord = [requestData.bboxCordinate[2], requestData.bboxCordinate[3]];
        // const thirdArrCord = [requestData.bboxCordinate[4], requestData.bboxCordinate[5]];
        // const fourthArrCord = [requestData.bboxCordinate[6], requestData.bboxCordinate[7]];
        // const transFCord = transCordinates(firstArrCord, layerProjection, requestData.projection);
        // const transSCord = transCordinates(secondArrCord, layerProjection, requestData.projection);
        // const transTCord = transCordinates(thirdArrCord, layerProjection, requestData.projection);
        // const transfFCord = transCordinates(fourthArrCord, layerProjection, requestData.projection);
        // const finalArr = transFCord.concat(transSCord.concat(transTCord.concat(transfFCord)));
        // flatCordinates = "(";
        // finalArr.forEach((coordinate, i) => {
        //   if (i === 0) {
        //     flatCordinates = flatCordinates + coordinate
        //   } else if (i % 2 === 0) {
        //     flatCordinates = flatCordinates + "," + coordinate;
        //   } else {
        //     flatCordinates = flatCordinates + " " + coordinate
        //   }
        // });
        // flatCordinates = flatCordinates + ")";
      } else {
        flatCordinates = "(";
        requestData.bboxCordinate.forEach((coordinate, i) => {
          if (i === 0) {
            flatCordinates = flatCordinates + coordinate
          } else if (i % 2 === 0) {
            flatCordinates = flatCordinates + "," + coordinate;
          } else {
            flatCordinates = flatCordinates + " " + coordinate
          }
        });
        flatCordinates = flatCordinates + ")";
      }
    } else if (requestData.geometryType === 'esriGeometryPolyline') {
      intersectGeometryType = 'LINESTRING';
      if (requestData.projection !== layerProjection) {
        const finalCordArr = requestData.bboxCordinate.reduce(function (coordinates, coordinate, i) {
          if (i % 2 === 0) {
            coordinates.push([coordinate, requestData.bboxCordinate[i + 1]]);
          }
          return coordinates;
        }, []);
        const transformedCordArr = finalCordArr.map(cordArr => {
          return transCordinates(cordArr, layerProjection, requestData.projection);
        });
        const finalArr = [];
        transformedCordArr.forEach(tc => {
          tc.forEach(tca => {
            finalArr.push(tca);
          })
        });
        finalArr.forEach((coordinate, i) => {
          if (i === 0) {
            flatCordinates = coordinate;
          } else if (i % 2 === 0) {
            flatCordinates = flatCordinates + "," + coordinate;
          } else {
            flatCordinates = flatCordinates + " " + coordinate;
          }
        });
        // const x1 = requestData.bboxCordinate[0];
        // const y1 = requestData.bboxCordinate[1];
        // const x2 = requestData.bboxCordinate[2];
        // const y2 = requestData.bboxCordinate[3];
        // const firstCord = [x1, y1];
        // const secondCord = [x2, y2];
        // const transFCord = transCordinates(firstCord, layerProjection, requestData.projection);
        // const transSCord = transCordinates(secondCord, layerProjection, requestData.projection);
        // const newx1 = transFCord[0];
        // const newy1 = transFCord[1];
        // const newx2 = transSCord[0];
        // const newy2 = transSCord[1];
        // flatCordinates = newx1 + " " + newy1 + "," + newx2 + " " + newy2;
      } else {
        requestData.bboxCordinate.forEach((coordinate, i) => {
          if (i === 0) {
            flatCordinates = coordinate;
          } else if (i % 2 === 0) {
            flatCordinates = flatCordinates + "," + coordinate;
          } else {
            flatCordinates = flatCordinates + " " + coordinate;
          }
        });
        // flatCordinates = requestData.bboxCordinate[0] + " " + requestData.bboxCordinate[1] + "," + requestData.bboxCordinate[2] + " " + requestData.bboxCordinate[3];
      }
    } else if (requestData.geometryType === 'esriGeometryEnvelope') {
      intersectGeometryType = 'POLYGON';
      if (requestData.projection !== layerProjection) {
        const x1 = requestData.bboxCordinate[0];
        const y1 = requestData.bboxCordinate[1];
        const x2 = requestData.bboxCordinate[2];
        const y2 = requestData.bboxCordinate[3];
        const firstCord = [x1, y1];
        const secondCord = [x2, y2];
        const transFCord = transCordinates(firstCord, layerProjection, requestData.projection);
        const transSCord = transCordinates(secondCord, layerProjection, requestData.projection);
        const newx1 = transFCord[0];
        const newy1 = transFCord[1];
        const newx2 = transSCord[0];
        const newy2 = transSCord[1];
        flatCordinates = "(" + newx1 + " " + newy1 + "," + newx2 + " " + newy1 + "," + newx2 + " " + newy2 + "," + newx1 + " " + newy2 + "," + newx1 + " " + newy1 + ")";
      } else {
        const x1 = requestData.bboxCordinate[0];
        const y1 = requestData.bboxCordinate[1];
        const x2 = requestData.bboxCordinate[2];
        const y2 = requestData.bboxCordinate[3];
        flatCordinates = "(" + x1 + " " + y1 + "," + x2 + " " + y1 + "," + x2 + " " + y2 + "," + x1 + " " + y2 + "," + x1 + " " + y1 + ")";
      }
    }
    let cqlFilter = `INTERSECTS(${geoGeometrty},${intersectGeometryType}(${flatCordinates}))`;
    // console.log("cqlFilter", cqlFilter);
    const postData = {
      service: 'wfs',
      version: '1.0.0',
      request: 'GetFeature',
      typeNames: requestData.typeNames,
      CQL_FILTER: `${cqlFilter} AND ${requestData.where}`,
      outputFormat: 'JSON',
      ...getTokenObj(requestData.url)
    };
    // console.log("postData", postData);
    let results = await superagent.post(`${requestData.url}/wfs`).send(postData).set({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    let queryData = JSON.parse(results.text);
    queryData.type = SOURCE.GEOSERVER;
    const findLayer = requestData.allLayers.find(al => al.groupname === requestData.combobox.layer);
    if (findLayer) {
      var layerLinks = findLayer.currentlinks;
    } else {
      layerLinks = links.find(l => l.layerName === requestData.layer.layerData.Name);
    }
    queryData.layer = {
      layerId: geoLayerId,
      id: geoLayerId,
      url: requestData.layer.source,
      name: requestData.layerName,
      cb_id: requestData.layer.cb_id,
      currentLinks: layerLinks
    }
    return queryData;
  } catch(err) {
    console.log("err", err);
  }
}

/**
 * @function
 * @name createSearchOptions_GEOSERVER
 * @description
 * create the search options for geoserver
 * @param {Object} {data} search data
 * @returns {search options}
 */
export const createSearchOptions_GEOSERVER = (searchData) => {
  try {
    let options = [];
    searchData.data.features.forEach((feature, i) => {
      if (feature.properties[searchData.comboboxField]) {
        const option = {
          key: i,
          value: feature.properties[searchData.comboboxField],
          text: feature.properties[searchData.comboboxField],
          geometry: feature.geometry
        }
        options.push(option);
      }
    });
    // console.log("options", options);
    options = distinct(options, 'value');
    options.sort(sortOptions);
    return options;
  } catch (err) {
    console.log("err", err);
  }
}

/**
 * @function
 * @name createSearchLink_GEOSERVER
 * @description
 * create the search link for geoserver
 * @param {Object} {data} search data
 * @returns {search link}
 */
export const createSearchRowData_GEOSERVER = (rowData) => {
  try {
    let rows = rowData.comboboxData[rowData.cb_id].features.filter(f => f.properties[rowData.field] === rowData.value).map(f => f.properties);
    let geoData = rowData.geoData;
    let keyMatched = false;
    Object.keys(geoData).forEach(key => {
      if (key === rowData.field) {
        keyMatched = true;
        geoData[rowData.field] = rows[0][rowData.field];
      }
    });
    if (!keyMatched) {
      geoData = {
        ...geoData,
        [rowData.field]: rows[0][rowData.field]
      }
    }
    return {
      geoData
    };
  } catch (err) {
    console.log("err", err);
  }
}

/**
 * @function
 * @name createSearchLink_GEOSERVER
 * @description
 * create the search link for geoserver
 * @param {Object} {data} search data
 * @returns {search link}
 */
export const createSearchLink_GEOSERVER = (linkData) => {
  try {
    const linkRes = linkData.links.filter(l => l.layerName === linkData.layerName && l.source === SOURCE.GEOSERVER);
    return linkRes;
  } catch (err) {
    console.log("err", err);
  }
}

/**
 * @function
 * @name createSearchGeometry_GEOSERVER
 * @description
 * create the search geometry for geoserver
 * @param {Object} {data} search geometry data
 * @returns {search geometry}
 */
export const createSearchGeometry_GEOSERVER = (geometryData) => {
  try {
    const geometry = geometryData.comboboxData[geometryData.cb_id].features.filter(f => f.properties[geometryData.field] === geometryData.value).map(f => f.geometry);
    return geometry;
  } catch (err) {
    console.log("err", err);
  }
}

const sortOptions = function (a, b) {
  if (typeof a.value === 'number') {
    return a - b;
  } else if (a.value && b.value) {
    return a.value.localeCompare(b.value);
  }
};