import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import TopLoader from "react-top-loader";

// import { Block } from '../';

/**
 * Component
 * @name TopLoaderBar
 * @description
 * This is the top loader bar component of the application. 
 * On application startup, this component is loaded
 */

class TopLoaderBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showHide: false
    }
  }
  componentDidMount = () => {
    const { map } = this.props;
    map.on('loadstart', this.handleMapLoadStart);
    map.on('loadend', this.handleMapLoadend);
  }

  componentWillUnmount = () => {
    const { map } = this.props;
    map.un('loadstart', this.handleMapLoadStart);
    map.un('loadend', this.handleMapLoadend);
  }

  handleMapLoadStart = () => {
    const { showHide } = this.state;
    if (!showHide) {
      this.setState({ showHide: !showHide });
    }
  }

  handleMapLoadend = () => {
    const { showHide } = this.state;
    if(showHide) {
      this.setState({ showHide: !showHide });
    }
  }

  render() {
    const { showHide } = this.state;
    return (
      <TopLoader
        className="top-loader"
        // backgroundColor="#FF0000"
        color='#1BC5BD'
        // fixed={false}
        show={showHide}
        thickness={5}
        delay={1000}
      />
    );
  }
}

export default connect(
  state => ({
    mapLoading: state.basemap.loading
  }))(TopLoaderBar);
