import React, { Component } from 'react';
import { Button, Input, Select } from 'semantic-ui-react';
import { connect } from "react-redux";
// import AngleRange from 'react-angle-range';

import { Size } from './';
import { Block, ColorPicker, Svg } from '../../../';
import { LayersTransparencyBar } from '../Layers';
import { stringDivider } from '../../../../utils/drawing';
import { FONTS_OPTIONS } from '../../../../constants/drawing';

class AText extends Component {
  //#region life cycle
  constructor(props) {
    super(props);
    const { size, color, font, opacity, content, strokeSize, strokeColor, rotation, isWrap, isBold, text } = props.text;
    this.state = {
      text: {
        size,
        color,
        font,
        opacity,
        content,
        strokeSize,
        strokeColor,
        rotation,
        isBold,
        isWrap,
        text
      },
      content
    }
  }
  //#endregion

  //#region functionality
  updateSize = (size) => {
    const { text } = this.state;
    text.size = size;
    this.props.updateTextStyle(text);
    this.setState({ text });
  }

  updateStrokeSize = (size) => {
    const { text } = this.state;
    text.strokeSize = size;
    this.props.updateTextStyle(text);
    this.setState({ text });
  }

  onColorChange = ({ rgb }) => {
    const { text } = this.state;
    text.color = rgb;
    this.props.updateTextStyle(text);
    this.setState({ text });
  }

  onStrokeColorChange = ({ rgb }) => {
    const { text } = this.state;
    text.strokeColor = rgb;
    this.props.updateTextStyle(text);
    this.setState({ text });
  }

  handleOpacity = (opacity) => {
    const { text } = this.state;
    text.opacity = opacity;
    this.props.updateTextStyle(text);
    this.setState({ text });
  }

  handleFont = (e, { value }) => {
    const { text } = this.state;
    text.font = value;
    this.props.updateTextStyle(text);
    this.setState({ text });
  }

  handleIsBold = () => {
    const { text } = this.state;
    text.isBold = !text.isBold;
    this.props.updateTextStyle(text);
    this.setState({ text });
  }

  handleIsWrap = () => {
    const { text } = this.state;
    text.isWrap = !text.isWrap;
    if (text.isWrap) {
      text.text = stringDivider(text.content, 16, '\n')
    } else {
      text.text = text.content
    }
    this.props.updateTextStyle(text);
    this.setState({ text });
  }

  handleContent = (e, { value }) => {
    const { text } = this.state;
    text.content = value;
    if (text.isWrap) {
      text.text = stringDivider(text.content, 16, '\n')
    } else {
      text.text = text.content
    }
    this.props.updateTextStyle(text);
    this.setState({ text });
  }

  handleRoatation = (value) => {
    const { text } = this.state;
    text.rotation = value;
    this.props.updateTextStyle(text);
    this.setState({ text });
  }
  //#endregion

  render() {
    const { text } = this.state;
    const { size, color, opacity, font, content, strokeSize, strokeColor, rotation, isBold, isWrap } = text;
    const { edit, translation, handleSubmit, deleteFeature } = this.props;
    return (
      <Block className="drawShapes aTextContentBox">

        <Block className="shapes-block textContent">
          <Block className="label">
            <p className="font-weight-medium">{translation.content}</p>
          </Block>
          <Block className="ui input textCol">
            <Input
              onChange={this.handleContent}
              type="text"
              placeholder={translation.enterContent}
              className="size-input"
              value={content}
              maxLength={30}
            />
          </Block>
        </Block>

        <Block className="d-flex justify-space-between shapes-block font mt-1">
          <Block className="label">
            <p className="font-weight-medium">{translation.font}</p>
          </Block>

          <Block className="fontColright">
            <Block className="ui input fontCol">
              <Select
                value={font}
                onChange={this.handleFont}
                placeholder=''
                options={FONTS_OPTIONS}
              />
            </Block>
            <Block className="bold">
              <Button
                className={`btn ${isBold ? 'active' : ''}`}
                data-tooltip={translation.bold}
                data-position="bottom left"
                onClick={this.handleIsBold}
              >
                <Svg name="Bold" />
              </Button>
            </Block>
            <Block className="wrap">
              <Button
                className={`btn ${isWrap ? 'active' : ''}`}
                data-tooltip={translation.wrap}
                data-position="bottom left"
                onClick={this.handleIsWrap}
              >
                <Svg name="Wrap" />
              </Button>
            </Block>
          </Block>
        </Block>

        <Block className="d-flex justify-space-between shapes-block font rotationTxt mt-1">
          <Block className="label">
            <p className="font-weight-medium">{translation.rotation}</p>
          </Block>
          <Block className="draw-txt-right">
            <Block className="rotation">
            </Block>
            {/* <Block className="ui input fontCol"> */}
              <Input
                type="number"
                value={rotation}
                className="rotation-input"
                step="5"
                min="0"
                max="360"
                onChange={(e, { value}) => this.handleRoatation(value)}
              />
            {/* </Block> */}
          </Block>
        </Block>

        <Block className="d-flex justify-space-between shapes-block size mt-1">
          <Block className="label">
            <p className="font-weight-medium">{translation.size}</p>
          </Block>
          <Block className="size-block-right">
            <Block className="label">
              <p>{translation.text}</p>
            </Block>
            <Size
              onChange={this.updateSize}
              value={size}
            />
            <Block className="label">
              <p>{translation.outline}</p>
            </Block>
            <Size
              onChange={this.updateStrokeSize}
              value={strokeSize}
            />
          </Block>
        </Block>

        <Block className="d-flex justify-space-between shapes-block color mt-2">
          <Block className="label">
            <p className="font-weight-medium">{translation.color}</p>
          </Block>
          <Block className="color-block-right">
            <Block className="label">
              <p>{translation.fill}</p>
            </Block>
            <Block className="field colorPicker">
              <ColorPicker color={color} onChange={this.onColorChange} />
            </Block>
            <Block className="label">
              <p>{translation.outline}</p>
            </Block>
            <Block className="field colorPicker">
              <ColorPicker color={strokeColor} onChange={this.onStrokeColorChange} />
            </Block>
          </Block>
        </Block>
        
        <Block className="d-flex justify-space-between shapes-block opacity mt-1">
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

        {edit &&
          <Block className="buttonsCol editButtons">
            <Button onClick={handleSubmit} className="btn submitbtn">
              {translation.submit} <Svg name="CheckboxIcon" />
            </Button>
            <Button className="btn eraserbtn"
              onClick={deleteFeature}
            >
              {translation.delete} <Svg name="EraserIcon" />
            </Button>
          </Block>
        }

        <Block className="previewBox">
          <Block className="previewImage atext Alef show">
            <p style={{
                lineHeight: "100%",
                color: `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`,
                WebkitTextFillColor:  `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`,
                WebkitTextStrokeWidth: `${strokeSize}px`,
                WebkitTextStrokeColor: `rgba(${strokeColor.r}, ${strokeColor.g}, ${strokeColor.b}, ${opacity})`,
                fontFamily: `${font}, sans-serif`,
                fontWeight: `${isBold ? 'bold' : 'normal'}`,
                fontSize: `${size}px`,
                whiteSpace: 'pre-line',
                opacity: opacity,
                transform: `rotate(${rotation}deg)`,
              }}>
              {text.text}
            </p>
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
)(AText);