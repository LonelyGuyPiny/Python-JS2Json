import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Radio } from 'semantic-ui-react';

import { Block } from '../../../';
import { setLabelsVisible } from '../../../../redux/modules/basemap';

class ToggleLabels extends Component {
  state = {
    checked: this.props.islabelLayer
  }

  // componentDidMount = () => {
  //   const { checked } = this.state;
  //   const { basemapType, labelLayer, cLabelLayer } = this.props;
  //   if(basemapType === 'ARIAL' && labelLayer !== null && cLabelLayer !== null) {
  //     this.props.dispatch(setLabelsVisible(checked));
  //   }
  // }

  componentDidUpdate = () => {
    const { checked } = this.state;
    const { basemapType, labelLayer, cLabelLayer } = this.props;
    if(basemapType === 'ARIAL' && labelLayer !== null && cLabelLayer !== null) {
      this.props.dispatch(setLabelsVisible(checked));
    }
    if (basemapType === 'VECTOR' && checked) {
      this.setState({ checked : !checked })
    }
  }
  
  handleLabelLayer = (e, { checked }) => {
    // console.log("checked", checked);
    // this.props.dispatch(setLabelsVisible(checked));
    this.setState({ checked });
  }

  render() {
    const { basemapType, isBasemap, translation, compareBasemapType } = this.props;
    const { checked } = this.state
    return (
      <Block className="switch d-flex">
        <span className="mr-1">{translation.showLabels}</span>
        <Radio
          toggle
          checked={checked}
          disabled={!isBasemap || (basemapType !== 'ARIAL' && compareBasemapType !== 'ARIAL')}
          onChange={this.handleLabelLayer}
        />
      </Block>
    )
  }
}

export default connect(
  state => ({
    basemapType: state.basemap.basemapType,
    compareBasemapType: state.basemap.selectedCompareBasemapType,
    isBasemap: state.basemap.isBasemapVisible,
    islabelLayer: state.basemap.islabelLayer,
    translation: state.translation.translation,
    labelLayer: state.basemap.labelLayer,
    cLabelLayer: state.basemap.cLabelLayer
  })
)(ToggleLabels);