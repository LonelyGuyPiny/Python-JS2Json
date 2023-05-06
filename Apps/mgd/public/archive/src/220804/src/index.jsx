import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import HttpsRedirect from 'react-https-redirect';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { Provider } from 'react-redux';
import App from './containers/App/App';
import createStore from './redux/configureStore';

// Browser History Setup
const history = createBrowserHistory({
  basename: process.env.REACT_APP_BASENAME,
});
const store = createStore(history, {});

ReactDOM.render(
  <Provider store={store} >
    <HttpsRedirect>
      <App />
    </HttpsRedirect>
    <ReduxToastr
      position="bottom-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
    />
  </Provider>,
  document.getElementById('root')
);
