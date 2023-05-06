import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import store from 'store2';
import { logout, load,
  // loginAll
} from '../../redux/modules/auth';
import { settings } from '../../config/settings';

class VerifyAuthentication extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount = async () => {
    const { dispatch } = this.props;
    await dispatch(load());
    this.checkAuth();
  }

  checkAuth = async () => {
    // console.log("inside check auth")
    const basepath = sessionStorage.getItem('basepath');
    const authTokenExpires = store(`${basepath}-authTokenExpires`);
    if (Date.now() > authTokenExpires && settings.login) {
      // console.log("inside logout")
      this.props.dispatch(logout());
    // } else if (!settings.login) {
    //   console.log("checkauth called");
    //   await this.props.dispatch(loginAll());
    }
    this.setState({
      loading: false
    });
  }

  checkForQuery = () => {
    if (window.location.search) {
      sessionStorage.setItem("urlQuery", window.location.search);
    }
  }

  render() {
    const { children, me, location } = this.props;
    const { loading } = this.state;
    if (!settings.login) {
      return children || null;
    }
    if (loading) {
      return null;
    }
    if (!me) {
      this.checkForQuery();
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: {
              from: location
            }
          }}
        />
      );
    }
    return children || null;
  }
}

export default connect(
  state => ({
    me: state.auth.user
  }))(VerifyAuthentication);
