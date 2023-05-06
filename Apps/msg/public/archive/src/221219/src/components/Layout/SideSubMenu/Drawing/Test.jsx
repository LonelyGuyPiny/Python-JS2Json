import React from 'react';
import { connect } from "react-redux";
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Draw, Modify, Snap } from 'ol/interaction';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { createBox } from 'ol/interaction/Draw';

const shapes = {
  Point: 'Point',
  LineString: 'LineString',
  Polygon: 'Polygon',
  Circle: 'Circle',
  Box: 'Box',
}

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.VectorSource = new VectorSource();
    this.selectedShape = shapes.Point;
    this.draw = null;
    this.snap = null;
    this.map = this.props.map;
  }

  componentDidMount = () => {
    this.createVectorLayer();
  }

  createVectorLayer = () => {
    this.VectorLayer = new VectorLayer({
      source: this.VectorSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    });

    this.map.addLayer(this.VectorLayer);
    this.modify = new Modify({ source: this.VectorSource });
    
    this.map.addInteraction(this.modify);
    this.addInteractions();
  }

  addInteractions = () => {
    let type = this.selectedShape;
    let geometryFunction;
    if (type === shapes.Box) {
      type = shapes.Circle;
      geometryFunction = createBox();
    }

    this.draw = new Draw({
      source: this.VectorSource,
      type: type,
      geometryFunction
    });
    
    this.map.addInteraction(this.draw);
    this.snap = new Snap({ source: this.VectorSource });
    this.map.addInteraction(this.snap);
  }

  onShapeChange = (e) => {
    this.selectedShape = e.target.value;
    this.map.removeInteraction(this.draw);
    this.map.removeInteraction(this.snap);
    this.addInteractions();
  }

  render() {
    return (
      <div>
        <div>
          <select onChange={this.onShapeChange}>
            {Object.keys(shapes).map(shape => (<option key={shape} value={shape}>{shape}</option>))}
          </select>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    map: state.map.map,
    translation: state.translation.translation,
    language: state.translation.language,
    selectedUnitType: state.settings.selectedUnitType,
    selectedDistanceUnit: state.settings.selectedDistanceUnit,
    selectedAreaUnit: state.settings.selectedAreaUnit,
  })
)(Test);