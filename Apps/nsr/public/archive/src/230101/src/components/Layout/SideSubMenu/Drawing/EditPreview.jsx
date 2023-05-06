import React from 'react';
import { Block } from '../../../';

export default function ({ shape, outline, fill, translation }) {

  switch (shape) {
    case "LineString":
      return (
        <Block className="previewBox">
          <Block className="previewImage lineString">
            <svg xmlns="http://www.w3.org/2000/svg" width="148.707" height="148.707" viewBox="0 0 148.707 148.707">
              <line id="Line_4" data-name="Line 4" x2="148" y2="148" transform="translate(0.354 0.354)" fill="none" stroke={`rgba(${outline.color.r}, ${outline.color.g}, ${outline.color.b}, ${outline.opacity})`} strokeWidth={outline.size} />
            </svg>
          </Block>
          <Block className="previewText">{translation.preview}</Block>
        </Block>
      );
    case "Point":
      return (
        <Block className="previewBox">
          <Block className="previewImage">
            <span style={{
              width: `${Number(outline.size) * 2}px`,
              height: `${Number(outline.size) * 2}px`,
              borderRadius: '50%',
              backgroundColor: `rgb(${outline.color.r}, ${outline.color.g}, ${outline.color.b})`,
              opacity: outline.opacity,
              display: 'block'
            }} />
          </Block>
          <Block className="previewText">{translation.preview}</Block>
        </Block>
      );
    case "Polygon":
      return (
        <Block className="previewBox">
          <Block className="previewImage lineString">
            <svg height="300" width="300" style={{ overflow: 'visible' }}>
              <polygon points="74,0 148,60 115,148 35,148 0,60" style={{ fill: `rgba(${fill.color.r}, ${fill.color.g}, ${fill.color.b}, ${fill.opacity})`, stroke: `rgba(${outline.color.r}, ${outline.color.g}, ${outline.color.b}, ${outline.opacity})`, strokeWidth: outline.size }} />
            </svg>
          </Block>
          <Block className="previewText">{translation.preview}</Block>
        </Block>
      );
    case "Circle":
      return (
        <Block className="previewBox">
          <Block className="previewImage lineString">
            <svg height="300" width="300" style={{ overflow: 'visible' }}>
              <circle cx="70" cy="70" r="80" stroke={`rgba(${outline.color.r}, ${outline.color.g}, ${outline.color.b}, ${outline.opacity})`} strokeWidth={outline.size} fill={`rgba(${fill.color.r}, ${fill.color.g}, ${fill.color.b}, ${fill.opacity})`} />
            </svg>
          </Block>
          <Block className="previewText">{translation.preview}</Block>
        </Block>
      );
    case "Box":
      return (
        <Block className="previewBox">
          <Block className="previewImage lineString">
            <svg height="300" width="300" style={{ overflow: 'visible' }}>
              <rect width="150" height="150" style={{ fill: `rgba(${fill.color.r}, ${fill.color.g}, ${fill.color.b}, ${fill.opacity})`, stroke: `rgba(${outline.color.r}, ${outline.color.g}, ${outline.color.b}, ${outline.opacity})`, strokeWidth: outline.size }} />
            </svg>
          </Block>
          <Block className="previewText">{translation.preview}</Block>
        </Block>
      );
    default:
      return (<div />);
  }
}