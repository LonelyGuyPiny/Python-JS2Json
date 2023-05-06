import store from 'store2';
import settings from '../../config/login';

const SET_LOGIN = 'login/SET_LOGIN';


const initialState = {
  setLogin: store('setLogin') || settings.login,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state, setLogin: action.payload
      };
    default:
      return state;
  }
}

export const setLogin = (login) => async (dispatch, getState) => {
  // console.log(settings.login, '----------print he login data here ')
  dispatch({
    type: SET_LOGIN,
    payload: login
  })
  store('setLogin', login);
}

