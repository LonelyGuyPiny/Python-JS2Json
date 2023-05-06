import React, { Component } from 'react';
import { Radio, Tab } from 'semantic-ui-react';
import { Block, Svg } from '../../../';
import { connect } from "react-redux";
// import ReactSlider from 'react-slider';
// import { SketchPicker } from 'react-color';
import { Fill } from './';
import { Outline } from './';
import { setPolygonTab } from '../../../../redux/modules/drawing';

class Polygon extends Component {
  constructor(props) {
    super(props);
    const { outline, fill } = props;
    this.state = {
      outline,
      fill,
      activeTabIndex: props.polygonTab
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

  onPolygonTabChange = (activeIndex) => {
    this.props.dispatch(setPolygonTab(activeIndex));
    this.setState({ activeTabIndex: activeIndex })
  }

  render() {
    const { outline, fill, activeTabIndex } = this.state;
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

        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={panes}
          className="drawingTabThird border-bottom-tab"
          onTabChange={(e, { activeIndex }) => this.onPolygonTabChange(activeIndex)}
          activeIndex={activeTabIndex}
        />

        <Block className="previewBox">
          <Block className="previewImage lineString">
            <svg height="300" width="300" style={{ overflow: 'visible' }}>
              <polygon points="74,0 148,60 115,148 35,148 0,60" style={{ fill: `rgba(${fill.color.r}, ${fill.color.g}, ${fill.color.b}, ${fill.opacity})`, stroke: `rgba(${outline.color.r}, ${outline.color.g}, ${outline.color.b}, ${outline.opacity})`, strokeWidth: outline.size }} />
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
    translation: state.translation.translation,
    polygonTab: state.drawing.polygonTab
  })
)(Polygon);