import React, { Component } from 'react';
import { Button, Tab } from 'semantic-ui-react';
import { connect } from "react-redux";

import { Block, Svg } from '../../../';
import { Point, LineString, Polygon, AText, Circle, Box } from './';
import { SHAPES_INDEX } from '../../../../constants/drawing';
import { EditDrawing } from './';

/**
 * Component
 * @name Create
 * @description
 * This is draw component of the application. 
 * On drawing menu click, this component is loaded
 */
class Create extends Component {
  render() {
    const { onShapeChange, updateStyle, outline, fill, defaultActiveIndex, isMeasurement, direction, toggleMeasurement, translation, text, updateTextStyle, onEditClick, selectFeature, selectedFeature, allowModify, beforeSubmit, afterSubmit, deleteFeature, isEdit, showEdit,
      handleBackButton
    } = this.props;
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
          <Block className="d-flex justify-space-between title-head-bg-drawing title-head-bg-drawing-one">
            <Block className="d-flex justify-space-between w-100">
              {selectedFeature === null && !isEdit && <Block className="titlehead0 pad-lr ">
                <p className="font-weight-medium ws-nwrap">{translation.selectDrawStyle}</p>
              </Block>}
              <Block className={`titlehead0 w-100  ${!isEdit ? 'pad-lr' : ''}`}>
                {/* {!isEdit && showEdit && <Button onClick={onEditClick} className="btn-none btn-edit-drawing"><Svg name="edit-drawing-com" /><p>Edit</p></Button>} */}
                {!isEdit && showEdit && <Button onClick={onEditClick} className="btn-none btn-edit-drawing" data-tooltip="Edit Drawing On The Map" data-position={`${direction === 'RTL' ? 'right' : 'left'} center`}><Svg name="edit-drawing-com" /><p>{translation.editdraw}</p></Button>}
                {isEdit && <EditDrawing
                  selectFeature={selectFeature}
                  selectedFeature={selectedFeature}
                  allowModify={allowModify}
                  beforeSubmit={beforeSubmit}
                  afterSubmit={afterSubmit}
                  updateStyle={updateStyle}
                  deleteFeature={deleteFeature}
                  isEdit={isEdit}
                  handleBackButton={handleBackButton}
                />}
              </Block>
            </Block>
          </Block>
          {selectedFeature === null && !isEdit && <Tab
            menu={{ secondary: true, pointing: true }}
            panes={panes2}
            className="drawingTabSecond drawing-parent"
            onTabChange={(e, { activeIndex }) => onShapeChange(SHAPES_INDEX[activeIndex])}
            defaultActiveIndex={defaultActiveIndex}
          />}
        </Block>
      </Block>
    )
  }
}

export default connect(
  state => ({
    translation: state.translation.translation,
    direction: state.translation.direction
  })
)(Create);