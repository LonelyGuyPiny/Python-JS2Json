import Loadable from 'react-loadable';
import Loading from './components/Loading';
import {
  // Welcome,
  // Login,
  Dashboard,
  Login
} from './containers';
// import BaseMap from './containers/BaseMap/BaseMap';

export default [
  {
    path: '/',
    exact: true,
    component: Dashboard
  },
  {
    path: '/login',
    exact: true,
    component: Loadable({ loader: () => import('./containers/Login'), loading: Loading })
  },
  // {
  //   path: '/welcome',
  //   exact: true,
  //   component: Loadable({ loader: () => import('./containers/Welcome'), loading: Loading })
  // },
  // {
  //   path: '/dashboard',
  //   exact: true,
  //   component: Loadable({ loader: () => import('./containers/Dashboard'), loading: Loading })
  // },
  // {
  //   path: '/test',
  //   exact: true,
  //   component: Loadable({ loader: () => import('./containers/Welcome'), loading: Loading })
  // },
  {
    path: '*',
    component: Login
  }
];
