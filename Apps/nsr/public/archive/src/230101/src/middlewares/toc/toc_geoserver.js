import superagent from 'superagent';
import moment from 'moment';
import SOURCE from '../sources';
import Polygon from 'ol/geom/Polygon';
import MultiPolygon from 'ol/geom/MultiPolygon';
import MultiLineString from 'ol/geom/MultiLineString';
import LineString from 'ol/geom/LineString';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import {
  Style,
  Icon,
} from 'ol/style';
import {
  getCenter
} from 'ol/extent';
import {
  transCordinates
} from '../../utils/map';
import {
  getTokenObj,
  downloadFile,
  // createWhereCondition,
  // dateFunction
} from '../../utils/common';
import {
  createLayer_MIDDLEWARE
} from '../../middlewares/layers/layer_middleware';
import {
  settings
} from '../../config/settings';

/**
 * @function
 * @name createTocData_GEOSERVER
 * @description
 * middleware for toc data fetching from geoserver source
 * @param {Object} {layer} layer config data
 * @returns {toc data}
 */
export const createTocData_GEOSERVER = async (data) => {
  try {
    if (data.exceededTransferLimit) {
      const postData = {
        service: 'wfs',
        version: '2.0.0',
        request: 'getFeature',
        typename: data.layer,
        outputFormat: 'json',
        resultType: 'hits'
      }
      const results = await superagent.post(`${data.url}/wfs`).send(postData).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      const count = parseXmlStringToJson(results.text);
      return count;
    } else {
      let postData = {
        service: 'wfs',
        version: '2.0.0',
        request: 'getFeature',
        typename: data.layer,
        startIndex: data.resultOffset,
        count: data.tableLimit,
        // sortBy: data.orderByFields === 'id' ? '' : data.orderByFields,
        outputFormat: 'json'
      }

      const apiData = {
        api: {
          type: data.source
        },
        url: data.url,
        featureTypeRequest: true,
        typeName: data.layer,
      };
      const featureTypeRes = await createLayer_MIDDLEWARE(apiData);
      const featureTypes = JSON.parse(featureTypeRes.text).featureTypes;

      const fields = [];
      featureTypes[0].properties.forEach(feature => {
        if (!feature.type.includes('gml')) {
          const fieldObject = {
            name: feature.name,
            alias: feature.name.replaceAll('_', ' '),
            type: feature.type.split(':')[1]
          };
          fields.push(fieldObject)
        }
      });

      // if (data.orderByFields === 'id' || data.orderByFields === undefined) {
      postData.sortBy = data.orderByFields === 'id' || data.orderByFields === undefined ? fields[0].name : data.orderByFields;
      // } else {}

      if (data.geometryData && data.geometryData.geometry) {
        const funcData = {
          allLayers: data.allLayers,
          projection: data.projection,
          tocLayer: data.tocLayer,
          url: data.url,
          geometry: {
            pointCoordinates: data.geometryData.pointCoordinates,
            type: data.geometryData.geometryType
          }
        };
        const cql_filter = getCqlFIlter(funcData);
        postData.CQL_FILTER = cql_filter;
        postData.version = '1.0.0';
      } else if (data.geometryData && data.geometryData.geometry && data.where !== '1=1' && data.where !== undefined) {
        const funcData = {
          allLayers: data.allLayers,
          projection: data.projection,
          tocLayer: data.tocLayer,
          url: data.url,
          geometry: {
            pointCoordinates: data.geometryData.pointCoordinates,
            type: data.geometryData.geometryType
          }
        };
        const cql_filter = getCqlFIlter(funcData);
        postData.CQL_FILTER = `${cql_filter} AND ${data.where}`;
        postData.version = '1.0.0';
      } else if (data.where !== '1=1' && data.where !== undefined) {
        postData.version = '1.0.0';
        postData.CQL_FILTER = data.where;
      }

      const results = await superagent.post(`${data.url}/wfs`).send(postData).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      const res = JSON.parse(results.text);
      const crs = res.crs;
      const geometryType = res.features[0].geometry_name;
      const allFeatures = res.features;
      const exceededTransferLimit = res.totalFeatures > res.numberReturned || res.totalFeatures === 'unknown' ? true : false;
      const uniqueFieldArr = ['UID', 'OBJECTID_1', 'objectid_1', 'objectid', 'OBJECTID', 'fid', 'FID', 'id'];
      let uniqueField;
      uniqueFieldArr.every(function (element) {
        const fieldExist = fields.find(f => f.name === element);
        if (fieldExist) {
          uniqueField = element;
          return false;
        }
        return true;
      });
      let OBJECTID;
      if (uniqueField === undefined) {
        OBJECTID = 'id';
        allFeatures.forEach(feature => {
          feature.properties[OBJECTID] = feature.id.split('.')[1];
        });
      } else {
        OBJECTID = uniqueField;
      }
      const resObject = {
        geometryType,
        allFeatures,
        fields,
        exceededTransferLimit,
        OBJECTID,
        crs
      };
      return resObject;
    }
  } catch (err) {
    // console.log("middleware err", err);
  }
}

/**
 * @function
 * @name createTocLayerFields_GEOSERVER
 * @description
 * create toc fields data fetching from geoserver
 * @param {Object} {fields} fields data
 * @returns {layer fields}
 */
export const createTocLayerFields_GEOSERVER = (data) => {
  try {
    const layerFields = data.fields;
    const field = data.fields.map(f => f.name);
    const resObject = {
      layerFields,
      field
    };
    return resObject;
  } catch (err) {
    // console.log("createTocLayerFields err", err);
  }
}

/**
 * @function
 * @name fetchNextRecords_GEOSERVER
 * @description
 * middleware for next toc data fetching from geoserver source
 * @param {Object} {layer} layer config data
 * @returns {toc next data}
 */
