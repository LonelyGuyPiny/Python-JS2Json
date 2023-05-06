import React, { Component } from 'react';
import ReactSlider from 'react-slider';
import { connect } from "react-redux";
import {Fill, Style, Stroke} from 'ol/style';
import { setMap } from '../../../../redux/modules/map';

class DrawingTransparency extends Component {
  renderThumb = (props, state) => {
    return(
      <div
        {...props}
      >
        {state.valueNow}
      </div>
    );
  }

  getRGB(str){
    var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
    return match ? {
      red: match[1],
      green: match[2],
      blue: match[3]
    } : {};
  }
  
  handleChange = (valueNow) => {
    const {selectedShape, source, dispatch, map, globally, borderColor } = this.props;
    var features = source.getFeatures();
    if (features != null && features.length > 0) {
        for (let x in features) {
          if(features[x].style_ && features[x].style_.fill_){
            let rgbaOutput = this.getRGB(features[x].style_.fill_.color_); 
            let color = `rgba(${rgbaOutput.red},${rgbaOutput.green}, ${rgbaOutput.blue},${valueNow} )`;
            let style = new Style({ 
              stroke: new Stroke({
                color: borderColor,
                width: 3
              }),
              fill: new Fill({
                color: color
              })
            })
            if(globally){
              features[x].setStyle(style)
            }else{
              if (features[x].id_ === selectedShape.id_) {
                features[x].setStyle(style)
              }
            }      
          }
         }
       }    
     dispatch(setMap(map))
  }

  render() {
    const { defaultValue, value } = this.props;
    return (
      <ReactSlider
        defaultValue={defaultValue || 0}
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        renderThumb={this.renderThumb}
        onChange={this.handleChange}
        min={0}
        max={1}
        step={0.01}
        value={value}
      />
    )
  }
}
export default connect(
  state => ({
    map: state.map.map,
    translation: state.translation.translation
  })
  )(DrawingTransparency);