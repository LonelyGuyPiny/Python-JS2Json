import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Block, ColorPicker } from '../../../';
import { connect } from "react-redux";

import { LayersTransparencyBar } from '../Layers';
import Size from './Size';

class Outline extends Component {
  constructor(props) {
    super(props);
    const { outline } = props;
    this.size = outline.size;
    this.color = outline.color;
    this.opacity = outline.opacity;
    this.state = {
      outline: {
        size: this.size,
        color: this.color,
        opacity: this.opacity,
      }
    }
  }

  UNSAFE_componentWillReceiveProps({ outline }) {
    if (outline.color !== this.color) {
      this.onColorChange({ rgb: outline.color });
    }
    if (outline.opacity !== this.opacity) {
      this.handleOpacity(outline.opacity);
    }
    if (outline.size !== this.size) {
      this.updateSize(outline.size);
    }
  }

  updateSize = (size) => {
    this.size = size;
    const outline = {
      size: this.size,
      color: this.color,
      opacity: this.opacity,
    }
    this.props.updateOutline(outline);
    this.setState({ outline });
  }

  onColorChange = ({ rgb }) => {
    this.color = rgb;
    const outline = {
      size: this.size,
      color: this.color,
      opacity: this.opacity,
    }
    this.props.updateOutline(outline);
    this.setState({ outline });
  }

  handleOpacity = (opacity) => {
    this.opacity = opacity;
    const outline = {
      size: this.size,
      color: this.color,
      opacity: this.opacity,
    }
    this.props.updateOutline(outline);
    this.setState({ outline });
  }


  render() {
    const { size, color, opacity } = this.state.outline;
    const { translation } = this.props;
    return (
      <Block className="drawShapes">
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
      </Block>
    )
  }
}

export default connect(
  state => ({
    translation: state.translation.translation
  })
)(Outline);