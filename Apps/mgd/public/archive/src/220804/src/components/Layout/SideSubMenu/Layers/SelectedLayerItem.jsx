import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Popup } from 'semantic-ui-react';

import { Block, Svg } from '../../..';
import { LayerFilterMenu, ClearTOCFilter } from './';
import { hideSelectedLayer, handleFilterLock } from '../../../../redux/modules/layers';
import { hideSelectedLayerLegends } from '../../../../redux/modules/legends';

class SelectedLayerItem extends Component {
  state = {
    isClearFilter: false,
    activeClass: false
  }

  UNSAFE_componentWillReceiveProps = () => {
    const { setActiveFilterMenu, selectedLayer: layer } = this.props;
    // console.log("layer.layerId === setActiveFilterMenu", layer.layerId, setActiveFilterMenu);
    if (layer.layerId === setActiveFilterMenu) {
      this.setState({ activeClass: true });
    } else {
      this.setState({ activeClass: false });
    }
  }

  deselectLayer = () => {
    const { selectedLayer, allLayers } = this.props;
    const sl = allLayers.find(l => l.layerid === selectedLayer.layerId);
    this.props.dispatch(hideSelectedLayer(sl));
    this.props.dispatch(hideSelectedLayerLegends(sl.name, sl.layerid));
  }

  toggleLockFilter = () => {
    const { dispatch, selectedLayer: layer, filterLayers, opacity } = this.props;
    const layerFilter = filterLayers[layer.layerId];
    const opacityValue = layerFilter ? layerFilter.opacity : opacity;
    const isLocked = !(layerFilter && layerFilter.isLocked);
    dispatch(handleFilterLock(layer.layerId, isLocked, opacityValue, layer));
  }

  handleActiveClassToggle = (layerId) => {
    // const { selectedLayer: layer } = this.props;
    // const { activeClass } = this.state;
    // console.log("layer.layerId", layer.layerId, layerId)
    // if (layerId === null) {
    //   this.setState({ activeClass: false });
    // }
    // if (layer.layerId === layerId) {
    //   this.setState({ activeClass: true });
    // }
    // console.log("layerId", layerId);
    // const { activeClass } = this.state;
    // this.setState({ activeClass: !activeClass });
  }

  render() {
    const {
      translation, isFilter, selectedLayer, filterLayers, scale, tocLayer,
      selectedLayer: layer, allLayers, layersData
    } = this.props;
    const { isClearFilter, activeClass } = this.state;
    const selectedLayername = selectedLayer.name;
    const layerNameJSX = selectedLayername && selectedLayername.length > 50 ? (<React.Fragment>{selectedLayername.substr(0, 49)} <Svg name="text-tooltip" /> </React.Fragment>) : selectedLayername;
    const layerFilter = filterLayers[selectedLayer.layerId];
    const isLocked = (layerFilter && layerFilter.isLocked);
    const isLayerInScale = !((scale >= selectedLayer.minScale && selectedLayer.minScale > 0) || (scale >= selectedLayer.MaxScaleDenominator && selectedLayer.MaxScaleDenominator > 0))
    const sl = allLayers.find(l => l.layerid === layer.layerId);
    return (
      <Block className={`list active ${isLayerInScale ? '' : 'opc-4'} ${activeClass ? 'layerSelect' : ''}`}>
        <Button onClick={this.deselectLayer} className="btn"><Svg className="checkboxselect" name="checkboxselect" /></Button>
        {selectedLayername.length > 50 ? (
          <Popup content={selectedLayername} className='locklayerpopup' trigger={<span className="menutext">{layerNameJSX}</span>} />
        ) : (
          <span className="menutext">{layerNameJSX}</span>
        )}
        <span className="icons">
          <span className="margin-iconslayer">
            {(
              (isFilter && tocLayer && tocLayer.layerId === layer.layerId) ||
              (layersData[layer.layerId] && layersData[layer.layerId].isFilter)
            ) &&
              <Svg onClick={() => this.setState({ isClearFilter: true })} name='layerfilterselected' />
            }
          </span>
          <Popup
            content={translation.lockUnlock}
            className='locklayerpopup'
            trigger={<Button
              onClick={this.toggleLockFilter}
              className="btn-none lockLayer icons"
            >
              {isLocked ? (
                <Svg name='locklayer' />
              ) : (
                <Svg name='unlocklayer' />
              )}
            </Button>} />

          <LayerFilterMenu layerFilter={layerFilter} isVisible layer={{ ...layer, exportCSV: sl.exportcsv, exportKMZ: sl.exportkmz, exportShapeZip: sl.exportshapezip, exportJson: sl.exportjson, exportKml: sl.exportkml, exportExcel: sl.exportexcel }} selectedActiveClass={this.handleActiveClassToggle} isSelectedLayer={true} />
        </span>
        {isClearFilter &&
          <ClearTOCFilter
            layerId={layer.layerId}
            close={() => this.setState({ isClearFilter: false })}
          />
        }
      </Block>
    )
  }
}

export default connect(
  state => ({
    translation: state.translation.translation,
    opacity: state.layers.opacity,
    layers: state.layers.layers,
    allLayers: state.layers.allLayers,
    filterLayers: state.layers.filterLayers,
    filterLayersKeys: Object.keys(state.layers.filterLayers),
    scale: state.layers.scale,
    isFilter: state.tocData.isFilter,
    layersData: state.tocData.layersData,
    tocLayer: state.tocData.tocLayer,
    setActiveFilterMenu: state.layers.setActiveFilterMenu
  })
)(SelectedLayerItem);
