import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Block, ColorPicker } from '../../../';
import { connect } from "react-redux";

import { LayersTransparencyBar } from '../Layers';

class Fill extends Component {
  constructor(props) {
    super(props);
    const { fill } = props;
    this.color = fill.color;
    this.opacity = fill.opacity;
    this.state = {
      outline: {
        color: this.color,
        opacity: this.opacity,
      }
    }
  }

  UNSAFE_componentWillReceiveProps({ fill }) {
    if (fill.color !== this.color) {
      this.onColorChange({ rgb: fill.color });
    }
    if (fill.opacity !== this.opacity) {
      this.handleOpacity(fill.opacity);
    }
  }

  onColorChange = ({ rgb }) => {
    this.color = rgb;
    const outline = {
      color: this.color,
      opacity: this.opacity,
    }
    this.props.updateFill(outline);
    this.setState({ outline });
  }

  handleOpacity = (opacity) => {
    this.opacity = opacity;
    const outline = {
      color: this.color,
      opacity: this.opacity,
    }
    this.props.updateFill(outline);
    this.setState({ outline });
  }


  render() {
    const { color, opacity } = this.state.outline;
    const { translation } = this.props;
    return (
      <Block className="drawShapes">
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
)(Fill);