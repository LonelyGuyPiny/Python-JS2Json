import React from 'react';
import { Button, Radio, Tab } from 'semantic-ui-react';

import {
  Block,
  // Svg,
  ColorPicker
} from '../../../';
import { Size, Fill, Outline } from './';
import { LayersTransparencyBar } from '../Layers';

export default function ({ shape, outline, fill, handleOutlineOpacity, handleOutlineColor, handleSize, updateFill, updateOutline, isMeasurement, toggleMeasurement, translation }) {
  switch (shape) {
    case "Point":
      return (
        <>
          <Block className="d-flex justify-space-between titlehead0 title-head-bg-drawing pad-lr">
            <p className="font-weight-medium">{translation.drawSettings}</p>
          </Block>

          <Block className="d-flex justify-space-between shapes-block size mt-2 pad-lr">
            <Block className="label">
              <p className="font-weight-medium">{translation.size}</p>
            </Block>
            <Block>
              <Size
                placeholder="10px"
                onChange={handleSize}
                value={outline.size}
              />
            </Block>
          </Block>

          <Block className="d-flex justify-space-between shapes-block color mt-2 pad-lr">
            <Block className="label">
              <p className="font-weight-medium">{translation.color}</p>
            </Block>
            <Block className="field colorPicker">
              <ColorPicker color={outline.color} onChange={handleOutlineColor} />
            </Block>
          </Block>

          <Block className="d-flex justify-space-between shapes-block opacity mt-2 pad-lr">
            <Block className="label">
              <p className="font-weight-medium">{translation.opacity}</p>
            </Block>

            <Block className="rangeSliderBlock">
              <LayersTransparencyBar
                valueNow={handleOutlineOpacity}
                defaultValue={outline.opacity}
                value={outline.opacity}
              />
              <Button className="eye open">{(outline.opacity * 100).toFixed(0)}%</Button>
            </Block>
          </Block>
        </>
      );
    case "LineString":
      return (
        <>
          <Block className="d-flex justify-space-between titlehead0 title-head-bg-drawing pad-lr">
            <p className="font-weight-medium">{translation.drawSettings}</p>
            <Block className="d-flex justify-space-between measurement">
              <label>{translation.showMeasurements}</label>
              <Block className="switch">
                <Radio
                  toggle
                  checked={isMeasurement}
                  onChange={(e, { checked }) => toggleMeasurement(checked)}
                />
              </Block>
            </Block>
          </Block>

          <Block className="d-flex justify-space-between shapes-block size mt-2 pad-lr">
            <Block className="label">
              <p className="font-weight-medium">{translation.size}</p>
            </Block>
            <Block>
              <Size
                placeholder="10px"
                onChange={handleSize}
                value={outline.size}
              />
            </Block>
          </Block>

          <Block className="d-flex justify-space-between shapes-block color mt-2 pad-lr">
            <Block className="label">
              <p className="font-weight-medium">{translation.color}</p>
            </Block>
            <Block className="field colorPicker">
              <ColorPicker color={outline.color} onChange={handleOutlineColor} />
            </Block>
          </Block>

          <Block className="d-flex justify-space-between shapes-block opacity mt-2 pad-lr">
            <Block className="label">
              <p className="font-weight-medium">{translation.opacity}</p>
            </Block>

            <Block className="rangeSliderBlock">
              <LayersTransparencyBar
                valueNow={handleOutlineOpacity}
                defaultValue={outline.opacity}
                value={outline.opacity}
              />
              <Button className="eye open">{(outline.opacity * 100).toFixed(0)}%</Button>
            </Block>
          </Block>
        </>
      );
    // case "Polygon":
    default:
      return (
        <>
          {/* <Block className="d-flex align-item-center justify-space-between edit-delete-draw">
            <Block>
              <p className="d-flex align-item-center"><Svg name="backarrow" /> Edit Mode</p>
            </Block>
            <Block>
              <Block className="d-flex">
                <Button className="btn submitbtn"><Svg name="CheckboxIcon" /></Button>
                <Button className="btn eraserbtn"><Svg name="trashred" /></Button>
              </Block>
            </Block>
          </Block> */}

          <Block className="d-flex justify-space-between titlehead0 title-head-bg-drawing pad-lr">
            <p className="font-weight-medium">{translation.drawSettings}</p>
            <Block className="d-flex justify-space-between measurement">
              <label>{translation.showMeasurements}</label>
              <Block className="switch">
                <Radio
                  toggle
                  checked={isMeasurement}
                  onChange={(e, { checked }) => toggleMeasurement(checked)}
                />
              </Block>
            </Block>
          </Block>

          <Tab
            menu={{ secondary: true, pointing: true }}
            panes={
              [
                {
                  menuItem: translation.fill,
                  render: () => <Tab.Pane attached={false}>
                    <Fill fill={fill} updateFill={updateFill} />
                  </Tab.Pane>,
                },
                {
                  menuItem: translation.outline,
                  render: () => <Tab.Pane attached={false}>
                    <Outline outline={outline} updateOutline={updateOutline} />
                  </Tab.Pane>,
                },
              ]
            }
            className="drawingTabThird border-bottom-tab pad-lr"
          />
        </>
      );
  }
}