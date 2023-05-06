import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import 'semantic-ui-css/semantic.min.css';
import routes from '../../routes';
import './App.css';
import "../../assets/styles/index.scss";
import { Block } from '../../components';
import { settings } from '../../config/settings';

const App = () => (
  <Block className="main">
    <Router basename={settings.basepath}>
      <Switch>
        {renderRoutes(routes)}
      </Switch>
    </Router>
  </Block>
);

export default App;
