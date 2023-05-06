import React from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { Block, Svg } from '../../../';
import { setCompareBasemap, setCompareBasemapType } from '../../../../redux/modules/basemap';

/**
 * Component
 * @name BasemapCompare
 * @description
 * This is the BasemapCompare component of the application. 
 * On basemap comparing, this component is loaded
 */
class BasemapCompare extends React.Component {
  handleCompare = () => {
    this.props.dispatch(setCompareBasemap());
  }

  handleCompareType = (type) => {
    this.props.dispatch(setCompareBasemapType(type));
  }

  render() {
    const { compareBasemapType, translation } = this.props;
    return (
      <Block className="basemap-footer">
        <Block className="basehead">
          <Block className="">
            <Block className="d-flex align-item-center justify-space-between">
              <h3>{translation.mapComparison}</h3>
              <Block className="basemap-info module-info-toc module-info-toc-header d-flex justify-content-end cursor-pointer btn-none" data-tooltip={translation.basemapcomapre} data-position="top center">
                <Svg name="info-module" />
              </Block>
            </Block>        
          </Block>
          
          <Block className="actionBtns">
            <Button.Group>
              <Button
                onClick={this.handleCompareType.bind(this, 'SHARED_VIEW')}
                positive={compareBasemapType === 'SHARED_VIEW'}
              >{translation.sharedView}</Button>
              <Button.Or text={translation.or} />
              <Button
                onClick={this.handleCompareType.bind(this, 'SWIPE')}
                positive={compareBasemapType === 'SWIPE'}
              >{translation.swipe}</Button>
            </Button.Group>
          </Block>
          <Button onClick={this.handleCompare.bind(this)} className="close"><Svg name="close-new" /></Button>
        </Block>
      </Block>
    );
  }
}

export default connect((state) => ({
  translation: state.translation.translation,
  compareBasemap: state.basemap.selectedCompareMap,
  compareBasemapType: state.basemap.selectedCompareType,
  direction: state.translation.direction,
}))(BasemapCompare);