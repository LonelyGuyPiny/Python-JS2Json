import React, { Component } from 'react';
import { connect } from 'react-redux';
import TransparencyBar from './TransparencyBar'

class LayersTransparencyBar extends Component {
  timeout = null;
  v = this.props.defaultValue
  state = {
    value: this.v === 0 ? this.v : this.v || 1
  }

  valueNow = (v) => {
    clearTimeout(this.timeout);
    const { direction } = this.props;
    let value = v;
    
    if (direction !== 'LTR') {
      value = Number((1 - v).toFixed(2));
      value = value === -0 ? 0 : value;
    }
    
    this.props.valueNow(value);
    this.setState({ value });
    this.timeout = setTimeout(() => this.onDragEnd(), 500);
  }

  onDragEnd = () => {
    if (this.props.onSlideEnd) {
      this.props.onSlideEnd(this.state.value);
    }
  }

  render() {
    const { defaultValue, locked, direction, value: val, translation } = this.props;
    let { value: v } = this.state;
    v = val || v;
    let value = v === 0 ? v : v || 1;
    if (direction === 'RTL') {
      value = 1 - value;
    }

    return (
      <TransparencyBar
        defaultValue={defaultValue}
        translation={translation}
        value={value}
        locked={locked}
        valueNow={this.valueNow}
      />
    )
  }
}

export default connect(
  state => ({
    lang: state.translation.language,
    direction: state.translation.direction,
    translation: state.translation.translation,
  })
)(LayersTransparencyBar);