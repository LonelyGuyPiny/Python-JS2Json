import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { Block, Svg } from '../../';
import {
  Basemap,
  Layers,
} from './';
import TOC from './TOC/TOC'
import Legends from './Legends/Legends';
import Search from './Search/Search';
import { SystemSettings } from './SystemSettings';
import { ExportMap } from './ExportMap';
// import { Terms } from './Terms';
import Drawing from './Drawing/Drawing';
import { Feed, Terms, Support } from '../Modals';

/**
 * Component
 * @name SideSubMenu
 * @description
 * This is the side sub menu component of the application. 
 * On application startup, this component is loaded
 */
class SideSubMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubMenuOpen: false,
      activeModals: {}
    }
    this.activeModal = [];
  }

  handleSubMenu = () => {
    this.setState(({ isSubMenuOpen }) => ({
      isSubMenuOpen: !isSubMenuOpen
    }), () => this.props.onMenuToggle(this.state.isSubMenuOpen, this.state.isSubMenuOpen))
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (nextProps.activeSubMenu && nextProps.activeSubMenu !== this.props.activeSubMenu) {
      this.setState({
        isSubMenuOpen: true
      });
      this.props.onMenuToggle(false, true);
    }
    if (nextProps.activeSubMenu === null && nextProps.activeSubMenu !== this.props.activeSubMenu) {
      this.setState({
        isSubMenuOpen: false
      });
    }
  }

  closeModal = (name) => {
    this.setState(({ activeModals}) => ({
      activeModals: activeModals
    }), () => this.props.onMenuToggle(this.state.isSubMenuOpen, this.state.isSubMenuOpen))
  }

  rendeSubMenuItem = (activeSubMenu) => {
    if (this.activeModal.includes(activeSubMenu)) {
      this.activeModal = [];
    } else {
      this.activeModal.push(activeSubMenu);
    }
    switch (activeSubMenu) {
      case 'basemaps':
        return (<Basemap />);
      case 'layers':
        return (<Layers />);
      case 'layerRecords':
        return (<TOC />);
      case 'legend':
        return (<Legends />);
      case 'search':
        return (<Search />);
      case 'systemSettings':
        return (<SystemSettings />);
      case 'export':
        return (<ExportMap />);
      case 'draw':
        return (<Drawing />);
      // case 'terms':
      //   return (<Terms />);
      case 'whatsNew':
        return (<Feed open={this.activeModal.includes('whatsNew')} close={() => this.closeModal('whatsNew')} />);
      case 'terms':
        return (<Terms open={this.activeModal.includes('terms')} close={() => this.closeModal('terms')} />);
      case 'support':
        return (<Support open={this.activeModal.includes('support')} close={() => this.closeModal('support')} />);
      // case 'moreicon':
      //   return (<Moreicon />);
      default:
        return null;
    }
  }

  render() {
    const { isSubMenuOpen } = this.state;
    const { activeSubMenu, handleMenu } = this.props;
    let activemenuClass = isSubMenuOpen;
    if (activeSubMenu === 'whatsNew' || activeSubMenu === 'terms' || activeSubMenu === 'support') {
      activemenuClass = false;
    }
    return (
      <Block id="menuShowhide-block" className={`menuShowhide ${activemenuClass ? '' : 'hide hide'}${activeSubMenu}`}>
        <Button onClick={() => {handleMenu(); this.handleSubMenu(); }} className="mob-menu-icon2 btn-none">
          <Svg className="mob-menu-new" name="mobile-menu" />
        </Button>
        <Block className="switch-btn ui">
          <Button id="toggle-sbar" onClick={this.handleSubMenu} className="btn-none">
            <Svg name="close-new" />
          </Button>
        </Block>
        <Block className="sidebar-dropdown">
          {this.rendeSubMenuItem(activeSubMenu)}
        </Block>
      </Block>
    );
  }
}

export default connect(
  state => ({
    map: state.map.map,
    center: state.map.center
  })
)(SideSubMenu);

