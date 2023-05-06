import store from 'store2';
// import { push } from 'react-router-redux';
import superagent from 'superagent';
import {
  settings
} from '../../config/settings';
import loginAPIs from '../../config/auth';
import {
  login_MIDDLEWARE
} from '../../middlewares/login/login_middleware';
import SOURCE from '../../middlewares/sources';

sessionStorage.setItem("basepath", settings.basepath);
const basepath = sessionStorage.getItem("basepath");

const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';

const SET_TOKENS = 'auth/SET_TOKENS';

const FORGOTPASSWORD = 'auth/FORGOTPASSOWRD';
const FORGOTPASSWORD_SUCCESS = 'auth/FORGOTPASSOWRD_SUCCESS';
const FORGOTPASSWORD_FAIL = 'auth/FORGOTPASSOWRD_FAIL';

const RESETPASSWORD = 'auth/RESETPASSWORD';
const RESETPASSWORD_SUCCESS = 'auth/RESETPASSWORD_SUCCESS';
const RESETPASSWORD_FAIL = 'auth/RESETPASSWORD_FAIL';

const CHANGEPASSWORD = 'auth/CHANGEPASSWORD';
const CHANGEPASSWORD_SUCCESS = 'auth/CHANGEPASSWORD_SUCESS';
const CHANGEPASSWORD_FAIL = 'auth/CHANGEPASSWORD_FAIL';

const SETPASSWORD = 'auth/SETPASSWORD';
const SETPASSWORD_SUCCESS = 'auth/SETPASSWORD_SUCCESS';
const SETPASSWORD_FAIL = 'auth/SETPASSWORD_FAIL';

const LOGOUT = 'auth/LOGOUT';

const FLUSH = 'auth/FLUSH';

const initialState = {
  loginAPIs,
  tokens: null,
  loadBusy: false,
  loadError: false,
  user: null,
  loginBusy: false,
  loginError: null,
  message: null,
  forgotPasswordBusy: false,
  forgotPasswordMessage: null,
  resetPasswordBusy: false,
  resetPasswordMessage: null,
  resetPasswordRedirect: false,
  userDataBusy: false,
  userDataBusyError: false,
  userData: null,
  changePasswordBusy: false,
  changePasswordError: null,
  changePassword: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state, loadBusy: true, loadError: null
      };

    case LOAD_SUCCESS:
      return {
        ...state, loadBusy: false, user: action.user
      };

    case LOAD_FAIL:
      return {
        ...state, loadBusy: false, user: null, loadError: action.error
      };

    case LOGIN:
      return {
        ...state, loginBusy: true, loginError: null
      };

    case LOGIN_SUCCESS:
      return {
        ...state, loginBusy: false, user: action.user
      };

    case LOGIN_FAIL:
      return {
        ...state, loginBusy: false, loginError: action.error, user: null
      };

    case SET_TOKENS:
      return {
        ...state, tokens: action.payload
      };

    case FORGOTPASSWORD:
      return {
        ...state, forgotPasswordBusy: true
      };

    case FORGOTPASSWORD_SUCCESS:
      return {
        ...state, forgotPasswordBusy: false, forgotPasswordMessage: action.message
      };

    case FORGOTPASSWORD_FAIL:
      return {
        ...state, forgotPasswordBusy: false, forgotPasswordMessage: action.error
      };

    case LOGOUT:
    case FLUSH: {
      return initialState;
    }
    default:
      return state;
  }
}

export const load = () => async (dispatch, getState, api) => {
  // dont call api if user data is in state
  const user = getState().auth.user;
  if (user) {
    return user;
  }

  dispatch({
    type: LOAD
  });

  try {
    const data = store(`${basepath}-authUser`);
    if (!data) {
      return user;
    }
    dispatch({
      type: LOAD_SUCCESS,
      user: data
    });
  } catch (error) {
    dispatch({
      type: LOAD_FAIL,
      error
    });
  }
};

export const loginAll = (username, password) => async (dispatch, getState, api) => {
  dispatch({
    type: LOGIN
  });
  const translation = getState().translation.translation;
  const loginAPIs = getState().auth.loginAPIs;
  // try {
    const tokenExpireAt = Date.now() + ((3500 * 24) * 1000);
    const tokens = [];
    let isToken = false;
    await Promise.all(loginAPIs.map(async loginAPI => {
      try {
        if (!settings.login || loginAPI.type === SOURCE.ARCGIS_EMBEDDED) {
          return null;
        }
        const middlewareData = {
          source: loginAPI.type,
          username: loginAPI.type === SOURCE.ARCGIS_EMBEDDED ? loginAPI.username : username,
          password: loginAPI.type === SOURCE.ARCGIS_EMBEDDED ? loginAPI.password : password,
          referer: window.location.origin,
          url: loginAPI.source
        };
        const res = await login_MIDDLEWARE(middlewareData);
        if (res.validToken) {
          return null;
        }
        if (res && res.text) {
          const resData = JSON.parse(res.text);
          if (resData.token) {
            isToken = true;
            tokens.push({
              ...resData,
              origin: new URL(loginAPI.source).origin,
              source: loginAPI.source
            });
          }
        }
      } catch (err) {
        // console.log("login module err", err);
      }
    }));

    if (isToken || !settings.login) {
      await Promise.all(loginAPIs.map(async loginAPI => {
        if (loginAPI.type !== SOURCE.ARCGIS_EMBEDDED) {
          return null;
        }
        try {
          const middlewareData = {
            source: loginAPI.type,
            username: loginAPI.type === SOURCE.ARCGIS_EMBEDDED ? loginAPI.username : username,
            password: loginAPI.type === SOURCE.ARCGIS_EMBEDDED ? loginAPI.password : password,
            referer: window.location.origin,
            url: loginAPI.source
          };
          const res = await login_MIDDLEWARE(middlewareData);
          if (res.validToken) {
            return null;
          }
          if (res && res.text) {
            const resData = JSON.parse(res.text);
            if (resData.token) {
              isToken = true;
              tokens.push({
                ...resData,
                origin: new URL(loginAPI.source).origin,
                source: loginAPI.source
              });
            }
          }
        } catch (err) {
          // console.log("login module err", err);
        }
      }));
    }

    if (!isToken) {
      dispatch({
        type: LOGIN_FAIL,
        error: translation.somethingWrong
      });
      return;
    }

    const user = {
      username
    };

    store(`${basepath}-authTokens`, tokens);
    store(`${basepath}-authTokenExpires`, tokenExpireAt);
    store(`${basepath}-authUser`, user);

    dispatch({
      type: LOGIN_SUCCESS,
      user
    });
    dispatch({
      type: SET_TOKENS,
      payload: tokens
    });
    return;
  // } catch (error) {
  //   console.log("error", error);
  //   dispatch({
  //     type: LOGIN_FAIL,
  //     error: translation.somethingWrong
  //   });
  // }
};

