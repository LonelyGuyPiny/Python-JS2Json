import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Button, Input } from 'semantic-ui-react';

import { Block, Svg } from '../../..';
import SelectedLayerItem from './SelectedLayerItem';
import { removeAllSelectedLayers, resetActiveSubMenu, setFilterMenuActive } from '../../../../redux/modules/layers';
import { hideAllSelectedLayerLegends } from '../../../../redux/modules/legends';

class SelectedLayers extends Component {
  state = {
    showMenu: false
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (this.state.showMenu && nextProps.activeSubMenu.length > 0) {
      this.setState(({ showMenu }) => ({
        showMenu: !showMenu
      }));
    }
  }

  handleOpenMenu = () => {
    let { dispatch } = this.props;
    dispatch(resetActiveSubMenu());
    dispatch(setFilterMenuActive(null));
    this.setState(({ showMenu }) => ({
      showMenu: !showMenu
    }));
  }

  handleRemoveAllLayer = () => {
    const { dispatch } = this.props;
    dispatch(removeAllSelectedLayers());
    dispatch(hideAllSelectedLayerLegends());
  }

  render() {
    const { translation, selectedLayers, direction } = this.props;
    const { showMenu } = this.state;
    const selectedLayersIds = Object.keys(selectedLayers);
    const count = selectedLayersIds.length;
    let selectedlayersJsx;
    if (selectedLayersIds) {
      selectedlayersJsx = selectedLayersIds.map(lid => {
        return (<SelectedLayerItem key={lid} selectedLayer={selectedLayers[lid]} />)
      });
    }
    selectedlayersJsx = selectedlayersJsx.reverse();
    return (
      <Block className={`parentMenu ${showMenu ? 'parentShow' : 'hide parentHide'}`}>
        <Block className="titlehead0 title-head-bg">
          {count > 0 ? (
            <h2>{translation.selectedLayers}</h2>
          ) : (
            <h2 className="font-weight-regular text-center width-100">{translation.noselectedLayers}</h2>
          )}

          {count > 0 ?
            <Block className="numericInput numericinput-new">
              <Block className="numericFields">
                <Input readOnly value={count} />
                <Button onClick={this.handleRemoveAllLayer} className="number plus" data-tooltip={translation.deselect} data-position={`${direction === 'RTL' ? 'right' : 'left'} center`}><Svg name="minus" /></Button>
                <Button onClick={this.handleOpenMenu}><Icon name='angle down' /></Button>
              </Block>
            </Block>
            : ''}
          <Block className="notification"><span>{count}</span></Block>
        </Block>
        {showMenu &&
          <Block className={`bottomList0 ${count > 6 ? 'scrollopen' : ''}`}>
            {selectedlayersJsx}
          </Block>
        }
      </Block>
    )
  }
}

export default connect(
  state => ({
    translation: state.translation.translation,
    layers: state.layers.layers,
    selectedLayers: state.layers.selectedLayers,
    activeSubMenu: state.layers.activeSubMenu,
    visibleLayers: state.layers.visibleLayers.length,
    direction: state.translation.direction,
  })
)(SelectedLayers);