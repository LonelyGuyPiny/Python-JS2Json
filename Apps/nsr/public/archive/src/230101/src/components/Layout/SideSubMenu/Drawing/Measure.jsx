import React, { Component } from 'react';
import { Button, Radio,
  // Select
} from 'semantic-ui-react';
import { connect } from "react-redux";

import {
  Block,
  Svg
} from '../../../';

import {
  // JUST_MEASURE,
  JUST_MEASURE_INDEX,
  // SHAPES_INDEX
} from '../../../../constants/drawing';
import { setshowSegmentLength, clearPreviousMeasure } from '../../../../redux/modules/drawing';

/**
 * Component
 * @name Measure
 * @description
 * This is Measure draw component of the application. 
 * On measure tab click, this component is loaded
 */

class Measure extends Component {
  constructor(props) {
    super(props);
    const optionsArr = [];
    JUST_MEASURE_INDEX.forEach(item => {
      const arrItem = {
        key: item,
        value: item,
        text: item
      }
      optionsArr.push(arrItem)
    });
    this.state = {
      options: optionsArr,
      selectedDrawType: optionsArr[0].value,
      showSegment: true,
      clearPre: false
    }
  }

  componentDidMount = () => {
    const { showSegmentLength, clearPreviousMeasure, measureType } = this.props;
    this.setState({ selectedDrawType: measureType, showSegment: showSegmentLength, clearPre: clearPreviousMeasure });
    this.props.showSegment(showSegmentLength);
    this.props.clearPrevious(clearPreviousMeasure);
  }

  handledrawChange = (e, value) => {
    this.setState({ selectedDrawType : value })
    this.props.onMeasureShapeChange(value);
  };

  handleShowSegment = (e, { checked }) => {
    this.props.dispatch(setshowSegmentLength(!this.state.showSegment))
    this.setState({ showSegment: !this.state.showSegment });
    this.props.showSegment(checked);
  }

  handleClearPreviousMeasure = (e, { checked }) => {
    this.props.dispatch(clearPreviousMeasure(checked));
    this.setState({ clearPre: checked });
    this.props.clearPrevious(checked);
  }

  handleClearAll = () => {
    this.props.clearAll();
  }

  render() {
    const { translation, showMeasureClearAll,
      // handleGeoJsonDownload
    } = this.props;
    const {
      // options,
      showSegment,
      selectedDrawType,
      clearPre
    } = this.state;
    // onShapeChange   
    return (
      <Block className="drawShapes">
        <Block className="d-flex justify-space-between shapes-block font mt-1 measure-dropdown titlehead0 title-head-bg-drawing pad-lr">
          <Block className="">
            <p className="font-weight-medium">{translation.measuretype}</p>
          </Block>
          <Block className="actionBtns">
            <Button.Group>
              <Button
                className={`${selectedDrawType === 'LineString' ? "positive" : ""}`}
                onClick={(e) => this.handledrawChange(e, "LineString")}
              ><Svg name="distance"/>{translation.distance}</Button>
              <Button.Or text={translation.or} />
              <Button
                className={`${selectedDrawType === 'Polygon' ? "positive" : ""}`}
                onClick={(e) => this.handledrawChange(e, "Polygon")}
              ><Svg name="area"/>{translation.area}</Button>
            </Button.Group>
          </Block>
          {/* <Block className="fontColright">
            <Block className="ui input fontCol">
              <Select
                defaultValue={options[0].value}
                onChange={this.handledrawChange}
                placeholder=''
                options={options}
              />
            </Block>
          </Block> */}
        </Block>
        <Block className="d-flex justify-space-between titlehead0 title-head-bg-drawing pad-lr">
          <p className="font-weight-medium">{translation.showsegmentlength}</p>
          <Block className="d-flex justify-space-between measurement">
            {/* <label>Show segment lengths</label> */}
            <Block className="switch">
              <Radio
                toggle
                checked={showSegment}
                onChange={this.handleShowSegment}
              />
            </Block>
            {/* <ToggleBasemap /> */}
          </Block>
        </Block>
        <Block className="d-flex justify-space-between titlehead0 title-head-bg-drawing pad-lr">
          <p className="font-weight-medium">{translation.clearmeasure}</p>
          <Block className="d-flex justify-space-between measurement">
            {/* <label>Show segment lengths</label> */}
            <Block className="switch">
              <Radio
                toggle
                checked={clearPre}
                onChange={this.handleClearPreviousMeasure}
              />
            </Block>
            {/* <ToggleBasemap /> */}
          </Block>
        </Block>
        <Block className="d-flex justify-content-center titlehead0 title-head-bg-drawing pad-lr">
          <Button
            disabled={!showMeasureClearAll}
            onClick={this.handleClearAll}
            className="btn eraserbtn"
          >
            {translation.cleara}
          </Button>
          {/* <Button
            // disabled={!showMeasureClearAll}
            onClick={handleGeoJsonDownload}
            className="btn eraserbtn"
          >
            Download
          </Button> */}
        </Block>
      </Block>
    )
  }
}

export default connect(
  state => ({
    translation: state.translation.translation,
    map: state.map.map,
    measureType: state.drawing.measureType,
    showSegmentLength: state.drawing.showSegmentLength,
    clearPreviousMeasure: state.drawing.clearPreviousMeasure
  })
)(Measure);