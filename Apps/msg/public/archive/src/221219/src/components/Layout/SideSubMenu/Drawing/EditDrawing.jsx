import React, { Component } from 'react';
import { Button, Modal, Checkbox } from 'semantic-ui-react';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';
import { connect } from "react-redux";
import store from 'store2';

import { Block, Svg } from '../../../';
import { EditDrawingStyle, EditPreview, AText } from './';

/**
 * Component
 * @name EditDrawing
 * @description
 * This is edit draw component of the application. 
 * On edit click, this component is loaded
 */
class EditDrawing extends Component {
  //#region life cycle 
  constructor(props) {
    super(props);
    this.state = {
      outline: null,
      fill: null,
      shape: null,
      id: null,
      isMeasurement: false,
      open: false,
      text: null
    }
    this.outline = null;
    this.fill = null;
    this.submit = false;
  }

  UNSAFE_componentWillReceiveProps({ selectedFeature }) {
    if (selectedFeature && this.props.selectedFeature !== selectedFeature) {
      const { outline, fill, shape, id, isMeasurement, text } = selectedFeature.getProperties();
      this.outline = outline;
      this.fill = fill;
      this.submit = false;
      this.setState({
        outline,
        fill,
        shape,
        id,
        isMeasurement,
        text
      });
      this.props.allowModify();
    } else if (!selectedFeature) {
      this.setState({
        outline: null,
        fill: null,
        shape: null,
        id: null,
        text: null
      });
      this.outline = null;
      this.fill = null;
    }
  }

  componentWillUnmount = () => {
    const { selectedFeature } = this.props;
    if (selectedFeature && !this.submit) {
      const { id, isMeasurement } = selectedFeature.getProperties();
      const el = document.getElementById(`area${id}`);
      if (el) {
        el.style.display = isMeasurement ? 'block' : 'none';
      }
    }
  }
  //#endregion

  //#region functionality
  handleSize = (size) => {
    this.outline.size = size;
    this.setState({ outline: this.outline });
  }

  handleOutlineColor = ({ rgb }) => {
    this.outline.color = rgb;
    this.setState({ outline: this.outline });
  }

  handleOutlineOpacity = (opacity) => {
    this.outline.opacity = opacity;
    this.setState({ outline: this.outline });
  }

  updateFill = (fill) => {
    this.fill = fill;
    this.setState({ fill });
  }

  updateOutline = (outline) => {
    this.outline = outline;
    this.setState({ outline });

  }

  toggleMeasurement = (isMeasurement) => {
    const { id } = this.state;
    const el = document.getElementById(`area${id}`);
    if (el) {
      el.style.display = isMeasurement ? 'block' : 'none';
    }
    this.setState({ isMeasurement });
  }

  updateTextStyle = (text) => {
    this.setState({
      text
    });
  }
  //#endregion

  //#region update and delete
  handleSubmit = () => {
    this.submit = true;
    this.props.beforeSubmit();
    const { fill, outline, isMeasurement, shape, text } = this.state;
    this.props.updateStyle(outline, fill);
    let style;
    const { selectedFeature } = this.props;
    const properties = selectedFeature.getProperties();
    if (shape === 'Text') {
      const font = `${text.isBold ? 'bold' : 'normal'} ${text.size}px/1 ${text.font}`;
      style = new Style({
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
      });
      properties.text = text;
    } else {
      style = new Style({
        fill: new Fill({
          color: `rgba(${fill.color.r}, ${fill.color.g}, ${fill.color.b}, ${fill.opacity})`,
        }),
        stroke: new Stroke({
          color: `rgba(${outline.color.r}, ${outline.color.g}, ${outline.color.b}, ${outline.opacity})`,
          width: outline.size,
        }),
        image: new CircleStyle({
          radius: outline.size,
          fill: new Fill({
            color: `rgba(${outline.color.r}, ${outline.color.g}, ${outline.color.b}, ${outline.opacity})`,
          }),
        }),
      });
      properties.outline = outline;
      properties.fill = fill;
      properties.isMeasurement = isMeasurement;
    }

    selectedFeature.setProperties(properties);
    selectedFeature.setStyle(style);
    this.props.afterSubmit();
  }

  deleteFeature = () => {
    if (store('isConfirmDeleteShape')) {
      this.confirmDeleteFeature();
    } else {
      this.setState({
        open: true
      });
    }
  }

  confirmDeleteFeature = () => {
    const { id } = this.state;
    this.setState({
      open: false
    });
    this.props.deleteFeature(id);
  }

  handleDontShowAgain = (e, { checked }) => {
    store('isConfirmDeleteShape', checked);
  }

  cancelDeleteFeature = () => {
    store('isConfirmDeleteShape', false);
    this.setState({
      open: false
    });
  }

  //#endregion

