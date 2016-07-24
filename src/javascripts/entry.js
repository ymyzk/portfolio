import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import { applyMiddleware, createStore } from "redux";

import reducer from "./reducers";
import getRoutes from "./routes";

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Google Analytics
if (__DEBUG__) {
  window.ga = (...args) => console.log("window.ga", ...args); // eslint-disable-line no-console
} else {
  /* eslint-disable */
  (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
  })(window,document,"script","//www.google-analytics.com/analytics.js","ga");
  ga("create", "UA-41988513-2", "auto");
  /* eslint-enable */
}

browserHistory.listen(location => {
  window.ga("set", "page", location.pathname);
  window.ga("send", "pageview");
});

let middleware = [];
if (__DEBUG__) {
  const createLogger = require("redux-logger"); // eslint-disable-line
  const logger = createLogger();
  // Logger MUST BE the last middleware
  middleware = [...middleware, logger];
}

// FIXME: JSON に moment.js のオブジェクトをエンコードできないための対処
// Server-side rendering でも client 側で書き直す
// const store = createStore(reducer, window.__INITIAL_STATE__);
const store = createStore(reducer, {}, applyMiddleware(...middleware));
const routes = getRoutes({});
render((
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
), document.getElementById("app"));
