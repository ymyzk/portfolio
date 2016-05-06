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
