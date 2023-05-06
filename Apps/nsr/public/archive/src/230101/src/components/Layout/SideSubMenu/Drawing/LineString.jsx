import React, { Component } from 'react';
import { Button, Radio } from 'semantic-ui-react';
import { connect } from "react-redux";

import { Size } from './';
import { Block, Svg, ColorPicker } from '../../../';
import { LayersTransparencyBar } from '../Layers';
// import { SketchPicker } from 'react-color';

class LineString extends Component {
  constructor(props) {
    super(props);
    this.size = props.outline.size;
    this.color = props.outline.color;
    this.opacity = props.outline.opacity;
    this.state = {
      outline: {
        size: this.size,
        color: this.color,
        opacity: this.opacity,
      }
    }
  }

  updateSize = (size) => {
    this.size = size;
    const outline = {
      size: this.size,
      color: this.color,
      opacity: this.opacity,
    }
    this.props.updateStyle(outline);
    this.setState({ outline });
  }

  onColorChange = ({ rgb }) => {
    this.color = rgb;
    const outline = {
      size: this.size,
      color: this.color,
      opacity: this.opacity,
    }
    this.props.updateStyle(outline);
    this.setState({ outline });
  }

  handleOpacity = (opacity) => {
    this.opacity = opacity;
    const outline = {
      size: this.size,
      color: this.color,
      opacity: this.opacity,
    }
    this.props.updateStyle(outline);
    this.setState({ outline });
  }

  render() {
    const { size, color, opacity } = this.state.outline;
    const { isMeasurement, toggleMeasurement, translation } = this.props;
    return (
      <Block className="drawShapes">
        <Block className="d-flex justify-space-between titlehead0 title-head-bg-drawing">
          <p className="font-weight-medium">{translation.drawSettings}</p>
          <Block className="d-flex justify-space-between measurement">
            <label>{translation.showMeasurements}</label>
            <Block className="switch">
              <Radio
                toggle
                checked={isMeasurement}
                onChange={(e, { checked }) => toggleMeasurement(checked)}
              />
            </Block>
            {/* <ToggleBasemap /> */}
          </Block>
        </Block>

        <Block className="d-flex justify-space-between shapes-block size mt-2">
          <Block className="label">
            <p className="font-weight-medium">{translation.size}</p>
          </Block>
          <Block>
            <Size
              placeholder="10px"
              onChange={this.updateSize}
              value={size}
            />
          </Block>
        </Block>
        <Block className="d-flex justify-space-between shapes-block color mt-2">
          <Block className="label">
            <p className="font-weight-medium">{translation.color}</p>
          </Block>
          <Block className="field colorPicker">
            <ColorPicker color={color} onChange={this.onColorChange} />
          </Block>
        </Block>
        <Block className="d-flex justify-space-between shapes-block opacity mt-2">
          <Block className="label">
            <p className="font-weight-medium">{translation.opacity}</p>
          </Block>

          <Block className="rangeSliderBlock">
            <LayersTransparencyBar
              valueNow={this.handleOpacity}
              defaultValue={opacity}
              value={opacity}
            />
            <Button className="eye open">{(opacity * 100).toFixed(0)}%</Button>
          </Block>
        </Block>

        <Block className="previewBox">
          <Block className="previewImage lineString">
            {/* <Svg name="PreviewLineString" /> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="148.707" height="148.707" viewBox="0 0 148.707 148.707">
              <line id="Line_4" data-name="Line 4" x2="148" y2="148" transform="translate(0.354 0.354)" fill="none" stroke={`rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`} strokeWidth={size} />
            </svg>
          </Block>
          <Block className="previewText">{translation.preview}</Block>
        </Block>

        <Block className="ui info message"><Svg name="MessageInfoIcon" /><span>{translation.toFreeHand} <code>Shift</code> {translation.toFreeHandDrawing}.</span></Block>
      </Block>
    )
  }
}

export default connect(
  state => ({
    translation: state.translation.translation
  })
)(LineString);