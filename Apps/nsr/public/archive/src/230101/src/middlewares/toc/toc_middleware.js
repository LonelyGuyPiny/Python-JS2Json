import {
  createTocData_ARCGIS,
  fetchNextRecords_ARCGIS,
  createFeature_ARCGIS,
  createLinks_ARCGIS,
  createGeometryFeature_ARCGIS,
  createTocLayerFields_ARCGIS,
  createDrawFeature_ARCGIS,
  fetchAllRecords_ARCGIS,
  createFocusFeature_ARCGIS,
  createTocExport_ARCGIS,
  createTocSorting_ARCGIS,
  createCsvData_ARCGIS,
  fetchCsvData_ARCGIS,
  createFilterOptions_ARCGIS,
  createFilterFeatures_ARCGIS,
  createLayerDefinition_ARCGIS,
  createSpatialIntersection_ARCGIS,
  createCheckFieldType_ARCGIS,
  createLoadingFields_ARCGIS,
  createAllFetchedData_ARCGIS,
  createRequestFeatureGeometry_ARCGIS,
  createWhereCondition_ARCGIS,
  setBufferEnable_ARCGIS
} from './toc_arcgis';
import {
  createTocData_GEOSERVER,
  fetchNextRecords_GEOSERVER,
  createFeature_GEOSERVER,
  createLinks_GEOSERVER,
  createGeometryFeature_GEOSERVER,
  createTocLayerFields_GEOSERVER,
  createDrawFeature_GEOSERVER,
  fetchAllRecords_GEOSERVER,
  createFocusFeature_GEOSERVER,
  createTocExport_GEOSERVER,
  createTocSorting_GEOSERVER,
  createCsvData_GEOSERVER,
  fetchCsvData_GEOSERVER,
  createFilterOptions_GEOSERVER,
  createFilterFeatures_GEOSERVER,
  createLayerDefinition_GEOSERVER,
  createSpatialIntersection_GEOSERVER,
  createLoadingFields_GEOSERVER,
  createCheckFieldType_GEOSERVER,
  createAllFetchedData_GEOSERVER,
  createRequestFeatureGeometry_GEOSERVER,
  createWhereCondition_GEOSERVER,
  setBufferEnable_GEOSERVER
} from './toc_geoserver';
import SOURCE from '../sources';

/**
 * @function
 * @name createTocData_MIDDLEWARE
 * @description
 * middleware for toc data fetching from different sources
 * @param {Object} {layer} layer config data
 * @returns {toc data}
 */
export const createTocData_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createTocData_GEOSERVER(data);
    default:
      return createTocData_ARCGIS(data);
  }
}

/**
 * @function
 * @name createTocLayerFields_MIDDLEWARE
 * @description
 * middleware for toc layerField making from different sources
 * @param {Object} {fields} fields data
 * @returns {layerField data}
 */
export const createTocLayerFields_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createTocLayerFields_GEOSERVER(data);
    default:
      return createTocLayerFields_ARCGIS(data);
  }
}

/**
 * @function
 * @name fetchNextRecords_MIDDLEWARE
 * @description
 * middleware for next toc data fetching from different sources
 * @param {Object} {layer} layer config data
 * @returns {toc next data}
 */
export const fetchNextRecords_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return fetchNextRecords_GEOSERVER(data);
    default:
      return fetchNextRecords_ARCGIS(data);
  }
}

/**
 * @function
 * @name fetchAllRecords_MIDDLEWARE
 * @description
 * middleware for toc data fetching less than 1000 from different sources
 * @param {Object} {layer} layer config data
 * @returns {toc all features}
 */
export const fetchAllRecords_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return fetchAllRecords_GEOSERVER(data);
    default:
      return fetchAllRecords_ARCGIS(data);
  }
}

/**
 * @function
 * @name createFeature_MIDDLEWARE
 * @description
 * middleware for feature data making from different sources
 * @param {Object} {feature} feature data
 * @returns {feature}
 */
export const createFeature_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createFeature_GEOSERVER(data);
    default:
      return createFeature_ARCGIS(data);
  }
}

/**
 * @function
 * @name createLinks_MIDDLEWARE
 * @description
 * middleware for lniks data for different sources
 * @param {Object} {links} links config data
 * @returns {links}
 */
export const createLinks_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createLinks_GEOSERVER(data);
    default:
      return createLinks_ARCGIS(data);
  }
}

/**
 * @function
 * @name createGeometryFeature_MIDDLEWARE
 * @description
 * middleware for geometry feature data for different sources
 * @param {Object} {geometry} geometry data
 * @returns {feature}
 */
export const createGeometryFeature_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createGeometryFeature_GEOSERVER(data);
    default:
      return createGeometryFeature_ARCGIS(data);
  }
}

/**
 * @function
 * @name createDrawFeature_MIDDLEWARE
 * @description
 * middleware for draw feature data for different sources
 * @param {Object} {coordinates} coordinates data
 * @returns {features}
 */
export const createDrawFeature_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createDrawFeature_GEOSERVER(data);
    default:
      return createDrawFeature_ARCGIS(data);
  }
}

/**
 * @function
 * @name createFocusFeature_MIDDLEWARE
 * @description
 * middleware for focus feature data for different sources
 * @param {Object} {coordinates} coordinates data
 * @returns {features}
 */
