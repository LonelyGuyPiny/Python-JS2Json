import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { Block } from '../';

/**
 * Component
 * @name LoadingBar
 * @description
 * This is the loading bar component of the application. 
 * On application startup, this component is loaded
 */

class LoadingBar extends PureComponent {
  render() {
    const { mapLoading } = this.props;
    return (
      <Block id="progress" style={{ width: `${mapLoading}%` }}></Block>
    );
  }
}

export default connect(
  state => ({
    mapLoading: state.basemap.loading
  }))(LoadingBar);
