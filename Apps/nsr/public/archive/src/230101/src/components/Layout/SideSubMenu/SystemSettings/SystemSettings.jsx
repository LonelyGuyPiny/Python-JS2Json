import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Block } from '../../..';
import LanguageSettings from './LanguageSettings';
import SpatialReferenceSettings from './SpatialReferenceSettings';
import MeasurementSettings from './MeasurementSettings';

class SystemSettings extends Component {
  render() {
    const { translation } = this.props;
    return (
      <Block className="drawShapes searchFields">
        <Block className="headSearch searchLayers d-flex justify-content-center align-item-center justify-space-between">
          <Block className="">
            {/* <Block className="mob-menu-icon">
              <Svg className="mob-menu-new" name="mobile-menu" />
            </Block> */}
          </Block>
          <Block className="d-flex align-items-center">
            <h4 className="font-weight-medium mb-0">
              {translation.systemSettings}
          </h4>
          {/* <Button className="module-info-toc module-info-toc-header d-flex justify-content-end cursor-pointer btn-none" data-tooltip={translation.settingshedaer} data-position="bottom center">
              <Svg name="info-module" />
            </Button> */}
          </Block>
          <Block className="">
          </Block>
        </Block>
        <Block className="settings-block-main">
          <MeasurementSettings />
          <LanguageSettings />
          <SpatialReferenceSettings />
        </Block>
        <p className="justify-content-center d-flex version-text">{translation.version} 1.5.1</p>
      </Block>
    )
  }
}

export default connect(
  state => ({
    translation: state.translation.translation
  })
)(SystemSettings);