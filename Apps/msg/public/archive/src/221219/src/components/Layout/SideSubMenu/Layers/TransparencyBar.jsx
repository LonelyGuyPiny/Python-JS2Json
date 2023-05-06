import React, { Component } from 'react';
import ReactSlider from 'react-slider';

export default class TransparencyBar extends Component {
  renderThumb = (props, state) => {
    const { translation } = this.props;
    return (
      <div data-tooltip={translation.setopacity} data-position="top center"
        {...props}
      >
        {state.valueNow}
      </div>
    );
  }

  handleChange = (valueNow) => {
    const { locked } = this.props;
    if (!locked) {
      this.props.valueNow(valueNow);
    }
  }

  // componentDidMount = () => {
  //   const { locked } = this.props;
  //   if (!locked) {
  //     this.props.valueNow(this.props.value);
  //   }
  // }

  render() {
    // const { translation } = this.props;
    const { defaultValue, value } = this.props;
    return (
      <ReactSlider
        defaultValue={defaultValue || 1}
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        renderThumb={this.renderThumb}
        onChange={this.handleChange}
        min={0.001}
        max={1}
        step={0.01}
        value={value}
      />

    )
  }
}