export const fetchNextRecords_GEOSERVER = async (data) => {
  try {
    const postData = {
      service: 'wfs',
      version: '2.0.0',
      request: 'getFeature',
      typename: data.layer,
      startIndex: data.offset,
      count: data.limit,
      // sortBy: data.sorting ? `${data.sorting.fieldName} ${data.sorting.type}` : data.OBJECTID,
      // CQL_FILTER: data.where,
      outputFormat: 'json'
    }

    if (data.sorting) {
      if (data.sorting.type === 'ASC') {
        var featuresSorting = ' A';
      } else if (data.sorting.type === 'DESC') {
        featuresSorting = ' D';
      }
      postData.sortBy = data.sorting.fieldName + featuresSorting;
    } else {
      postData.sortBy = data.OBJECTID
    }

    if (data.where && data.where !== '1=1') {
      postData.version = '1.0.0';
      postData.CQL_FILTER = data.where;
    }

    const results = await superagent.post(`${data.url}/wfs`).send(postData).set({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return results;
  } catch (err) {
    // console.log("err", err);
  }
}

/**
 * @function
 * @name fetchAllRecords_GEOSERVER
 * @description
 * middleware for toc data fetching less than 1000 from geoserver source
 * @param {Object} {layer} layer config data
 * @returns {toc all features}
 */
export const fetchAllRecords_GEOSERVER = async (data) => {
  try {
    const postData = {
      service: 'wfs',
      version: '2.0.0',
      request: 'getFeature',
      typename: data.layer,
      startIndex: 0,
      outputFormat: 'json'
    }

    const apiData = {
      api: {
        type: data.source
      },
      url: data.url,
      featureTypeRequest: true,
      typeName: data.layer,
    };
    const featureTypeRes = await createLayer_MIDDLEWARE(apiData);
    const featureTypes = JSON.parse(featureTypeRes.text).featureTypes;
    const fields = [];
    featureTypes[0].properties.forEach(feature => {
      if (!feature.type.includes('gml')) {
        const fieldObject = {
          name: feature.name,
          alias: feature.name.replaceAll('_', ' '),
          type: feature.type.split(':')[1]
        };
        fields.push(fieldObject)
      }
    });

    postData.sortBy = fields[0].name;

    const results = await superagent.post(`${data.url}/wfs`).send(postData).set({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const {
      features
    } = JSON.parse(results.text);
    const res = JSON.parse(results.text);
    
    // var fields = fieldArr;
    // const uniqueField = fields.find(f => f.name === 'UID' || f.name === 'OBJECTID_1' || f.name === 'objectid' || f.name === 'OBJECTID' || f.name === 'fid' || f.name === 'FID' || f.name === 'id');
    const exceededTransferLimit = res.totalFeatures > res.numberReturned || res.totalFeatures === 'unknown' ? true : false;
    const uniqueFieldArr = ['UID', 'OBJECTID_1', 'objectid_1', 'objectid', 'OBJECTID', 'fid', 'FID', 'id'];
    let uniqueField;
    uniqueFieldArr.every(function (element) {
      const fieldExist = fields.find(f => f.name === element);
      if (fieldExist) {
        uniqueField = element;
        return false;
      }
      return true;
    });
    if (uniqueField === undefined) {
      const OBJECTID = 'id';
      features.forEach(feature => {
        feature.properties[OBJECTID] = feature.id.split('.')[1];
      });
    }
    return {
      features,
      exceededTransferLimit
    };
  } catch (err) {
    // console.log("fetch all records err", err);
  }
}

/**
 * @function
 * @name createFeature_GEOSERVER
 * @description
 * create feature data for geoserver
 * @param {Object} {feature} feature data
 * @returns {featureData}
 */
export const createFeature_GEOSERVER = (requestData) => {
  try {
    return {
      attributes: requestData.feature.properties,
      geoMetry: requestData.feature.geometry,
      featureKey: requestData.feature.properties[requestData.OBJECTID]
    }
  } catch (err) {
    // console.log("createFeature err", err);
  }
}

/**
 * @function
 * @name createLinks_GEOSERVER
 * @description
 * create links data for geoserver source
 * @param {Object} {links} links config data
 * @returns {links}
 */
export const createLinks_GEOSERVER = (requestData) => {
  try {
    const layerLinks = requestData.links.filter(l => l.layerName === requestData.name && l.source === SOURCE.GEOSERVER);
    return layerLinks;
  } catch (err) {
    // console.log("err", err);
  }
}

/**
 * @function
 * @name createGeometryFeature_GEOSERVER
 * @description
 * create the feature geometry for geoserver source
 * @param {Object} {geometry} geometry data
 * @returns {geometry}
 */
export const createGeometryFeature_GEOSERVER = (requestData) => {
  try {
    let feature;
    let fitExtent;
    let featureCenter;
    const coProj = requestData.layerCrs.properties.name.split('::')
    if (requestData.geometry.type === 'Point') {
      let coordinate = requestData.geometry.coordinates;
      coordinate = transCordinates(coordinate, requestData.projection, `EPSG:${coProj[1]}`);
      const point = new Point(coordinate);
      feature = new Feature({
        geometry: point,
        name: 'Null Island',
        population: 4000,
        rainfall: 500
      });
      const iconStyle = new Style({
        image: new Icon(({
          anchor: [0.5, 15],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          opacity: 1,
          height: 400,
          width: 658,
          src: require("../../assets/images/point.png")
        }))
      });
      feature.setStyle(iconStyle);
      fitExtent = coordinate;
      featureCenter = coordinate;
    } else if (requestData.geometry.type === 'LineString') {
      const cordinates = requestData.geometry.coordinates.map(cordArr => {
        return transCordinates(cordArr, requestData.projection, `EPSG:${coProj[1]}`);
      });
      let drawLine = new LineString(cordinates);
      feature = new Feature(drawLine);
      fitExtent = drawLine.getExtent();
      featureCenter = getCenter(drawLine.getExtent());
    } else if (requestData.geometry.type === 'MultiLineString') {
      const cordinates = requestData.geometry.coordinates.map(cordArr => {
        return cordArr.map(coordinate => transCordinates(coordinate, requestData.projection, `EPSG:${coProj[1]}`));
      });
      let drawLine = new MultiLineString(cordinates);
      feature = new Feature(drawLine);
      fitExtent = drawLine.getExtent();
      featureCenter = getCenter(drawLine.getExtent());
    } else if (requestData.geometry.type === 'Polygon') {
      const cordinates = requestData.geometry.coordinates.map(cordArr => {
        return cordArr.map(childCordArr => {
          return transCordinates(childCordArr, requestData.projection, `EPSG:${coProj[1]}`);
        });
      });
      const polygon = new Polygon(cordinates);
      feature = new Feature(polygon);
      fitExtent = polygon.getExtent();
      featureCenter = getCenter(polygon.getExtent());
    } else {
      const cordinates = requestData.geometry.coordinates.map(cordArr => {
        return cordArr.map(childCordArr => {
          return childCordArr.map(coordinate => {
            return transCordinates(coordinate, requestData.projection, `EPSG:${coProj[1]}`);
          });
        });
      });
      const polygon = new MultiPolygon(cordinates);
      feature = new Feature(polygon);
      fitExtent = polygon.getExtent();
      featureCenter = getCenter(polygon.getExtent());
    }
    return {
      feature,
      fitExtent,
      featureCenter
    }
  } catch (err) {
    // console.log("geometry err", err);
  }
}

/**
 * @function
 * @name createDrawFeature_GEOSERVER
 * @description
 * create draw feature data for geoserver source
 * @param {Object} {feature} feature data
 * @returns {featureData}
 */
export const createDrawFeature_GEOSERVER = async (requestData) => {
  try {
    // console.log("requestData", requestData);
    if (requestData.exceededTransferLimit) {
      const postData = {
        service: 'wfs',
        version: '2.0.0',
        request: 'getFeature',
        typename: requestData.tocLayer.groupname,
        outputFormat: 'json',
        resultType: 'hits'
      }
      if (requestData.where && requestData.where !== '1=1') {
        postData.CQL_FILTER = requestData.where;
      }
      const results = await superagent.post(`${requestData.url}/wfs`).send(postData).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      const count = parseXmlStringToJson(results.text);
      return count;
    } else if (requestData.geometryData && requestData.geometryData.geometryType) {
      const findGeo = requestData.allLayers.find(al => al.groupname === requestData.tocLayer.groupname && al.geometrytype);
      let geoGeometrty = findGeo.geometrytype;
      let typeNames = `(${requestData.tocLayer.groupname})`;
      let intersectGeometryType = '';
      let flatCordinates;
      if (requestData.geometryData.geometryType === 'esriGeometryPoint') {
        intersectGeometryType = 'POLYGON';
        if (requestData.projection !== requestData.tocLayer.projection) {
          const x1 = requestData.geometryData.pointCoordinates[0];
          const y1 = requestData.geometryData.pointCoordinates[1];
          const x2 = requestData.geometryData.pointCoordinates[2];
          const y2 = requestData.geometryData.pointCoordinates[3];
          const firstCord = [x1, y1];
          const secondCord = [x2, y2];
          const transFCord = transCordinates(firstCord, requestData.tocLayer.projection, requestData.projection);
          const transSCord = transCordinates(secondCord, requestData.tocLayer.projection, requestData.projection);
          const newx1 = transFCord[0];
          const newy1 = transFCord[1];
          const newx2 = transSCord[0];
          const newy2 = transSCord[1];
          flatCordinates = "(" + newx1 + " " + newy1 + "," + newx2 + " " + newy1 + "," + newx2 + " " + newy2 + "," + newx1 + " " + newy2 + "," + newx1 + " " + newy1 + ")";
        } else {
          const x1 = requestData.geometryData.pointCoordinates[0];
          const y1 = requestData.geometryData.pointCoordinates[1];
          const x2 = requestData.geometryData.pointCoordinates[2];
          const y2 = requestData.geometryData.pointCoordinates[3];
          flatCordinates = "(" + x1 + " " + y1 + "," + x2 + " " + y1 + "," + x2 + " " + y2 + "," + x1 + " " + y2 + "," + x1 + " " + y1 + ")";
        }
      } else if (requestData.geometryData.geometryType === 'esriGeometryPolygon') {
        intersectGeometryType = 'POLYGON';
        if (requestData.projection !== requestData.tocLayer.projection) {
          const finalCordArr = requestData.geometryData.pointCoordinates.reduce(function (coordinates, coordinate, i) {
            if (i % 2 === 0) {
              coordinates.push([coordinate, requestData.geometryData.pointCoordinates[i + 1]]);
            }
            return coordinates;
          }, []);
          const transformedCordArr = finalCordArr.map(cordArr => {
            return transCordinates(cordArr, requestData.tocLayer.projection, requestData.projection);
          });
          const finalArr = [];
          transformedCordArr.forEach(tc => {
            tc.forEach(tca => {
              finalArr.push(tca);
            })
          })
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
        } else {
          flatCordinates = "(";
          requestData.geometryData.pointCoordinates.forEach((coordinate, i) => {
            if (i === 0) {
              flatCordinates = flatCordinates + coordinate
            } else if (i % 2 === 0) {
              flatCordinates = flatCordinates + "," + coordinate;
            } else {
              flatCordinates = flatCordinates + " " + coordinate;
            }
          });
          flatCordinates = flatCordinates + ")";
        }
      } else if (requestData.geometryData.geometryType === 'esriGeometryPolyline') {
        intersectGeometryType = 'LINESTRING';
        if (requestData.projection !== requestData.tocLayer.projection) {
          const finalCordArr = requestData.geometryData.pointCoordinates.reduce(function (coordinates, coordinate, i) {
            if (i % 2 === 0) {
              coordinates.push([coordinate, requestData.geometryData.pointCoordinates[i + 1]]);
            }
            return coordinates;
          }, []);
          const transformedCordArr = finalCordArr.map(cordArr => {
            return transCordinates(cordArr, requestData.tocLayer.projection, requestData.projection);
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
        } else {
          requestData.geometryData.pointCoordinates.forEach((coordinate, i) => {
            if (i === 0) {
              flatCordinates = coordinate;
            } else if (i % 2 === 0) {
              flatCordinates = flatCordinates + "," + coordinate;
            } else {
              flatCordinates = flatCordinates + " " + coordinate;
            }
          });
        }
      } else if (requestData.geometryData.geometryType === 'esriGeometryEnvelope') {
        intersectGeometryType = 'POLYGON';
        if (requestData.projection !== requestData.tocLayer.projection) {
          const x1 = requestData.geometryData.pointCoordinates[0];
          const y1 = requestData.geometryData.pointCoordinates[1];
          const x2 = requestData.geometryData.pointCoordinates[2];
          const y2 = requestData.geometryData.pointCoordinates[3];
          const firstCord = [x1, y1];
          const secondCord = [x2, y2];
          const transFCord = transCordinates(firstCord, requestData.tocLayer.projection, requestData.projection);
          const transSCord = transCordinates(secondCord, requestData.tocLayer.projection, requestData.projection);
          const newx1 = transFCord[0];
          const newy1 = transFCord[1];
          const newx2 = transSCord[0];
          const newy2 = transSCord[1];
          flatCordinates = "(" + newx1 + " " + newy1 + "," + newx2 + " " + newy1 + "," + newx2 + " " + newy2 + "," + newx1 + " " + newy2 + "," + newx1 + " " + newy1 + ")";
        } else {
          const x1 = requestData.geometryData.pointCoordinates[0];
          const y1 = requestData.geometryData.pointCoordinates[1];
          const x2 = requestData.geometryData.pointCoordinates[2];
          const y2 = requestData.geometryData.pointCoordinates[3];
          const firstCord = [x1, y1];
          const secondCord = [x2, y2];
          const transFCord = transCordinates(firstCord, requestData.tocLayer.projection, requestData.projection);
          const transSCord = transCordinates(secondCord, requestData.tocLayer.projection, requestData.projection);
          const newx1 = transFCord[0];
          const newy1 = transFCord[1];
          const newx2 = transSCord[0];
          const newy2 = transSCord[1];
          flatCordinates = "(" + newx1 + " " + newy1 + "," + newx2 + " " + newy1 + "," + newx2 + " " + newy2 + "," + newx1 + " " + newy2 + "," + newx1 + " " + newy1 + ")";
        }
      }
      const cql_filter = `INTERSECTS(${geoGeometrty},${intersectGeometryType}(${flatCordinates}))`;
      const postData = {
        service: 'wfs',
        version: '1.0.0',
        request: 'GetFeature',
        typeNames: typeNames,
        // CQL_FILTER: `${cql_filter} AND ${requestData.where}`,
        outputFormat: 'JSON',
        ...getTokenObj(requestData.url)
      };
      if (requestData.where && requestData.where !== '1=1') {
        postData.version = '1.0.0';
        postData.CQL_FILTER = `${cql_filter} AND ${requestData.where}`
      } else {
        postData.version = '1.0.0';
        postData.CQL_FILTER = cql_filter;
      }
      const res = await superagent.post(`${requestData.url}/wfs`).send(postData).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      const resData = JSON.parse(res.text);
      // const uniqueField = Object.keys(resData.features[0].properties).find(f => f === 'UID' || f === 'OBJECTID_1' || f === 'objectid' || f === 'OBJECTID' || f === 'fid' || f === 'FID' || f === 'id');
      if (resData.features.length > 0) {
        const uniqueFieldArr = ['UID', 'OBJECTID_1', 'objectid_1', 'objectid', 'OBJECTID', 'fid', 'FID', 'id'];
        var uniqueField;
        const fields = Object.keys(resData.features[0].properties);
        uniqueFieldArr.every(function (element, index) {
          const fieldExist = fields.find(f => f.name === element);
          if (fieldExist) {
            uniqueField = element;
            return false;
          }
          return true;
        });
        if (uniqueField === undefined) {
          uniqueField = 'id';
          resData.features.forEach(feature => {
            feature.properties[uniqueField] = feature.id.split('.')[1];
          });
        }
        if (requestData.bufferData) {
          const idsArr = [];
          resData.features.forEach(feature => {
            idsArr.push(feature.properties[uniqueField]);
          });
          return idsArr;
        }
      }
      const resObject = {
        features: resData.features
      };
      return resObject;
    } else {
      const postData = {
        service: 'wfs',
        version: '2.0.0',
        request: 'getFeature',
        typename: requestData.tocLayer.groupname,
        startIndex: 0,
        count: requestData.resultRecordCount,
        // CQL_FILTER: requestData.where,
        // sortBy: requestData.sorting ? requestData.sorting.fieldName : requestData.OBJECTID,
        outputFormat: 'json'
      }

      if (requestData.where && requestData.where !== '1=1') {
        postData.version = '1.0.0';
        postData.CQL_FILTER = requestData.where;
      }

      if (requestData.sorting) {
        if (requestData.sorting.type === 'ASC') {
          var featuresSorting = ' A';
        } else if (requestData.sorting.type === 'DESC') {
          featuresSorting = ' D';
        }
        postData.sortBy = requestData.sorting.fieldName + featuresSorting;
      } else if (requestData.OBJECTID === 'id') {
        const apiData = {
          api: {
            type: requestData.source
          },
          url: requestData.url,
          featureTypeRequest: true,
          typeName: requestData.tocLayer.groupname,
        };
        const featureTypeRes = await createLayer_MIDDLEWARE(apiData);
        const featureTypes = JSON.parse(featureTypeRes.text).featureTypes;

        const fields = [];
        featureTypes[0].properties.forEach(feature => {
          if (!feature.type.includes('gml')) {
            const fieldObject = {
              name: feature.name,
              alias: feature.name.replaceAll('_', ' '),
              type: feature.type.split(':')[1]
            };
            fields.push(fieldObject)
          }
        });
        postData.sortBy = fields[0].name;
      } else {
        postData.sortBy = requestData.OBJECTID;
      }

      const results = await superagent.post(`${requestData.url}/wfs`).send(postData).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      const res = JSON.parse(results.text);
      const exceededTransferLimit = res.totalFeatures > res.numberReturned || res.totalFeatures === 'unknown' ? true : false;
      // const uniqueField = Object.keys(res.features[0].properties).find(f => f === 'UID' || f === 'OBJECTID_1' || f === 'objectid' || f === 'OBJECTID' || f === 'fid' || f === 'FID' || f === 'id');
      if (res.features.length > 0) {
        const uniqueFieldArr = ['UID', 'OBJECTID_1', 'objectid_1', 'objectid', 'OBJECTID', 'fid', 'FID', 'id'];
        let uniqueField;
        const fields = Object.keys(res.features[0].properties);
        uniqueFieldArr.every(function (element, index) {
          const fieldExist = fields.find(f => f.name === element);
          if (fieldExist) {
            uniqueField = element;
            return false;
          }
          return true;
        });

        if (uniqueField === undefined) {
          const OBJECTID = 'id';
          res.features.forEach(feature => {
            feature.properties[OBJECTID] = feature.id.split('.')[1];
          });
        }
      }
      const resObject = {
        features: res.features,
        exceededTransferLimit
      };
      return resObject;
    }
  } catch (err) {
    // console.log("createDrawFeature_GEOSERVER err", err);
  }
}

/**
 * @function
 * @name createFocusFeature_GEOSERVER
 * @description
 * create focus feature data for geoserver source
 * @param {Object} {feature} feature data
 * @returns {featureData}
 */
export const createFocusFeature_GEOSERVER = (requestData) => {
  try {
    const coProj = requestData.crs.properties.name.split('::');
    if (requestData.geometry.type === 'Point') {
      let coordinate = requestData.geometry.coordinates;
      coordinate = transCordinates(coordinate, requestData.projection, `EPSG:${coProj[1]}`);
      const point = new Point(coordinate);
      const feature = new Feature({
        geometry: point,
        name: 'Null Island',
        population: 4000,
        rainfall: 500
      });
      const iconStyle = new Style({
        image: new Icon(({
          anchor: [0.5, 15],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          opacity: 1,
          height: 400,
          width: 658,
          src: require("../../assets/images/point.png")
        }))
      });
      feature.setStyle(iconStyle);
      return feature;
    } else if (requestData.geometry.type === 'LineString') {
      const cordinates = requestData.geometry.coordinates.map(cordArr => {
        return transCordinates(cordArr, requestData.projection, `EPSG:${coProj[1]}`);
      });
      let drawLine = new LineString(cordinates);
      return new Feature(drawLine);
    } else if (requestData.geometry.type === 'MultiLineString') {
      const cordinates = requestData.geometry.coordinates.map(cordArr => {
        return cordArr.map(coordinate => transCordinates(coordinate, requestData.projection, `EPSG:${coProj[1]}`))
      })
      // let coordinate = geometry.flatCoordinates;
      let drawLine = new MultiLineString(cordinates);
      return new Feature(drawLine);
    } else if (requestData.geometry.type === 'Polygon') {
      const cordinates = requestData.geometry.coordinates.map(cordArr => {
        return cordArr.map(childCordArr => {
          return transCordinates(childCordArr, requestData.projection, `EPSG:${coProj[1]}`);
        });
      });
      const polygon = new Polygon(cordinates);
      return new Feature(polygon);
    } else {
      const cordinates = requestData.geometry.coordinates.map(cordArr => {
        return cordArr.map(childCordArr => {
          return childCordArr.map(coordinate => {
            return transCordinates(coordinate, requestData.projection, `EPSG:${coProj[1]}`);
          });
        });
      });
      const polygon = new MultiPolygon(cordinates);
      return new Feature(polygon);
    }
  } catch (err) {
    // console.log("geo err", err);
  }
}

/**
 * @function
 * @name createTocExport_GEOSERVER
 * @description
 * export layer data for geoserver
 * @param {Object} {data} layer data
 * @returns {export data}
 */
export const createTocExport_GEOSERVER = async (data) => {
  switch (data.type) {
    case 'shapezip':
      return export_SHAPEZIP(data)
    case 'json':
      return export_JSON(data)
    case 'kml':
      return export_KML(data)
    case 'excel':
      return export_EXCEL(data)
    case 'csv':
      return export_CSV(data)
    case 'gml3':
      return export_gml3(data)
    default:
      return data
  }
}

/**
 * @function
 * @name export_SHAPEZIP
 * @description
 * export zip data for geoserver layer
 * @param {Object} {data} layer data
 * @returns {zip data}
 */
export const export_SHAPEZIP = async (exportData) => {
  try {
    const nameData = exportData.tocLayer.groupname.split(':');
    const typeNames = exportData.tocLayer.groupname;
    const fileName = nameData[1];
    const cql_filter = getCqlFIlter(exportData);
    if (exportData.tocLayer.projection === "EPSG:4326") {
      var path = `${exportData.tocLayer.url}/${nameData[0]}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${typeNames}&CQL_FILTER=${cql_filter}&outputFormat=shape-zip&format_options=CHARSET:UTF-8`;
    } else {
      path = `${exportData.tocLayer.url}/${nameData[0]}/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=${typeNames}&CQL_FILTER=${cql_filter}&outputFormat=shape-zip&format_options=CHARSET:UTF-8`;
    }
    await downloadFile(path, fileName, 'zip');
    return true;
  } catch (err) {
    // console.log("err", err);
    return false;
  }
}

/**
 * @function
 * @name export_JSON
 * @description
 * export json data for geoserver layer
 * @param {Object} {data} layer data
 * @returns {json data}
 */
export const export_JSON = async (exportData) => {
  try {
    const nameData = exportData.tocLayer.groupname.split(':');
    const typeNames = exportData.tocLayer.groupname;
    const fileName = nameData[1];
    // console.log("exportData", exportData);
    const cql_filter = getCqlFIlter(exportData);
    if (exportData.tocLayer.projection === "EPSG:4326") {
      var path = `${exportData.tocLayer.url}/${nameData[0]}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${typeNames}&CQL_FILTER=${cql_filter}&outputFormat=json`;
    } else {
      path = `${exportData.tocLayer.url}/${nameData[0]}/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=${typeNames}&CQL_FILTER=${cql_filter}&outputFormat=json`;
    }
    await downloadFile(path, fileName, 'json');
    return true;
  } catch (err) {
    // console.log("err", err);
    return false;
  }
}

/**
 * @function
 * @name export_KML
 * @description
 * export kml data for geoserver layer
 * @param {Object} {data} layer data
 * @returns {kml data}
 */
export const export_KML = async (exportData) => {
  try {
    const nameData = exportData.tocLayer.groupname.split(':');
    const typeNames = exportData.tocLayer.groupname;
    const fileName = nameData[1];
    const cql_filter = getCqlFIlter(exportData);
    if (exportData.tocLayer.projection === "EPSG:4326") {
      var path = `${exportData.tocLayer.url}/${nameData[0]}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${typeNames}&CQL_FILTER=${cql_filter}&outputFormat=kml`;
    } else {
      path = `${exportData.tocLayer.url}/${nameData[0]}/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=${typeNames}&CQL_FILTER=${cql_filter}&outputFormat=kml`;
    }
    await downloadFile(path, fileName, 'kml');
    return true;
  } catch (err) {
    // console.log("err", err);
    return false;
  }
}

/**
 * @function
 * @name export_EXCEL
 * @description
 * export excel data for geoserver layer
 * @param {Object} {data} layer data
 * @returns {excel data}
 */
export const export_EXCEL = async (exportData) => {
  try {
    const nameData = exportData.tocLayer.groupname.split(':');
    const typeNames = exportData.tocLayer.groupname;
    const fileName = nameData[1];
    const cql_filter = getCqlFIlter(exportData);
    if (exportData.tocLayer.projection === "EPSG:4326") {
      var path = `${exportData.tocLayer.url}/${nameData[0]}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${typeNames}&CQL_FILTER=${cql_filter}&outputFormat=excel2007`;
    } else {
      path = `${exportData.tocLayer.url}/${nameData[0]}/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=${typeNames}&CQL_FILTER=${cql_filter}&outputFormat=excel2007`;
    }
    await downloadFile(path, fileName, 'xlsx');
    return true;
  } catch (err) {
    // console.log("err", err);
    return false;
  }
}

/**
 * @function
 * @name export_CSV
 * @description
 * export csv data for geoserver layer
 * @param {Object} {data} layer data
 * @returns {csv data}
 */
export const export_CSV = async (exportData) => {
  try {
    const nameData = exportData.tocLayer.groupname.split(':');
    const typeNames = exportData.tocLayer.groupname;
    const fileName = nameData[1];
    const cql_filter = getCqlFIlter(exportData);
    if (exportData.tocLayer.projection === "EPSG:4326") {
      var path = `${exportData.tocLayer.url}/${nameData[0]}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${typeNames}&CQL_FILTER=${cql_filter}&outputFormat=csv`;
    } else {
      path = `${exportData.tocLayer.url}/${nameData[0]}/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=${typeNames}&CQL_FILTER=${cql_filter}&outputFormat=csv`;
    }
    await downloadFile(path, fileName, 'csv');
    return true;
  } catch (err) {
    // console.log("err", err);
    return false;
  }
}

/**
 * @function
 * @name export_gml3
 * @description
 * export gml3 data for geoserver layer
 * @param {Object} {data} layer data
 * @returns {gml3 data}
 */
export const export_gml3 = async (exportData) => {
  try {
    const nameData = exportData.tocLayer.groupname.split(':');
    const typeNames = exportData.tocLayer.groupname;
    const fileName = nameData[1];
    const cql_filter = getCqlFIlter(exportData);
    if (exportData.tocLayer.projection === "EPSG:4326") {
      var path = `${exportData.tocLayer.url}/${nameData[0]}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${typeNames}&CQL_FILTER=${cql_filter}&outputFormat=gml3&format_options=CHARSET:UTF-8`;
    } else {
      path = `${exportData.tocLayer.url}/${nameData[0]}/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=${typeNames}&CQL_FILTER=${cql_filter}&outputFormat=gml3&format_options=CHARSET:UTF-8`;
    }
    await downloadFile(path, fileName, 'gml');
    return true;
  } catch (err) {
    // console.log("err", err);
    return false;
  }
}

/**
 * @function
 * @name createTocSorting_GEOSERVER
 * @description
 * create sorted data for geoserver source
 * @param {Object} {layer} layer config data
 * @returns {features}
 */
export const createTocSorting_GEOSERVER = async (requestData) => {
  try {
    let featuresSorting = '';
    if (requestData.sortingType === 'ASC') {
      featuresSorting = ' A';
    } else if (requestData.sortingType === 'DESC') {
      featuresSorting = ' D';
    }
    const postData = {
      service: 'wfs',
      version: '2.0.0',
      request: 'getFeature',
      typename: requestData.tocLayer.groupname,
      startIndex: 0,
      count: requestData.tableLimit,
      sortBy: requestData.fieldName + featuresSorting,
      outputFormat: 'json'
    }

    if (requestData.where && requestData.where !== '1=1') {
      postData.version = '1.0.0';
      postData.CQL_FILTER = requestData.where;
    }

    const results = await superagent.post(`${requestData.url}/wfs`).send(postData).set({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return results;
  } catch (err) {
    // console.log("sorting err", err);
  }
}

/**
 * @function
 * @name createTocSorting_GEOSERVER
 * @description
 * create cql filter for geoserver export source
 * @param {Object} {export} export config data
 * @returns {features file}
 */
const getCqlFIlter = (requestData) => {
  try {
    if (requestData.geometry) {
      const findGeo = requestData.allLayers.find(al => al.url === requestData.url && al.geometrytype);
      let geoGeometrty = findGeo.geometrytype;
      let intersectGeometryType = '';
      let flatCordinates;
      if (requestData.geometry.type === 'esriGeometryPoint') {
        intersectGeometryType = 'POLYGON';
        if (requestData.projection !== requestData.tocLayer.projection) {
          const x1 = requestData.geometry.pointCoordinates[0];
          const y1 = requestData.geometry.pointCoordinates[1];
          const x2 = requestData.geometry.pointCoordinates[2];
          const y2 = requestData.geometry.pointCoordinates[3];
          const firstCord = [x1, y1];
          const secondCord = [x2, y2];
          const transFCord = transCordinates(firstCord, requestData.tocLayer.projection, requestData.projection);
          const transSCord = transCordinates(secondCord, requestData.tocLayer.projection, requestData.projection);
          const newx1 = transFCord[0];
          const newy1 = transFCord[1];
          const newx2 = transSCord[0];
          const newy2 = transSCord[1];
          flatCordinates = "(" + newx1 + " " + newy1 + "," + newx2 + " " + newy1 + "," + newx2 + " " + newy2 + "," + newx1 + " " + newy2 + "," + newx1 + " " + newy1 + ")";
        } else {
          const x1 = requestData.geometry.pointCoordinates[0];
          const y1 = requestData.geometry.pointCoordinates[1];
          const x2 = requestData.geometry.pointCoordinates[2];
          const y2 = requestData.geometry.pointCoordinates[3];
          flatCordinates = "(" + x1 + " " + y1 + "," + x2 + " " + y1 + "," + x2 + " " + y2 + "," + x1 + " " + y2 + "," + x1 + " " + y1 + ")";
        }
      } else if (requestData.geometry.type === 'esriGeometryPolygon') {
        intersectGeometryType = 'POLYGON';
        if (requestData.projection !== requestData.tocLayer.projection) {
          const finalCordArr = requestData.geometry.pointCoordinates.reduce(function (coordinates, coordinate, i) {
            if (i % 2 === 0) {
              coordinates.push([coordinate, requestData.geometry.pointCoordinates[i + 1]]);
            }
            return coordinates;
          }, []);
          const transformedCordArr = finalCordArr.map(cordArr => {
            return transCordinates(cordArr, requestData.tocLayer.projection, requestData.projection);
          });
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
        } else {
          flatCordinates = "(";
          requestData.geometry.pointCoordinates.forEach((coordinate, i) => {
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
      } else if (requestData.geometry.type === 'esriGeometryPolyline') {
        intersectGeometryType = 'LINESTRING';
        if (requestData.projection !== requestData.tocLayer.projection) {
          const finalCordArr = requestData.geometry.pointCoordinates.reduce(function (coordinates, coordinate, i) {
            if (i % 2 === 0) {
              coordinates.push([coordinate, requestData.geometry.pointCoordinates[i + 1]]);
            }
            return coordinates;
          }, []);
          const transformedCordArr = finalCordArr.map(cordArr => {
            return transCordinates(cordArr, requestData.tocLayer.projection, requestData.projection);
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
        } else {
          requestData.geometry.pointCoordinates.forEach((coordinate, i) => {
            if (i === 0) {
              flatCordinates = coordinate;
            } else if (i % 2 === 0) {
              flatCordinates = flatCordinates + "," + coordinate;
            } else {
              flatCordinates = flatCordinates + " " + coordinate;
            }
          });
        }
      } else if (requestData.geometry.type === 'esriGeometryEnvelope') {
        intersectGeometryType = 'POLYGON';
        if (requestData.projection !== requestData.tocLayer.projection) {
          const x1 = requestData.geometry.pointCoordinates[0];
          const y1 = requestData.geometry.pointCoordinates[1];
          const x2 = requestData.geometry.pointCoordinates[2];
          const y2 = requestData.geometry.pointCoordinates[3];
          const firstCord = [x1, y1];
          const secondCord = [x2, y2];
          const transFCord = transCordinates(firstCord, requestData.tocLayer.projection, requestData.projection);
          const transSCord = transCordinates(secondCord, requestData.tocLayer.projection, requestData.projection);
          const newx1 = transFCord[0];
          const newy1 = transFCord[1];
          const newx2 = transSCord[0];
          const newy2 = transSCord[1];
          flatCordinates = "(" + newx1 + " " + newy1 + "," + newx2 + " " + newy1 + "," + newx2 + " " + newy2 + "," + newx1 + " " + newy2 + "," + newx1 + " " + newy1 + ")";
        } else {
          const x1 = requestData.geometry.pointCoordinates[0];
          const y1 = requestData.geometry.pointCoordinates[1];
          const x2 = requestData.geometry.pointCoordinates[2];
          const y2 = requestData.geometry.pointCoordinates[3];
          const firstCord = [x1, y1];
          const secondCord = [x2, y2];
          const transFCord = transCordinates(firstCord, requestData.tocLayer.projection, requestData.projection);
          const transSCord = transCordinates(secondCord, requestData.tocLayer.projection, requestData.projection);
          const newx1 = transFCord[0];
          const newy1 = transFCord[1];
          const newx2 = transSCord[0];
          const newy2 = transSCord[1];
          flatCordinates = "(" + newx1 + " " + newy1 + "," + newx2 + " " + newy1 + "," + newx2 + " " + newy2 + "," + newx1 + " " + newy2 + "," + newx1 + " " + newy1 + ")";
        }
      }
      var cql_filter = `INTERSECTS(${geoGeometrty},${intersectGeometryType}(${flatCordinates}))`;
      if (requestData.where && requestData.where !== '1=1') {
        cql_filter = cql_filter + `AND ${requestData.where}`;
      }
    } else {
      cql_filter = requestData.where;
    }
    return cql_filter;
  } catch(err) {
    // console.log("cql filter err", err);
  }
}

/**
 * @function
 * @name fetchCsvData_GEOSERVER
 * @description
 * fetch csv data for geoserver export source
 * @param {Object} {export} export config data
 * @returns {features file}
 */
export const fetchCsvData_GEOSERVER = () => {}

/**
 * @function
 * @name createCsvData_GEOSERVER
 * @description
 * create csv data for geoserver export source
 * @param {Object} {export} export config data
 * @returns {features file}
 */
export const createCsvData_GEOSERVER = (fetaureData) => {
  const data = fetaureData.features.map(feature => {
    const obj = {};
    fetaureData.fields.forEach(f => {
      obj[f.alias] = feature.attributes[f.name]
    })
    return obj;
  });
  return data;
}

/**
 * @function
 * @name createFilterOptions_GEOSERVER
 * @description
 * create column filter data for geoserver export source
 * @param {Object} {layer} layer config data
 * @returns {features}
 */
export const createFilterOptions_GEOSERVER = async (requestData) => {
  try {
    if (requestData.filterapp && requestData.where === '1=1') {
      const options = requestData.fieldOptions[requestData.name];
      const optionArr = [];
      options.forEach(option => {
        const opObj = {
          properties: {[requestData.name] : option}
        }
        optionArr.push(opObj);
      });
      return optionArr;
    } else {
      const postData = {
        service: 'wfs',
        version: '2.0.0',
        request: 'getFeature',
        typename: requestData.layer,
        propertyName: requestData.name,
        outputFormat: 'json'
      }

      if (requestData.geometryData && requestData.geometryData.geometry && requestData.where !== '1=1') {
        const funcData = {
          allLayers: requestData.allLayers,
          projection: requestData.projection,
          tocLayer: requestData.tocLayer,
          url: requestData.url,
          geometry: {
            pointCoordinates: requestData.geometryData.pointCoordinates,
            type: requestData.geometryData.geometryType
          }
        };
        const cql_filter = getCqlFIlter(funcData);
        postData.CQL_FILTER = `${requestData.where} AND ${cql_filter}`;
        postData.version = '1.0.0';
      } else if (requestData.geometryData && requestData.geometryData.geometry) {
        const funcData = {
          allLayers: requestData.allLayers,
          projection: requestData.projection,
          tocLayer: requestData.tocLayer,
          url: requestData.url,
          geometry: {
            pointCoordinates: requestData.geometryData.pointCoordinates,
            type: requestData.geometryData.geometryType
          }
        };
        const cql_filter = getCqlFIlter(funcData);
        postData.CQL_FILTER = cql_filter;
        postData.version = '1.0.0';
      } else if (requestData.where !== '1=1') {
        postData.version = '1.0.0';
        postData.CQL_FILTER = requestData.where;
      }

      const results = await superagent.post(`${requestData.url}/wfs`).send(postData).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      }).timeout({
        response: 3000, // Wait 3 seconds for the server to start sending,
        deadline: settings.TocDropdownTimeout * 1000 || 5000 // but allow seconds for the file to finish loading.
      });
      const {
        features
      } = JSON.parse(results.text);
      return features;
    }
  } catch (err) {
    // console.log("filter options err", err)
    return [];
  }
}

/**
 * @function
 * @name createFilterFeatures_GEOSERVER
 * @description
 * create column filter features for geoserver export source
 * @param {Object} {layer} layer config data
 * @returns {features}
 */
export const createFilterFeatures_GEOSERVER = (featuresData) => {
  try {
    const featureRes = featuresData.features.map(f => f.properties[featuresData.field.name]).filter(function (el) {
      return el != null && el !== "" && /\S/.test(el);
    });
    return featureRes;
  } catch (err) {
    // console.log("filter features err", err)
    return [];
  }
}

/**
 * @function
 * @name parseXmlStringToJson
 * @description
 * create json from xml
 * @param {Object} {xml} xml data
 * @returns {json}
 */
const parseXmlStringToJson = (input) => {
  try {
    function parseSingle(input) {
      var parts = input.split(' '),
        part,
        record = {};

      for (var i = 0; i < parts.length; i++) {
        part = parts[i].split('=');
        record[part[0]] = part[1];
      }

      return record;
    }

    var parts = input.split('++'),
      records = [];

    for (var i = 0; i < parts.length; i++) {
      records.push(parseSingle(parts[i]));
    }

    return parseInt(records[0].numberMatched.replaceAll('"', ''));
  } catch(err) {
    // console.log("xml parsing err", err)
  }
}

/**
 * @function
 * @name createLayerDefinition_GEOSERVER
 * @description
 * create layer definition for geoserver source
 * @param {Object} {layer} layer data
 * @returns {layer definition}
 */
export const createLayerDefinition_GEOSERVER = (requestData) => {
  try {
    const layerNamesArr = requestData.eParams.LAYERS.split(',');
    let layerDefs = null;
    let where = '';
    layerNamesArr.forEach(layerName => {
      const layerId = requestData.allLayers.find(al => al.groupname === layerName).layerid;
      let geometry = null,
        filtersData = {},
        // OBJECTID = null,
        bufferData = null;
      if (requestData.tocLayer && requestData.tocLayer.layerId === layerId) {
        geometry = requestData.geometry;
        filtersData = requestData.filtersData;
        // OBJECTID = requestData.OBJECTID;
        bufferData = requestData.bufferData;
      } else if (requestData.layersData[layerId]) {
        geometry = requestData.layersData[layerId].geometry;
        filtersData = requestData.layersData[layerId].filtersData;
        // OBJECTID = requestData.layersData[layerId].OBJECTID;
        bufferData = requestData.layersData[layerId].bufferData;
      }

      const lastChar = where.slice(-1);
      let pattern = /[0-9]/g;

      if (geometry && Object.keys(filtersData).length > 0) {
        const funcData = {
          allLayers: requestData.allLayers,
          projection: requestData.projection,
          tocLayer: requestData.tocLayer,
          url: requestData.tocLayer.url,
          geometry: {
            pointCoordinates: requestData.geometry.pointCoordinates,
            type: requestData.geometry.type
          }
        };
        const cql_filter = getCqlFIlter(funcData);
        // where = cql_filter;
        // const lastChar = where.slice(-1);
        // let pattern = /[0-9]/g;
        if (lastChar === 'E' || lastChar === ';') {
          // where += bufferData.filter.geometry;
          where = lastChar === 'E' ? where + `;${cql_filter}` : where + cql_filter;
        } else if (lastChar === ')' || lastChar === "'" || lastChar.match(pattern)) {
          where += `;${cql_filter}`;
        } else {
          where += cql_filter;
        }
        const whereConditionData = {
          filtersData,
          ids: null
        }
        where += " AND " + createWhereCondition_GEOSERVER(whereConditionData);
      } else if (bufferData) {
        // const lastChar = where.slice(-1);
        // let pattern = /[0-9]/g;
        if (lastChar === 'E' || lastChar === ';') {
          // where += bufferData.filter.geometry;
          where = lastChar === 'E' ? where + `;${bufferData.filter.geometry}` : where + bufferData.filter.geometry;
        } else if (lastChar === ')' || lastChar === "'" || lastChar.match(pattern)) {
          where += `;${bufferData.filter.geometry}`;
        } else {
          where += bufferData.filter.geometry;
        }
      } else if (geometry) {
        const funcData = {
          allLayers: requestData.allLayers,
          projection: requestData.projection,
          tocLayer: requestData.tocLayer,
          url: requestData.tocLayer.url,
          geometry: {
            pointCoordinates: requestData.geometry.pointCoordinates,
            type: requestData.geometry.type
          }
        };
        const cql_filter = getCqlFIlter(funcData);
        // const lastChar = where.slice(-1);
        // let pattern = /[0-9]/g;
        if (lastChar === 'E' || lastChar === ';') {
          where = lastChar === 'E' ? where + `;${cql_filter}` : where + cql_filter;
        } else if (lastChar === ')' || lastChar === "'" || lastChar.match(pattern)) {
          where += `;${cql_filter}`;
        } else {
          where += cql_filter;
        }
      } else if (Object.keys(filtersData).length > 0) {
        const whereConditionData = {
          filtersData,
          ids: null
        }
        const whereCond = createWhereCondition_GEOSERVER(whereConditionData);
        // const lastChar = where.slice(-1);
        // let pattern = /[0-9]/g;
        if (lastChar === 'E' || lastChar === ';') {
          where = lastChar === 'E' ? where + `;${whereCond}` : where + whereCond;
        } else if (lastChar === ')' || lastChar === "'" || lastChar.match(pattern)) {
          where += `;${whereCond}`;
        } else {
          where = whereCond;
        }
      } else if (requestData.layerIds.length > 1 && Object.keys(filtersData).length === 0) {
        // const lastChar = where.slice(-1);
        // let pattern = /[0-9]/g;
        if (lastChar === 'E' || lastChar === ';') {
          where += where !== '' && lastChar === 'E' ? `;INCLUDE` : `INCLUDE;`;
        } else if (lastChar === ')' || lastChar === "'" || lastChar.match(pattern)) {
          where += `;INCLUDE`;
        } else {
          where += `INCLUDE;`;
        }
      } else if (requestData.layerIds.length === 1 && Object.keys(filtersData).length === 0) {
        where = '';
      }
      if (where !== '') {
        layerDefs = where;
      }
    });
    if (layerDefs.includes('(') || layerDefs.includes('BETWEEN') || layerDefs.includes('>') || layerDefs.includes('<')) {
      return layerDefs;
    } else {
      return null;
    }
  } catch (err) {
    // console.log("layer definition err", err)
  }
}

/**
 * @function
 * @name createLoadingFields_ARCGIS
 * @description
 * create loading of dropdown for geoserver source
 * @param {Object} {fields} fields data
 * @returns {loading fields}
 */

export const createLoadingFields_GEOSERVER = (requestData) => {
  try {
    const fieldArray = [];
    for (const field of requestData.fields.filter(field => field.type === 'string')) {
      fieldArray.push(field.name);
    }
    return fieldArray;
  } catch(err) {
    // console.log("loading field err", err);
  }
}

/**
 * @function
 * @name createCheckFieldType_GEOSERVER
 * @description
 * check the field type for geoserver source
 * @param {Object} {fields} fields data
 * @returns {string fields}
 */

export const createCheckFieldType_GEOSERVER = (fieldData) => {
  try {
    const stringFields = fieldData.fields.filter(field => field.type === 'string')
    return stringFields;
  } catch(err) {
    // console.log("check field type err", err);
  }
}

/**
 * @function
 * @name createAllFetchedData_GEOSERVER
 * @description
 * create fetched data for geoserver sources
 * @param {Object} {allFeatyres} fields data
 * @returns {features data}
 */

export const createAllFetchedData_GEOSERVER = (requestData) => {
  try {
    const filtersData = requestData.filtersData;
    let features = requestData.allFeatures.filter(f => {
      let isRow = true;
      Object.keys(filtersData).forEach(field => {
        let isFeature = true;
        if (filtersData[field].type === 'string') {
          if (filtersData[field].condition === 'same') {
            isFeature = filtersData[field].value.includes(f.attributes[field]);
          } else if (filtersData[field].condition === 'differ') {
            isFeature = !filtersData[field].value.includes(f.attributes[field]);
          }
        } else if (['int', 'number'].includes(filtersData[field].type)) {
          if (filtersData[field].isRange) {
            if (filtersData[field].condition === 'showInRange') {
              isFeature = (
                Number(f.attributes[field]) >= filtersData[field].value.min &&
                Number(f.attributes[field]) <= filtersData[field].value.max
              )
            } else {
              isFeature = (
                Number(f.attributes[field]) <= filtersData[field].value.min ||
                Number(f.attributes[field]) >= filtersData[field].value.max
              )
            }
          } else {
            if (filtersData[field].condition === 'same') {
              isFeature = Number(f.attributes[field]) === filtersData[field].value;
            } else if (filtersData[field].condition === 'differ') {
              isFeature = (Number(f.attributes[field]) !== filtersData[field].value);
            } else if (filtersData[field].condition === 'greater') {
              isFeature = (Number(f.attributes[field]) >= filtersData[field].value);
            } else if (filtersData[field].condition === 'less') {
              isFeature = (Number(f.attributes[field]) <= filtersData[field].value);
            }
          }
        } else if (filtersData[field].type === 'date' || filtersData[field].type === 'date-time') {
          if (filtersData[field].isRange) {
            const minDate = moment(filtersData[field].value.min).format('YYYY-MM-DD');
            const maxDate = moment(filtersData[field].value.max).format('YYYY-MM-DD');
            const min = moment(minDate + ' 00:00', 'YYYY-MM-DD hh:mm').unix() * 1000;
            const max = moment(maxDate + ' 23:59', 'YYYY-MM-DD hh:mm').unix() * 1000;
            if (filtersData[field].condition === 'showInRange') {
              isFeature = (
                Number(f.attributes[field]) >= min &&
                Number(f.attributes[field]) <= max
              )
            } else {
              isFeature = (
                Number(f.attributes[field]) <= min ||
                Number(f.attributes[field]) >= max
              )
            }
          } else {
            const date = moment(filtersData[field].value).format('YYYY-MM-DD');
            const min = moment(date + ' 00:00', 'YYYY-MM-DD hh:mm').unix() * 1000;
            const max = moment(date + ' 23:59', 'YYYY-MM-DD hh:mm').unix() * 1000;
            if (filtersData[field].condition === 'same') {
              isFeature = (
                Number(f.attributes[field]) >= min &&
                Number(f.attributes[field]) <= max
              )
            } else if (filtersData[field].condition === 'differ') {
              isFeature = (
                Number(f.attributes[field]) <= min ||
                Number(f.attributes[field]) >= max
              )
            } else if (filtersData[field].condition === 'greater') {
              isFeature = Number(f.attributes[field]) >= min
            } else if (filtersData[field].condition === 'less') {
              isFeature = Number(f.attributes[field]) <= max
            }
          }
        }
        if (isFeature && isRow) {
          isRow = true;
        } else {
          isRow = false;
        }
      });
      return isRow;
    });
    return features;
  } catch(err) {
    // console.log("all fetched err", err);
  }
}

/**
 * @function
 * @name createSpatialIntersection_GEOSERVER
 * @description
 * create spatial intersection data for geoserver source
 * @param {Object} {requestdata} layer data
 * @returns {intersection data}
 */
export const createSpatialIntersection_GEOSERVER = async (requestData) => {
  try {
    // console.log("requestData", requestData)
    if (requestData.idsOnly) {
      const postData = {
        service: 'wfs',
        version: '2.0.0',
        request: 'getFeature',
        typename: requestData.layer,
        outputFormat: 'json'
      }
      if (requestData.bufferObj.geometry) {
        postData.version = '1.0.0';
        postData.CQL_FILTER = requestData.bufferObj.geometry;
      } else if (requestData.where !== '1=1' && requestData.bufferObj.geometry) {
        postData.version = '1.0.0';
        postData.CQL_FILTER = `${requestData.bufferObj.geometry} AND ${requestData.where}`;
      }
      const results = await superagent.post(`${requestData.url}/wfs`).send(postData).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      // console.log("results", results);
      const resData = JSON.parse(results.text);
      if (resData.features.length > 0) {
        const uniqueFieldArr = ['UID', 'OBJECTID_1', 'objectid_1', 'objectid', 'OBJECTID', 'fid', 'FID', 'id'];
        var uniqueField;
        const apiData = {
          api: {
            type: requestData.source
          },
          url: requestData.url,
          featureTypeRequest: true,
          typeName: requestData.layer,
        };
        const featureTypeRes = await createLayer_MIDDLEWARE(apiData);
        const featureTypes = JSON.parse(featureTypeRes.text).featureTypes;

        const fields = [];
        featureTypes[0].properties.forEach(feature => {
          if (!feature.type.includes('gml')) {
            const fieldObject = {
              name: feature.name,
              alias: feature.name.replaceAll('_', ' '),
              type: feature.type.split(':')[1]
            };
            fields.push(fieldObject)
          }
        });
        uniqueFieldArr.every(function (element, index) {
          const fieldExist = fields.find(f => f.name === element);
          if (fieldExist) {
            uniqueField = element;
            return false;
          }
          return true;
        });
        if (uniqueField === undefined) {
          uniqueField = 'id';
          resData.features.forEach(feature => {
            feature.properties[uniqueField] = feature.id.split('.')[1];
          });
        }
        const idsArr = [];
        resData.features.forEach(feature => {
          idsArr.push(feature.properties[uniqueField]);
        });
        // console.log("fields", fields);
        const resObj = {
          OBJECTID: uniqueField,
          filteredIds: idsArr,
          sortByField: fields[0].name
        }
        return resObj;
      } else {
        const resObj = {
          filteredIds: null,
          OBJECTID: null
        }
        return resObj;
      }
    } else {
      const postData = {
        service: 'wfs',
        version: '2.0.0',
        request: 'getFeature',
        typename: requestData.layer,
        startIndex: 0,
        count: requestData.tableLimit,
        sortBy: requestData.sortByField,
        outputFormat: 'json'
      }
      if (requestData.bufferObj.geometry) {
        postData.version = '1.0.0';
        postData.CQL_FILTER = requestData.bufferObj.geometry;
      } else if (requestData.where !== '1=1' && requestData.bufferObj.geometry) {
        postData.version = '1.0.0';
        postData.CQL_FILTER = `${requestData.bufferObj.geometry} AND ${requestData.where}`;
      }
      const results = await superagent.post(`${requestData.url}/wfs`).send(postData).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      const resData = JSON.parse(results.text);
      if (resData.features.length > 0) {
        const uniqueFieldArr = ['UID', 'OBJECTID_1', 'objectid_1', 'objectid', 'OBJECTID', 'fid', 'FID', 'id'];
        const apiData = {
          api: {
            type: requestData.source
          },
          url: requestData.url,
          featureTypeRequest: true,
          typeName: requestData.layer,
        };
        const featureTypeRes = await createLayer_MIDDLEWARE(apiData);
        const featureTypes = JSON.parse(featureTypeRes.text).featureTypes;

        const fields = [];
        featureTypes[0].properties.forEach(feature => {
          if (!feature.type.includes('gml')) {
            const fieldObject = {
              name: feature.name,
              alias: feature.name.replaceAll('_', ' '),
              type: feature.type.split(':')[1]
            };
            fields.push(fieldObject)
          }
        });
        uniqueFieldArr.every(function (element, index) {
          const fieldExist = fields.find(f => f.name === element);
          if (fieldExist) {
            uniqueField = element;
            return false;
          }
          return true;
        });
        if (uniqueField === undefined) {
          uniqueField = 'id';
          resData.features.forEach(feature => {
            feature.properties[uniqueField] = feature.id.split('.')[1];
          });
        }
        const idsArr = [];
        resData.features.forEach(feature => {
          idsArr.push(feature.properties[uniqueField]);
        });
        const crs = resData.crs;
        const geometryType = resData.features[0].geometry_name;
        const exceededTransferLimit = resData.totalFeatures > resData.numberReturned || resData.totalFeatures === 'unknown' ? true : false;
        const resObj = {
          geometryType,
          features: resData.features,
          fields,
          exceededTransferLimit,
          crs
        }
        return resObj;
      }
    }
  } catch (err) {
    // console.log("spatial intersection err", err)
  }
}

/**
 * @function
 * @name createRequestFeatureGeometry_GEOSERVER
 * @description
 * create request feature geometry for spatial intersection for geoserver source
 * @param {Object} {geometryData} geometry data
 * @returns {feature geometry data}
 */

export const createRequestFeatureGeometry_GEOSERVER = (geometryData) => {
  try {
    const geometry = geometryData.geometries;
    const findTheLayer = geometryData.allLayers.find(al => al.layerid === geometryData.layerId);
    const distance = geometryData.distance;
    let unit = '';
    if (geometryData.units === "esriSRUnit_Meter") {
      unit = 'meters';
    }
    if (geometry[0].type === 'Point' || geometry[0].type === "MultiPoint") {
      let flatCordinates = "";
      geometry.forEach(geo => {
        const lastChar = flatCordinates.slice(-1);
        flatCordinates += lastChar !== "" ? `,(${geo.coordinates[0]} ${geo.coordinates[1]})` : `(${geo.coordinates[0]} ${geo.coordinates[1]})`;
      })
      if (findTheLayer.projection === "EPSG:4326") {
        return ({
          geometry: `INTERSECTS(${findTheLayer.geometrytype},MultiPoint(${flatCordinates}))`
        })
      } else {
        return ({
          geometry: `DWITHIN(${findTheLayer.geometrytype},MultiPoint(${flatCordinates}), ${distance}, ${unit})`
        })
      }
    } else if (geometryData.geometryType === 'esriGeometryPoint') {
      let flatCordinates = "";
      geometry.forEach(geo => {
        const lastChar = flatCordinates.slice(-1);
        flatCordinates += lastChar !== "" ? `,(${geo.x} ${geo.y})` : `(${geo.x} ${geo.y})`;
      });
      if (findTheLayer.projection === "EPSG:4326") {
        return ({
          geometry: `INTERSECTS(${findTheLayer.geometrytype},MultiPoint(${flatCordinates}))`
        })
      } else {
        return ({
          geometry: `DWITHIN(${findTheLayer.geometrytype},MultiPoint(${flatCordinates}), ${distance}, ${unit})`
        })
      }
    } else if (geometry[0].type === 'LineString' || geometry[0].type === 'MultiLineString' || geometryData.geometryType === 'esriGeometryPolyline') {
      let flatCordinates = "";
      if (geometry[0].type === 'LineString') {
        geometry.forEach(geo => {
          const lastChar = flatCordinates.slice(-1);
          flatCordinates += lastChar !== "" ? ",(" : "(";
          const rowsData = [];
          geo.coordinates.forEach(cordArr => {
            cordArr.forEach(cord => rowsData.push(cord));
          })
          const finalCordArr = rowsData.reduce(function (coordinates, coordinate, i) {
            if (i % 2 === 0) {
              coordinates.push([coordinate, rowsData[i + 1]]);
            }
            return coordinates;
          }, []);
          const finalArr = [];
          finalCordArr.forEach(tc => {
            tc.forEach(tca => {
              finalArr.push(tca);
            })
          })

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
        });
      } else if (geometry[0].type === 'MultiLineString') {
        geometry.forEach(geo => {
          const lastChar = flatCordinates.slice(-1);
          flatCordinates += lastChar !== "" ? ",(" : "(";
          const rowsData = [];
          geo.coordinates.forEach(cordArr => {
            cordArr.forEach(cordinates => {
              cordinates.forEach(cord => rowsData.push(cord));
            })
          });
          const finalCordArr = rowsData.reduce(function (coordinates, coordinate, i) {
            if (i % 2 === 0) {
              coordinates.push([coordinate, rowsData[i + 1]]);
            }
            return coordinates;
          }, []);
          const finalArr = [];
          finalCordArr.forEach(tc => {
            tc.forEach(tca => {
              finalArr.push(tca);
            })
          })
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
        });
      } else if (geometryData.geometryType === 'esriGeometryPolyline') {
        geometry.forEach(geo => {
          const rowsData = [];
          const lastChar = flatCordinates.slice(-1);
          flatCordinates += lastChar !== "" ? ",(" : "(";
          geo.paths.forEach(path => {
            path.forEach(cordinates => {
              cordinates.forEach(cord => {
                rowsData.push(cord)
              })
            })
          });
          const finalCordArr = rowsData.reduce(function (coordinates, coordinate, i) {
            if (i % 2 === 0) {
              coordinates.push([coordinate, rowsData[i + 1]]);
            }
            return coordinates;
          }, []);
          const finalArr = [];
          finalCordArr.forEach(tc => {
            tc.forEach(tca => {
              finalArr.push(tca);
            })
          })
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
        })
      }
      if (findTheLayer.projection === "EPSG:4326") {
        return ({
          geometry: `INTERSECTS(${findTheLayer.geometrytype},MultiLineString(${flatCordinates}))`
        })
      } else {
        return ({
          geometry: `DWITHIN(${findTheLayer.geometrytype},MultiLineString(${flatCordinates}), ${distance}, ${unit})`
        })
      }
    } else {
      let flatCordinates = "";
      if (geometry[0].type === 'Polygon') {
        geometry.forEach(geo => {
          const rowsData = [];
          const lastChar = flatCordinates.slice(-1);
          flatCordinates += lastChar !== "" ? ",((" : "((";
          geo.coordinates.forEach(cordArr => {
            cordArr.forEach(cord => {
              cord.forEach(cordinate => rowsData.push(cordinate))
            })
          })
          const finalCordArr = rowsData.reduce(function (coordinates, coordinate, i) {
            if (i % 2 === 0) {
              coordinates.push([coordinate, rowsData[i + 1]]);
            }
            return coordinates;
          }, []);
          const finalArr = [];
          finalCordArr.forEach(tc => {
            tc.forEach(tca => {
              finalArr.push(tca);
            })
          })
          finalArr.forEach((coordinate, i) => {
            if (i === 0) {
              flatCordinates = flatCordinates + coordinate
            } else if (i % 2 === 0) {
              flatCordinates = flatCordinates + "," + coordinate;
            } else {
              flatCordinates = flatCordinates + " " + coordinate
            }
          });
          flatCordinates = flatCordinates + "))";
        });
      } else if (geometryData.geometryType === 'esriGeometryPolygon') {
        geometry.forEach(geo => {
          const rowsData = [];
          const lastChar = flatCordinates.slice(-1);
          flatCordinates += lastChar !== "" ? ",((" : "((";
          geo.rings.forEach(path => {
            path.forEach(cord => {
              cord.forEach(cordinate => rowsData.push(cordinate))
            });
          });
          const finalCordArr = rowsData.reduce(function (coordinates, coordinate, i) {
            if (i % 2 === 0) {
              coordinates.push([coordinate, rowsData[i + 1]]);
            }
            return coordinates;
          }, []);
          const finalArr = [];
          finalCordArr.forEach(tc => {
            tc.forEach(tca => {
              finalArr.push(tca);
            })
          })
          finalArr.forEach((coordinate, i) => {
            if (i === 0) {
              flatCordinates = flatCordinates + coordinate
            } else if (i % 2 === 0) {
              flatCordinates = flatCordinates + "," + coordinate;
            } else {
              flatCordinates = flatCordinates + " " + coordinate
            }
          });
          flatCordinates = flatCordinates + "))";
        });
      } else {
        geometry.forEach(geo => {
          geo.coordinates.forEach(cordArr => {
            const rowsData = [];
            const lastChar = flatCordinates.slice(-1);
            flatCordinates += lastChar !== "" ? ",((" : "((";
            cordArr.forEach(cord => {
              cord.forEach(cordinates => {
                cordinates.forEach(cordinate => rowsData.push(cordinate))
              })
            });
            const finalCordArr = rowsData.reduce(function (coordinates, coordinate, i) {
              if (i % 2 === 0) {
                coordinates.push([coordinate, rowsData[i + 1]]);
              }
              return coordinates;
            }, []);
            const finalArr = [];
            finalCordArr.forEach(tc => {
              tc.forEach(tca => {
                finalArr.push(tca);
              })
            })

            finalArr.forEach((coordinate, i) => {
              if (i === 0) {
                flatCordinates = flatCordinates + coordinate
              } else if (i % 2 === 0) {
                flatCordinates = flatCordinates + "," + coordinate;
              } else {
                flatCordinates = flatCordinates + " " + coordinate
              }
            });
            flatCordinates = flatCordinates + "))";
          });
        });
      }
      if (findTheLayer.projection === "EPSG:4326") {
        return ({
          geometry: `INTERSECTS(${findTheLayer.geometrytype},MultiPolygon(${flatCordinates}))`
        })
      } else {
        return ({
          geometry: `DWITHIN(${findTheLayer.geometrytype},MultiPolygon(${flatCordinates}), ${distance}, ${unit})`
        })
      }
    }
  } catch(err) {
    // console.log("create request geometry err", err);
  }
}

/**
 * @function
 * @name createWhereCondition_GEOSERVER
 * @description
 * create where condition for geoserver source
 * @param {Object} {requestData} filtersData data
 * @returns {where condition}
 */

export const createWhereCondition_GEOSERVER = (requestData) => {
  try {
    const filtersData = requestData.filtersData;
    let defaultWhere = requestData.ids;
    if (Object.keys(filtersData).length === 0) {
      return defaultWhere || '1=1';
    }
    let where = defaultWhere ? `${defaultWhere} AND ` : '';
    Object.keys(filtersData).forEach((field, i) => {
      where = i > 0 ? where + " AND " : where;
      let {
        value
      } = filtersData[field];
      if (filtersData[field].type === 'string') {
        value = value.map(v => v.includes("'") ? v.replaceAll("'", "''") : v);
        if (filtersData[field].condition === 'same') {
          where += `"${field}" IN ('${value.join("','")}')`;
        } else if (filtersData[field].condition === 'differ') {
          where += `"${field}" NOT IN ('${value}')`;
        }
      } else if (['int', 'number'].includes(filtersData[field].type)) {
        if (filtersData[field].isRange) {
          if (filtersData[field].condition === 'showInRange') {
            where += `"${field}" BETWEEN ${value.min} AND ${value.max}`;
          } else {
            where += `"${field}" NOT BETWEEN ${value.min} AND ${value.max}`;
          }
        } else {
          if (filtersData[field].condition === 'same') {
            where += `"${field}" IN (${value})`;
          } else if (filtersData[field].condition === 'differ') {
            where += `"${field}" NOT IN (${value})`;
          } else if (filtersData[field].condition === 'greater') {
            where += `"${field}" > ${value}`;
          } else if (filtersData[field].condition === 'less') {
            where += `"${field}" < ${value}`;
          }
        }
      } else if (filtersData[field].type === 'date' || filtersData[field].type === 'date-time') {
        if (filtersData[field].isRange) {
          const minDate = moment(filtersData[field].value.min).format('YYYY-MM-DD');
          const maxDate = moment(filtersData[field].value.max).format('YYYY-MM-DD');
          if (filtersData[field].condition === 'showInRange') {
            where += `"${field}" BETWEEN '${minDate}' AND '${maxDate}'`;
          } else {
            where += `"${field}" NOT BETWEEN '${minDate}' AND '${maxDate}'`;
          }
        } else {
          const date = moment(filtersData[field].value).format('YYYY-MM-DD');
          var tomorrow = new Date(date);
          tomorrow.setDate(tomorrow.getDate() + 1);
          const nextDate = moment(tomorrow).format('YYYY-MM-DD');
          if (filtersData[field].condition === 'same') {
            where += `"${field}" BETWEEN '${date}' AND '${nextDate}'`;
          } else if (filtersData[field].condition === 'differ') {
            where += `"${field}" NOT BETWEEN '${date}' AND '${nextDate}'`;
          } else if (filtersData[field].condition === 'greater') {
            where += `"${field}" > '${date}'`;
          } else if (filtersData[field].condition === 'less') {
            where += `"${field}" < '${date}'`;
          }
        }
      }
    });
    // console.log('where', where);
    return where;
  } catch (err) {
    // console.log("geoserver where err", err)
    return '1=1';
  }
}

/**
 * @function
 * @name setBufferEnable_GEOSERVER
 * @description
 * set buffer enable and disable for geoserver source
 * @param {Object} {data} projection data
 * @returns {buffer feature}
 */

export const setBufferEnable_GEOSERVER = (data) => {
  if (data.projection === "EPSG:4326") {
    return false;
  } else {
    return true;
  }
}