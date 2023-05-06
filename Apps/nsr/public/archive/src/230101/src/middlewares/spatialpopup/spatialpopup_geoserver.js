import superagent from "superagent";
import {
  getTokenObj
} from '../../utils/common';
import {
  transCordinates
} from '../../utils/map';
import SOURCE from '../sources';

/**
 * @function
 * @name createSpatialData_GEOSERVER
 * @description
 * create the spatial popup data for geoserver
 * @param {Object} {data} spatial config data
 * @returns {spatial data}
 */
export const createSpatialData_GEOSERVER = async (requestData) => {
  try {
    const findGeo = requestData.allLayers.find(al => al.url === requestData.url && al.geometrytype);
    let geoGeometrty = findGeo.geometrytype;
    let typeNames = "(";
    requestData.groupnames.forEach((group, i) => {
      typeNames = typeNames + group + ")(";
    });
    let intersectGeometryType = '';
    let flatCordinates;
    if (requestData.geometryType === 'esriGeometryPoint') {
      intersectGeometryType = 'POLYGON';
      if (requestData.projection !== requestData.layerProjection) {
        const x1 = requestData.bboxCordinate[0];
        const y1 = requestData.bboxCordinate[1];
        const x2 = requestData.bboxCordinate[2];
        const y2 = requestData.bboxCordinate[3];
        const firstCord = [x1, y1];
        const secondCord = [x2, y2];
        const transFCord = transCordinates(firstCord, requestData.layerProjection, requestData.projection);
        const transSCord = transCordinates(secondCord, requestData.layerProjection, requestData.projection);
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
      if (requestData.projection !== requestData.layerProjection) {
        const finalCordArr = requestData.bboxCordinate.reduce(function (coordinates, coordinate, i) {
          if (i % 2 === 0) {
            coordinates.push([coordinate, requestData.bboxCordinate[i + 1]]);
          }
          return coordinates;
        }, []);
        const transformedCordArr = finalCordArr.map(cordArr => {
          return transCordinates(cordArr, requestData.layerProjection, requestData.projection);
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
      if (requestData.projection !== requestData.layerProjection) {
        const finalCordArr = requestData.bboxCordinate.reduce(function (coordinates, coordinate, i) {
          if (i % 2 === 0) {
            coordinates.push([coordinate, requestData.bboxCordinate[i + 1]]);
          }
          return coordinates;
        }, []);
        const transformedCordArr = finalCordArr.map(cordArr => {
          return transCordinates(cordArr, requestData.layerProjection, requestData.projection);
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
        requestData.bboxCordinate.forEach((coordinate, i) => {
          if (i === 0) {
            flatCordinates = coordinate;
          } else if (i % 2 === 0) {
            flatCordinates = flatCordinates + "," + coordinate;
          } else {
            flatCordinates = flatCordinates + " " + coordinate;
          }
        });
      }
    } else if (requestData.geometryType === 'esriGeometryEnvelope') {
      intersectGeometryType = 'POLYGON';
      if (requestData.projection !== requestData.layerProjection) {
        const x1 = requestData.bboxCordinate[0];
        const y1 = requestData.bboxCordinate[1];
        const x2 = requestData.bboxCordinate[2];
        const y2 = requestData.bboxCordinate[3];
        const firstCord = [x1, y1];
        const secondCord = [x2, y2];
        const transFCord = transCordinates(firstCord, requestData.layerProjection, requestData.projection);
        const transSCord = transCordinates(secondCord, requestData.layerProjection, requestData.projection);
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
    const cql_filter = `INTERSECTS(${geoGeometrty},${intersectGeometryType}(${flatCordinates}))`;
    const postData = {
      service: 'wfs',
      version: '1.0.0',
      request: 'GetFeature',
      typeNames: typeNames.slice(0, -1),
      CQL_FILTER: cql_filter,
      outputFormat: 'JSON',
      ...getTokenObj(requestData.url)
    };
    const res = await superagent.post(`${requestData.url}/wfs`).send(postData).set({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const resData = JSON.parse(res.text);
    let responseData = [];
    if (!resData.error) {
      requestData.groupnames.forEach(groupname => {
        let features = [];
        const groupnameArr = groupname.split(':')
        features = resData.features.filter(fl => fl.id.includes(groupnameArr[groupnameArr.length - 1]));
        if (features.length === 0) {
          const grNameArr = groupname.split('_')
          features = resData.features.filter(fl => fl.id.includes(grNameArr[grNameArr.length - 1]));
          if (features.length === 0) {
            return;
          }
        }
        let featureData = {};
        const layersData = requestData.allLayers.find(sl => sl.groupname === groupname);
        const fields = Object.keys(features[0].properties);
        featureData.crs = resData.crs;
        featureData.fields = fields;
        featureData.features = features;
        featureData.type = SOURCE.GEOSERVER;
        responseData.push({
          ...featureData,
          layerName: layersData.text,
          layer: {
            layerId: layersData.layerid,
            id: layersData.id,
            url: layersData.url,
            name: layersData.text,
            currentLinks: layersData.currentlinks
          }
        });
      });
    }
    return {
      responseData
    };
  } catch (err) {
    // console.log("createSpatialData_GEOSERVER err", err);
  }
}

/**
 * @function
 * @name createReplacedSpatialData_GEOSERVER
 * @description
 * create spatial replaced data for geoserver sources
 * @param {Object} {data} spatial data
 * @returns {spatial replaced data}
 */
export const createReplacedSpatialData_GEOSERVER = (requestData) => {
  try {
    const replaceData = requestData.tocData.find(toc => toc.layer.id === requestData.id && toc.type === SOURCE.GEOSERVER);
    const tocIndex = requestData.tocData.findIndex(toc => toc.layer.id === requestData.id && toc.type === SOURCE.GEOSERVER);
    const tocData = requestData.tocData;
    replaceData.features.forEach((feature, i) => {
      Object.keys(feature.attributes).forEach(fieldName => {
        const fieldReturn = requestData.filedsdata.find(fl => fl.name === fieldName);
        if (fieldReturn) {
          return null;
        }
        const fieldNameNew = requestData.filedsdata.find(fl => fl.alias === fieldName);
        if (fieldNameNew) {
          tocData[tocIndex].features[i].attributes[fieldNameNew.name] = tocData[tocIndex].features[i].attributes[fieldNameNew.alias];
          delete tocData[tocIndex].features[i].attributes[fieldNameNew.alias];
        }
      });
    });
    return tocData;
  } catch (err) {
    // console.log("replace data err", err);
  }
}

/**
 * @function
 * @name createPopupSpatialData_GEOSERVER
 * @description
 * create spatial popup data for geoserver sources
 * @param {Object} {data} spatial data
 * @returns {spatial popup data}
 */

export const createPopupSpatialData_GEOSERVER = (requestData) => {
  try {
    const layerData = requestData.layerData;
    const spatialData = [];
    layerData.features.forEach((feature) => {
      const row = {};
      row.crs = layerData.crs;
      row.attributes = Object.keys(feature.properties).map(fieldName => {
        let value = feature.properties[fieldName];
        return ({
          fieldName,
          value,
          fieldAlias: fieldName.replaceAll('_', ' ')
        });
      });
      row.geometry = feature.geometry;
      row.geometryType = feature.geometry.type;
      row.layerName = layerData.layer.name;
      row.layer = layerData.layer;
      row.geoServer = true;
      spatialData.push(row);
    });
    return spatialData;
  } catch(err) {
    // console.log("popup data err", err);
  }
}