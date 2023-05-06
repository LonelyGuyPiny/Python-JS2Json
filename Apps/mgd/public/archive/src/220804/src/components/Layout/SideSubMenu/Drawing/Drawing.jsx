import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Tab, Modal } from 'semantic-ui-react';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';
import { Draw, Modify, Select } from 'ol/interaction';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { shiftKeyOnly } from 'ol/events/condition';
import { createBox } from 'ol/interaction/Draw';
import { LineString, Polygon, Circle } from 'ol/geom';
import { unByKey } from 'ol/Observable';
import Overlay from 'ol/Overlay';
import { getArea, getLength } from 'ol/sphere';

import { Create } from './';
import { EditDrawing } from './';
import { Block, Svg } from '../../../';
import { SHAPES } from '../../../../constants/drawing';
import { formatArea, lengthFunction, circleMeasurement } from '../../../../utils/drawing';
import { setDwaingLayer, setDraingState } from '../../../../redux/modules/drawing';
import { setMap } from '../../../../redux/modules/map';

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
      this.selectedShape = SHAPES.Point.name;
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
  //#endregion

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

    this.map.addLayer(this.vectorLayer);
    this.compareMap.addLayer(this.compareVectorLayer);
    this.addInteractions();
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
        self.text = {...self.text, textValue}
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

      //#region  get measurements
      self.coordinates = e.coordinate;
      self.measurement = null;
      listener = feature.getGeometry().on('change', function (evt) {
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

    const drawEnd = (e) => {
      self.showMeasurement = {...self.showMeasurement, [self.featureId]: self.state.isMeasurement}
      self.measureTooltipElement.style.display = self.state.isMeasurement ? 'block' : 'none';
      self.cMeasureTooltipElement.style.display = self.state.isMeasurement ? 'block' : 'none';

      self.featureId += 1;
      self.measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
      self.measureTooltip.setOffset([0, -7]);
      self.measureTooltipElement = null;
      self.cMeasureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
      self.cMeasureTooltip.setOffset([0, -7]);
      self.cMeasureTooltipElement = null;
      self.createMeasureTooltip();
      unByKey(listener);
    }

    this.createMeasureTooltip();

    // create feature unique id
    const self = this;
    let listener = null;
    this.draw.on('drawstart', drawStart('MAP'));
    this.draw.on('drawend', drawEnd);
    this.cDraw.on('drawstart', drawStart('COMPARE_MAP'));
    this.cDraw.on('drawend', drawEnd);

    this.map.addInteraction(this.draw);
    this.compareMap.addInteraction(this.cDraw);
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
  //#endregion

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

  //#region on tab change create or edit
  onTabChange = (activeIndex) => {
    if (activeIndex === 0) {
      this.setState({
        selectedFeature: null,
        activeTab: 0
      });
      this.onShapeChange(this.shape);
      this.denyModify();
      this.map.removeInteraction(this.select);
      this.compareMap.removeInteraction(this.cSelect);
    } else {
      this.setState({ activeTab: 1 });
      this.onShapeChange(null);
      this.map.addInteraction(this.select);
      this.compareMap.addInteraction(this.cSelect);
    }
  }
  //#endregion

  //#region edit feature submit
  beforeSubmit = () => {
    this.map.removeInteraction(this.select);
    this.compareMap.removeInteraction(this.cSelect);
  }

  afterSubmit = () => {
    const selectedProperties = this.state.selectedFeature.getProperties();
    this.showMeasurement = {...this.showMeasurement, [selectedProperties.id]: selectedProperties.isMeasurement}
    this.setState({
      selectedFeature: null
    });
    this.select.getFeatures().clear();
    this.cSelect.getFeatures().clear();
    this.denyModify();
    this.map.addInteraction(this.select);
    this.compareMap.addInteraction(this.cSelect);
    unByKey(this.onEditShapeListner);
  }
  //#endregion

  //#region delete feature
  deleteFeature = (id) => {
    this.VectorSource.removeFeature(this.state.selectedFeature);
    this.beforeSubmit();
    this.afterSubmit();
    const el = document.getElementById(`area${id}`);
    const cel = document.getElementById(`c-area${id}`);
    if (el) { el.remove(); cel.remove(); }
    if (this.VectorSource.getFeatures().length === 0) {
      this.onTabChange(0);
    }
  }

  deleteAllFeature = () => {
    this.VectorSource.clear();
    this.measurements = {};
    this.overlays.map(o => {
      this.map.removeOverlay(o);
      return this.compareMap.removeOverlay(o);
    });
    this.overlays = [];
    this.setState({
      open: false
    });
    this.onTabChange(0);
  }
  //#endregion

  render() {
    const { direction } = this.props;
    const { outline, fill, selectedFeature, isMeasurement, open, activeTab } = this.state;
    if (!outline) { return false; }
    const { translation } = this.props;
    const panes = [
      {
        menuItem: translation.create,
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
          />
        </Tab.Pane>,
      },
      {
        menuItem: translation.edit,
        render: () => <Tab.Pane
          key="edit"
          attached={false}
          className="editDrawing"
        >
          <EditDrawing
            selectFeature={this.selectFeature}
            selectedFeature={selectedFeature}
            allowModify={this.allowModify}
            beforeSubmit={this.beforeSubmit}
            afterSubmit={this.afterSubmit}
            updateStyle={this.updateStyle}
            deleteFeature={this.deleteFeature}
          />
        </Tab.Pane>,
      },
    ]

    return (
      <Block className="drawShapes">
        <Block className="headSearch searchLayers d-flex justify-content-center align-item-center justify-space-between">
          <Block className="deleteIcon">
            <Button onClick={() => this.setState({ open: true })} className="btn-none pl-1" data-tooltip={translation.clearalldraw} data-position={`${direction === 'RTL' ? 'left' : 'right'} center`}>
              <Svg name="trashred" />
            </Button>
            {/* <Button className="btn-none pl-1" onClick={this.handleClearAllFilters} data-tooltip={translation.clearAllFilters} data-position="right center">
              <Svg name="trashred" />
            </Button> */}
          </Block>
          <Block className="titleText d-flex align-items-center">
            <h4 className="font-weight-medium mb-0">
              {translation.drawing}
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
            activeIndex={activeTab}
          />
        </Block>
        <Modal id="CancelPopup" className="CancelPopup"
          closeIcon
          open={open}
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
    selectedDistanceUnit: state.settings.selectedDistanceUnit,
    selectedAreaUnit: state.settings.selectedAreaUnit,
    direction: state.translation.direction
  })
)(DrawingFunctionality);

