

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Select } from 'semantic-ui-react';

import { Block } from '../../../';
import { onLayerChange } from '../../../../redux/modules/toc';

const TOCSelectLayer = ({ dispatch, translation, selectedLayers, tocLayer }) => {
  const [slected, setSlected] = useState(null);
  useEffect(() => {
    if (tocLayer && tocLayer.layerId) {
      setSlected(tocLayer.layerId);
    }
  }, [tocLayer]);


  const handleChange = async (e, { value }) => {
    setSlected(value);
    dispatch(onLayerChange(selectedLayers[value]));
  }

  if (!selectedLayers) {
    return null;
  }

  let layers = Object.keys(selectedLayers).map(key => selectedLayers[key])
  // console.log("layers", layers);
  if (tocLayer && tocLayer.layerId && !selectedLayers[tocLayer.layerId]) {
    layers.push(tocLayer);
  }

  return (
    <Block className="toc-head-left">
      <Select placeholder={translation.selectLayer}
        onChange={handleChange}
        value={slected}
        icon="angle down"
        selectOnBlur={false}
        options={layers.map( layer => ({
          key: layer.layerId,
          value: layer.layerId,
          text: layer.name,
          parentlayer: layer.parentLayerId,
          url: layer.url,
          id: layer.id
        }))}>
      </Select>
    </Block>
  )
}

export default connect(
  state => ({
    selectedLayers: state.layers.selectedLayers,
    translation: state.translation.translation,
    tocLayer: state.tocData.tocLayer,
  })
)(TOCSelectLayer);