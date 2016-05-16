import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";

import routes from "./routes";

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

/* eslint-disable */
// Google Analytics
(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
})(window,document,"script","//www.google-analytics.com/analytics.js","ga");
ga("create", "UA-41988513-2", "auto"); // eslint-disable-line no-undef
/* eslint-enable */

browserHistory.listen(location => {
  const path = location.pathname;
  if (__DEBUG__) { // eslint-disable-line no-undef
    console.log(`ga("send", "page", ${path});`); // eslint-disable-line no-console
  } else {
    ga("send", "page", path); // eslint-disable-line no-undef
  }
});

render((
  <Router history={browserHistory} routes={routes} />
), document.getElementById("app"));
