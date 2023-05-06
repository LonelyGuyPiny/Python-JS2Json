import superagent from 'superagent';
import moment from 'moment';
import SOURCE from '../sources';
import Polygon from 'ol/geom/Polygon';
import MultiLineString from 'ol/geom/MultiLineString';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import {
  Style,
  Icon,
  Fill,
  Stroke,
} from 'ol/style';
import {
  getCenter
} from 'ol/extent';
import {
  getTokenObj,
  getTokenForUrl,
  downloadKMZFile,
  createWhereCondition,
  dateFunction
} from '../../utils/common';

/**
 * @function
 * @name createTocData_ARCGIS
 * @description
 * middleware for toc data fetching from arcgis source
 * @param {Object} {layer} layer config data
 * @returns {toc data}
 */
export const createTocData_ARCGIS = async (data) => {
  try {
    if (data.exceededTransferLimit) {
      const postData = {
        where: '1=1',
        returnCountOnly: true,
        outFields: '*',
        f: `json`,
        ...getTokenObj(data.url)
      }
      const results = await superagent.post(`${data.url}/${data.id}/query`).send(postData).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      return JSON.parse(results.text).count
    } else if (data.oldLayerChange) {
      delete data.geometryData.pointCoordinates;
      const postData = {
        where: data.where,
        returnGeometry: true,
        returnTrueCurves: false,
        outFields: '*',
        resultOffset: 0,
        inSR: data.latestWkid,
        outSR: data.latestWkid,
        f: `json`,
        resultRecordCount: data.tableLimit,
        orderByFields: data.orderByFields,
        ...data.geometryData,
        ...getTokenObj(data.url)
      }
      const results = await superagent.post(`${data.url}/${data.id}/query`).send(postData).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      const res = JSON.parse(results.text);

      const geometryType = res.geometryType;
      const allFeatures = res.features;
      const fields = res.fields;
      const exceededTransferLimit = res.exceededTransferLimit;
      const OBJECTID = fields.find(f => f.type === 'esriFieldTypeOID').name;
      const resObject = {
        geometryType,
        allFeatures,
        fields,
        exceededTransferLimit,
        OBJECTID
      };
      // console.log("resObject", resObject);
      return resObject;
    } else {
      const postData = {
        where: '1=1',
        returnGeometry: true,
        returnTrueCurves: false,
        outFields: '*',
        resultOffset: data.resultOffset,
        inSR: data.latestWkid,
        outSR: data.latestWkid,
        f: `json`,
        resultRecordCount: data.tableLimit,
        ...getTokenObj(data.url)
      }
      const results = await superagent.post(`${data.url}/${data.id}/query`).send(postData).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      const res = JSON.parse(results.text);

      const geometryType = res.geometryType;
      const allFeatures = res.features;
      const fields = res.fields;
      const exceededTransferLimit = res.exceededTransferLimit;
      const OBJECTID = fields.find(f => f.type === 'esriFieldTypeOID').name;
      const resObject = {
        geometryType,
        allFeatures,
        fields,
        exceededTransferLimit,
        OBJECTID
      };
      return resObject;
    }
  } catch(err) {
    // console.log("err", err);
  }
}

/**
 * @function
 * @name createTocLayerFields_ARCGIS
 * @description
 * create layer fileds data for arcgis source
 * @param {Object} {fields} fields data
 * @returns {layerFields}
 */
