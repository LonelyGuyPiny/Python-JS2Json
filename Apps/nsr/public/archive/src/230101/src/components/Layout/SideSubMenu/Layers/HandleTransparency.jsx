import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { Block } from '../../../';
import { setLayersOpacity } from '../../../../redux/modules/layers';
import { updateLayersOpacity } from '../../../../utils/layer';
import { LayersTransparencyBar } from './';

class HandleTransparency extends Component {
  constructor(props){
    super(props);
    const {
      opacity
    } = props;

    this.state = {
      opacity
    };
    this.data = null;
  }

  shouldComponentUpdate = (nextProps) => {
    const { visibleLayersCount } = nextProps;
    if (visibleLayersCount !== this.props.visibleLayersCount) {
      this.setData(nextProps);
    }
    return true;
  }

  setData = (props = this.props) => {
    const {
      mapLayers,
      compareMapLayers,
      filterLayers,
      map,
      compareMap,
      tocData,
      visibleLayers,
      allLayers
    } = props;
    this.data = {
      mapLayers,
      compareMapLayers,
      filterLayers,
      map,
      compareMap,
      tocData,
      visibleLayers,
      allLayers
    }
  }

  handleLayersOpacity(opacity) {
    if (!this.data) {
      this.setData();
    }
    this.setState({ opacity });
    this.data = updateLayersOpacity(this.data, opacity);
  }

  updateOpacity() {
    this.props.dispatch(setLayersOpacity(this.data));
    setTimeout(() => { this.setData(); }, 500);
  }

  render() {
    const { opacity } = this.props;
    return (
      <Block className="rangeSlider lgrSlider">
        <LayersTransparencyBar
          valueNow={this.handleLayersOpacity.bind(this)}
          defaultValue={opacity}
          onSlideEnd={this.updateOpacity.bind(this)}
        />
        <Button className="eye open">{(this.state.opacity * 100).toFixed(0)}%</Button>
      </Block>
    )
  }
}

export default connect(
  state => ({
    opacity: state.layers.opacity,
    mapLayers: state.layers.mapLayers,
    compareMapLayers: state.layers.compareMapLayers,
    filterLayers: state.layers.filterLayers,
    map: state.map.map,
    compareMap: state.map.compareMap,
    visibleLayersCount: state.layers.visibleLayers.length,
    visibleLayers: state.layers.visibleLayers,
    tocData: state.tocData,
    allLayers: state.layers.allLayers
  })
)(HandleTransparency);