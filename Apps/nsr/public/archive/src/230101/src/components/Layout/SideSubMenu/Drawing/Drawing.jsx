import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Tab, Modal } from 'semantic-ui-react';
import { point, distance, circle } from "@turf/turf";
import {
  // fromLonLat,
  toLonLat
} from "ol/proj";
// import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';
import {
  Circle as CircleStyle,
  Fill,
  RegularShape,
  Stroke,
  Style,
  Text,
} from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';
import { Draw, Modify, Select } from 'ol/interaction';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { shiftKeyOnly } from 'ol/events/condition';
import { createBox } from 'ol/interaction/Draw';
import { LineString, Polygon, Circle, Point } from 'ol/geom';
import { unByKey } from 'ol/Observable';
import Overlay from 'ol/Overlay';
import { getArea, getLength } from 'ol/sphere';

import { Create } from './';
import { Measure } from './';
// import { EditDrawing } from './';
import { Block, Svg } from '../../../';
import {
  SHAPES,
  // JUST_MEASURE,
  // JUST_MEASURE_INDEX
} from '../../../../constants/drawing';
import {
  formatArea,
  lengthFunction,
  circleMeasurement,
  measureLength,
  measureArea,
  areaOutput
} from '../../../../utils/drawing';
import {
  setDwaingLayer,
  setDraingState,
  setDrawStyle,
  setMeasureStyle,
  // showSegmentLength,
  getshowSegmentLength,
  // clearPreviousMeasure,
  setStoreData,
  getStoreData,
  removeStoreData
} from '../../../../redux/modules/drawing';
import { setMap } from '../../../../redux/modules/map';
import { transCordinates } from '../../../../utils/map';

const measureStyles = new Style({
  // fill: new Fill({
  //   color: 'rgba(255, 255, 255, 0)',
  // }),
  stroke: new Stroke({
    color: 'rgba(74, 144, 226, 1)',
    lineDash: [10, 10],
    width: 4,
  }),
  image: new CircleStyle({
    radius: 5,
    stroke: new Stroke({
      color: 'rgba(0, 0, 0, 0.7)',
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)',
    }),
  }),
});

const labelStyle = new Style({
  text: new Text({
    font: '14px Calibri,sans-serif',
    fill: new Fill({
      color: 'rgba(255, 255, 255, 1)',
    }),
    backgroundFill: new Fill({
      color: 'rgba(0, 0, 0, 0.7)',
    }),
    padding: [3, 3, 3, 3],
    textBaseline: 'bottom',
    offsetY: -15,
  }),
  image: new RegularShape({
    radius: 8,
    points: 3,
    angle: Math.PI,
    displacement: [0, 10],
    fill: new Fill({
      color: 'rgba(0, 0, 0, 0.7)',
    }),
  }),
});

const tipStyle = new Style({
  text: new Text({
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: 'rgba(255, 255, 255, 1)',
    }),
    backgroundFill: new Fill({
      color: 'rgba(0, 0, 0, 0.4)',
    }),
    padding: [2, 2, 2, 2],
    textAlign: 'left',
    offsetX: 15,
  }),
});

const segmentStyle = new Style({
  text: new Text({
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: 'rgba(255, 255, 255, 1)',
    }),
    backgroundFill: new Fill({
      color: 'rgba(0, 0, 0, 0.4)',
    }),
    padding: [2, 2, 2, 2],
    textBaseline: 'bottom',
    offsetY: -12,
  }),
  image: new RegularShape({
    radius: 6,
    points: 3,
    angle: Math.PI,
    displacement: [0, 8],
    fill: new Fill({
      color: 'rgba(0, 0, 0, 0.4)',
    }),
  }),
});

const segmentStyles = [segmentStyle];

/**
 * Component
 * @name DrawingFunctionality
 * @description
 * This is the drawing component of the application. 
 * On drawing menu click, this component is loaded
 */
class DrawingFunctionality extends Component {
  //#region life cycle
  constructor(props) {
    super(props);
    const { drawingData } = props;
    this.setDefaultValues(drawingData);
    if (drawingData) {
      this.state = {
        fill: drawingData.state.fill,
        outline: drawingData.state.outline,
        selectedFeature: drawingData.state.selectedFeature,
        isMeasurement: drawingData.state.isMeasurement,
        // showMeasurement: {},
        open: false,
        isEdit: false,
        showEdit: false,
      };
      this.showMeasurement = drawingData.showMeasurement;
      this.showToolTip = drawingData.showToolTip;
    } else {
      this.fill = {
        color: { r: 74, g: 144, b: 226 },
        opacity: 0.5
      }
      this.outline = {
        size: 5,
        color: { r: 74, g: 144, b: 226 },
        opacity: 1
      }
      this.state = {
        fill: this.fill,
        outline: this.outline,
        selectedFeature: null,
        isMeasurement: true,
        // activeTab: 0,
        open: false,
        isEdit: false,
        showClearAll: false,
        showMeasureClearAll: false,
      };
      this.showMeasurement = true;
    }
  }

  handleMoveEvent = () => {
    this.map.on('pointermove', (evt) => {
      const { isEdit } = this.state;
      const map = this.map;
      const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      const element = evt.map.getTargetElement();
      if (feature && isEdit) {
        if (element.style.cursor !== this.cursor_) {
          this.previousCursor_ = element.style.cursor;
          element.style.cursor = this.cursor_;
        }
      } else if (this.previousCursor_ !== undefined) {
        element.style.cursor = this.previousCursor_;
        this.previousCursor_ = undefined;
      }
    });
    this.compareMap.on('pointermove', (evt) => {
      const { isEdit } = this.state;
      const map = this.map;
      const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      const element = evt.map.getTargetElement();
      if (feature && isEdit) {
        if (element.style.cursor !== this.cursor_) {
          this.previousCursor_ = element.style.cursor;
          element.style.cursor = this.cursor_;
        }
      } else if (this.previousCursor_ !== undefined) {
        element.style.cursor = this.previousCursor_;
        this.previousCursor_ = undefined;
      }
    })
  }