  render() {
    const { fill, outline, shape, isMeasurement, open, text } = this.state;
    const {
      translation,
      isEdit,
      direction,
      handleBackButton
    } = this.props;

    if (shape === 'Text') {
      return (
        <Block className="drawShapes">
          <Block className="d-flex align-item-center justify-space-between edit-delete-draw head-animate">
            <Block>
              <p className="d-flex align-item-center"><Svg name="edit-drawing-com" /> {translation.editdraw}</p>
            </Block>
            <Block className="d-flex align-item-center">
              <Block className="d-flex draw-feature">
                {outline === null && isEdit && <p className="d-flex align-items-center text-black"><Svg name="MessageInfoIcon" />{translation.onDrawEdit}</p>}
                {outline !== null && <Button className="btn submitbtn " onClick={this.handleSubmit} data-tooltip={translation.saveandclose} data-position={`${direction === 'RTL' ? 'right' : 'left'} center`}><Svg name="CheckboxIcon" /> {translation.save}</Button>}
                {outline !== null && <Button className="btn eraserbtn " onClick={this.deleteFeature} data-tooltip={translation.deletedraw} data-position={`${direction === 'RTL' ? 'right' : 'left'} center`} ><Svg name="trashred" /> {translation.delete}</Button>}
              </Block>
              <Block>
                <p className="d-flex align-item-center edit-mode"><Svg name="close-new" onClick={handleBackButton} /></p>
              </Block>
            </Block>
          </Block>
          <AText
            text={text}
            updateTextStyle={this.updateTextStyle}
            // handleSubmit={this.handleSubmit}
            // deleteFeature={this.deleteFeature}
            edit
          />
          <Modal id="CancelPopup" className="CancelPopup"
            closeIcon
            open={open}
            size="mini"
            onClose={(e) => this.setOpen(e, false)}
          >
            {/* <Modal.Header>{translation.confirm}</Modal.Header> */}
            <Modal.Content>
              <Block className="warningIcon"><Svg name="delete-info" /></Block>
              <p><strong>{translation.confirmDelete}</strong></p>
              <p>{translation.confirmDeleteMessage}</p>

              <Checkbox onChange={this.handleDontShowAgain} label={translation.dontShowAgain} />

              <Block className="buttonsCol editButtons">
                <Button onClick={this.confirmDeleteFeature} className="btn submitbtn">{translation.submit}</Button>
                <Button onClick={this.cancelDeleteFeature} className="btn eraserbtn">{translation.cancel}</Button>
              </Block>
            </Modal.Content>
          </Modal>
        </Block>
      );
    }
    return (
      <Block className="drawShapes">
        {/* {outline === null && isEdit &&
          <Block className="mt-2 selectarea">
            <Button className="select-areaa-btn"><Svg name="Select" /> {translation.onDrawEdit} </Button>
          </Block>
        } */}

        <Block className="d-flex align-item-center justify-space-between edit-delete-draw head-animate">
          <Block>
            <p className="d-flex align-item-center"><Svg name="edit-drawing-com" /> {translation.editdraw}</p>
          </Block>
          <Block className="d-flex align-item-center">
            <Block className="d-flex draw-feature">
              {outline === null && isEdit && <p className="d-flex align-items-center text-black"><Svg name="MessageInfoIcon" />{translation.onDrawEdit}</p>}
              {outline !== null && <Button className="btn submitbtn " onClick={this.handleSubmit} data-tooltip={translation.saveandclose} data-position={`${direction === 'RTL' ? 'right' : 'left'} center`}><Svg name="CheckboxIcon" /> {translation.save}</Button>}
              {outline !== null && <Button className="btn eraserbtn " onClick={this.deleteFeature} data-tooltip={translation.deletedraw} data-position={`${direction === 'RTL' ? 'right' : 'left'} center`} ><Svg name="trashred" /> {translation.delete}</Button>}
            </Block>
            <Block>
              <p className="d-flex align-item-center edit-mode"><Svg name="close-new" onClick={handleBackButton} /></p>
            </Block>
          </Block>
        </Block>

        {shape !== null &&
          <EditDrawingStyle
            shape={shape}
            outline={outline}
            fill={fill}
            handleOutlineOpacity={this.handleOutlineOpacity}
            handleOutlineColor={this.handleOutlineColor}
            handleSize={this.handleSize}
            updateFill={this.updateFill}
            updateOutline={this.updateOutline}
            isMeasurement={isMeasurement}
            toggleMeasurement={this.toggleMeasurement}
            translation={translation}
          />
        }

        {/* {outline !== null &&
          <Block className="buttonsCol editButtons">
            <Button onClick={this.handleSubmit} className="btn submitbtn">
              {translation.submit} <Svg name="CheckboxIcon" />
            </Button>
            <Button className="btn eraserbtn"
              onClick={this.deleteFeature}
            >
              {translation.delete} <Svg name="EraserIcon" />
            </Button>
          </Block>
        } */}
        <EditPreview
          shape={shape}
          outline={outline}
          fill={fill}
          translation={translation}
        />

        <Modal id="CancelPopup" className="CancelPopup"
          closeIcon
          size="mini"
          open={open}
          onClose={(e) => this.setOpen(e, false)}
        >
          {/* <Modal.Header>{translation.confirm}</Modal.Header> */}
          <Modal.Content>
            <Block className="warningIcon"><Svg name="delete-info" /></Block>
            <p><strong>{translation.confirmDelete}</strong></p>
            <p>{translation.confirmDeleteMessage}</p>

            <Checkbox onChange={this.handleDontShowAgain} label={translation.dontShowAgain} />

            <Block className="buttonsCol editButtons">
              <Button onClick={this.confirmDeleteFeature} className="btn submitbtn">{translation.submit}</Button>
              <Button onClick={this.cancelDeleteFeature} className="btn eraserbtn">{translation.cancel}</Button>
            </Block>
          </Modal.Content>
        </Modal>
      </Block>
    )
  }
}

export default connect(
  state => ({
    translation: state.translation.translation,
    direction: state.translation.direction
  })
)(EditDrawing);