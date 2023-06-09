import React from 'react';
import { Checkbox, Form } from 'semantic-ui-react';


const CheckBox = ({ input, label, meta, ...custom }) => {
  const { touched, error } = meta || {};
  const name = (input && input.name) || custom.name;
  const value = ((input && input.value) || custom.value || custom.defaultValue || '').toString();
  const onChange = (input && input.onChange) || custom.onChange;

  const handleChange = (e, { checked }) => {
    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <Form.Field error={touched && !!error} disabled={custom.disabled}>
      <Checkbox
        name={name}
        label={label}
        value={value}
        checked={!!value}
        onChange={handleChange}
        disabled={custom.disabled}
        toggle={custom.toggle}
        className={custom.className || ''}
        slider={custom.slider || false}
        radio={custom.radio || false}
      />
    </Form.Field>
  );
};

export default CheckBox;