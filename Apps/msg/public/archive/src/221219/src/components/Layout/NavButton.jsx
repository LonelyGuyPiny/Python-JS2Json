import React from 'react';
import { Button } from 'semantic-ui-react';
import { Svg } from './../../components';

export default ({ itemClassName, svg, title, onClick, isActive, ...custom }) => {
  return (
    <Button
      onClick={onClick}
      className={`${itemClassName} ${isActive ? 'active' : ''}`}
      {...custom}
    >
      <Svg name={svg} />
      <p>{title}</p>
    </Button>
  );
};