import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { Block, Svg } from '../../';
import GeoLocation from '../GeoLocation';

/**
 * Component
 * @name MapHistory
 * @description
 * This is the map history bar component of the application. 
 * On click on map history, this component is loaded
 */

class MapHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyPosition: 1,
      historySize: 0
    };
    this.history = [];
    this.view = null
    this.historyPosition = 1;
    this.isClearHistory = false;
    this.isTracking = false;
  }

  componentDidMount = async () => {
    const { map } = this.props;
    this.view = map.getView();
    map.on('moveend', this.updatePermalink);
  }

  updatePermalink = () => {
    // console.log('save')
    const view = this.view;
    if (this.isHistory || this.isTracking) {
      this.isHistory = false;
      return;
    }

    if (this.isClearHistory) {
      this.isClearHistory = false;
      this.history = this.history.slice(0, this.history.length - this.historyPosition + 1);
      this.historyPosition = 1;
    }

    // console.log('view.getRotation()', view.getRotation());

    const state = {
      zoom: view.getZoom(),
      center: view.getCenter(),
      rotation: view.getRotation()
    };
    if (this.history[this.history.length - 1] !== state) {
      this.history.push(state);
      this.setState({
        historySize: this.history.length,
        historyPosition: this.historyPosition
      });
    }
  };

  goBack = () => {
    this.historyPosition += 1;
    this.isHistory = true;
    const history = this.history[this.history.length - this.historyPosition];
    if (history) {
      this.isClearHistory = true;
      this.view.animate({
        center: history.center,
        zoom: history.zoom,
        rotation: history.rotation,
        duration: 1000
      });
      this.setState({
        historyPosition: this.historyPosition
      })
    } else {
      this.historyPosition -= 1;
    }
  }

  goForward = () => {
    this.historyPosition -= 1;
    this.isHistory = true;
    const history = this.history[this.history.length - this.historyPosition];
    if (history) {
      this.view.animate({
        center: history.center,
        zoom: history.zoom,
        rotation: history.rotation,
        duration: 1000
      });
      this.setState({
        historyPosition: this.historyPosition
      })
    } else {
      this.historyPosition += 1;
    }
  }

  render() {
    const { historyPosition, historySize } = this.state;
    const { translation, direction, map, compareMap } = this.props;
    // console.log('position size', historyPosition, historySize);
    return (
      <React.Fragment>
        <GeoLocation map={map} compareMap={compareMap} setTracking={(isTracking) => this.isTracking = isTracking} />
        <Block className="prev-next-loacation top-aside-links">
          <Block className="arrowbutton arrow-tobeleft">
            <Button disabled={historySize < 1 || historySize === historyPosition} onClick={this.goBack} className="magnifierBtn cursor-pointer" data-tooltip={translation.previousextent} data-position={`${direction === 'RTL' ? 'right' : 'left'} center`}><Svg className="previousmap" name="previousmap" /> </Button>
          </Block>
          {/* {historyPosition !== 1 && */}
            <Block className="arrowbutton arrow-toberight">
              <Button disabled={historyPosition === 1} onClick={this.goForward} className="magnifierBtn cursor-pointer" data-tooltip={translation.nextextent} data-position={`${direction === 'RTL' ? 'right' : 'left'} center`}>
                <Svg className="nextmap" name="nextmap" />
                <Svg className="close-icon" name="close-icon" />
              </Button>
            </Block>
          {/* } */}
        </Block>
      </React.Fragment>
    );
  }
}

export default connect((state) => {
  return ({
    translation: state.translation.translation,
    direction: state.translation.direction,
  })
})(MapHistory);