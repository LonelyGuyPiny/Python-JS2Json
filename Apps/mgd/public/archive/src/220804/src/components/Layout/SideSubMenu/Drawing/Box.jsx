import React, { Component } from 'react';
import { Radio, Tab } from 'semantic-ui-react';
import { Block } from '../../../';
import { connect } from "react-redux";
// import ReactSlider from 'react-slider';
// import { SketchPicker } from 'react-color';
import { Fill } from './';
import { Outline } from './';

class Box extends Component {
  constructor(props) {
    super(props);
    const { outline, fill } = props;
    this.state = {
      outline,
      fill
    }
  }

  updateFill = (fill) => {
    const { outline } = this.state;
    this.setState({ fill });
    this.props.updateStyle(outline, fill);
  }

  updateOutline = (outline) => {
    this.setState({ outline });
    this.props.updateStyle(outline);
  }

  render() {
    const { outline, fill } = this.state;
    const { isMeasurement, toggleMeasurement, translation } = this.props;
    const panes = [
      {
        menuItem: translation.fill,
        render: () => <Tab.Pane attached={false}>
          <Fill fill={fill} updateFill={this.updateFill} />
        </Tab.Pane>,
      },
      {
        menuItem: translation.outline,
        render: () => <Tab.Pane attached={false}>
          <Outline outline={outline} updateOutline={this.updateOutline} />
        </Tab.Pane>,
      },
    ]
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
          </Block>
        </Block>

        <Tab menu={{ secondary: true, pointing: true }} panes={panes} className="drawingTabThird border-bottom-tab" />

        <Block className="previewBox">
          <Block className="previewImage lineString">
            <svg height="300" width="300" style={{ overflow: 'visible' }}>
              <rect width="150" height="150" style={{ fill: `rgba(${fill.color.r}, ${fill.color.g}, ${fill.color.b}, ${fill.opacity})`, stroke: `rgba(${outline.color.r}, ${outline.color.g}, ${outline.color.b}, ${outline.opacity})`, strokeWidth: outline.size }} />
            </svg>
          </Block>
          <Block className="previewText">{translation.preview}</Block>
        </Block>
      </Block>
    )
  }
}

export default connect(
  state => ({
    translation: state.translation.translation
  })
)(Box);