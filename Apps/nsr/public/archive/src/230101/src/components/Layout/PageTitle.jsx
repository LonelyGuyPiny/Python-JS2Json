import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

export default class Pagetitle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title
    };
  }
  render() {
    return (
      <Helmet>
        <title>{this.state.title}</title>
      </Helmet>
    );
  }
}

Pagetitle.propTypes = {
  title: PropTypes.string.isRequired
};
