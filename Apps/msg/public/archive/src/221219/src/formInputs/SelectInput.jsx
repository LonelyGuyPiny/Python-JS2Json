import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';

const SelectInput = ({input, type, placeholder, multiple, loading, options, meta: {touched, error}}, ...custom) => {
  return (
    <div>
      <Form.Field error={touched && !!error}>
        <Select 
            value={input.value || null}
            onChange={(e, data) => input.onChange(data.value)}
            placeholder={placeholder}
            options={options}
            multiple={multiple}
            loading={loading}
            />
            {touched && error && <Label basic color='red'>{error}</Label>}
      </Form.Field>
    </div>
  )
}

export default SelectInput
