import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Popup
} from 'semantic-ui-react';

import { Block, Svg } from '../../..';
import { showLayer, hideLayer, handleFilterLock, fetchAllLayersDataByParentId, setFilterMenuActive } from '../../../../redux/modules/layers';
import { showSelectedLayerLegends, hideSelectedLayerLegends } from '../../../../redux/modules/legends';
import { LayerFilterMenu, ClearTOCFilter } from './';
// import { getLayerParentId, getLayerId } from '../../../../utils/layer';

class LayerMenuItem extends Component {
  state = {
    isClearFilter: false,
    activeClass: false
  }

  UNSAFE_componentWillReceiveProps = ({ layer, setActiveFilterMenu }) => {
    // console.log("layer.layerId", layer.layerId);
    // console.log("setActiveFilterMenu", setActiveFilterMenu);
    if (layer.layerId !== setActiveFilterMenu) {
      this.setState({ activeClass: false });
    }
  }

  handleShowLayer = async () => {
    this.props.dispatch(setFilterMenuActive(null));
    this.setState({ activeClass: false });
    const { layer, parentLayer, subLayer } = this.props;
    this.props.dispatch(showLayer(layer, parentLayer, subLayer));
    const parentId = layer.parentLayerIds[0];
    setTimeout(async() => {
      await this.props.dispatch(showSelectedLayerLegends(layer, layer.url, layer.id, parentId, layer.Name));
    }, 200);
  }

  handleHideLayer = () => {
    this.props.dispatch(setFilterMenuActive(null));
    this.setState({ activeClass: false });
    const { layer, parentLayer, subLayer } = this.props;
    this.props.dispatch(hideLayer(layer, parentLayer, subLayer));
    this.props.dispatch(hideSelectedLayerLegends(layer.name, layer.layerId));
    this.props.dispatch(fetchAllLayersDataByParentId(layer.layerId));
  }

  toggleLockFilter = () => {
    const { dispatch, layer, filterLayers, opacity } = this.props;
    const layerFilter = filterLayers[layer.layerId];
    const opacityValue = layerFilter ? layerFilter.opacity : opacity;
    const isLocked = !(layerFilter && layerFilter.isLocked);
    dispatch(handleFilterLock(layer.layerId, isLocked, opacityValue, layer));
  }

  handleActiveClassToggle = (layerId) => {
    const { layer } = this.props;
    if (layerId === null) {
      this.setState({ activeClass: false });
    }
    if (layer.layerId === layerId) {
      this.setState({ activeClass: true });
    }
  }

  render() {
    const {
      layer, visibleLayers, filterLayers, scale, isFilter, tocLayer, translation,
      layersData
    } = this.props;
    const { isClearFilter, activeClass } = this.state;
    const isVisible = visibleLayers.includes(layer.layerId);
    const layerFilter = filterLayers[layer.layerId];
    const isLocked = (layerFilter && layerFilter.isLocked);
    const isLayerInScale = !((scale >= layer.minScale && layer.minScale > 0) || (scale >= layer.MaxScaleDenominator && layer.MaxScaleDenominator > 0));
    const layerName = layer.name;
    const layerNameJSX = layerName && layerName.length > 50 ? (<React.Fragment>{layerName.substr(0, 49)} <Svg name="text-tooltip" /> </React.Fragment>) : layerName;
    return (
      <Block className={`list ${!isLayerInScale ? 'opc-4' : ''} ${isVisible ? 'active' : ''} ${activeClass ? 'layerSelect' : ''}`}>
        {isVisible ? (
          <Button onClick={this.handleHideLayer} className="btn"><Svg className="checkboxselect" name="checkboxselect" /></Button>
        ) : (
          <Button onClick={this.handleShowLayer} className="btn"><Svg className="checkboxdefault" name="checkboxdefault" /></Button>
        )}
        {layerName.length > 50 ? (
          <span className="menutext" data-tooltip={layerName} data-position="top center">{layerNameJSX}</span>
        ) : (
          <span className="menutext">{layerNameJSX}</span>
        )}

        <span className="icons">
          {isVisible &&
            <React.Fragment>
              <span className="margin-iconslayer">
                {((isFilter && tocLayer && tocLayer.layerId === layer.layerId) ||
                (layersData[layer.layerId] && layersData[layer.layerId].isFilter)) &&
                  <Svg onClick={() => this.setState({ isClearFilter: true })} name='layerfilterselected' />
                }
              </span>

              <Popup
                content={translation.lockUnlock}
                className='locklayerpopup'
                trigger={<Button
                  onClick={this.toggleLockFilter}
                  className="btn-none lockLayer"
                >
                  {isLocked ? (
                    <Svg name='locklayer' />
                  ) : (
                    <Svg name='unlocklayer' />
                  )}
                </Button>}
              />
            </React.Fragment>
          }
          <LayerFilterMenu layerFilter={layerFilter} isVisible={isVisible} layer={this.props.layer} activeClass={this.handleActiveClassToggle} isSelectedLayer={false} />
          {isClearFilter &&
            <ClearTOCFilter
              layerId={layer.layerId}
              close={() => this.setState({ isClearFilter: false })}
            />
          }
        </span>
      </Block>
    );
  }
}

export default connect(
  state => {
    return ({
      visibleLayers: state.layers.visibleLayers,
      isFilter: state.tocData.isFilter,
      tocLayer: state.tocData.tocLayer,
      layersData: state.tocData.layersData,
      countVisibleLayers: state.layers.visibleLayers.length,
      filterLayers: state.layers.filterLayers,
      filterLayersKeys: Object.keys(state.layers.filterLayers),
      opacity: state.layers.opacity,
      // filterLayerIds: state.tocData.filterLayerIds,
      scale: state.layers.scale,
      tocFilterCondition: state.tocData.tocFilterCondition,
      // selectedLayerToc: state.tocData.selectedLayerToc,
      tocGeometry: state.tocData.tocGeometry,
      translation: state.translation.translation,
      setActiveFilterMenu: state.layers.setActiveFilterMenu
    });
  }
)(LayerMenuItem);