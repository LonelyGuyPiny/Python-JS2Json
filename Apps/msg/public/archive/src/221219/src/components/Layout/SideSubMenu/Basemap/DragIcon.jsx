import React, { Component } from 'react';
import { Button, Tab } from 'semantic-ui-react';
import { connect } from "react-redux";

import { Block, Svg } from '../../../';

class DragIcon extends Component {
  render() {
    const { } = this.props;
    // onShapeChange
    return (
        <Block className="dragIcon"><Button className="d-icon active"><Svg name='drag-icon' /></Button></Block>
    )
  }
}

export default connect(
  state => ({
    translation: state.translation.translation
  })
)(DragIcon);