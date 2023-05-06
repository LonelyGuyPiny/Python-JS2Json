import React from 'react'
import { Form } from 'semantic-ui-react';

const RadioInput = ({input, value, label}) => {
  return (
    <Form.Field>
      <div className='ui radio'>
        <label>
          <input {...input} type="radio" value={value} />{' '}
          {label}
        </label>
      </div>
    </Form.Field>
  )
}

export default RadioInput;
