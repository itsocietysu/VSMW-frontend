/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions

import '!file-loader?name=[name].[ext]!./images/icon-50x50.jpg';
import '!file-loader?name=[name].[ext]!./images/0-100x100.png';
import '!file-loader?name=[name].[ext]!./images/25-100x100.png';
import '!file-loader?name=[name].[ext]!./images/50-100x100.png';
import '!file-loader?name=[name].[ext]!./images/75-100x100.png';
import '!file-loader?name=[name].[ext]!./images/100-100x100.png';
import '!file-loader?name=[name].[ext]!./images/0-256x256.png';
import '!file-loader?name=[name].[ext]!./images/25-256x256.png';
import '!file-loader?name=[name].[ext]!./images/50-256x256.png';
import '!file-loader?name=[name].[ext]!./images/75-256x256.png';
import '!file-loader?name=[name].[ext]!./images/100-256x256.png';
import '!file-loader?name=[name].[ext]!./images/logo_science_slam.png';
import '!file-loader?name=[name].[ext]!./images/logo-white.svg';
import '!file-loader?name=[name].[ext]!./images/logo-sirius.png';
import '!file-loader?name=[name].[ext]!./images/logo-spie.png';

import configureStore from './configureStore';

// Import CSS reset and Global Styles
import './global-styles';

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}

render();
