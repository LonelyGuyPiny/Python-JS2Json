import React from 'react'
import { Form, Label} from 'semantic-ui-react';

const TextInput = ({input, width, type, placeholder, readOnly, label, meta: {touched, error}}) => {
  return (
    <div>
      <Form.Field error={touched && !!error} width={width}>
        {label && <Label>{label}</Label>}
        <input {...input} placeholder={placeholder} type={type} readOnly={readOnly} />
        {touched && error && <Label basic color='red'>{error}</Label>}
      </Form.Field>
    </div>
  )
}

export default TextInput
