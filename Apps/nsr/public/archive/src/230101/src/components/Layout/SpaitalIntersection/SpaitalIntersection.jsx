import React from 'react';
import { Button, Input, Dropdown, Checkbox } from 'semantic-ui-react'

import { Block, Svg } from '../../';
import { settings } from '../../../config/settings';

export default function SpaitalIntersection({
  translation, layer, layers, isBuffer, buffer, selectedUnitType, tocLayer,
  handleLayer, clearSource, toggleBuffer, handleBuffer, handleSubmit,
  showBuffer
}) {
  return (
    <React.Fragment>
      <Block className="d-flex justify-space-between align-item-center">
        {/* <Block className="intersect-heading"><p className="font-weight-medium ">{translation.intersectheading}</p></Block> */}
        <Button className="module-info d-flex justify-content-end cursor-pointer btn-none" data-tooltip={translation.spaitalinfo} data-position="top center">
        <Svg name="info-module" />
      </Button>
        <Block className="closeIcon">
          <Svg onClick={clearSource} className="close-new" name="close-new" />
        </Block>
      </Block>
      <Block className="mt-1">
        <p className='font-weight-medium'>{translation.intersectlayer}</p>
      </Block>
      <Block className="">
        {/* <Block className="label"><p>Intersected Layer</p></Block> */}
        <Block className="ui input fontCol form-intersect d-flex justify-space-between ">
          <Dropdown
            fluid
            search
            placeholder={translation.selectLayer}
            onChange={handleLayer}
            selection
            value={layer}
            icon="angle down"
            selectOnBlur={false}
            options={layers.map(layer => ({
              key: layer.layerId,
              value: layer.layerId,
              text: layer.name,
              parentlayer: layer.parentLayerId,
              url: layer.url,
              id: layer.id
            }))}
          />
        </Block>
      </Block>
      {showBuffer  && <Block className="d-flex justify-space-between shapes-block size  align-item-center mt-1 intersect-input">
        <Block className="flex-grow">
          <Checkbox label={translation.bufferdistance} checked={isBuffer} onChange={toggleBuffer} className="" />
        </Block>
        <Block className="ui input textCol w-25">
          <Input
            type="number"
            placeholder={"Enter Buffer"}
            className="size-input"
            onChange={handleBuffer}
            value={buffer}
            disabled={!isBuffer}
            step={settings.stepBuffer}
            min={settings.minBuffer}
          />
        </Block>
        <Block className="form-intersect">
          <p className={`${isBuffer ? 'opc-low' : ''}`}>{selectedUnitType === 'metric' ? translation.meter : translation.feet}</p>
        </Block>
      </Block>}

      <Block className="mt-1 intersect-button">
        <Button
          className="button-border-dark mx-auto justify-content-center mt-2"
          type="button"
          disabled={(layer === (tocLayer ? tocLayer.layerId : '') && !isBuffer) || (isBuffer && !Number(buffer)) || !layer}
          onClick={handleSubmit}
        >
          <Svg name="toc-submit-arrow" /> {translation.submit}
        </Button>
      </Block>     
    </React.Fragment>
  );
}