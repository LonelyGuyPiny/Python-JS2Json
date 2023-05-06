import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Button, Label } from 'semantic-ui-react';

import { Block, Svg } from './../../components';
import SideSubMenu from './SideSubMenu';
import { Swipe, SharedView, BasemapCompare } from './SideSubMenu/Basemap';
import { NavButton, ModalMenu } from './';
import { logout } from '../../redux/modules/auth';
import { setDwaingLayer } from '../../redux/modules/drawing';
import { setActiveMenuItem } from '../../redux/modules/menu';
import { 
  topMenu,
  // mainMenu,
  bottomMenu 
} from '../../constants/mainMenuItems';
import mainMenu from '../../config/mainMenu';
import BottomBar from './BottomBar/BottomBar';
// import SpatialPopUp from './SpatialPopUp';
import UrlQuery from './UrlQuery';
import SearchUrlQuery from './SearchUrlQuery';
import CoordinatesUrlQuery from './CoordinatesUrlQuery';
import logomain from '../../assets/images/mainlogo.png';
import { fetchLayers } from '../../redux/modules/layers';
import { fetchInitialSearchLayersData } from '../../redux/modules/search'
import store from 'store2';
import { settings } from '../../config/settings';

/**
 * Component
 * @name MenuSidebar
 * @description
 * This is the menu sidebar component of the application. 
 * On application startup, this component is loaded
 */
class MenuSidebar extends Component {
  state = { open: false }

  constructor(props) {
    super(props);
    this.state = {
      mobMenu: false,
      activeNav: this.props.activeMenuItem,
      hideActiveMenu: false,
      hover: false,
      isMianNavOpen: false,
      isMianNavOpenLock: true,
      moreMenuActive: false
    };
  }

  componentDidMount = async () => {
    this.props.dispatch(fetchLayers());
    this.props.dispatch(fetchInitialSearchLayersData());
    // this.props.dispatch(fetchSearchLayersData());

    if (document.body.offsetWidth < 640) {
      this.setState({
        mobMenu: true
      })
    }

  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    const { activeMenuItem: oldNav } = this.props;
    const { activeMenuItem } = nextProps;
    if (oldNav !== activeMenuItem) {
      this.setState({ activeNav: activeMenuItem });
    }
  }

  logout = () => {
    const { dispatch } = this.props;
    dispatch(setActiveMenuItem(null));
    dispatch(setDwaingLayer(null));
    dispatch(logout());
  }

  handleMenu = () => {
    this.setState(({ isMianNavOpenLock }) => ({
      isMianNavOpenLock: !isMianNavOpenLock
    }));
  }

  handleNavButton = activeNav => () => {
    this.setState({ activeNav, isMianNavOpenLock: false, moreMenuActive: false });
    this.props.dispatch(setActiveMenuItem(activeNav));
  }

  onMenuToggle = (hideActiveMenu, isSubMenu) => {
    this.setState({
      hideActiveMenu: hideActiveMenu
    });
    if (!isSubMenu) {
      const activeNav = null;
      this.setState({ activeNav });
      this.props.dispatch(setActiveMenuItem(activeNav));
    }
  }
  

  handleHover = () => {
    this.setState({
      hover: !this.state.hover
    })
  }

  handleNavOver = () => {
    if (!this.state.isMianNavOver) {
      this.setState({ isMianNavOver: true });
      const self = this;
      if (!self.state.isMianNavOpen) {
        setTimeout(() => {
          if (self.state.isMianNavOver) {
            self.setState({
              isMianNavOpen: true
            });
          }
        }, 5000);
      }
    }
  }

  handleModalMenu = (menu) => {
    this.props.dispatch(setActiveMenuItem(menu));
    this.setState({ activeNav: menu, isMianNavOpenLock: false, moreMenuActive: true });
  }

