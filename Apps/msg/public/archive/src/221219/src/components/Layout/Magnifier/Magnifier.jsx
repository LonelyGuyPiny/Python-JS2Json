import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { Block, Svg } from '../../';
import MainMagnifier from './MainMagnifier';
import CompareMapMagnifier from './CompareMapMagnifier';

class Magnifier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    }
  }

  handleMagnifier = (isActive) => {
    this.setState({
      isActive
    });
  }

  render() {
    const { isActive } = this.state;
    const { compareBasemap, compareBasemapType,translation, direction } = this.props;
    return (
      <Block className="top-aside-links magnifier-top">
        {isActive &&
          <MainMagnifier />
        }
        {isActive && compareBasemap && compareBasemapType === 'SHARED_VIEW' &&
          <CompareMapMagnifier />
        }
        
        <Block className="magnifier-btns">
          <Button onClick={this.handleMagnifier.bind(this, !isActive)} className={`magnifierBtn ${isActive ? 'active' : ''}`} data-tooltip={translation.magnifier} data-position={`${direction === 'RTL' ? 'right' : 'left'} center`}><Svg className="magnifier" name="magnifier" /> <Svg className="close-icon" name="close-icon" /></Button>
        </Block>
      </Block>
    );
  }
}


export default connect((state) => {
  return ({
    compareBasemap: state.basemap.selectedCompareMap,
    compareBasemapType: state.basemap.selectedCompareType,
    translation: state.translation.translation,
    direction: state.translation.direction,
  })
})(Magnifier);