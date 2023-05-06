import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Radio } from 'semantic-ui-react';
import { Block } from '../../..';
import { setBasemapVisible } from '../../../../redux/modules/basemap';

class ToggleBasemap extends Component {
  state = {
    checked: this.props.isBasemap
  }

  handleBasemap = (e, { checked }) => {
    this.setState({ checked });
    this.props.dispatch(setBasemapVisible(checked));
  }
  
  render() {
    const { checked } = this.state;
    return (
      <Block className="switch">
        <Radio
          toggle
          checked={checked}
          onChange={this.handleBasemap}
        />
      </Block>
    )
  }
}

export default connect(
  state => ({
    isBasemap: state.basemap.isBasemapVisible
  })
)(ToggleBasemap);