import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// import Polygon from 'ol/geom/Polygon';
// import MultiPolygon from 'ol/geom/MultiPolygon';
// import MultiLineString from 'ol/geom/MultiLineString';
// import LineString from 'ol/geom/LineString';
// import Point from 'ol/geom/Point';
// import Feature from 'ol/Feature';
import {
  Style,
  // Icon,
  Fill,
  Stroke,
} from 'ol/style';
// import { getCenter } from 'ol/extent';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';

import { TOCHeader } from './';
import { fitToMap, centerOnMap } from '../../../../utils/map';
import ResizeSideMenu from '../../ResizeSideMenu';
import TOCTable from './TOCTable';
import TOCExceptionPopup from './TOCExceptionPopup';
// import { transCordinates } from '../../../../utils/map';
import { createGeometryFeature_MIDDLEWARE } from '../../../../middlewares/toc/toc_middleware';

const style = new Style({
  stroke: new Stroke({
    color: `rgb(0,0,255, 1.0)`,
    width: 3
  }),
  fill: new Fill({
    color: `rgb(153,204,255, 0.5)`
  }),
});

class TOC extends Component {
  constructor(props) {
    super(props)
    this.state = {
      column: null
    }
    this.vectorLayer = null;
    this.source = new VectorSource();
    this.clickAt = Date.now();
    this.selectedRows = [];
  }

  componentDidMount = () => {
    const { map } = this.props;
    this.vectorLayer = new VectorLayer({
      source: this.source,
      zIndex: 101,
      title: 'toc',
      style
    });
    map.addLayer(this.vectorLayer);
  }

  onMouseHoverOut = () => {
    this.source.clear();
  }

  handleRowClick = (e, rowInfo) => {
    // e.stopPropagation();
    const { OIDName } = this.props;
    const clickDiff = Date.now() - this.clickAt;
    this.clickAt = Date.now();
    if (clickDiff < 250) {
      clearTimeout(this.setTimeout);
      const feature = this.createFeature(rowInfo);
      if (feature) {
        // this.source.clear();
        this.zoomFunctionalityForRow();
        this.setState({
          clickedRow: rowInfo.attributes[OIDName],
          clickCount: 1
        });
      }
    } else {
      this.setTimeout = setTimeout(() => {
        this.singleClickOnRow(e, rowInfo);
      }, 300);
    }
  }

  singleClickOnRow = (e, rowInfo) => {
    try {
      const { OIDName } = this.props;
      if (this.state.clickedRow === rowInfo.attributes[OIDName]) {
        if (this.state.clickCount === 1) {
          this.source.clear();
        }
      } else {
        const feature = this.createFeature(rowInfo);
        if (feature) {
          this.centerOnMap(this.featureCenter);
        }
        this.setState({
          clickedRow: rowInfo.attributes[OIDName],
          clickCount: 1
        });
      }
    } catch(err) {
      console.log("err", err)
    }
    
  }

  centerOnMap = (center) => {
    const { map } = this.props;
    centerOnMap(center, map);
  }

  zoomFunctionalityForRow = () => {
    const { map } = this.props;
    if (this.fitExtent && this.fitExtent.length === 2) {
      fitToMap([...this.fitExtent, ...this.fitExtent], map);
    } else if (this.fitExtent && this.fitExtent.length === 4) {
      fitToMap(this.fitExtent, map);
    }
  }