export const createFocusFeature_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createFocusFeature_GEOSERVER(data);
    default:
      return createFocusFeature_ARCGIS(data);
  }
}

/**
 * @function
 * @name createTocExport_MIDDLEWARE
 * @description
 * middleware for toc export data for different sources
 * @param {Object} {features} coordinates data
 * @returns {export file}
 */
export const createTocExport_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createTocExport_GEOSERVER(data);
    default:
      return createTocExport_ARCGIS(data);
  }
}

/**
 * @function
 * @name createTocSorting_MIDDLEWARE
 * @description
 * middleware for toc sorted data for different sources
 * @param {Object} {layer} layer config data
 * @returns {features}
 */
export const createTocSorting_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createTocSorting_GEOSERVER(data);
    default:
      return createTocSorting_ARCGIS(data);
  }
}

/**
 * @function
 * @name fetchCsvData_MIDDLEWARE
 * @description
 * middleware for csv data for different sources
 * @param {Object} {layer} layer config data
 * @returns {features}
 */
export const fetchCsvData_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return fetchCsvData_GEOSERVER(data);
    default:
      return fetchCsvData_ARCGIS(data);
  }
}

/**
 * @function
 * @name createCsvData_MIDDLEWARE
 * @description
 * middleware for csv data for different sources
 * @param {Object} {layer} layer config data
 * @returns {features}
 */
export const createCsvData_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createCsvData_GEOSERVER(data);
    default:
      return createCsvData_ARCGIS(data);
  }
}

/**
 * @function
 * @name createFilterOptions_MIDDLEWARE
 * @description
 * middleware for column filter data for different sources
 * @param {Object} {layer} layer config data
 * @returns {features}
 */
export const createFilterOptions_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createFilterOptions_GEOSERVER(data);
    default:
      return createFilterOptions_ARCGIS(data);
  }
}

/**
 * @function
 * @name createFilterFeatures_MIDDLEWARE
 * @description
 * middleware for filter features for different sources
 * @param {Object} {layer} layer config data
 * @returns {features}
 */
export const createFilterFeatures_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createFilterFeatures_GEOSERVER(data);
    default:
      return createFilterFeatures_ARCGIS(data);
  }
}

/**
 * @function
 * @name createLayerDefinition_MIDDLEWARE
 * @description
 * middleware layer definition for different sources
 * @param {Object} {layer} layer data
 * @returns {layer definition}
 */
export const createLayerDefinition_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createLayerDefinition_GEOSERVER(data);
    default:
      return createLayerDefinition_ARCGIS(data);
  }
}

/**
 * @function
 * @name createLoadingFields_MIDDLEWARE
 * @description
 * create loading of dropdown for different sources
 * @param {Object} {fields} fields data
 * @returns {loading fields}
 */
export const createLoadingFields_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createLoadingFields_GEOSERVER(data);
    default:
      return createLoadingFields_ARCGIS(data);
  }
}

/**
 * @function
 * @name createCheckFieldType_MIDDLEWARE
 * @description
 * check the field type for different sources
 * @param {Object} {fields} fields data
 * @returns {string fields}
 */
export const createCheckFieldType_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createCheckFieldType_GEOSERVER(data);
    default:
      return createCheckFieldType_ARCGIS(data);
  }
}

/**
 * @function
 * @name createAllFetchedData_MIDDLEWARE
 * @description
 * create fetched data for different sources
 * @param {Object} {allFeatyres} fields data
 * @returns {features data}
 */
export const createAllFetchedData_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createAllFetchedData_GEOSERVER(data);
    default:
      return createAllFetchedData_ARCGIS(data);
  }
}

/**
 * @function
 * @name createSpatialIntersection_MIDDLEWARE
 * @description
 * middleware for spatial intersection for different sources
 * @param {Object} {layer} layer config data
 * @returns {features}
 */
export const createSpatialIntersection_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createSpatialIntersection_GEOSERVER(data);
    default:
      return createSpatialIntersection_ARCGIS(data);
  }
}

/**
 * @function
 * @name createRequestFeatureGeometry_MIDDLEWARE
 * @description
 * middleware for requested feature geometry for different sources
 * @param {Object} {geometry} geometry data
 * @returns {geomtery}
 */
export const createRequestFeatureGeometry_MIDDLEWARE = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return createRequestFeatureGeometry_GEOSERVER(data);
    default:
      return createRequestFeatureGeometry_ARCGIS(data);
  }
}

/**
 * @function
 * @name createWhereCondition_Middleware
 * @description
 * middleware for where condition for different sources
 * @param {Object} {data} filter, geometry and buffer data
 * @returns {where condition}
 */

export const createWhereCondition_Middleware = (data) => {
  switch(data.source) {
    case SOURCE.GEOSERVER:
      return createWhereCondition_GEOSERVER(data);
    default:
      return createWhereCondition_ARCGIS(data);
  }
}

/**
 * @function
 * @name setBufferEnable_Middleware
 * @description
 * middleware for buffer enable/disable for different sources
 * @param {Object} {data} projection data
 * @returns {buffer feature}
 */

export const setBufferEnable_Middleware = (data) => {
  switch (data.source) {
    case SOURCE.GEOSERVER:
      return setBufferEnable_GEOSERVER(data);
    default:
      return setBufferEnable_ARCGIS(data);
  }
}