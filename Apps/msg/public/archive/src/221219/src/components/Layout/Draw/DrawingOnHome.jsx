import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Block, Svg } from '../../';

/**
 * Component
 * @name DrawingOnHome
 * @description
 * This is the DrawingOnHome component of the application. 
 * On click on DrawingOnHome, this component is loaded
 */

class DrawingOnHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openClass: false
    };
  }

  render() {
    const { openClass } = this.state;
    return (
      <Block className="drawonmap-components">
        <Block className={`drawonmap cursor-pointer ${openClass ? '' : ''}`}>
          <span onClick={() => this.setState({ openClass: !openClass })}>
            <Svg name="drawingmap" />
          </span>
        </Block>
        {openClass && <Block className="drawonmap-elements drawonmap-elements-open">
          <Block className="d-flex justify-space-between drawingTabSecond align-item-center">
            <Block>
              <span onClick={() => this.setState({ openClass: !openClass })}>
                <Svg name="close-new" className="mr-1 cursor-pointer" />
              </span>
            </Block>
            <Button key="LineString" className="background-grey mr-1 btn-sm" >
              <Svg name="Line" />
            </Button>
            <Button key="Polygon" className="background-grey mr-1 btn-sm">
              <Svg name="Polygon" />
            </Button>
            <Button key="Box" className="background-grey  btn-sm">
              <Svg name="Square" />
            </Button>
          </Block>
        </Block>}
      </Block>
    );
  }
}
export default connect((state) => {
  return ({
    translation: state.translation.translation,
    direction: state.translation.direction,
    map: state.map.map
  })
})(DrawingOnHome);