export const login = (username, password) => async (dispatch, getState, api) => {
  dispatch({
    type: LOGIN
  });
  const translation = getState().translation.translation;
  try {
    const data = {
      request: 'getToken',
      username,
      password,
      expiration: 20160,
      f: 'json'
    };
    data.client = 'referer';
    data.referer = window.location.origin;
    data.expiration = (60 * 24); // 1 day
    const res = await superagent.post(settings.loginServer).send(data)
      .set('Content-Type', 'application/x-www-form-urlencoded');
    if (res && res.text) {
      const resData = JSON.parse(res.text);
      if (resData.token) {
        const user = {
          username
        };
        store(`${basepath}-authToken`, resData.token);
        store(`${basepath}-authTokenExpires`, resData.expires);
        store(`${basepath}-authUser`, user);
        dispatch({
          type: LOGIN_SUCCESS,
          user
        });
        return;
      } else if (resData.error) {
        dispatch({
          type: LOGIN_FAIL,
          error: translation.invalidUserPass
        });
        return;
      }
    }

    dispatch({
      type: LOGIN_FAIL,
      error: translation.somethingWrong
    });
    return;
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      error: translation.somethingWrong
    });
  }
};

export const forgotPassword = (email, host) => async (dispatch, getState, api) => {
  dispatch({
    type: FORGOTPASSWORD
  });

  try {
    await api.post('/account/forgotPassword', {
      data: {
        email,
        host
      }
    });
    dispatch({
      type: FORGOTPASSWORD_SUCCESS,
      message: 'Reset password link sent at registered email'
    });
  } catch (err) {
    dispatch({
      type: FORGOTPASSWORD_FAIL,
      error: err
    });
  }
};

export const resetPassword = (password, confirmPassword, token) => async (dispatch, getState, api) => {
  dispatch({
    type: RESETPASSWORD
  });

  try {
    if (password !== confirmPassword) {
      dispatch({
        type: RESETPASSWORD_FAIL,
        error: 'Confirm password do not match'
      });
      return false;
    }
    await api.post('/account/reset-forgotpassword', {
      data: {
        password,
        confirmPassword,
        token
      }
    });
    dispatch({
      type: RESETPASSWORD_SUCCESS,
      message: 'Password reset successfully',
      redirect: false
    });
  } catch (err) {
    dispatch({
      type: RESETPASSWORD_FAIL,
      error: err
    });
  }
};

export const changePassword = (oldPassword, password, confirmPassword) => async (dispatch, getState, api) => {
  dispatch({
    type: CHANGEPASSWORD
  });

  try {
    if (password !== confirmPassword) {
      dispatch({
        type: CHANGEPASSWORD_FAIL,
        error: 'Confirm password do not match'
      });
      return false;
    }
    await api.post('/account/change-password', {
      data: {
        oldPassword,
        password,
        confirmPassword
      }
    });
    dispatch({
      type: CHANGEPASSWORD_SUCCESS,
      res: 'Password reset successfully'
    });
  } catch (err) {
    dispatch({
      type: CHANGEPASSWORD_FAIL,
      error: err
    });
  }
};

export const setPassword = (password, confirmPassword, token) => async (dispatch, getState, api) => {
  dispatch({
    type: SETPASSWORD
  });

  try {
    if (password !== confirmPassword) {
      dispatch({
        type: SETPASSWORD_FAIL,
        error: 'Confirm password do not match'
      });
      return false;
    }
    await api.post('/account/set-password', {
      data: {
        password,
        confirmPassword,
        token
      }
    });
    dispatch({
      type: SETPASSWORD_SUCCESS,
      message: 'Password set successfully',
      redirect: true
    });
  } catch (err) {
    dispatch({
      type: SETPASSWORD_FAIL,
      error: err
    });
  }
};

export const logout = () => (dispatch, getState, api) => {
  store.remove(`${basepath}-authTokens`);
  store.remove(`${basepath}-authTokenExpires`);
  store.remove(`${basepath}-authUser`);
  dispatch({
    type: LOGOUT
  });
  dispatch({
    type: 'FLUSH'
  });
  // dispatch(push('/login'));
};