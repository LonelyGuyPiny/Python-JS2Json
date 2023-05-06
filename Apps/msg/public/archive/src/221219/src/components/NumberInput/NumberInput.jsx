import React, { Component } from 'react';

export default class NumberInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: props.initialValue || 0,
      max: props.max || 100,
      min: props.min || 0,
    }
  }

  handleIncrease = () => {
    this.setState(({max, value}) => ({
      value: value === max ? value : value + 1
    }), () => this.props.handleChange(this.state.value))
  }

  handleDecrease = () => {
    this.setState(({min, value}) => ({
      value: value === min ? value : value - 1
    }), () => this.props.handleChange(this.state.value))
  }

  render() {
    const { value, max, min } = this.state;
    return(
      <div>
        <button disabled={min === value} onClick={this.handleDecrease}>-</button>
        <input id="input" readOnly value={value} />
        <button disabled={max === value} onClick={this.handleIncrease}>+</button>
      </div>
    );
  }
}

// NumberInput.defaultPorps = {
//   value: 0,
//   max: 100,
//   min: 0
// }