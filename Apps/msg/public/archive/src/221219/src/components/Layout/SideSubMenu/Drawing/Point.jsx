import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from "react-redux";

import { Block, ColorPicker } from '../../../';
import { Size } from './';
import { LayersTransparencyBar } from '../Layers';

class Point extends Component {
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
    const { translation } = this.props;
    return (
      <Block className="drawShapes">
        <Block className="d-flex justify-space-between titlehead0 title-head-bg-drawing">
          <p className="font-weight-medium">{translation.drawSettings}</p>
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
          <Block className="previewImage">
            {/* <Svg name="Point" /> */}
            <span style={{
              width: `${Number(size) * 2}px`,
              height: `${Number(size) * 2}px`,
              borderRadius: '50%',
              backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
              opacity,
              display: 'block'
            }} />
          </Block>
          <Block className="previewText">{translation.preview}</Block>
        </Block>

        {/* <Block class="ui info message">Loaders are hidden unless has prop <code>active</code> or inside an <code>Dimmer active</code>.</Block> */}
      </Block>
    )
  }
}

export default connect(
  state => ({
    translation: state.translation.translation
  })
)(Point);