  componentDidMount = () => {
    const { translation, dispatch } = this.props;
    const drawingStoreData = dispatch(getStoreData());
    this.modifyStyle = new Style({
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.7)',
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 0, 0.4)',
        }),
      }),
      text: new Text({
        text: translation.dragToModify,
        font: '12px Calibri,sans-serif',
        fill: new Fill({
          color: 'rgba(255, 255, 255, 1)',
        }),
        backgroundFill: new Fill({
          color: 'rgba(0, 0, 0, 0.7)',
        }),
        padding: [2, 2, 2, 2],
        textAlign: 'left',
        offsetX: 15,
      }),
    });
    this.handleMoveEvent();
    const data = this.props.drawingData;
    const { showSegmentLength, clearPreviousMeasure } = this.props;
    this.showSegmentMeasure = showSegmentLength;
    // console.log("data", data);
    if (!data) {
      this.createVectorLayer();
    }
    this.selectFeature();
    this.updateStyle(this.outline, this.fill);
    this.updateTextStyle(this.text);
    this.props.dispatch(setDraingState(true));
    if (this.activeTabIndex === 0) {
      // this.map.addInteraction(this.draw);
      // this.compareMap.addInteraction(this.cDraw);
      this.map.removeInteraction(this.draw);
      this.compareMap.removeInteraction(this.cDraw);
      this.addInteractions();
    } else if(this.activeTabIndex === 1) {
      // this.showSegmentMeasure = showSegmentLength;
      this.measureallClear = clearPreviousMeasure;
      this.map.removeInteraction(this.draw);
      this.compareMap.removeInteraction(this.cDraw);
      this.addMeasureInteractions();
      // this.measureModify = data.measureModify;
      // this.cMeasureModify = data.cMeasureModify;
      this.measureModify = new Modify({ source: data.measureVectorSource, style: this.modifyStyle });
      this.cMeasureModify = new Modify({ source: data.measureVectorSource, style: this.modifyStyle });
      this.map.addInteraction(this.measureModify);
      this.compareMap.addInteraction(this.cMeasureModify);
    }
    if ((data && data.VectorSource.getFeatures().length > 0) || (drawingStoreData && drawingStoreData.vectorFeatures.length > 0)) {
      this.setState({
        showEdit: true
      })
    }
    if ((data && (data.VectorSource.getFeatures().length > 0 || data.measureVectorSource.getFeatures().length > 0)) || (drawingStoreData && (drawingStoreData.vectorFeatures.length > 0))
    ) {
      this.setState({
        showClearAll: true
      })
    }
    if ((data && data.measureVectorSource.getFeatures().length > 0)
    //  || (drawingStoreData && drawingStoreData.measureVectorFeatures.length > 0)
    ) {
      this.setState({
        showMeasureClearAll: true
      })
    }
  }

  componentWillUnmount = () => {
    const data = {
      VectorSource: this.VectorSource,
      VectorLayer: this.vectorLayer,
      compareVectorLayer: this.compareVectorLayer,
      measureVectorSource: this.measureVectorSource,
      measureVectorLayer: this.measureVectorLayer,
      measureCompareVectorLayer: this.measureCompareVectorLayer,
      selectedShape: this.selectedShape,
      shape: this.shape,
      draw: this.draw,
      cDraw: this.cDraw,
      style: this.style,
      // featureId: this.featureId,
      select: this.select,
      cSelect: this.cSelect,
      measureTooltip: this.measureTooltip,
      measureTooltipElement: this.measureTooltipElement,
      cMeasureTooltip: this.cMeasureTooltip,
      cMeasureTooltipElement: this.cMeasureTooltipElement,
      fill: this.fill,
      outline: this.outline,
      text: this.text,
      textStyle: this.textStyle,
      overlays: this.overlays,
      state: this.state,
      measurements: this.measurements,
      showMeasurement: this.showMeasurement,
      showToolTip: this.showToolTip,
      measurementsToolTip: this.measurementsToolTip,
      measurementsSegmentsToolTip: this.measurementsSegmentsToolTip,
      showSegmentMeasure: this.showSegmentMeasure,
      // activeTabIndex: this.state.activeTab,
      activeTabIndex: this.activeTabIndex,
      // measureModify: this.measureModify,
      // cMeasureModify: this.cMeasureModify,
      measureDraw: this.measureDraw,
      cMeasureDraw: this.cMeasureDraw,
      measureDrawIds: this.measureDrawIds,
      drawIds: this.drawIds
    };
    this.props.dispatch(setDwaingLayer(data));
    this.props.dispatch(setMap(this.map));
    this.props.dispatch(setDraingState(false));
    this.denyModify();
    this.map.removeInteraction(this.select);
    this.compareMap.removeInteraction(this.cSelect);
    this.map.removeInteraction(this.measureModify);
    this.compareMap.removeInteraction(this.cMeasureModify);
    this.map.removeInteraction(this.draw);
    this.compareMap.removeInteraction(this.cDraw);
    this.map.removeInteraction(this.measureDraw);
    this.compareMap.removeInteraction(this.cMeasureDraw);
    this.cursor_ = undefined;
  }

  setDefaultValues = (data) => {
    this.previousCursor_ = undefined;
    this.cursor_ = 'pointer';
    // console.log("data", data);
    const DrawingstoreData = this.props.dispatch(getStoreData());
    // console.log("DrawingstoreData", DrawingstoreData);
    if (DrawingstoreData) {
      this.featureId = DrawingstoreData.featureId;
      this.drawIds = DrawingstoreData.drawIds;
      this.measureDrawIds = DrawingstoreData.measureDrawIds;
    } else {
      // this.VectorSource = new VectorSource();
      // this.measureVectorSource = new VectorSource();
      this.featureId = 1;
      this.drawIds = [];
      this.measureDrawIds = [];
    }
    if (data && (data.VectorSource || data.measureVectorSource)) {
      // console.log("data.VectorSource", data.VectorSource);
      this.VectorSource = data.VectorSource;
      this.vectorLayer = data.VectorLayer;
      this.compareVectorLayer = data.compareVectorLayer;
      this.measureVectorSource = data.measureVectorSource;
      this.measureVectorLayer = data.measureVectorLayer;
      this.measureCompareVectorLayer = data.measureCompareVectorLayer;
      this.selectedShape = data.selectedShape;
      this.shape = data.shape;
      this.draw = data.draw;
      this.cDraw = data.cDraw;
      this.style = data.style;
      // this.featureId = data.featureId;
      this.select = data.select;
      this.cSelect = data.cSelect;
      this.measureTooltip = data.measureTooltip;
      this.measureTooltipElement = data.measureTooltipElement;
      this.cMeasureTooltip = data.cMeasureTooltip;
      this.cMeasureTooltipElement = data.cMeasureTooltipElement;
      this.fill = data.fill;
      this.outline = data.outline;
      this.text = data.text;
      this.textStyle = data.textStyle;
      this.overlays = data.overlays;
      this.measurements = data.measurements;
      // this.drawIds = data.drawIds;
      // this.measureDrawIds = data.measureDrawIds;
      this.measurementsToolTip = data.measurementsToolTip;
      this.measurementsSegmentsToolTip = data.measurementsSegmentsToolTip;
      this.activeTabIndex = data.activeTabIndex;
      this.measureDraw = data.measureDraw;
      this.cMeasureDraw = data.cMeasureDraw;
    } else {
      this.VectorSource = new VectorSource();
      this.vectorLayer = null;
      this.compareVectorLayer = null;
      this.measureVectorSource = new VectorSource();
      this.measureVectorLayer = null;
      this.measureCompareVectorLayer = null;
      this.selectedShape = SHAPES.Point.name;
      this.shape = 'Point';
      this.draw = null;
      this.cDraw = null;
      this.measureDraw = null;
      this.cMeaureDraw = null;
      this.style = null;
      // this.featureId = 1;
      this.select = new Select({ wrapX: false });
      this.cSelect = new Select({ wrapX: false });
      this.measureTooltip = null;
      this.measureTooltipElement = null;
      this.cMeasureTooltip = null;
      this.cMeasureTooltipElement = null;
      this.overlays = [];
      this.measurements = {};
      this.text = {
        size: 24,
        color: { r: 252, g: 252, b: 252 },
        opacity: 1,
        font: 'Alef',
        content: '',
        text: '',
        strokeSize: 1,
        strokeColor: { r: 0, g: 0, b: 0 },
        rotation: 0,
        isWrap: false,
        isBold: false
      };
      this.textStyle = null;
      // this.drawIds = [];
      // this.measureDrawIds = [];
      // this.measurementsToolTip = [];
      // this.measurementsSegmentsToolTip = [];
      this.measurementsToolTip = [];
      this.measurementsSegmentsToolTip = [];
    }
    this.onEditShapeListner = null;
    this.modify = null;
    this.cModify = null;
    // this.measureModify = null;
    // this.cMeasureModify = null;
    this.map = this.props.map;
    this.compareMap = this.props.compareMap;
    this.tipPoint = null;
    
    this.activeTabIndex = data && data.activeTabIndex ? data.activeTabIndex : 0;
    return this;
  }
  //#endregion

  //#region select shape
  selectFeature = () => {
    const self = this;
    // const { activeTab } = this.state;

    const select = (MAP_TYPE) => (e) => {
      if (e.selected.length > 0) {
        const feature = e.selected[0];
        // console.log("feature", feature)
        const featureId = feature.getProperties().id;
        let drawFeature = featureId;
        if (this.activeTabIndex === 0) {
          if (this.measureDrawIds.includes(featureId)) {
            drawFeature = null;
            this.select.getFeatures().clear();
            this.setState({ showEdit: false })
            return;
          }
        } else if (this.activeTabIndex === 1) {
          if (this.drawIds.includes(featureId)) {
            drawFeature = null;
            return;
          }
        }
        if (drawFeature) {
          self.setState({
            selectedFeature: feature,
          });
          //#region on edit shape update measurement
          const measureTooltip = self.map.getOverlayById(`draw-overlay-${featureId}`);
          const cMeasureTooltip = self.compareMap.getOverlayById(`c-draw-overlay-${featureId}`);
          const measureTooltipElement = document.getElementById(`area${featureId}`);
          const cMeasureTooltipElement = document.getElementById(`c-area${featureId}`);
          self.onEditShapeListner = feature.getGeometry().on('change', function (evt) {
            const geom = evt.target;
            const drawingStoreData = self.props.dispatch(getStoreData());
            // console.log("geom", geom instanceof Point, geom);
            // const { selectedUnitType } = self.props;
            let output;
            if (geom instanceof Point) {
              //#region update store data on editing
              const featureIndexId = drawingStoreData.vectorFeatures.findIndex(f => f.id === drawFeature);
              drawingStoreData.vectorFeatures[featureIndexId].geometry = geom;
              self.props.dispatch(setStoreData(drawingStoreData));
              return;
            //#endregion
            } else if (geom instanceof Polygon) {
              output = formatArea(getArea(geom));
              self.coordinates = geom.getInteriorPoint().getCoordinates();
            } else if (geom instanceof LineString) {
              output = lengthFunction(getLength(geom));
              self.coordinates = geom.getLastCoordinate();
            } else if (geom instanceof Circle) {
              output = circleMeasurement(geom.getRadius().toFixed(2))
              // output = (geom.getRadius() * 2).toFixed(2);
              self.coordinates = geom.getCenter();
            }

            const { translation } = self.props;
            const measurement = `${output.value} ${translation[output.unit]}`;
            measureTooltipElement.innerHTML = measurement;
            measureTooltip.setPosition(self.coordinates);
            cMeasureTooltipElement.innerHTML = measurement;
            cMeasureTooltip.setPosition(self.coordinates);

            //#region update store data on editing
            const featureIndexId = drawingStoreData.vectorFeatures.findIndex(f => f.id === drawFeature);
            drawingStoreData.vectorFeatures[featureIndexId].geometry = geom;
            let overlayObj = drawingStoreData.overlays;
            let measurementObj = drawingStoreData.measurements;
            overlayObj = { ...overlayObj, [drawFeature]: self.coordinates };
            measurementObj = { ...measurementObj, [drawFeature]: output }
            drawingStoreData.overlays = overlayObj;
            drawingStoreData.measurements = measurementObj;
            self.props.dispatch(setStoreData(drawingStoreData));
            //#endregion
          });
          //#endregion
        }
      }
    }
    this.select.on('select', select('MAP'));
    this.cSelect.on('select', select('COMPARE_MAP'));

  };
  //#endregion

  //#region handle style
  updateStyle = (outline = null, fill = null) => {
    if (outline) {
      this.outline = outline;
    }
    if (fill) {
      this.fill = fill;
    }

    this.setState({
      outline: this.outline,
      fill: this.fill
    });

    const style = new Style({
      fill: new Fill({
        color: `rgba(${this.fill.color.r}, ${this.fill.color.g}, ${this.fill.color.b}, ${this.fill.opacity})`,
      }),
      stroke: new Stroke({
        color: `rgba(${this.outline.color.r}, ${this.outline.color.g}, ${this.outline.color.b}, ${this.outline.opacity})`,
        width: this.outline.size,
      }),
      image: new CircleStyle({
        radius: this.outline.size,
        fill: new Fill({
          color: `rgba(${this.outline.color.r}, ${this.outline.color.g}, ${this.outline.color.b}, ${this.outline.opacity})`,
        }),
      }),
    });

    this.style = style;
  }

  updateTextStyle = (text) => {
    this.text = text;
    const font = `${text.isBold ? 'bold' : 'normal'} ${text.size}px/1 ${text.font}`;
    this.textStyle = new Style({
      text: new Text({
        fill: new Fill({
          color: `rgba(${text.color.r}, ${text.color.g}, ${text.color.b}, ${text.opacity})`,
        }),
        stroke: new Stroke({
          color: `rgba(${text.strokeColor.r}, ${text.strokeColor.g}, ${text.strokeColor.b}, ${text.opacity})`,
          width: text.strokeSize || 1,
        }),
        textAlign: undefined,
        textBaseline: "middle",
        font,
        text: text.text,
        offsetX: 0,
        offsetY: 0,
        placement: "point",
        maxAngle: 0,
        overflow: false,
        rotation: Number(text.rotation) * 0.0174533,
      })
    })
  }
  //#endregion

  //#region create vector layer
  createVectorLayer = () => {
    // const self = this;
    // const { activeTab } = this.state;
    const style = new Style({
      fill: new Fill({
        color: `rgba(${this.fill.color.r}, ${this.fill.color.g}, ${this.fill.color.b}, ${this.fill.opacity})`,
      }),
      stroke: new Stroke({
        color: `rgba(${this.outline.color.r}, ${this.outline.color.g}, ${this.outline.color.b}, ${this.outline.opacity})`,
        width: this.outline.size,
      }),
      image: new CircleStyle({
        radius: this.outline.size,
        fill: new Fill({
          color: `rgba(${this.outline.color.r}, ${this.outline.color.g}, ${this.outline.color.b}, ${this.outline.opacity})`,
        }),
      }),
    });

    const layerObj = {
      source: this.VectorSource,
      zIndex: 500,
      style
    };

    this.vectorLayer = new VectorLayer(layerObj);
    this.compareVectorLayer = new VectorLayer(layerObj);

    const measureLayerObj = {
      source: this.measureVectorSource,
      zIndex: 600,
      style: (feature) => {
        return this.styleFunction(feature);
      },
    };

    this.measureVectorLayer = new VectorLayer(measureLayerObj);
    this.measureCompareVectorLayer = new VectorLayer(measureLayerObj);

    this.map.addLayer(this.vectorLayer);
    this.compareMap.addLayer(this.compareVectorLayer);
    this.map.addLayer(this.measureVectorLayer);
    this.compareMap.addLayer(this.measureCompareVectorLayer);
    if (this.activeTabIndex === 0) {
      this.addInteractions();
    } else {
      this.addMeasureInteractions();
    }
  }
  //#endregion

  //#region modify features
  allowModify = () => {
    this.modify = new Modify({ features: this.select.getFeatures() });
    this.map.addInteraction(this.modify);
    this.cModify = new Modify({ features: this.cSelect.getFeatures() });
    this.compareMap.addInteraction(this.cModify);
  }

  denyModify = () => {
    if (this.modify) {
      this.map.removeInteraction(this.modify);
      this.select.getFeatures().clear();
      this.modify = null;
      this.compareMap.removeInteraction(this.cModify);
      this.cSelect.getFeatures().clear();
      this.cModify = null;
      unByKey(this.onEditShapeListner);
    }
  }
  //#endregion

  //#region handle draw
  addInteractions = () => {
    try {
      let type = this.selectedShape;
      let geometryFunction;
      if (type === SHAPES.Box.name) {
        type = SHAPES.Circle.name;
        geometryFunction = createBox();
      } else if (type === SHAPES.Text.name) {
        type = SHAPES.Point.name;
      }

      const drawObj = {
        source: this.VectorSource,
        type: type,
        geometryFunction,
        freehandCondition: shiftKeyOnly
      };

      this.draw = new Draw(drawObj);
      this.cDraw = new Draw(drawObj);

      const drawStart = MAP_TYPE => (e) => {
        const feature = e.feature;
        const fProps = {
          id: self.featureId,
          shape: self.shape,
          isMeasurement: self.state.isMeasurement
        };

        if (self.selectedShape === SHAPES.Text.name) {
          e.feature.setStyle(self.textStyle);
          const textValue = self.text;
          self.text = { ...self.text, textValue }
          e.feature.setProperties({
            ...fProps,
            text: self.text
          });
        } else {
          e.feature.setProperties({
            ...fProps,
            fill: self.fill,
            outline: self.outline
          });
          e.feature.setStyle(self.style);
        }

        //#region get measurements
        self.coordinates = e.coordinate;
        self.measurement = null;
        listener = feature.getGeometry().on('change', function (evt) {
          const geom = evt.target;
          let output;

          if (geom instanceof Polygon) {
            output = formatArea(getArea(geom));
            self.coordinates = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof LineString) {
            output = lengthFunction(getLength(geom));
            self.coordinates = geom.getLastCoordinate();
          } else if (geom instanceof Circle) {
            output = circleMeasurement(geom.getRadius().toFixed(2))
            self.coordinates = geom.getCenter();
          }

          self.measurements[self.featureId] = output;
          const { translation } = self.props;
          const measurement = `${output.value} ${translation[output.unit]}`;

          if (MAP_TYPE === 'MAP') {
            self.measureTooltipElement.style.display = self.state.isMeasurement ? 'block' : 'none';
            self.cMeasureTooltipElement.style.display = 'none';
          } else {
            self.measureTooltipElement.style.display = 'none';
            self.cMeasureTooltipElement.style.display = self.state.isMeasurement ? 'block' : 'none';
          }

          self.measureTooltipElement.innerHTML = measurement;
          self.measureTooltipElement.id = `area${self.featureId}`;
          self.measureTooltip.setPosition(self.coordinates);

          self.cMeasureTooltipElement.innerHTML = measurement;
          self.cMeasureTooltipElement.id = `c-area${self.featureId}`;
          self.cMeasureTooltip.setPosition(self.coordinates);
        });
        //#endregion
      };

      const drawEnd = async (e) => {
        // console.log("e", e.feature)
        self.showMeasurement = { ...self.showMeasurement, [self.featureId]: self.state.isMeasurement }
        self.drawIds = [...self.drawIds, self.featureId];
        self.measureTooltipElement.style.display = self.state.isMeasurement ? 'block' : 'none';
        self.cMeasureTooltipElement.style.display = self.state.isMeasurement ? 'block' : 'none';

        self.featureId += 1;
        self.measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
        self.measureTooltip.setOffset([0, -7]);
        self.measureTooltipElement = null;
        self.cMeasureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
        self.cMeasureTooltip.setOffset([0, -7]);
        self.cMeasureTooltipElement = null;
        await self.createMeasureTooltip();
        unByKey(listener);
        this.setState({ showEdit: true, showClearAll: true });
        self.createStoreData(e.feature, 'draw');
      }

      this.createMeasureTooltip();
      // this.createStoreData();

      // create feature unique id
      const self = this;
      let listener = null;
      this.draw.on('drawstart', drawStart('MAP'));
      this.draw.on('drawend', drawEnd);
      this.cDraw.on('drawstart', drawStart('COMPARE_MAP'));
      this.cDraw.on('drawend', drawEnd);

      this.map.addInteraction(this.draw);
      this.compareMap.addInteraction(this.cDraw);
    } catch(err) {
      // console.log("drawing err", err);
    }
  }

  createStoreData = (storeFeature, type) => {
    try {
      // console.log("storeFeature", storeFeature);
      const drawingStoreData = this.props.dispatch(getStoreData());
      const vectorFeatureArr = drawingStoreData && drawingStoreData.vectorFeatures.length > 0 ? drawingStoreData.vectorFeatures : [];
      let overlayObj = drawingStoreData && drawingStoreData.overlays ? drawingStoreData.overlays : {};
      let measurements = drawingStoreData && drawingStoreData.measurements ? drawingStoreData.measurements : {};
      measurements = { ...measurements, ...this.measurements }

      // if(this.measureallClear) {
      //   const feaurePro = storeFeature.getProperties();
      //   var measureVectorFeatureArr = [];
      //   var measurementsToolTip = {[feaurePro.id]: this.measurementsToolTip[feaurePro.id]};
      //   var measurementsSegmentsToolTip = {[feaurePro.id]: this.measurementsSegmentsToolTip[feaurePro.id]};
      // } else {
      //   measureVectorFeatureArr = drawingStoreData && drawingStoreData.measureVectorFeatures.length > 0 ? drawingStoreData.measureVectorFeatures : [];
      //   measurementsToolTip = drawingStoreData && drawingStoreData.measurementsToolTip ? drawingStoreData.measurementsToolTip : {};
      //   measurementsToolTip = { ...measurementsToolTip, ...this.measurementsToolTip }
      //   measurementsSegmentsToolTip = drawingStoreData && drawingStoreData.measurementsSegmentsToolTip ? drawingStoreData.measurementsSegmentsToolTip : {};
      //   measurementsSegmentsToolTip = { ...measurementsSegmentsToolTip, ...this.measurementsSegmentsToolTip }
      // }

      let drawIds = drawingStoreData && drawingStoreData.drawIds.length > 0 ? drawingStoreData.drawIds : [];
      drawIds = [...new Set([...drawIds, ...this.drawIds])];
      let measureDrawIds = drawingStoreData && drawingStoreData.measureDrawIds.length > 0 ? drawingStoreData.measureDrawIds : [];
      measureDrawIds = [...new Set([...measureDrawIds, ...this.measureDrawIds])];

      let showMeasurement = drawingStoreData && drawingStoreData.showMeasurement ? drawingStoreData.showMeasurement : {};
      showMeasurement = { ...showMeasurement, ...this.showMeasurement };
      let counter = drawingStoreData && drawingStoreData.counter ? drawingStoreData.counter : 0;
      // counter += 1;
      // let createCounter = true;
      // let isMeasure = false;

      if (type === 'draw') {

        const features = this.VectorSource.getFeatures();
        if (features.length > 0) {
          const overlays = this.overlays.filter(o => features.findIndex(f => {
            return (o.getId() === `draw-overlay-${f.getProperties().id}`);
          }) !== -1).filter((item, pos, self) => {
            return self.findIndex(f => f.getId() === item.getId() && f.getPosition() !== undefined) === pos;
          });
          this.VectorSource.forEachFeature(feature => {
            const featureProperties = feature.getProperties();
            if (vectorFeatureArr.findIndex((element) => element.id === featureProperties.id) !== -1) {
              return;
            }
            vectorFeatureArr.push(featureProperties);
            const finalOverlay = overlays.find(ol => ol.id === `draw-overlay-${featureProperties.id}`);
            // console.log("finalOverlay", finalOverlay);

            if (finalOverlay) {
              overlayObj = { ...overlayObj, [featureProperties.id]: finalOverlay.getPosition() };
            }
          });
        }
      // } else if (type === 'measure') {
      //   isMeasure = true;
        // const features = this.measureVectorSource.getFeatures();
        // const featureProperties = storeFeature.getProperties();
        // measureVectorFeatureArr.push(featureProperties);
        // if (Object.keys(features).length > 0) {
        //   this.measureVectorSource.forEachFeature(feature => {
        //     const featurePro = feature.getProperties();
        //     const findIn = measureVectorFeatureArr.findIndex(mv => mv.id === featurePro.id)
        //     // console.log("findIn", findIn);
        //     if (findIn !== -1) {
        //       measureVectorFeatureArr.splice(findIn, 1, feature.getProperties());
        //     } else {
        //       measureVectorFeatureArr.push(feature.getProperties());
        //     }
        //   });
        // }
        // const uniqueIds = [...new Set(measureVectorFeatureArr.map(mv => mv.id))];
        // console.log("uniqueIds", uniqueIds);
        // uniqueIds.forEach(ui => {
        //   measureVectorFeatureArr = measureVectorFeatureArr.map((vm, index) => {
        //     if (vm.id)
        // })
        // })
      }

      const storeData = {
        vectorFeatures: vectorFeatureArr,
        // measureVectorFeatures: measureVectorFeatureArr,
        // measurementsToolTip,
        // measurementsSegmentsToolTip,
        measurements,
        showMeasurement,
        drawIds,
        measureDrawIds,
        overlays: overlayObj,
        featureId: this.featureId,
        counter,
        // isMeasure,
      };
      // console.log("storeData", storeData);
      this.props.dispatch(setStoreData(storeData));
    } catch(err) {
      // console.log("create store data err", err);
    }
  }

  createMeasureTooltip = () => {
    if (this.measureTooltipElement) {
      this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
      this.cMeasureTooltipElement.parentNode.removeChild(this.cMeasureTooltipElement);
    }
    this.measureTooltipElement = document.createElement('div');
    this.measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
    this.cMeasureTooltipElement = document.createElement('div');
    this.cMeasureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
    const overlayObj = {
      id: `draw-overlay-${this.featureId}`,
      element: this.measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center',
    };
    this.measureTooltip = new Overlay(overlayObj);
    this.overlays.push(this.measureTooltip);
    this.map.addOverlay(this.measureTooltip);

    this.cMeasureTooltip = new Overlay({ ...overlayObj, id: `c-draw-overlay-${this.featureId}`, element: this.cMeasureTooltipElement });
    this.overlays.push(this.cMeasureTooltip);
    this.compareMap.addOverlay(this.cMeasureTooltip);
  }

  styleFunction = (feature, drawType, tip) => {
    const { dispatch } = this.props;
    // const basepath = sessionStorage.getItem('basepath');
    // const translation = store(`${basepath}-translation`)
    const showSeg = dispatch(getshowSegmentLength());
    const featureId = feature.getProperties().id;
    const styles = [measureStyles];
    const geometry = feature.getGeometry();
    const type = geometry.getType();
    let
      point,
      label,
      line;
    if (!drawType || drawType === type) {
      if (type === 'Polygon') {
        point = geometry.getInteriorPoint();
        const area = getArea(geometry);
        label = measureArea(area);
        line = new LineString(geometry.getCoordinates()[0]);
      } else if (type === 'LineString') {
        point = new Point(geometry.getLastCoordinate());
        const length = getLength(geometry);
        label = measureLength(length);
        line = geometry;
      }
    }

    // segment tooltip
    if (showSeg && line) {
      let count = 0;
      if (featureId !== undefined) {
        var segmentTool = [];
      }
      line.forEachSegment(function (a, b) {
        const segment = new LineString([a, b]);
        const length = getLength(segment);
        const segmentLabel = measureLength(length);
        if (segmentStyles.length - 1 < count) {
          segmentStyles.push(segmentStyle.clone());
        }
        const segmentPoint = new Point(segment.getCoordinateAt(0.5));
        segmentStyles[count].setGeometry(segmentPoint);
        segmentStyles[count].getText().setText(segmentLabel);
        styles.push(segmentStyles[count]);
        if (featureId !== undefined) {
          segmentTool[count] = { innerHTML: segmentLabel, tipPosition: segmentPoint }
        }
        count++;
      });
    }
    // segment tooltip

    // label tooltip
    if (label) {
      labelStyle.setGeometry(point);
      labelStyle.getText().setText(label);
      labelStyle.setZIndex(800);
      styles.push(labelStyle);
      const geom = feature.getGeometry();
      let output;
      if (geom instanceof Polygon) {
        output = formatArea(getArea(geom));
        this.coordinates = geom.getInteriorPoint().getCoordinates();
      } else if (geom instanceof LineString) {
        output = lengthFunction(getLength(geom));
        this.coordinates = geom.getLastCoordinate();
      }
      // console.log("translation", translation);
      // console.log("translation[output.unit]", translation[output.unit]);
      // const measurement = `${output.value} ${translation[output.unit]}`;
      const measurement = areaOutput(output);
      // console.log("measurement", measurement);
      // if (featureId !== undefined) {
        this.measurementsToolTip[featureId] = { innerHTML: measurement, tipPosition: point }
      // }
      this.measurementsSegmentsToolTip[featureId] = segmentTool;
      // if (featureId !== undefined) {
      // this.measurementsToolTip = { ...this.measurementsToolTip, [featureId]: { innerHTML: measurement, tipPosition: point } }
      // // }
      // this.measurementsSegmentsToolTip = {
      //   ...this.measurementsSegmentsToolTip, [featureId]: segmentTool
      // };
      // console.log("this.measurementsToolTip", this.measurementsToolTip);
    }
    // label tooltip

    if (
      tip &&
      type === 'Point' &&
      !this.measureModify.getOverlay().getSource().getFeatures().length
    ) {
      this.tipPoint = geometry;
      tipStyle.getText().setText(tip);
      styles.push(tipStyle);
    }
    return styles;
  }

  //#region handle draw
  addMeasureInteractions = () => {
    const { translation } = this.props;
    let drawType = this.selectedShape;
    const activeTip = (drawType === 'Polygon' ? translation.continueMeasurePolygon : translation.continueMeasureLine);
    const idleTip = translation.startMeasure;
    let tip = idleTip;

    const measureDrawObj = {
      source: this.measureVectorSource,
      type: drawType,
      style: (feature) => {
        return this.styleFunction(feature, drawType, tip);
      }
    }

    this.measureDraw = new Draw(measureDrawObj);
    this.cMeasureDraw = new Draw(measureDrawObj);

    const measureDrawStart = MAP_TYPE => (e) => {
      if (self.measureallClear) {
        self.measureVectorSource.clear();
      }

      const feature = e.feature;
      const fProps = {
        id: self.featureId,
        shape: self.shape,
        isMeasurement: self.state.isMeasurement
      };
      self.measureModify.setActive(false);
      tip = activeTip;

      feature.setProperties({
        ...fProps,
        fill: self.fill,
        outline: self.outline
      });
      //#endregion
    };

    const measureDrawEnd = (e) => {
      self.measureDrawIds = [...self.measureDrawIds, self.featureId];
      self.showMeasurement = { ...self.showMeasurement, [self.featureId]: self.state.isMeasurement }
      self.featureId += 1;
      self.modifyStyle.setGeometry(self.tipPoint);
      self.measureModify.setActive(true);
      self.map.once('pointermove', function () {
        self.modifyStyle.setGeometry();
      });
      tip = idleTip;
      self.setState({ showMeasureClearAll: true, showClearAll: true });
      self.createStoreData(e.feature, 'measure');
    }

    const self = this;

    self.measureDraw.on('drawstart', measureDrawStart('MAP'));
    self.measureDraw.on('drawend', measureDrawEnd);
    self.cMeasureDraw.on('drawstart', measureDrawStart('COMPARE_MAP'));
    self.cMeasureDraw.on('drawend', measureDrawEnd);

    self.map.addInteraction(self.measureDraw);
    self.compareMap.addInteraction(self.cMeasureDraw);
  }
  //#endregion

  //#region update shape of drawing
  onShapeChange = (shape) => {
    this.props.dispatch(setDrawStyle(shape));
    this.selectedShape = shape;
    this.map.removeInteraction(this.draw);
    this.compareMap.removeInteraction(this.cDraw);
    this.map.removeInteraction(this.measureDraw);
    this.compareMap.removeInteraction(this.cMeasureDraw);
    if (shape) {
      this.shape = shape;
      this.addInteractions();
    }
  }
  //#endregion

  //#region update shape of measure
  onMeasureShapeChange = (shape) => {
    this.props.dispatch(setMeasureStyle(shape));
    this.selectedShape = shape;
    this.map.removeInteraction(this.draw);
    this.compareMap.removeInteraction(this.cDraw);
    this.map.removeInteraction(this.measureDraw);
    this.compareMap.removeInteraction(this.cMeasureDraw);
    if (shape) {
      this.shape = shape;
      this.addMeasureInteractions();
    }
  }
  //#endregion

  //#region on tab change create or edit
  onTabChange = (activeIndex) => {
    const { drawStyle, measureStyle, dispatch } = this.props;
    const drawingStoreData = dispatch(getStoreData());
    if (activeIndex === 0) {
      if (this.VectorSource.getFeatures().length > 0) {
        this.setState({
          selectedFeature: null,
          // activeTab: 0,
          isEdit: false,
          showEdit: true,
        })
      } else {
        this.setState({
          selectedFeature: null,
          // activeTab: 0,
          isEdit: false,
        });
      }
      this.activeTabIndex = 0;
      this.addInteractions();
      this.selectedShape = drawStyle;
      this.onShapeChange(drawStyle);
      this.denyModify();
      this.map.removeInteraction(this.select);
      this.compareMap.removeInteraction(this.cSelect);
      this.map.removeInteraction(this.measureDraw);
      this.compareMap.removeInteraction(this.cMeasureDraw);
      this.map.removeInteraction(this.measureModify);
      this.compareMap.removeInteraction(this.cMeasureModify);
      if (drawingStoreData) {
        drawingStoreData.isMeasure = false;
        this.props.dispatch(setStoreData(drawingStoreData));
      }
    } else if (activeIndex === 1) {
      this.activeTabIndex = 1;
      this.setState({
        selectedFeature: null,
        // activeTab: activeIndex
      });
      this.shape = measureStyle;
      this.onMeasureShapeChange(measureStyle);
      this.denyModify();
      this.map.removeInteraction(this.select);
      this.compareMap.removeInteraction(this.cSelect);
      this.map.removeInteraction(this.draw);
      this.compareMap.removeInteraction(this.cDraw);
      this.measureModify = new Modify({ source: this.measureVectorSource, style: this.modifyStyle });
      this.cMeasureModify = new Modify({ source: this.measureVectorSource, style: this.modifyStyle });
      this.map.addInteraction(this.measureModify);
      this.compareMap.addInteraction(this.cMeasureModify);
      if (drawingStoreData) {
        drawingStoreData.isMeasure = true;
        this.props.dispatch(setStoreData(drawingStoreData));
      }
    }
  }
  //#endregion

  //#region edit feature submit
  beforeSubmit = () => {
    this.map.removeInteraction(this.select);
    this.compareMap.removeInteraction(this.cSelect);
  }

  afterSubmit = (deleteVal=false) => {
    const drawingStoreData = this.props.dispatch(getStoreData());
    const selectedProperties = this.state.selectedFeature.getProperties();
    this.showMeasurement = { ...this.showMeasurement, [selectedProperties.id]: selectedProperties.isMeasurement }
    this.setState({
      selectedFeature: null,
      isEdit: !this.state.isEdit
    });
    if (!deleteVal) {
      const findIndexStoreData = drawingStoreData.vectorFeatures.findIndex(f => f.id === selectedProperties.id);
      const findTextFeature = drawingStoreData.vectorFeatures.find(f => f.id === selectedProperties.id);
      if (findTextFeature.shape === 'Text') {
        drawingStoreData.vectorFeatures[findIndexStoreData].fill = this.fill;
        drawingStoreData.vectorFeatures[findIndexStoreData].outline = this.outline;
        drawingStoreData.showMeasurement[selectedProperties.id] = selectedProperties.isMeasurement;
        drawingStoreData.vectorFeatures[findIndexStoreData].text = selectedProperties.text;
      } else {
        drawingStoreData.vectorFeatures[findIndexStoreData].fill = this.fill;
        drawingStoreData.vectorFeatures[findIndexStoreData].outline = this.outline;
        drawingStoreData.showMeasurement[selectedProperties.id] = selectedProperties.isMeasurement;
      }
      this.props.dispatch(setStoreData(drawingStoreData));
    }
    this.select.getFeatures().clear();
    this.cSelect.getFeatures().clear();
    this.denyModify();
    // this.map.addInteraction(this.select);
    // this.compareMap.addInteraction(this.cSelect);
    this.map.addInteraction(this.draw);
    this.compareMap.addInteraction(this.cDraw);
    unByKey(this.onEditShapeListner);
  }
  //#endregion

  //#region delete feature
  deleteFeature = (id) => {
    this.VectorSource.removeFeature(this.state.selectedFeature);
    this.beforeSubmit();
    this.afterSubmit(true);
    const drawingStoreData = this.props.dispatch(getStoreData());
    const findIndexStoreData = drawingStoreData.vectorFeatures.findIndex(f => f.id === id);
    drawingStoreData.vectorFeatures.splice(findIndexStoreData, 1);
    drawingStoreData.drawIds.splice(findIndexStoreData, 1);
    // drawingStoreData.showMeasurement.splice(findIndexStoreData, 1);
    delete drawingStoreData.showMeasurement[findIndexStoreData];
    delete drawingStoreData.measurements[id];
    this.props.dispatch(setStoreData(drawingStoreData));
    this.map.getLayers().forEach(layer => {
      if (layer && layer.get('name') === 'drawvectorlayer') {
        layer.getSource().removeFeature(this.state.selectedFeature);
      }
    })
    const el = document.getElementById(`area${id}`);
    const cel = document.getElementById(`c-area${id}`);
    if (el) { el.remove(); cel.remove(); }
    const remainingFeatures = this.VectorSource.getFeatures().length;
    if (remainingFeatures === 0 && drawingStoreData.vectorFeatures.length === 0) {
      this.setState({
        isEdit: false,
        showEdit: false,
      });
    }
    const remainingMeasure = this.measureVectorSource.getFeatures().length;
    if (remainingFeatures === 0 && remainingMeasure === 0 && drawingStoreData.vectorFeatures.length === 0 && drawingStoreData.measureVectorFeatures.length === 0) {
      this.setState({ showClearAll: false });
      this.props.dispatch(removeStoreData());
    }
  }

  deleteAllFeature = () => {
    const drawingdata = this.props.dispatch(getStoreData());
    this.VectorSource.clear();
    this.measureVectorSource.clear();
    this.measurements = {};
    this.overlays.map(o => {
      this.map.removeOverlay(o);
      return this.compareMap.removeOverlay(o);
    });
    Object.keys(drawingdata.overlays).forEach(o => {
      const element = document.getElementById(`area${o}`);
      if (element) {
        element.remove();
      }
    });
    // drawingdata.measureDrawIds.forEach(o => {
    //   const element = document.getElementById(`area${o}`);
    //   if (element) {
    //     element.remove();
    //   }
    // });
    this.overlays = [];
    this.setState({
      open: false,
      isEdit: false,
      showEdit: false,
      showClearAll: false,
      showMeasureClearAll: false
    });
    this.props.dispatch(removeStoreData());
  }
  //#endregion

  handleShowSegment = (val) => {
    this.showSegmentMeasure = val;
    this.measureVectorLayer.changed();
    this.measureCompareVectorLayer.changed();
  }

  handlePreviousClear = (val) => {
    this.measureallClear = val;
  }

  handleAllClear = () => {
    const drawingStoreData = this.props.dispatch(getStoreData());
    this.measureVectorSource.clear();
    const remainingFeatures = this.VectorSource.getFeatures().length;
    const remainingMeasure = this.measureVectorSource.getFeatures().length;
    if (drawingStoreData) {
      // drawingStoreData.measureVectorFeatures = [];
      // drawingStoreData.measureDrawIds = [];
      // drawingStoreData.measurementsToolTip = {};
      // drawingStoreData.measurementsSegmentsToolTip = {};
      // drawingStoreData.clearAll = true;
      // this.props.dispatch(setStoreData(drawingStoreData));
      // drawingStoreData.clearAll = false;
      // drawingStoreData.measureDrawIds = [];
      // this.props.dispatch(setStoreData(drawingStoreData));
      if (drawingStoreData.vectorFeatures.length === 0 &&
        // drawingStoreData.measureVectorFeatures.length === 0
        remainingMeasure === 0
      ) {
        this.setState({ showClearAll: false });
        // drawingStoreData.featureId = 1;
        // this.props.dispatch(setStoreData(drawingStoreData));
        this.featureId = 1;
      } else if (drawingStoreData.vectorFeatures.length === 0) {
        this.setState({
          isEdit: false,
          showEdit: false,
        });
      }
    } else {
      if (remainingFeatures === 0 && remainingMeasure === 0) {
        this.setState({ showClearAll: false });
        // drawingStoreData.featureId = 1;
        // this.props.dispatch(setStoreData(drawingStoreData));
        this.featureId = 1;
      } else if (remainingFeatures === 0) {
        this.setState({
          isEdit: false,
          showEdit: false,
        });
      }
    }
    this.setState({ showMeasureClearAll: false });
  }

  handleEditClick = () => {
    this.setState({ isEdit: true })
    this.map.addInteraction(this.select);
    this.compareMap.addInteraction(this.cSelect);
    this.map.removeInteraction(this.draw);
    this.compareMap.removeInteraction(this.cDraw);
    this.map.removeInteraction(this.measureDraw);
    this.compareMap.removeInteraction(this.cMeasureDraw);
  }

  handleCloseButton = () => {
    this.onTabChange(0);
  }

  handleGeoJsonDownload = () => {
    try {
      const { projection } = this.props;
      const drawingStoreData = this.props.dispatch(getStoreData());
      var writer = new GeoJSON();
      var drawGeom = [];
      var measureGeom = [];
      let circleArr = [];
      drawingStoreData && drawingStoreData.vectorFeatures.forEach(vFeature => {
        let circleFeature = '[[';
        if (vFeature.shape === 'Text') {
          const flatCordinates = vFeature.geometry.flatCoordinates;
          const transformCordinates = transCordinates(flatCordinates, 'EPSG:4326', projection);
          const pushObject = {
            type: 'Point',
            circleFeature: `[${transformCordinates}]`,
            properties: {
              text: vFeature.text.text
            }
          }
          circleArr.push(pushObject);
        } else if (vFeature.shape === 'Point') {
          const flatCordinates = vFeature.geometry.flatCoordinates;
          const transformCordinates = transCordinates(flatCordinates, 'EPSG:4326', projection);
          const pushObject = {
            type: 'Point',
            circleFeature: `[${transformCordinates}]`,
            properties: null
          }
          circleArr.push(pushObject);
        } else if (vFeature.shape === 'Circle') {
          const flatCordinates = vFeature.geometry.flatCoordinates;
          const from = point(toLonLat([flatCordinates[0], flatCordinates[1]]), projection);
          const to = point(toLonLat([flatCordinates[2], flatCordinates[3]]), projection);
          const options = { units: "kilometers" };
          const dist = distance(from, to, options);
          var coordinates = toLonLat([flatCordinates[0], flatCordinates[1]], projection);
          var radius = dist;

          var circleOptions = {
            units: "kilometers",
          };
          var polygon = circle(coordinates, radius, circleOptions);
          polygon.geometry.coordinates.forEach(a => a.forEach(b => {
            if (circleFeature.slice(-1) === '[') {
              circleFeature = circleFeature + `[${b}]`;
            } else {
              circleFeature = circleFeature + `,[${b}]`;
            }
          }));
          circleFeature = circleFeature + "]]";
          const pushObject = {
            type: 'Polygon',
            circleFeature,
            properties: null
          }
          circleArr.push(pushObject);
        } else if (vFeature.shape === 'LineString') {
          let LineStringAStr = '[';
          const newArray = vFeature.geometry.flatCoordinates.reduce(function (
            coordinates,
            coordinate,
            i
          ) {
            if (i % 2 === 0) {
              coordinates.push([coordinate, vFeature.geometry.flatCoordinates[i + 1]]);
            }
            return coordinates;
          }, []);
          const cordinates = newArray.map(cordArr => {
            return transCordinates(cordArr, 'EPSG:4326', projection);
          });

          cordinates.forEach(cord => {
            if (LineStringAStr.slice(-1) === '[') {
              LineStringAStr = LineStringAStr + `[${cord}]`;
            } else {
              LineStringAStr = LineStringAStr + `,[${cord}]`;
            }
          })
          LineStringAStr = LineStringAStr + "]";
          const pushObject = {
            type: vFeature.shape,
            circleFeature: LineStringAStr,
            properties: null
          }
          circleArr.push(pushObject);
        } else {
          const newArray = vFeature.geometry.flatCoordinates.reduce(function (
            coordinates,
            coordinate,
            i
          ) {
            if (i % 2 === 0) {
              coordinates.push([coordinate, vFeature.geometry.flatCoordinates[i + 1]]);
            }
            return coordinates;
          }, []);

          const cordinates = newArray.map(cordArr => {
            return transCordinates(cordArr, 'EPSG:4326', projection);
          });

          cordinates.forEach(cord => {
            if (circleFeature.slice(-1) === '[') {
              circleFeature = circleFeature + `[${cord}]`;
            } else {
              circleFeature = circleFeature + `,[${cord}]`;
            }
          })
          circleFeature = circleFeature + "]]";
          const pushObject = {
            type: 'Polygon',
            circleFeature,
            properties: null
          }
          circleArr.push(pushObject);
        }
      })
      // this.VectorSource.forEachFeature(function (feature) {
      //   if (feature.getProperties().shape === 'Text') {
      //     return;
      //   } else if (feature.getProperties().shape === 'Circle') {
      //     const flatCordinates = feature.getGeometry().flatCoordinates;
      //     const from = point(toLonLat([flatCordinates[0], flatCordinates[1]]), projection);
      //     const to = point(toLonLat([flatCordinates[2], flatCordinates[3]]), projection);
      //     const options = { units: "kilometers" };
      //     const dist = distance(from, to, options);
      //     var coordinates = toLonLat([flatCordinates[0], flatCordinates[1]], projection);
      //     var radius = dist;

      //     var circleOptions = {
      //       units: "kilometers",
      //     };
      //     var polygon = circle(coordinates, radius, circleOptions);
      //     polygon.geometry.coordinates.forEach(a => a.forEach(b => {
      //       if (circleFeature.slice(-1) === '[') {
      //         circleFeature = circleFeature + `[${b}]`;
      //       } else {
      //         circleFeature = circleFeature + `,[${b}]`;
      //       }
      //     }));
      //     circleFeature = circleFeature + "]]";
      //     circleArr.push(circleFeature);
      //   } else {
      //     drawGeom.push(new Feature(feature.getGeometry().clone().transform(`${projection}`, 'EPSG:4326')));
      //   }
      // });
      var geoJsonStr = writer.writeFeatures(drawGeom);

      this.measureVectorSource.forEachFeature(function (feature) {
        measureGeom.push(new Feature(feature.getGeometry().clone().transform(`${projection}`, 'EPSG:4326')));
      });
      var measureGeoJsonStr = writer.writeFeatures(measureGeom);

      let geoJsonObj;

      const firstObj = JSON.parse(geoJsonStr);
      const secObj = JSON.parse(measureGeoJsonStr);

      if (circleArr.length > 0) {
        circleArr.forEach(circleGeo => {
          const circleObject = { type: "Feature", geometry: { type: circleGeo.type, coordinates: JSON.parse(circleGeo.circleFeature) }, properties: circleGeo.properties }
          firstObj.features.push(circleObject);
        });
      }

      if (firstObj.features.length > 0 && secObj.features.length > 0) {
        firstObj.features.push(secObj.features[0])
        geoJsonObj = JSON.stringify(firstObj);
      } else if (firstObj.features.length > 0) {
        geoJsonObj = JSON.stringify(firstObj);
      } else if (secObj.features.length > 0) {
        geoJsonObj = measureGeoJsonStr;
      }

      const jsonStr = JSON.stringify(geoJsonObj).replaceAll(/\\/g, '');
      
      // download json string as a file
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/json;charset=utf-8,' + jsonStr.substring(1, jsonStr.length - 1));
      element.setAttribute('download', "Up_Export.geojson");
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      //#endregion
    } catch(err) {
      console.log("err", err);
    }
  }

  render() {
    const {
      direction,
      translation
    } = this.props;
    const { outline, fill, selectedFeature, isMeasurement, open, isEdit, showEdit, showMeasureClearAll, showClearAll } = this.state;
    if (!outline) { return false; }
    const panes = [
      {
        menuItem: { icon: <Svg name="drawtab" />, content: translation.create, key: "drawtab" },
        // menuItem: translation.create,
        render: () => <Tab.Pane key="create" attached={false}>
          <Create
            defaultActiveIndex={SHAPES[this.shape].index}
            onShapeChange={this.onShapeChange}
            updateStyle={this.updateStyle}
            outline={outline}
            fill={fill}
            isMeasurement={isMeasurement}
            toggleMeasurement={val => this.setState({ isMeasurement: val })}
            text={this.text}
            updateTextStyle={this.updateTextStyle}
            onEditClick={this.handleEditClick}
            selectFeature={this.selectFeature}
            selectedFeature={selectedFeature}
            allowModify={this.allowModify}
            beforeSubmit={this.beforeSubmit}
            afterSubmit={this.afterSubmit}
            deleteFeature={this.deleteFeature}
            isEdit={isEdit}
            showEdit={showEdit}
            drawids={this.drawIds}
            measureDrawIds={this.measureDrawIds}
            handleBackButton={this.handleCloseButton}
          />
        </Tab.Pane>,
      },
      {
        menuItem: { icon: <Svg name="measuretab" />, content: translation.measure, key: "measuretab" },
        // menuItem: translation.measure,
        render: () => <Tab.Pane
          key="measure"
          attached={false}
          className="editMeasure"
        >
          <Measure
            defaultActiveIndex={SHAPES[this.shape].index}
            onMeasureShapeChange={this.onMeasureShapeChange}
            isMeasurement={isMeasurement}
            toggleMeasurement={val => this.setState({ isMeasurement: val })}
            showSegment={this.handleShowSegment}
            clearPrevious={this.handlePreviousClear}
            clearAll={this.handleAllClear}
            showMeasureClearAll={showMeasureClearAll}
            // handleGeoJsonDownload={this.handleGeoJsonDownload}
          />
        </Tab.Pane>,
      },
    ]

    return (
      <Block className="drawShapes">
        <Block className="headSearch searchLayers d-flex justify-content-center align-item-center justify-space-between">
          <Block className="titleText d-flex align-items-center headertext-draw">
            <Block className="deleteIcon">
              {showClearAll && <Button onClick={() => this.setState({ open: true })} className="btn-none pl-1" data-tooltip={translation.clearalldraw} data-position={`${direction === 'RTL' ? 'left' : 'right'} center`}>
                <Svg name="trashred" />
              </Button>}
            </Block>
            {showClearAll && <Button
              className="btn-none pl-1 btn-export-draw"
              data-tooltip={translation.exportgeolayer}
              data-position={`${direction === 'RTL' ? 'left' : 'right'} center`}
              onClick={this.handleGeoJsonDownload}
            >
              <Svg name="export" />
            </Button>}
          </Block>
          <Block className="titleText d-flex align-items-center headertext-drawing">
            <h4 className="font-weight-medium mb-0">
              {translation.draw}
            </h4>
            <Button className="module-info-toc module-info-toc-header d-flex justify-content-end cursor-pointer btn-none" data-tooltip={translation.drawhedaer} data-position="bottom center">
              <Svg name="info-module" />
            </Button>
          </Block>
          <Block className="closeIcon">
            <Svg className="close-new" name="close-new" />
          </Block>
        </Block>

        <Block className="drawTabs-block">
          <Tab
            menu={{ secondary: true, pointing: true }}
            panes={panes}
            className="drawingTabFirst"
            onTabChange={(e, { activeIndex }) => this.onTabChange(activeIndex)}
            activeIndex={this.activeTabIndex}
          // activeIndex={activeTab}
          />
        </Block>
        <Modal id="CancelPopup" className="CancelPopup"
          closeIcon
          open={open}
          size="mini"
          onClose={(e) => this.setOpen(e, false)}
        >
          {/* <Modal.Header>{translation.confirm}</Modal.Header> */}
          <Modal.Content>
            <Block className="warningIcon"><Svg name="delete-info" /></Block>
            <p><strong>{translation.confirmDelete}</strong></p>
            <p>{translation.confirmDeleteMessage}</p>
            {/* <Checkbox onChange={this.handleDontShowAgain} label={translation.dontShowAgain} /> */}
            <Block className="buttonsCol editButtons">
              <Button onClick={this.deleteAllFeature} className="btn submitbtn">{translation.submit}</Button>
              <Button onClick={() => this.setState({ open: false })} className="btn eraserbtn">{translation.cancel}</Button>
            </Block>
          </Modal.Content>
        </Modal>
      </Block>
    )
  }
}

export default connect(
  state => ({
    map: state.map.map,
    compareMap: state.map.compareMap,
    drawingData: state.drawing.data,
    translation: state.translation.translation,
    language: state.translation.language,
    selectedUnitType: state.settings.selectedUnitType,
    // selectedDistanceUnit: state.settings.selectedDistanceUnit,
    // selectedAreaUnit: state.settings.selectedAreaUnit,
    direction: state.translation.direction,
    drawStyle: state.drawing.drawType,
    measureStyle: state.drawing.measureType,
    showSegmentLength: state.drawing.showSegmentLength,
    clearPreviousMeasure: state.drawing.clearPreviousMeasure,
    projection: state.map.projection
  })
)(DrawingFunctionality);