  createFeature(rowData, hove = false) {
    try {
      const { geometryType, OIDName, featuresGeometry, layerCrs, tocLayer, projection } = this.props;
      if (this.state.clickedRow === rowData.attributes[OIDName]) {
        this.setState({
          clickedRow: {},
          selectLayer: false
        })
        return false;
      }
      if (this.state.selectLayer) {
        this.setState({
          clickedRow: {},
          selectLayer: false
        })
      }

      // let feature;
      let geometry;
      if (rowData && rowData.attributes) {
        geometry = featuresGeometry[rowData.attributes[OIDName]];
      } else {
        return null;
      }
      const middlewareData = {
        source: tocLayer.type,
        geometryType,
        geometry,
        layerCrs,
        projection
      };
      const {
        feature,
        fitExtent,
        featureCenter
      } = createGeometryFeature_MIDDLEWARE(middlewareData);
      //   if (geometryType === 'esriGeometryPoint') {
      //     const ring = geometry;
      //     const coordinate = [ring.x, ring.y];
      //     let point = new Point(coordinate);
      //     feature = new Feature({
      //       geometry: point,
      //       name: 'Null Island',
      //       population: 4000,
      //       rainfall: 500
      //     });
      //     var iconStyle = new Style({
      //       image: new Icon(({
      //         anchor: [0.5, 15],
      //         anchorXUnits: 'fraction',
      //         anchorYUnits: 'pixels',
      //         opacity: 1,
      //         height: 400,
      //         width: 658,
      //         src: require("../../../../assets/images/point.png")
      //       }))
      //     });
      //     feature.setStyle(iconStyle);
      //     this.fitExtent = coordinate;
      //     this.featureCenter = coordinate;
      //   } else if (geometryType === 'esriGeometryPolyline') {
      //     let multilineData = new MultiLineString(geometry.paths);
      //     this.fitExtent = multilineData.getExtent();
      //     feature = new Feature(multilineData);
      //     this.featureCenter = getCenter(multilineData.getExtent());
      //     let style = new Style({
      //       stroke: new Stroke({
      //         color: `rgb(0,0,255, 1.0)`,
      //         width: 3,
      //       }),
      //       fill: new Fill({
      //         color: `rgb(153,204,255, 0.5)`,
      //       }),
      //     })
      //     feature.setStyle(style);
      //   } else {
      //     let style = new Style({
      //       stroke: new Stroke({
      //         color: `rgb(0,0,255, 1.0)`,
      //         width: 3,
      //       }),
      //       fill: new Fill({
      //         color: `rgb(153,204,255, 0.5)`,
      //       }),
      //     })

      //     let drawPolygon = new Polygon(geometry.rings);
      //     feature = new Feature(drawPolygon);
      //     feature.setStyle(style);
      //     this.fitExtent = drawPolygon.getExtent();
      //     this.featureCenter = getCenter(drawPolygon.getExtent());
      //   }
      this.fitExtent = fitExtent;
      this.featureCenter = featureCenter;
      return feature;
    } catch(err) {
      // console.log("err", err);
    }
  }

  onRowHover = (rowInfo) => {
    this.source.clear();
    const feature = this.createFeature(rowInfo);
    if (feature) {
      this.source.addFeature(feature);
    }
  }

  onRowOut = () => {
    this.source.clear();
  }

  setSelectedRows = (selectedRows) => {
    this.selectedRows = selectedRows;
  }

  render() {
    const { total, intersectionPopup } = this.props;
    return (
      <Fragment>
        <TOCHeader />
        {total > 0 &&
          <TOCTable
            onRowHover={this.onRowHover}
            onRowOut={this.onRowOut}
            setSelectedRows={this.setSelectedRows}
            handleRowClick={this.handleRowClick}
            createFeature={this.createFeature}
          />
        }
        {intersectionPopup &&
          <TOCExceptionPopup intersectionPopup={intersectionPopup} />
        }
        {/* <TOCTableNew/> */}
        <ResizeSideMenu />
      </Fragment>
    )
  }
}

export default connect(
  state => ({
    // toc: state.tocData,
    total: state.tocData.total,
    isAutoFocus: state.tocData.isAutoFocus,
    OIDName: state.tocData.OBJECTID,
    geometryType: state.tocData.geometryType,
    filtersData: state.tocData.filtersData,
    featuresGeometry: state.tocData.featuresGeometry,
    allFeatures: state.tocData.allFeatures,
    features: state.tocData.features,
    featuresDataForProjection: state.tocData.featuresDataForProjection,
    fetchTocData: state.tocData.fetchTocData,
    modifiedTocData: state.tocData.modifiedTocData,
    map: state.map.map,
    layerCrs: state.tocData.crs,
    projection: state.map.projection,
    tocLayer: state.tocData.tocLayer,
    intersectionPopup: state.tocData.intersectionPopup
    // updatedAt: 
  })
)(TOC);