import React from 'react';
import { Input } from 'semantic-ui-react';

import { Block } from '../../../';

export default function ({ placeholder, onChange, value }) {
  return(
    <Block className="ui input sizeCol"><Input type="number" min={1} value={value} placeholder={placeholder} onChange={(e, { value }) => onChange(value)} className="size-input" /><span>px</span></Block>
  )
}