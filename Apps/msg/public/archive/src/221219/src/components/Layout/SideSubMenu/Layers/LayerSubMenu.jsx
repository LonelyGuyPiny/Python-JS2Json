import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Button, Input, Transition } from 'semantic-ui-react';

import { Block, Svg } from '../../..';
import { LayerMenuItem, LayerSubMenu } from '.';
import { removeSelectedLayerByParentId, selectAllLayersByParentId, setActiveSubMenu } from '../../../../redux/modules/layers'
import { showAllLayerLegendsByParentId, hideAllLayerLegendsByParentId, showSelectedLayerLegends, hideSelectedLayerLegends } from '../../../../redux/modules/legends'

class ParentMenu extends Component {
  state = {
    showSubMenu: false
  }

  handleOpenMenu = () => {
    // this.setState(({ showSubMenu }) => ({
    //   showSubMenu: !showSubMenu
    // }));
    const { dispatch, layer } = this.props;
    dispatch(setActiveSubMenu(layer.layerId));
  }

  handleRemoveAllLayer = () => {
    const { dispatch, layer, selectedLayerCounts, allLayers } = this.props;
    const count = selectedLayerCounts[layer.layerId] ? selectedLayerCounts[layer.layerId].count : 0;
    dispatch(removeSelectedLayerByParentId(count, layer.layerId));
    // dispatch(hideAllLayerLegendsByParentId(layer.layerId))
    if (layer.groupname) {
      const childLayers = allLayers.filter(l => l.parentlayerids.includes(layer.layerId) && l.sublayerids === null);
      childLayers.forEach(childLayer => {
        dispatch(hideSelectedLayerLegends(childLayer.groupname, childLayer.layerid));
      });
    } else {
      dispatch(hideAllLayerLegendsByParentId(layer.layerId))
    }
  }

  handleAddAllLayer = () => {
    const { dispatch, layer, allLayers } = this.props;
    dispatch(selectAllLayersByParentId(layer.layerId));
    // dispatch(showAllLayerLegendsByParentId(layer.url, layer.layerId));
    if (layer.groupname) {
      const childLayers = allLayers.filter(l => l.parentlayerids.includes(layer.layerId) && l.sublayerids === null);
      childLayers.forEach(childLayer => {
        dispatch(showSelectedLayerLegends(childLayer, childLayer.url, childLayer.id, layer.layerId, childLayer.groupname));
      })
    } else {
      setTimeout(() => {
        dispatch(showAllLayerLegendsByParentId(layer, layer.url, layer.layerId));
      }, 200);
    }
  }

  createLayersMenu = (layer) => {
    return layer.layers.map(l => {
      if (l.hasLayers) {
        return (
          <LayerSubMenu key={l.layerId} layer={l} parentLayer={layer} />
        )
      }
      return (
        <LayerMenuItem key={l.layerId} layer={l} parentLayer={layer} />
      )
    })
  }

  render() {
    const { layer, allLayers, selectedLayerCounts, activeSubMenu } = this.props;
    const subLayerCount = allLayers.filter(l => l.parentlayerids.includes(layer.layerId) && l.sublayerids === null).length;
    const count = selectedLayerCounts[layer.layerId] ? selectedLayerCounts[layer.layerId].count : 0;
    const isShowSubMenu = activeSubMenu.includes(layer.layerId);
    let subLayersJsx;
    if (isShowSubMenu) {
      subLayersJsx = this.createLayersMenu(layer);
    }
    // const { translation } = this.props;
    const layerName = layer.name;
    const layerNameJSX = layerName && layerName.length > 50 ? (<React.Fragment>{layerName.substr(0, 49)} <Svg name="text-tooltip" /> </React.Fragment>) : layerName;

    return (
      <Block className={`parentMenu parentSubMenu ${isShowSubMenu ? '' : 'hide'}`}>
        <Block className="titlehead0">
          <Button onClick={x => this.handleOpenMenu(layer.layerId)}><Icon link name='angle down' /></Button>
          {layerName.length > 50 ? (
            <h2 className="cursor-pointer" onClick={x => this.handleOpenMenu(layer.layerId)} data-tooltip={layerName} data-position="bottom center">{layerNameJSX}</h2>
          ) : (
              <h2 className="cursor-pointer"  onClick={x => this.handleOpenMenu(layer.layerId)}>{layerNameJSX}</h2>
            )}
          <Block className="numericInput">
            <Block className="numericFields">
              {count > 0 && <Input readOnly value={count} />}
              {(count > 0) && <button onClick={this.handleRemoveAllLayer} className="number minus" ><Svg name="minus" /></button>}
              {(count === 0 || count > 0) && subLayerCount !== count && <button onClick={this.handleAddAllLayer} className="number plus" ><Svg name="plus" /></button>}

            </Block>
          </Block>
          <Block className="notification"><span>{count}</span>          
          </Block>
        </Block>
        <Transition visible={isShowSubMenu} animation='slide down' duration={500}>
          <Block className="bottomList0">
            {subLayersJsx}
          </Block>
        </Transition>
      </Block>
    );
  }
}

export default connect(
  state => ({
    // translation: state.translation.translation,
    selectedLayerCounts: state.layers.selectedLayerCounts,
    activeSubMenu: state.layers.activeSubMenu,
    countActiveSubMenu: state.layers.activeSubMenu.length,
    allLayers: state.layers.allLayers,
    visibleLayers: state.layers.visibleLayers.length,
    // lastUpdatedAt: Date.now()
  })
)(ParentMenu);