import React from 'react';
import PropTypes from 'prop-types';
import { Form, Radio } from 'semantic-ui-react';
// import { Radio } from 'react-bootstrap';


export default class RadioGroup extends React.Component {
  static get propTypes() {
    return {
      input: PropTypes.object,
      name: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        className: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool])
      })).isRequired,
      meta: PropTypes.object,
      custom: PropTypes.object
    };
  }

  state = {
    selectedValue: ''
  };

  componentDidMount() {
    this.updateStateValue(this.props);
  }

  UNSAFE_componentWillUpdate (nextProps, nextState) {
    this.updateStateValue(nextProps, nextState);
  }

  updateStateValue = (props, nextState) => {
    const { input, ...custom } = props;
    let value = '';

    if (input && input.value !== null && input.value !== undefined) {
      value = input.value.toString();
    } else if (custom && custom.value !== null && custom.value !== undefined) {
      value = custom.value.toString();
    }

    if (nextState) {
      nextState.selectedValue = value;
      return;
    }

    this.setState({ selectedValue: value });
  };

  handleChange = (e, { value }) => {
    const { input, options, ...custom } = this.props;
    // don't change in disabled mode.
    if (custom.disabled) {
      return;
    }

    // to avoid fire twice Redux form events
    if (this.currentSelection === value && this.currentSelection === input.value) {
      return;
    }
    this.currentSelection = value;

    const onChange = (input && input.onChange) || (custom && custom.onChange);

    if (onChange) {
      // find item
      const item = (options || []).find(o => o.value.toString() === value);
      // return the exact type value
      onChange(item.value);
    }

    // Set State
    this.setState({ selectedValue: value });
  };

  render() {
    const { input, meta, label, options, defaultValue, ...custom } = this.props;
    const { touched, error } = meta || {};
    const name = (input && input.name) || (custom && custom.name);

    const { selectedValue } = this.state;
    let value = selectedValue || defaultValue;

    return (
      <Form.Field
        error={touched && !!error}
        className={custom.className || ''}
      >
        {label && <label>{label}</label>}
        {
          (options || []).map((item) => {
            return (
              <span key={item.key || item.value} className={item.className}>
                <Radio
                  name={name}
                  label={item.text}
                  value={item.value.toString()}
                  checked={(selectedValue || value) === item.value.toString()}
                  onChange={this.handleChange}
                  {...custom}
                />
              </span>
            );
          })
        }
      </Form.Field>
    );
  }
}
