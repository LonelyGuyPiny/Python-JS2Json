import React from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import { load } from '../../redux/modules/auth';
// import { load as loadPermissions } from '../../redux/modules/permission';
// import roles from '../../constants/roles';

class AuthenticatedUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGotSession: false
    };
  }
  componentDidMount = async () => {
    const { dispatch } = this.props;
    await dispatch(load());
    this.setState({
      isGotSession: true
    });
  }

  render() {
    const { children, location, me, loading } = this.props;
    const { isGotSession } = this.state;
    // check if the login is false then we need to return the children
    if (loading || isGotSession === false) {
      return <Loading />;
    }

    if (!loading && !me) {
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

    return children;
  }
}

AuthenticatedUser.propTypes = {
  location: PropTypes.object,
  children: PropTypes.node,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  me: PropTypes.object
};

AuthenticatedUser.defaultProps = {
  location: {},
  children: null,
  dispatch: null,
  loading: false,
  me: null
};

const connected = state => ({
  loading: state.auth.loadBusy,
  me: state.auth.user
});

export default connect(connected)(AuthenticatedUser);
