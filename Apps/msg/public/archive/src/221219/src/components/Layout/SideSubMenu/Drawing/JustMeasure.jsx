import React, { Component } from 'react';
import { Button, Tab } from 'semantic-ui-react';
import { connect } from "react-redux";

import { Circle as CircleStyle, Fill, Stroke, Style, Text, RegularShape } from 'ol/style';
import { Draw, Modify, Select } from 'ol/interaction';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { shiftKeyOnly } from 'ol/events/condition';
import { createBox } from 'ol/interaction/Draw';
import { LineString as Line, Polygon as Poly, Circle } from 'ol/geom';
import { unByKey } from 'ol/Observable';
import Overlay from 'ol/Overlay';
import { getArea, getLength } from 'ol/sphere';

import { Block, Svg } from '../../../';
import { LineString, Polygon } from './';
import { JUST_MEASURE, JUST_MEASURE_INDEX } from '../../../../constants/drawing';
import { formatArea, lengthFunction, circleMeasurement } from '../../../../utils/drawing';
import { setDwaingLayer, setDraingState } from '../../../../redux/modules/drawing';
import { setMap } from '../../../../redux/modules/map';

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

const modifyStyle = new Style({
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
    text: 'Drag to modify',
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

class Measure extends Component {
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
        open: false
      };
      this.showMeasurement = drawingData.showMeasurement;
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
        activeTab: 0,
        open: false
      };
    }
  }

  componentDidMount = () => {
    const data = this.props.drawingData;
    if (!data) {
      this.createVectorLayer();
    }
    this.selectFeature();
    this.updateStyle(this.outline, this.fill);
    this.updateTextStyle(this.text);
    this.props.dispatch(setDraingState(true));
  }

  componentWillUnmount = () => {
    const data = {
      VectorSource: this.VectorSource,
      VectorLayer: this.vectorLayer,
      compareVectorLayer: this.compareVectorLayer,
      selectedShape: this.selectedShape,
      shape: this.shape,
      draw: this.draw,
      cDraw: this.cDraw,
      style: this.style,
      featureId: this.featureId,
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
      showMeasurement: this.showMeasurement
    };
    // console.log('data', data);
    this.props.dispatch(setDwaingLayer(data));
    this.props.dispatch(setMap(this.map));
    this.props.dispatch(setDraingState(false));
    this.onShapeChange(null);
    if (this.state.activeTab === 1) {
      this.denyModify();
      this.map.removeInteraction(this.select);
      this.compareMap.removeInteraction(this.cSelect);
    }
  }

  setDefaultValues = (data) => {
    if (data && data.VectorSource) {
      this.VectorSource = data.VectorSource;
      this.vectorLayer = data.VectorLayer;
      this.compareVectorLayer = data.compareVectorLayer;
      this.selectedShape = data.selectedShape;
      this.shape = data.shape;
      this.draw = data.draw;
      this.cDraw = data.cDraw;
      this.style = data.style;
      this.featureId = data.featureId;
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
    } else {
      this.VectorSource = new VectorSource();
      this.vectorLayer = null;
      this.compareVectorLayer = null;
      this.selectedShape = JUST_MEASURE.LineString.name;
      this.shape = 'Point';
      this.draw = null;
      this.cDraw = null;
      this.style = null;
      this.featureId = 1;
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
    }
    this.onEditShapeListner = null;
    this.modify = null;
    this.cModify = null;
    this.map = this.props.map;
    this.compareMap = this.props.compareMap;
    return this;
  }

  //#region select shape
  selectFeature = () => {
    const self = this;

    const select = (MAP_TYPE) => (e) => {
      if (e.selected.length > 0) {
        const feature = e.selected[0];
        const featureId = feature.getProperties().id;
        if (featureId) {
          self.setState({
            selectedFeature: feature
          });
          //#region on edit shape update measurement
          const measureTooltip = self.map.getOverlayById(`draw-overlay-${featureId}`);
          const cMeasureTooltip = self.compareMap.getOverlayById(`c-draw-overlay-${featureId}`);
          const measureTooltipElement = document.getElementById(`area${featureId}`);
          const cMeasureTooltipElement = document.getElementById(`c-area${featureId}`);
          self.onEditShapeListner = feature.getGeometry().on('change', function (evt) {
            const geom = evt.target;
            const { selectedUnitType } = self.props;
            let output;
            if (geom instanceof Polygon) {
              output = formatArea(getArea(geom), selectedUnitType);
              self.coordinates = geom.getInteriorPoint().getCoordinates();
            } else if (geom instanceof LineString) {
              output = lengthFunction(getLength(geom), selectedUnitType);
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
          });
          //#endregion
        }
      }
    }
    this.select.on('select', select('MAP'));
    this.cSelect.on('select', select('COMPARE_MAP'));
  }

  //#region update shape of drawing
  onShapeChange = (shape) => {
    this.selectedShape = shape;
    this.map.removeInteraction(this.draw);
    this.compareMap.removeInteraction(this.cDraw);
    if (shape) {
      this.shape = shape;
      this.addInteractions();
    }
  }
  //#endregion

  render() {
    const { updateStyle, outline, fill, defaultActiveIndex, isMeasurement, toggleMeasurement, translation } = this.props;
    // onShapeChange

    const panes2 = [
      {
        menuItem: <Button key="JustLineString" className="background-grey mr-1 btn-sm" data-tooltip={translation.line} data-position="bottom left">
          <Svg name="Line" />
        </Button>,
        render: () => <Tab.Pane attached={false}>
          <LineString
            updateStyle={updateStyle}
            outline={outline}
            fill={fill}
            isMeasurement={isMeasurement}
            toggleMeasurement={toggleMeasurement}
          />
        </Tab.Pane>,
      },
      {
        menuItem: <Button key="JustPolygon" className="background-grey mr-1 btn-sm" data-tooltip={translation.Polygon} data-position="bottom left">
          <Svg name="Polygon" />
        </Button>,
        render: () => <Tab.Pane attached={false}>
          <Polygon
            updateStyle={updateStyle}
            outline={outline}
            fill={fill}
            isMeasurement={isMeasurement}
            toggleMeasurement={toggleMeasurement}
          />
        </Tab.Pane>,
      },
    ]

    return (
      <Block className="drawShapes">
        <Block className="ui segment active tab">
          <Block className="d-flex justify-space-between titlehead0 title-head-bg-drawing">
            <p className="font-weight-medium">{translation.selectDrawStyle}</p>
          </Block>
          <Tab
            menu={{ secondary: true, pointing: true }}
            panes={panes2}
            className="drawingTabSecond drawing-parent"
            onTabChange={(e, { activeIndex }) => this.onShapeChange(JUST_MEASURE_INDEX[activeIndex])}
            defaultActiveIndex={defaultActiveIndex}
          />
        </Block>
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
    selectedDistanceUnit: state.settings.selectedDistanceUnit,
    selectedAreaUnit: state.settings.selectedAreaUnit,
    direction: state.translation.direction
  })
)(Measure);