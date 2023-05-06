import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

import auth from './modules/auth';
import translation from './modules/translation';
import basemap from './modules/basemap';
import map from './modules/map';
import layers from './modules/layers';
import tocData from './modules/toc';
import menu from './modules/menu';
import legends from './modules/legends';
import settings from './modules/systemSettings';
import exports from './modules/export'; 
import search from './modules/search';
import drawing from './modules/drawing';
import links from './modules/links';
import urlQuery from './modules/urlQuery';

export default combineReducers({
  form: FormReducer,
  toastr: toastrReducer,
  auth,
  translation,
  basemap,
  map,
  layers,
  tocData,
  menu,
  legends,
  settings,
  exports,
  search,
  drawing,
  links,
  urlQuery
});
