/**
* THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
*/
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
// import io from 'socket.io-client';
import { match, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import getRoutes from './routes';
import Root from './root';
const client = new ApiClient();
const dest = document.getElementById('content');
const store = createStore(browserHistory, client, window.__data);
const history = syncHistoryWithStore(browserHistory, store);

/* eslint-disable */
const head = document.getElementsByTagName('head')[0];

if (process.env.NODE_ENV === 'production') {
  window._hmt = [];
  const hm = document.createElement('script');
  hm.src = 'https://hm.baidu.com/hm.js?3bf7f8c779014379c30e5561e78ec8ac';
  head.appendChild(hm);
}

// const wxApi = document.createElement('script');
// wxApi.src = 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js';
// head.appendChild(wxApi);

// const baiduApi = document.createElement('script');
// baiduApi.src = 'http://api.map.baidu.com/api?v=2.0&ak=oe13z9OWW7qHBlMHGKVcP20AZWw9FQDH';
// head.appendChild(baiduApi);

const renderApp = renderProps => render(
  <AppContainer>
    <Root {...{ store, history, ...renderProps }} />
  </AppContainer>,
  dest
);

match(
  { history, routes: getRoutes(store) },
  (error, redirectLocation, renderProps) => renderApp(renderProps)
);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const nextRoutes = require('./routes');
    renderApp({ routes: nextRoutes(store) });
  });
}

if (process.env.NODE_ENV !== 'production') {
    window.React = React; // enable debugger

    if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
        console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
    }
}
