import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { Block , Svg } from '../..';

class ZoomButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleZoomInClick = (map) => {
    const view = map.getView();
    const zoom = view.getZoom();
    // view.setZoom(zoom + 1);
    view.animate({ zoom: zoom + 1, duration: 250 })
  }

  handleZoomOutClick = (map) => {
    const view = map.getView();
    const zoom = view.getZoom();
    // view.setZoom(zoom - 1);
    view.animate({ zoom: zoom - 1, duration: 250 })
  }

  render() {
    const { map, translation, direction } = this.props
    return (
      <Block className="zoom-top">
        <Block className="zoom-btns">
          <Button
            data-tooltip={translation.zooomin}
            data-position={`${direction === 'RTL' ? 'right' : 'left'} center`}
            onClick={() => this.handleZoomInClick(map)}>
            <Svg className="zoom-in-plus" name="zoom-in-plus" />
          </Button>
          <Button
            data-tooltip={translation.zooomout}
            data-position={`${direction === 'RTL' ? 'right' : 'left'} center`}
            onClick={() => this.handleZoomOutClick(map)}>
            <Svg className="zoom-in-minus" name="zoom-in-minus" />
          </Button>
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
})(ZoomButtons);