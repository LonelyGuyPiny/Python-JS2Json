import React, { Component } from 'react';
import { Button, Tab } from 'semantic-ui-react';
import { connect } from "react-redux";

import { Block, Svg } from '../../../';
import { Point, LineString, Polygon, AText, Circle, Box } from './';
import { SHAPES_INDEX } from '../../../../constants/drawing';

class Create extends Component {
  render() {
    const { onShapeChange, updateStyle, outline, fill, defaultActiveIndex, isMeasurement, toggleMeasurement, translation, text, updateTextStyle } = this.props;
    // onShapeChange

    const panes2 = [
      {
        menuItem: <Button key="Point" className="background-grey mr-1 btn-sm pointSvg" data-tooltip={translation.Point} data-position="bottom left">
          <Svg name="Point" />
        </Button>,
        render: () => <Tab.Pane attached={false}>
          <Point
            updateStyle={updateStyle}
            outline={outline}
            fill={fill}
          />
        </Tab.Pane>,
      },
      {
        menuItem: <Button key="LineString" className="background-grey mr-1 btn-sm" data-tooltip={translation.line} data-position="bottom left">
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
        menuItem: <Button key="Polygon" className="background-grey mr-1 btn-sm" data-tooltip={translation.Polygon} data-position="bottom left">
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
      {
        menuItem: <Button key="Circle" className="background-grey mr-1 btn-sm" data-tooltip={translation.Circle} data-position="bottom left">
          <Svg name="TabCircle" />
        </Button>,
        render: () => <Tab.Pane attached={false}>
          <Circle
            updateStyle={updateStyle}
            outline={outline}
            fill={fill}
            isMeasurement={isMeasurement}
            toggleMeasurement={toggleMeasurement}
          />
        </Tab.Pane>,
      },
      {
        menuItem: <Button key="Box" className="background-grey mr-1 btn-sm" data-tooltip={translation.Box} data-position="bottom left">
          <Svg name="Square" />
        </Button>,
        render: () => <Tab.Pane attached={false}>
          <Box
            updateStyle={updateStyle}
            outline={outline}
            fill={fill}
            isMeasurement={isMeasurement}
            toggleMeasurement={toggleMeasurement}
          />
        </Tab.Pane>,
      },
      {
        menuItem: <Button key="Text" className="background-grey aText mr-1 btn-sm" data-tooltip={translation.text} data-position="bottom left">
          <Svg name="aText" />
        </Button>,
        render: () => <Tab.Pane attached={false}>
          <AText
            text={text}
            updateTextStyle={updateTextStyle}
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
            onTabChange={(e, { activeIndex }) => onShapeChange(SHAPES_INDEX[activeIndex])}
            defaultActiveIndex={defaultActiveIndex}
          />
        </Block>
      </Block>
    )
  }
}

export default connect(
  state => ({
    translation: state.translation.translation
  })
)(Create);