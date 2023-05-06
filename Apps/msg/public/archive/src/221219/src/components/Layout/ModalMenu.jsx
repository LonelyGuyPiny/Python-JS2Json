import React, { Component, Fragment } from 'react';
import { Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';

// import { modalMenu } from '../../constants/mainMenuItems';
import { NavButton } from './';
import { Block } from '../';
import { Terms, Support, Feed } from './Modals';
import feeds from '../../config/feed';
import menu from '../../config/mainMenu';
// import { Svg } from './../../components';

/**
 * Component
 * @name ModalMenu
 * @description
 * This is the more menu component of the application. 
 * On application startup, this component is loaded
 */
class ModalMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModals: {}
    }
  }

  handleNavButton = name => () => {
    this.setState(({ activeModals }) => ({
      activeModals: { ...activeModals, [name]: true },
      isPopMenu: false
    }));
    if (name !== 'terms' && name !== 'support' && name !== 'whatsNew') {
      this.props.activeModalMenu(name);
    }
  }

  closeModal = (name) => {
    this.setState(({ activeModals }) => ({
      activeModals: { ...activeModals, [name]: false }
    }))
  }

  render() {
    const { translation, direction, hideActiveMenu, moreMenuActive } = this.props;
    const { activeModals, isPopMenu } = this.state;
    return (
      <Fragment>
        {menu.moreMenu.length > 0 && <Block className="layer-button" >
          <Popup
            trigger={
              <NavButton
                className="more-mobile"
                isActive={isPopMenu || moreMenuActive}
                onClick={() => { hideActiveMenu(); this.setState({ isPopMenu: !isPopMenu }) }}
                svg="moreicon"
                title={translation.more}
                data-tooltip={translation.more} data-position={`${direction === 'RTL' ? 'left' : 'right'} center`}
              />
            }
            position={`${direction === 'RTL' ? 'left' : 'right'} center`}
            on='click'
            className='more-menu-popup'
            onClose={() => this.setState({ isPopMenu: !isPopMenu })}
            open={isPopMenu}
          >
            <div className="buttons-col">
              {menu.moreMenu && menu.moreMenu.map(item => {
                if (item.name === 'whatsNew') {
                  if (feeds && feeds.length > 0) {
                    return (
                      <NavButton
                        itemClassName={item}
                        key={item}
                        onClick={this.handleNavButton(item)}
                        svg={item}
                        title={translation[item]}
                      />
                    )
                  }
                } else {
                  return (
                    <NavButton
                      itemClassName={item}
                      key={item}
                      onClick={this.handleNavButton(item)}
                      svg={item}
                      title={translation[item]}
                    />
                  )
                }
                return true
              })}
            </div>
          </Popup>
        </Block>}

        {menu.moreMenu.length > 0 && <Block className="mobile-menu-only">
          <div className="buttons-col">
            {menu.moreMenu && menu.moreMenu.map(item => {
              if (item.name === 'whatsNew') {
                if(feeds && feeds.length > 0) {
                  return (
                    <NavButton
                      itemClassName={item}
                      key={item}
                      onClick={this.handleNavButton(item)}
                      svg={item}
                      title={translation[item]}
                    />
                  )
                }
              } else {
                return (
                  <NavButton
                    itemClassName={item}
                    key={item}
                    onClick={this.handleNavButton(item)}
                    svg={item}
                    title={translation[item]}
                  />
                )
              }
              return true
            })}
          </div>
        </Block>}
        
        {/* TEARMS & CONDITION MODAL BEGIN */}
        <Terms open={activeModals['terms'] === true} close={() => this.closeModal('terms')} />
        {/* TEARMS & CONDITION MODAL END */}

        {/* SUPPORT MODAL BEGIN */}
        <Support open={activeModals['support'] === true} close={() => this.closeModal('support')} />
        {/* SUPPORT MODAL END */}

        {/* WHAT'S NEW MODAL BEGIN */}
        <Feed open={activeModals['whatsNew'] === true} close={() => this.closeModal('whatsNew')} />
        {/* WHAT'S NEW MODAL END */}

      </Fragment>
    )

  }
}

export default connect(
  state => ({
    translation: state.translation.translation,
    direction: state.translation.direction,
    activeMenuItem: state.menu.activeMenuItem,
  })
)(ModalMenu);