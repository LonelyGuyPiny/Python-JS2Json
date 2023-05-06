const SET_ACTIVE_MENU = 'basemap/SET_ACTIVE_MENU';

const initialState = {
  activeMenuItem: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_MENU:
      return {...state, activeMenuItem: action.payload };
    default:
      return state;
  }
}

export const setActiveMenuItem = (item) => async (dispatch, getState, api) => {
  dispatch({ type: SET_ACTIVE_MENU, payload: item });
};