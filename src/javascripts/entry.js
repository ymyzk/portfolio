import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";

import { render } from "react-dom";
import { Router, Route, browserHistory, IndexRoute } from "react-router";

import App from "./components/App";
import Home from "./components/Home";
import Contributions from "./components/Contributions";
import News from "./components/News";
import Projects from "./components/Projects";
import Talks from "./components/Talks";

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Google Analytics
(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
})(window,document,"script","//www.google-analytics.com/analytics.js","ga");
ga("create", "UA-41988513-2", "auto"); // eslint-disable-line no-undef

browserHistory.listen(location => {
  const path = location.pathname;
  if (__DEBUG__) { // eslint-disable-line no-undef
    console.log(`ga("send", "page", ${path});`); // eslint-disable-line no-console
  } else {
    ga("send", "page", path); // eslint-disable-line no-undef
  }
});

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="projects" component={Projects} />
      <Route path="talks" component={Talks} />
      <Route path="contributions" component={Contributions} />
      <Route path="news" component={News} />
    </Route>
  </Router>
), document.getElementById("app"));
