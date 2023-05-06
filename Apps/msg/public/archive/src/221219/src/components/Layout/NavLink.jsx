import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class NavLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleNavToggle = () => {
    const bodyClasses = document.getElementsByClassName('sidenav-toggled');
    if (bodyClasses.length > 0) {
      document.body.classList.remove('sidenav-toggled');
    }
  }

  render() {
    // const isActive = this.context.router.route.location.pathname === this.props.to;
    // let className = isActive ? 'app-menu__item active' : 'app-menu__item';
    // if (this.props.type === 'child') {
    //   className = isActive ? 'treeview-item active' : 'treeview-item';
    // } else if (this.props.type === 'tab') {
    //   className = isActive ? 'active' : '';
    // }

    return (
      <Link {...this.props} onClick={this.handleNavToggle}>
        {this.props.children}
      </Link>
    );
  }
}

NavLink.contextTypes = {
  router: PropTypes.object
};

NavLink.propTypes = {
  children: PropTypes.any,
  to: PropTypes.any,
  type: PropTypes.string
};

NavLink.defaultProps = {
  children: null,
  to: null,
  type: 'parent'
};

export default NavLink;