  render() {
    const { translation, visibleLayers, compareBasemap, compareBasemapType, countLayers, compareMap,direction } = this.props;
    const { mobMenu, activeNav, hideActiveMenu, isMianNavOpen, isMianNavOpenLock, moreMenuActive } = this.state;
    
    const basepath = sessionStorage.getItem('basepath');
    const user = store(`${basepath}-authUser`)
    const appMainMenu = [...new Set(mainMenu.mainMenu)];
    return (
      <Block id="aside-main-nav" className={`asideMain${hideActiveMenu ? ' no-child' : ''}${activeNav ? '' : ' hidden-menu'}`}>
        <Block className='sidebar'>
          <Menu
            className={`pointing secondary vertical${this.state.hover ? 'menuOpen' : ''} ${isMianNavOpenLock || isMianNavOpen ? 'expanded' : 'closed'}`}
          >
            <Block className="top-main-header">
              <Block className="border-botton-base d-flex align-item-center">
                {/* <Svg name="logo"/> */}
                <Block className="logo-block">
                  <img className="logo-main-size" alt="" src={logomain} />
                </Block>
                {topMenu && topMenu.map(item => (
                  <NavButton
                    key={item.name}
                    isActive={activeNav === item.name}
                    onClick={this.handleMenu}
                    svg={mobMenu ? 'mobile-menu' : item.name}
                    title={translation[item.title]}
                  />
                ))}
              </Block>
              <Block
                className="top-menu-items"
              >
                {appMainMenu && appMainMenu.map(item => (
                  <Block className="layer-button" key={item}  data-tooltip={translation[item]} data-position={`${direction === 'RTL' ? 'left' : 'right'} center`}>
                    {item === 'layers' && visibleLayers > 0 && activeNav !== 'layers' &&
                      <Label circular className="label-counter cursor-pointer"  onClick={this.handleNavButton(item)}  >
                        {visibleLayers}
                      </Label>
                    }
                    <NavButton
                      isActive={activeNav === item}
                      onClick={this.handleNavButton(item)}
                      svg={item}
                      title={translation[item]}
                      itemClassName={item}
                    />
                  </Block>
                ))}
                <ModalMenu moreMenuActive={moreMenuActive} activeModalMenu={this.handleModalMenu} hideActiveMenu={() => { this.onMenuToggle(false, false) }} activeNav={activeNav} />
              </Block>
            </Block>
            <Block
              className="bottom-menu-items last-menu"
            >
              {bottomMenu && bottomMenu.map(item => (
                <NavButton
                  key={item.name}
                  isActive={activeNav === item.name}
                  onClick={this.handleNavButton(item.name)}
                  svg={item.name}
                  title={translation[item.title]}
                  data-tooltip={translation[item.title]} data-position={`${direction === 'RTL' ? 'left' : 'right'} center`}
                />
              ))}
              {settings.login &&
                <Block className="login-menu">
                  <Button onClick={this.logout} className="user-login"><Svg className="user" name="new-user" />
                    <span className="d-flex logoutas">
                      <p className="logout-para">{translation.signedinas}</p> <p className="logout-para2">{user ? user.username : ''}</p>
                    </span>
                  </Button>
                  <Button onClick={this.logout} className="logout"><Svg className="logout" name="logout-new-icon" /> <p>{translation.logout}</p></Button>
                </Block>
              }
            </Block>
          </Menu>
          <SideSubMenu handleMenu={this.handleMenu} onMenuToggle={this.onMenuToggle} activeSubMenu={activeNav} />
        </Block>
        <BottomBar compareMap={compareMap} />
        <Block className="siderightMenuswrap">
          <Block className="siderightMenus sideRotateAngles">
            <Button className="arrowAngleleft"><Svg name="arrowAngleleft" /></Button>
            <Button className="arrowAngleright"><Svg name="arrowAngleright" /></Button>
          </Block>
          <Block className="siderightMenus sideMenuTop">
            <Button className="drawPlus"><Svg name="plus" /></Button>
            <Button className="drawMinus"><Svg name="minus" /></Button>
          </Block>
          <Block className="siderightMenus sideMenuBottom">
            <Button className="drawsearch"><Svg name="drawSearch" /></Button>
            <Button className="drawRotate"><Svg name="drawRotate" /></Button>
            <Button className="draw3d"><Svg name="draw3d" /></Button>
            <Button className="drawUser"><Svg name="drawUser" /></Button>
          </Block>
        </Block>
        {/* <SpatialPopUp /> */}
        {countLayers > 0 && <UrlQuery />}
        {countLayers > 0 && <SearchUrlQuery />}
        {countLayers > 0 && <CoordinatesUrlQuery />}
        {compareBasemap && compareBasemapType === 'SWIPE' && <Swipe compareBasemap={compareBasemap} activeNav={activeNav} />}
        {compareBasemap && compareBasemapType === 'SHARED_VIEW' && <SharedView />}
        {compareBasemap && <BasemapCompare />}
      </Block>
    );
  }
}

export default connect(
  state => {
    return ({
      translation: state.translation.translation,
      direction: state.translation.direction,
      countLayers: state.layers.allLayers.length,
      map: state.map.map,
      activeMenuItem: state.menu.activeMenuItem,
      compareBasemap: state.basemap.selectedCompareMap,
      compareBasemapType: state.basemap.selectedCompareType,
      visibleLayers: state.layers.visibleLayers.length
    });
  })(MenuSidebar);

