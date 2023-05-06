import React from 'react';
import { connect } from 'react-redux';
import { setDirToHtml } from '../../utils/common';

class Language extends React.Component {
  componentDidMount = () => {
    const { language } = this.props;
    setDirToHtml(language);
  }

  render() {
    return null;
  }
}

export default connect(
  state => ({
    language: state.translation.language,
    map: state.map.map,
    center: state.map.center,
    direction: state.translation.direction
  })
)(Language);
