import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Button, Input, Transition } from 'semantic-ui-react';
import { Block, Svg } from '../../..';
import { LayerSubMenu, LayerMenuItem } from '.'
import { showAllLayerLegendsByParentId, hideAllLayerLegendsByParentId, showSelectedLayerLegends, hideSelectedLayerLegends } from '../../../../redux/modules/legends'
import { removeSelectedLayerByParentId, selectAllLayersByParentId, setActiveSubMenu, setFilterMenuActive } from '../../../../redux/modules/layers'


class ParentMenu extends Component {
  state = {
    showMenu: false,
    selected: false
  }

  handleOpenMenu = (layer) => {
    const { dispatch } = this.props;
    dispatch(setActiveSubMenu(layer.layerId));
  }

  handleRemoveAllLayer = () => {
    this.setState({ selected: false });
    const { dispatch, layer, selectedLayerCounts, allLayers } = this.props;
    const count = selectedLayerCounts[layer.layerId] ? selectedLayerCounts[layer.layerId].count : 0;
    dispatch(removeSelectedLayerByParentId(count, layer.layerId));
    // const id = layer.layerId.split('-')[1];
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
    this.setState({ selected: true });
    const { dispatch, layer, allLayers } = this.props;
    dispatch(setFilterMenuActive(null));
    dispatch(selectAllLayersByParentId(layer.layerId));
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
    const { translation, direction } = this.props;
    const { layer, selectedLayerCounts, activeSubMenu, allLayers } = this.props;
    const subLayerCount = allLayers.filter(l => l.parentlayerids.includes(layer.layerId) && l.sublayerids === null).length;
    const { selected } = this.state;
    const count = selectedLayerCounts[layer.layerId] ? selectedLayerCounts[layer.layerId].count : 0;
    let layersJsx;
    let isShowMenu = activeSubMenu.includes(layer.layerId);
    if (isShowMenu) {
      layersJsx = this.createLayersMenu(layer);
    }
    const layerName = layer.name;
    const layerNameJSX = layerName && layerName.length > 50 ? (<React.Fragment>{layerName.substr(0, 49)} <Svg name="text-tooltip" /> </React.Fragment>) : layerName;
    return (
      <Block className={`parentMenu ${isShowMenu ? '' : 'hide'} ${selected && count ? 'selected' : ''}`} animation='slide down' duration={500}>
        <Block className="titlehead0">
          <Button onClick={x => this.handleOpenMenu(layer)} ><Icon name='angle down' /></Button>
          {layerName.length > 50 ? (
            <h2 className="cursor-pointer" onClick={x => this.handleOpenMenu(layer)} data-tooltip={layerName} data-position="bottom center">{layerNameJSX}</h2>
          ) : (
              <h2 className="cursor-pointer" onClick={x => this.handleOpenMenu(layer)} >{layerNameJSX}</h2>
            )}
          <Block className="numericInput">
            <Block className="numericFields">

              {count > 0 && <Input readOnly value={count} />}
              {(count > 0) && <button onClick={this.handleRemoveAllLayer} className="number minus bottom-minus" data-tooltip={translation.deselect} data-position={`${direction === 'RTL' ? 'right' : 'left'} center`} ><Svg name="minus" /></button>}
              {(count === 0 || count > 0) && subLayerCount !== count && <button onClick={this.handleAddAllLayer} className="number plus" data-tooltip={translation.selectall}  data-position={`${direction === 'RTL' ? 'right' : 'left'} center`}><Svg name="plus" /></button>}
            </Block>
          </Block>
          <Block className="notification"><span>{count}</span></Block>
        </Block>
        <Transition visible={isShowMenu} animation='slide down' duration={500}>
          <Block className="menuwithList">
            {layersJsx}
          </Block>
        </Transition>
      </Block>
    );
  }
}

export default connect(
  state => {
    return ({
      translation: state.translation.translation,
      direction: state.translation.direction,
      selectedLayerCounts: state.layers.selectedLayerCounts,
      activeSubMenu: state.layers.activeSubMenu,
      countActiveSubMenu: state.layers.activeSubMenu.length,
      allLayers: state.layers.allLayers,
      visibleLayers: state.layers.visibleLayers.length
    })
  }
)(ParentMenu);