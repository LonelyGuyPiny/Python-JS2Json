import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import moduleReducers from './moduleReducers';
import ApiClient from './ApiClient';
import clientMiddleware from './clientMiddleware';

const api = new ApiClient();

export default function configureStore(history, preLoadedState) {
  const middlewares = [
    thunkMiddleware.withExtraArgument(api),
    clientMiddleware(api),
    routerMiddleware(history)
  ];

  if (process.env.NODE_ENV !== 'production') {
    if (!window.__REDUX_DEVTOOLS_EXTENSION__) {
      const { logger } = require('redux-logger');
      middlewares.push(logger);
    }
  }

  const enhancer = compose(
    applyMiddleware(...middlewares),
    // other store enhancers if any,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({
      name: 'ProjectName', actionsBlacklist: ['REDUX_STORAGE_SAVE']
    }) : noop => noop
  );

  const initialState = preLoadedState || {};
  return createStore(moduleReducers, initialState, enhancer);
}
