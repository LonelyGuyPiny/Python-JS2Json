import superagent from "superagent";
import {
  getTokenObj
} from '../../utils/common';
import {
  transCordinates
} from '../../utils/map';

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
        const firstArrCord = [requestData.bboxCordinate[0], requestData.bboxCordinate[1]];
        const secondArrCord = [requestData.bboxCordinate[2], requestData.bboxCordinate[3]];
        const thirdArrCord = [requestData.bboxCordinate[4], requestData.bboxCordinate[5]];
        const fourthArrCord = [requestData.bboxCordinate[6], requestData.bboxCordinate[7]];
        const transFCord = transCordinates(firstArrCord, requestData.layerProjection, requestData.projection);
        const transSCord = transCordinates(secondArrCord, requestData.layerProjection, requestData.projection);
        const transTCord = transCordinates(thirdArrCord, requestData.layerProjection, requestData.projection);
        const transfFCord = transCordinates(fourthArrCord, requestData.layerProjection, requestData.projection);
        const finalArr = transFCord.concat(transSCord.concat(transTCord.concat(transfFCord)));
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
        flatCordinates = newx1 + " " + newy1 + "," + newx2 + " " + newy2;
      } else {
        flatCordinates = requestData.bboxCordinate[0] + " " + requestData.bboxCordinate[1] + "," + requestData.bboxCordinate[2] + " " + requestData.bboxCordinate[3];
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
        featureData.geoServer = true;
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
    console.log("err", err);
  }
}