export const createTocLayerFields_ARCGIS = (data) => {
  // console.log("data", data);
  try {
    let layerFields = [];
    const allFields = data.allLayers.find(l => l.layerid === data.layerId).fields;
    const field = data.fields.filter(f => f.type !== 'esriFieldTypeOID').map(f => f.name);
    if (allFields) {
      layerFields = allFields.map(f => {
        if (f.domain && f.domain.codedValues) {
          f.domainValues = f.domain.codedValues.reduce((obj, curr) => {
            obj[curr.code] = curr.name;
            return obj;
          }, {});
        } else {
          f.domainValues = null;
        }
        return f;
      });
    } else {
      layerFields = data.fields;
    }

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
 * @name fetchNextRecords_ARCGIS
 * @description
 * middleware for next toc data fetching from arcgis source
 * @param {Object} {layer} layer config data
 * @returns {toc next data}
 */
export const fetchNextRecords_ARCGIS = async (requestData) => {
  try {
    delete requestData.geometryData.pointCoordinates;
    const postData = {
      where: requestData.where,
      returnGeometry: true,
      returnTrueCurves: false,
      outFields: '*',
      resultOffset: requestData.offset,
      inSR: requestData.latestWkid,
      outSR: requestData.latestWkid,
      f: `json`,
      resultRecordCount: requestData.limit,
      orderByFields: requestData.sorting ? `${requestData.sorting.fieldName} ${requestData.sorting.type}` : requestData.OBJECTID,
      ...requestData.geometryData,
      ...getTokenObj(requestData.url),
      ...(requestData.bufferData ? requestData.bufferData.filter : {})
    };
    const results = await superagent.post(`${requestData.url}/${requestData.id}/query`).send(postData).set({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return results;
  } catch (err) {
    // console.log("err", err);
  }
}

/**
 * @function
 * @name fetchAllRecords_ARCGIS
 * @description
 * middleware for toc data fetching less than 1000 from arcgis source
 * @param {Object} {layer} layer config data
 * @returns {toc all features}
 */
export const fetchAllRecords_ARCGIS = async (requestData) => {
  try {
    const postData = {
      where: '1=1',
      returnGeometry: true,
      returnTrueCurves: false,
      outFields: '*',
      resultOffset: 0,
      inSR: requestData.latestWkid,
      outSR: requestData.latestWkid,
      f: `json`,
      ...getTokenObj(requestData.url)
    }
    const results = await superagent.post(`${requestData.url}/${requestData.id}/query`).send(postData).set({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const {
      features,
      exceededTransferLimit
    } = JSON.parse(results.text);
    return {
      features,
      exceededTransferLimit
    };
  } catch (err) {
    // console.log("err", err);
  }
}

/**
 * @function
 * @name fetchNextRecords_ARCGIS
 * @description
 * create feature data for arcgis source
 * @param {Object} {feature} feature config data
 * @returns {featureData}
 */
export const createFeature_ARCGIS = (requestData) => {
  try {
    return {
      attributes: requestData.feature.attributes,
      geoMetry: requestData.feature.geometry,
      featureKey: requestData.feature.attributes[requestData.OBJECTID]
    }
  } catch (err) {
    // console.log("err", err);
  }
}

/**
 * @function
 * @name createLinks_ARCGIS
 * @description
 * create links data for arcgis source
 * @param {Object} {links} links config data
 * @returns {links}
 */
export const createLinks_ARCGIS = (requestData) => {
  try {
    const layerLinks = requestData.links.filter(l => l.layerName === requestData.name && (l.source === SOURCE.ARCGIS || l.source === undefined));
    return layerLinks;
  } catch (err) {
    // console.log("err", err);
  }
}

/**
 * @function
 * @name createGeometryFeature_ARCGIS
 * @description
 * create the feature geometry for arcgis source
 * @param {Object} {geometry} geometry data
 * @returns {geometry}
 */
export const createGeometryFeature_ARCGIS = (requestData) => {
  try {
    let feature;
    let fitExtent;
    let featureCenter;
    if (requestData.geometryType === 'esriGeometryPoint') {
      const ring = requestData.geometry;
      const coordinate = [ring.x, ring.y];
      let point = new Point(coordinate);
      feature = new Feature({
        geometry: point,
        name: 'Null Island',
        population: 4000,
        rainfall: 500
      });
      var iconStyle = new Style({
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
    } else if (requestData.geometryType === 'esriGeometryPolyline') {
      let multilineData = new MultiLineString(requestData.geometry.paths);
      feature = new Feature(multilineData);
      let style = new Style({
        stroke: new Stroke({
          color: `rgb(0,0,255, 1.0)`,
          width: 3,
        }),
        fill: new Fill({
          color: `rgb(153,204,255, 0.5)`,
        }),
      })
      feature.setStyle(style);
      featureCenter = getCenter(multilineData.getExtent());
      fitExtent = multilineData.getExtent();
    } else {
      let style = new Style({
        stroke: new Stroke({
          color: `rgb(0,0,255, 1.0)`,
          width: 3,
        }),
        fill: new Fill({
          color: `rgb(153,204,255, 0.5)`,
        }),
      })

      let drawPolygon = new Polygon(requestData.geometry.rings);
      feature = new Feature(drawPolygon);
      feature.setStyle(style);
      fitExtent = drawPolygon.getExtent();
      featureCenter = getCenter(drawPolygon.getExtent());
    }
    return {
      feature,
      fitExtent,
      featureCenter
    }
  } catch (err) {
    // console.log("err", err);
  }
}

/**
 * @function
 * @name createDrawFeature_ARCGIS
 * @description
 * create draw feature data for arcgis source
 * @param {Object} {feature} feature data
 * @returns {featureData}
 */
export const createDrawFeature_ARCGIS = async (requestData) => {
  try {
    delete requestData.geometryData.pointCoordinates;
    if (requestData.exceededTransferLimit) {
      const data = {
        where: requestData.where,
        returnCountOnly: true,
        inSR: requestData.latestWkid,
        outSR: requestData.latestWkid,
        f: `json`,
        ...requestData.geometryData,
        ...getTokenObj(requestData.url),
        // ...(bufferData ? bufferData.filter : {})
      };
      const countData = await superagent.post(`${requestData.url}/${requestData.id}/query`).send(data).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      const countTotal = JSON.parse(countData.text).count;
      return countTotal;
    } else if (requestData.bufferData) {
      const postData = {
        where: requestData.where,
        inSR: requestData.latestWkid,
        outSR: requestData.latestWkid,
        returnIdsOnly: true,
        f: `json`,
        ...requestData.geometryData,
        ...getTokenObj(requestData.url),
        // ...(bufferData ? bufferData.filter : {})
      };
      const geometryIdsData = await superagent.post(`${requestData.url}/${requestData.id}/query`).send(postData).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      const {
        objectIds
      } = JSON.parse(geometryIdsData.text);
      return objectIds;
    } else {
      const postData = {
        where: requestData.where,
        returnGeometry: true,
        returnTrueCurves: false,
        outFields: '*',
        resultOffset: 0,
        inSR: requestData.latestWkid,
        outSR: requestData.latestWkid,
        f: `json`,
        resultRecordCount: requestData.resultRecordCount,
        orderByFields: requestData.sorting && requestData.sorting.fieldName ? `${requestData.sorting.fieldName} ${requestData.sorting.type}` : requestData.OBJECTID,
        ...requestData.geometryData,
        ...getTokenObj(requestData.url),
        // ...(bufferData ? bufferData.filter : {})
      }
      const results = await superagent.post(`${requestData.url}/${requestData.id}/query`).send(postData).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      const {
        features,
        exceededTransferLimit
      } = JSON.parse(results.text);
      const resObject = {
        features,
        exceededTransferLimit
      };
      return resObject;
    }
  } catch (err) {
    // console.log("err", err);
  }
}

/**
 * @function
 * @name createFocusFeature_ARCGIS
 * @description
 * create focus feature data for arcgis source
 * @param {Object} {feature} feature data
 * @returns {featureData}
 */
export const createFocusFeature_ARCGIS = (requestData) => {
  try {
    if (requestData.geometryType === "esriGeometryPoint") {
      return new Feature(new Point([requestData.geometry.x, requestData.geometry.y]));
    } else if (requestData.geometryType === "esriGeometryPolyline") {
      return new Feature(new MultiLineString(requestData.geometry.paths));
    }
    return new Feature(new Polygon(requestData.geometry.rings));
  } catch (err) {
    // console.log("err", err);
  }
}

/**
 * @function
 * @name createTocExport_ARCGIS
 * @description
 * create export data for arcgis source
 * @param {Object} {feature} feature data
 * @returns {export file}
 */
export const createTocExport_ARCGIS = async (requestData) => {
  try {
    if (requestData.type === 'csv') {
      return {
        export: true
      };
    }
    const path = `${requestData.url}/${requestData.id}/query?where=${requestData.where}${requestData.geometryData}&f=${requestData.f}&inSR=${requestData.latestWkid}&outFields=*&${getTokenForUrl(requestData.url)}`;
    await downloadKMZFile(path, requestData.format);
    return true;
  } catch (err) {
    // console.log("err", err);
  }
}

/**
 * @function
 * @name createTocSorting_ARCGIS
 * @description
 * create sorted data for arcgis source
 * @param {Object} {layer} layer config data
 * @returns {features}
 */
export const createTocSorting_ARCGIS = async (requestData) => {
  try {
    delete requestData.geometryData.pointCoordinates;
    const PostData = {
      where: requestData.where,
      returnGeometry: true,
      returnTrueCurves: false,
      outFields: '*',
      resultOffset: 0,
      inSR: requestData.latestWkid,
      outSR: requestData.latestWkid,
      f: `json`,
      resultRecordCount: requestData.tableLimit,
      orderByFields: `${requestData.fieldName} ${requestData.sortingType}`,
      ...requestData.geometryData,
      ...getTokenObj(requestData.url)
    }

    let result = await superagent.post(`${requestData.url}/${requestData.id}/query`).send(PostData).set({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return result;
  } catch (err) {
    // console.log("err", err);
  }
}

/**
 * @function
 * @name fetchCsvData_ARCGIS
 * @description
 * fetch csv data for geoserver export source
 * @param {Object} {export} export config data
 * @returns {features file}
 */
export const fetchCsvData_ARCGIS = async (requestData) => {
  try {
    const postData = {
      where: requestData.where,
      returnGeometry: false,
      returnTrueCurves: false,
      outFields: '*',
      inSR: requestData.latestWkid,
      outSR: requestData.latestWkid,
      resultOffset: requestData.offset,
      f: `json`,
      ...getTokenObj(requestData.url),
      ...requestData.geometryData,
      ...(requestData.bufferData ? requestData.bufferData.filter : {})
    };
    const results = await superagent.post(`${requestData.url}/${requestData.id}/query`).send(postData).set({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return results;
  } catch(err) {
    // console.log("fetch csv data err", err);
  }
}

/**
 * @function
 * @name createCsvData_ARCGIS
 * @description
 * create csv data for arcgis export source
 * @param {Object} {export} export config data
 * @returns {features file}
 */
export const createCsvData_ARCGIS = (fetaureData) => {
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
 * @name createFilterOptions_ARCGIS
 * @description
 * create column filter data for arcgis source
 * @param {Object} {layer} layer config data
 * @returns {features}
 */
export const createFilterOptions_ARCGIS = async (requestData) => {
  try {
    delete requestData.geometryData.pointCoordinates;
    const postData = {
      returnGeometry: false,
      // returnTrueCurves: false,
      // inSR: latestWkid,
      // outSR: latestWkid,
      f: `json`,
      returnDistinctValues: true,
      where: requestData.where,
      outFields: requestData.name,
      orderByFields: requestData.name,
      ...requestData.geometryData,
      ...getTokenObj(requestData.url)
    }
    const results = await superagent.post(`${requestData.url}/${requestData.id}/query`).send(postData).set({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const {
      features
    } = JSON.parse(results.text);
    return features;
  } catch (err) {
    // console.log("filter options err", err)
  }
}

/**
 * @function
 * @name createFilterFeatures_GEOSERVER
 * @description
 * create column filter features for arcgis source
 * @param {Object} {layer} layer config data
 * @returns {features}
 */
export const createFilterFeatures_ARCGIS = (featuresData) => {
  try {
    const featureRes = featuresData.features.map(f => f.attributes[featuresData.field.name]).filter(f => f !== "" && f !== null);
    return featureRes;
  } catch (err) {
    // console.log("filter options err", err)
  }
}

/**
 * @function
 * @name createLayerDefinition_ARCGIS
 * @description
 * create layer definition for arcgis source
 * @param {Object} {layer} layer data
 * @returns {layer definition}
 */
export const createLayerDefinition_ARCGIS = (requestData) => {
  try {
    let layerDefs = {};
    requestData.layerIds.forEach(layerId => {
      let where = '';
      let geometry = null,
        filtersData = {},
        filteredIds = null,
        OBJECTID = null,
        layer = null,
        bufferData = null;
      if (requestData.tocLayer && requestData.tocLayer.layerId === layerId) {
        geometry = requestData.geometry;
        filtersData = requestData.filtersData;
        OBJECTID = requestData.OBJECTID;
        filteredIds = requestData.filteredIds;
        bufferData = requestData.bufferData;
        layer = requestData.tocLayer;
      } else if (requestData.layersData[layerId]) {
        layer = requestData.layersData[layerId].tocLayer;
        geometry = requestData.layersData[layerId].geometry;
        filtersData = requestData.layersData[layerId].filtersData;
        OBJECTID = requestData.layersData[layerId].OBJECTID;
        filteredIds = requestData.layersData[layerId].filteredIds;
        bufferData = requestData.layersData[layerId].bufferData;
      }

      if (geometry && Object.keys(filtersData).length > 0) {
        where = createWhereCondition(filtersData);
        const layerWhereString = `${OBJECTID} IN (${filteredIds ? filteredIds.join(',') : 0})`;
        where += ` AND ${layerWhereString}`;
      } else if (geometry || bufferData) {
        where = `${OBJECTID} IN (${filteredIds ? filteredIds.join(',') : 0})`;
      } else if (Object.keys(filtersData).length > 0) {
        where = createWhereCondition(filtersData);
      }
      if (layer) {
        layerDefs[layer.id] = where;
      }
    });
    return JSON.stringify(layerDefs);
    }
    catch (err) {
      // console.log("layer definition err", err)
    }
}

/**
 * @function
 * @name createLoadingFields_ARCGIS
 * @description
 * create loading of dropdown for arcgis source
 * @param {Object} {fields} fields data
 * @returns {loading fields}
 */

export const createLoadingFields_ARCGIS = (requestData) => {
  try {
    const fieldArray = [];
    for (const field of requestData.fields.filter(field => field.type === 'esriFieldTypeString' || field.domainValues)) {
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
 * check the field type for arcgis source
 * @param {Object} {fields} fields data
 * @returns {string fields}
 */

export const createCheckFieldType_ARCGIS = (fieldData) => {
  try {
    const stringFields = fieldData.fields.filter(field => field.type === 'esriFieldTypeString' || field.domainValues)
    return stringFields;
  } catch(err) {
    // console.log("check field type err", err);
  }
}

/**
 * @function
 * @name createAllFetchedData_ARCGIS
 * @description
 * create fetched data for arcgis sources
 * @param {Object} {allFeatyres} fields data
 * @returns {features data}
 */

export const createAllFetchedData_ARCGIS = (requestData) => {
  try {
    const filtersData = requestData.filtersData;
    let features = requestData.allFeatures.filter(f => {
      let isRow = true;
      Object.keys(filtersData).forEach(field => {
        let isFeature = true;
        if (filtersData[field].type === 'esriFieldTypeString') {
          if (filtersData[field].condition === 'same') {
            isFeature = filtersData[field].value.includes(f.attributes[field]);
          } else if (filtersData[field].condition === 'differ') {
            isFeature = !filtersData[field].value.includes(f.attributes[field]);
          }
        } else if (filtersData[field].type === 'esriFieldTypeDouble' || filtersData[field].type === 'esriFieldTypeSingle') {
          if (filtersData[field].isRange) {
            if (filtersData[field].condition === 'showInRange') {
              isFeature = (
                Number(f.attributes[field].toFixed(2)) >= filtersData[field].value.min &&
                Number(f.attributes[field].toFixed(2)) <= filtersData[field].value.max
              )
            } else {
              isFeature = (
                Number(f.attributes[field].toFixed(2)) <= filtersData[field].value.min ||
                Number(f.attributes[field].toFixed(2)) >= filtersData[field].value.max
              )
            }
          } else {
            if (filtersData[field].condition === 'same') {
              isFeature = Number(f.attributes[field].toFixed(2)) === filtersData[field].value;
            } else if (filtersData[field].condition === 'differ') {
              isFeature = (Number(f.attributes[field].toFixed(2)) !== filtersData[field].value);
            } else if (filtersData[field].condition === 'greater') {
              isFeature = (Number(f.attributes[field]) > filtersData[field].value);
            } else if (filtersData[field].condition === 'less') {
              isFeature = (Number(f.attributes[field]) < filtersData[field].value);
            }
          }
        } else if (['esriFieldTypeInteger', 'esriFieldTypeSmallInteger', 'esriFieldTypeOID'].includes(filtersData[field].type)) {
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
        } else if (filtersData[field].type === 'esriFieldTypeDouble' || filtersData[field].type === 'esriFieldTypeSingle') {
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
              isFeature = dateFunction(f.attributes[field]) === dateFunction(filtersData[field].value);
            } else if (filtersData[field].condition === 'differ') {
              isFeature = dateFunction(f.attributes[field]) !== dateFunction(filtersData[field].value);
            } else if (filtersData[field].condition === 'greater') {
              isFeature = (Number(f.attributes[field]) >= filtersData[field].value);
            } else if (filtersData[field].condition === 'less') {
              isFeature = (Number(f.attributes[field]) <= filtersData[field].value);
            }
          }
        } else if (filtersData[field].type === 'esriFieldTypeDate') {
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
    return features
  } catch(err) {
    // console.log("all fetched err", err);
  }
}

/**
 * @function
 * @name createSpatialIntersection_ARCGIS
 * @description
 * create spatial intersection data for arcgis source
 * @param {Object} {requestdata} layer data
 * @returns {intersection data}
 */
export const createSpatialIntersection_ARCGIS = async (requestData) => {
  try {
    if (requestData.idsOnly) {
      const postdata = {
        where: requestData.where,
        returnIdsOnly: true,
        resultOffset: 0,
        inSR: requestData.latestWkid,
        outSR: requestData.latestWkid,
        f: `json`,
        ...requestData.bufferObj,
        ...getTokenObj(requestData.url)
      }

      const resultIds = await superagent.post(`${requestData.url}/${requestData.id}/query`).send(postdata).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      // return resultIds;
      const {
        objectIdFieldName: OBJECTID,
        objectIds: filteredIds
      } = JSON.parse(resultIds.text);
      return {
        OBJECTID,
        filteredIds
      }
    } else {
      const where = `${requestData.OBJECTID} IN (${requestData.filteredIds ? requestData.filteredIds.join(',') : 0})`;
      const data = {
        where,
        returnGeometry: true,
        returnTrueCurves: false,
        outFields: '*',
        resultOffset: 0,
        inSR: requestData.latestWkid,
        outSR: requestData.latestWkid,
        f: `json`,
        resultRecordCount: requestData.tableLimit,
        ...requestData.orderByFields,
        ...getTokenObj(requestData.url)
      }

      const result = await superagent.post(`${requestData.url}/${requestData.id}/query`).send(data).set({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      // return result;
      const {
        geometryType,
        features,
        fields,
        exceededTransferLimit
      } = JSON.parse(result.text);
      return {
        geometryType,
        features,
        fields,
        exceededTransferLimit
      }
    }
  } catch (err) {
    // console.log("spatial intersection err", err);
  }
}

/**
 * @function
 * @name createRequestFeatureGeometry_GEOSERVER
 * @description
 * create request feature geometry for spatial intersection for arcgis source
 * @param {Object} {geometryData} geometry data
 * @returns {feature geometry data}
 */

export const createRequestFeatureGeometry_ARCGIS = (geometryData) => {
  try {
    const geometry = geometryData.geometries;
    if (geometryData.geometryType === 'esriGeometryPoint') {
      const rowsData = geometry.map(row => {
        return [row.x, row.y];
      });
      return ({
        geometry: JSON.stringify({
          points: rowsData
        }),
        geometryType: 'esriGeometryMultipoint'
      });
    } else if (geometryData.geometryType === 'esriGeometryPolyline') {
      const rowsData = [];
      geometry.forEach(row => {
        row.paths.map(path => rowsData.push(path));
      });
      return ({
        geometry: JSON.stringify({
          paths: rowsData
        }),
        geometryType: 'esriGeometryPolyline'
      })
    } else if (geometry[0].type === 'Point' || geometry[0].type === "MultiPoint") {
      const rowsData = [];
      geometry.forEach(geo => {
        rowsData.push(geo.coordinates);
      });
      return ({
        geometry: JSON.stringify({
          points: rowsData
        }),
        geometryType: 'esriGeometryMultipoint'
      });
    } else if (geometry[0].type === 'LineString') {
      const rowsData = [];
      geometry.forEach(geo => {
        const rowData = [];
        geo.coordinates.forEach(cordArr => {
          rowData.push(cordArr)
        });
        rowsData.push(rowData)
      });
      return ({
        geometry: JSON.stringify({
          paths: rowsData
        }),
        geometryType: 'esriGeometryPolyline'
      })
    } else if (geometry[0].type === 'MultiLineString') {
      const rowsData = [];
      geometry.forEach(geo => {
        const rowData = [];
        geo.coordinates.forEach(cordArr => {
          cordArr.forEach(cordinates => {
            rowData.push(cordinates)
          })
        });
        rowsData.push(rowData);
      });
      return ({
        geometry: JSON.stringify({
          paths: rowsData
        }),
        geometryType: 'esriGeometryPolyline'
      })
    } else if (geometry[0].type === 'Polygon') {
      const rowsData = [];
      geometry.forEach(geo => {
        const rowData = [];
        geo.coordinates.forEach(cordArr => {
          cordArr.forEach(cord => {
            rowData.push(cord)
          })
        })
        rowsData.push(rowData);
      });
      return ({
        geometry: JSON.stringify({
          rings: rowsData
        }),
        geometryType: 'esriGeometryPolygon',
        spatialRel: 'esriSpatialRelRelation',
        relationParam: 'T********'
      })
    } else if (geometry[0].type === 'MultiPolygon') {
      const rowsData = [];
      geometry.forEach(geo => {
        const rowData = [];
        geo.coordinates.forEach(cordArr => {
          cordArr.forEach(cord => {
            cord.forEach(cordinates => {
              rowData.push(cordinates)
            })
          });
        });
        rowsData.push(rowData);
      });
      return ({
        geometry: JSON.stringify({
          rings: rowsData
        }),
        geometryType: 'esriGeometryPolygon',
        spatialRel: 'esriSpatialRelRelation',
        relationParam: 'T********'
      })
    } else {
      const rowsData = [];
      geometry.forEach(row => {
        row.rings.map(path => rowsData.push(path));
      });
      return ({
        geometry: JSON.stringify({
          rings: rowsData
        }),
        geometryType: 'esriGeometryPolygon',
        spatialRel: 'esriSpatialRelRelation',
        relationParam: 'T********'
      })
    }
  } catch(err) {
    // console.log("create request geometry err", err);
  }
}

/**
 * @function
 * @name createWhereCondition_GEOSERVER
 * @description
 * create where condition for arcgis source
 * @param {Object} {requestData} filtersData data
 * @returns {where condition}
 */

export const createWhereCondition_ARCGIS = (requestData) => {
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
      if (filtersData[field].type === 'esriFieldTypeString') {
        value = value.map(v => v.includes("'") ? v.replaceAll("'", "''") : v);
        if (filtersData[field].condition === 'same') {
          where += `${field} IN ('${value.join("','")}')`;
        } else if (filtersData[field].condition === 'differ') {
          where += `${field} NOT IN ('${value}')`;
        }
      } else if ((filtersData[field].type === 'esriFieldTypeDouble' || filtersData[field].type === 'esriFieldTypeSingle') && filtersData[field].condition === 'same') {
        // where += `${field} IN ('${value}')`;
        where += `${field} IN (${value})`;
      } else if (['esriFieldTypeInteger', 'esriFieldTypeSmallInteger', 'esriFieldTypeOID', 'esriFieldTypeDouble', 'esriFieldTypeSingle'].includes(filtersData[field].type)) {
        if (filtersData[field].isRange) {
          if (filtersData[field].condition === 'showInRange') {
            where += `${field} BETWEEN ${value.min} AND ${value.max}`;
          } else {
            where += `${field} NOT BETWEEN ${value.min} AND ${value.max}`;
          }
        } else {
          if (filtersData[field].condition === 'same') {
            where += `${field} IN (${value})`;
          } else if (filtersData[field].condition === 'differ') {
            where += `${field} NOT IN (${value})`;
          } else if (filtersData[field].condition === 'greater') {
            where += `${field} > ${value}`;
          } else if (filtersData[field].condition === 'less') {
            where += `${field} < ${value}`;
          }
        }
      } else if (filtersData[field].type === 'esriFieldTypeDate') {
        if (filtersData[field].isRange) {
          const minDate = moment(filtersData[field].value.min).format('YYYY-MM-DD');
          const maxDate = moment(filtersData[field].value.max).format('YYYY-MM-DD');
          if (filtersData[field].condition === 'showInRange') {
            where += `${field} BETWEEN DATE '${minDate}' AND DATE '${maxDate}'`;
          } else {
            where += `${field} NOT BETWEEN DATE '${minDate}' AND DATE '${maxDate}'`;
          }
        } else {
          const date = moment(filtersData[field].value).format('YYYY-MM-DD');
          if (filtersData[field].condition === 'same') {
            where += `${field} = DATE '${date}'`;
          } else if (filtersData[field].condition === 'differ') {
            where += `${field} <> DATE '${date}'`;
          } else if (filtersData[field].condition === 'greater') {
            where += `${field} > DATE '${date}'`;
          } else if (filtersData[field].condition === 'less') {
            where += `${field} < DATE '${date}'`;
          }
        }
      }
    });
    // console.log('where', where);
    return where;
  } catch (err) {
    // console.log("arcgis where err", err)
    return '1=1';
  }
}

/**
 * @function
 * @name setBufferEnable_ARCGIS
 * @description
 * set buffer enable and disable for arcgis source
 * @param {Object} {data} projection data
 * @returns {buffer feature}
 */

export const setBufferEnable_ARCGIS = () => {
  return true;
}