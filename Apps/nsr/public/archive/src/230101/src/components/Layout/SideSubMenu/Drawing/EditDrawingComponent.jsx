import React, { Component } from 'react';
import { Button, Radio, Modal, Checkbox } from 'semantic-ui-react';
import { Block, Svg, ColorPicker } from '../../../';
import { connect } from "react-redux";
import { Size } from './';
import ReactSlider from 'react-slider';
// import { SketchPicker } from 'react-color';

class EditDrawingComponent extends Component {

    constructor(props) {
        super(props);
        this.size = 10;
        this.color = { r: 74, g: 144, b: 226 };
        this.opacity = 1;
        this.state = {
            open :false,
            dimmer : true,
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

      setOpen = (e,value) => {
        this.setState({
            open: value
        })
      };


  render() {
    const { size, color } = this.state.outline;
    const { open } = this.state;
    // const { setOpen } = React.useState(false);
    return (
      <Block className="drawShapes">

        <Block className="d-flex justify-space-between titlehead0 title-head-bg-drawing">
          <p className="font-weight-medium">Draw Settings</p>
          <Block className="d-flex justify-space-between measurement">
            <label>Show Measurements</label>
            <Block className="switch">
              <Radio toggle
              // checked={checked}
              />
            </Block>
            {/* <ToggleBasemap /> */}
          </Block>
        </Block>

        <Block className="d-flex justify-space-between shapes-block size mt-2">
          <Block className="label">
            <p className="font-weight-medium">Size</p>
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
            <p className="font-weight-medium">Color</p>
          </Block>
          <Block className="field colorPicker">
            <ColorPicker color={color} onChange={this.onColorChange} />
            {/* <SketchPicker
            color={ this.state.fillColor }
            onChange={this.fillParticularColor}
            />
            <Button onClick={this.borderParticularColor} className="btn-color-filled outline">
              <Svg name="checkBoxFilled" />
            </Button> */}
          </Block>
        </Block>

        <Block className="d-flex justify-space-between shapes-block opacity mt-2">
          <Block className="label">
            <p className="font-weight-medium">Opacity</p>
          </Block>

          <Block className="rangeSliderBlock">
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            />
            <Button className="eye open">{(this.props.opacity * 100).toFixed(0)}%</Button>
          </Block>
        </Block>

        <Block className="buttonsCol editButtons">
            <Button className="btn submitbtn">
              Submit <Svg name="CheckboxIcon" />
            </Button>
            <Button className="btn eraserbtn"
             onClick={(e) => this.setOpen(e, true)}
            >
              Delete <Svg name="EraserIcon" />
            </Button>
            
        </Block>

        <Modal id="CancelPopup" className="CancelPopup" 
                closeIcon
                open={open}
                size="mini"
                onClose={(e) => this.setOpen(e, false)}
        >
          {/* <Modal.Header>Lorem ipsum dolor</Modal.Header> */}
          <Modal.Content>
            <Block className="warningIcon"><Svg name="delete-info" /></Block>  
            <p><strong>Are you sure you want to delete?</strong></p>
            <p>On clicking Submit button, all drawings will be deleted from the map</p>

            <Checkbox label='Dont show this next time' />

            <Block className="buttonsCol editButtons">
                <Button className="btn submitbtn">Submit</Button>
                <Button className="btn eraserbtn">Cancel</Button>
            </Block>
          </Modal.Content>

          {/* <Modal.Actions>
            <Button negative>No</Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content='Yes'
            />
          </Modal.Actions> */}
        </Modal>

        {/* <Modal
        dimmer={dimmer}
        closeIcon
        open={open}
        trigger={<Button>Show Modal</Button>}
        onClose={(e) => this.setOpen(e, false)}
        >
            <Header icon='archive' content='Archive Old Messages' />
            <Modal.Content>
                <p>
                Your inbox is getting full, would you like us to enable automatic
                archiving of old messages?
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={(e) => this.setOpen(e, false)}>
                <Icon name='remove' /> No
                </Button>
                <Button color='green' onClick={(e) => this.setOpen(e, false)}>
                <Icon name='checkmark' /> Yes
                </Button>
            </Modal.Actions>
        </Modal> */}







        {/* <Block className="previewBox">
          <Block className="previewImage polygon">
            <Svg name="PreviewPolygon" />
          </Block>
          <Block className="previewText">Preview</Block>
        </Block> */}

        {/* <Block class="ui info message"><Svg name="MessageInfoIcon" /><span>To activate free hand hold <code>Shift</code> key while drawing.</span></Block> */}
      </Block>
    )
  }
}

export default connect(

)(EditDrawingComponent);