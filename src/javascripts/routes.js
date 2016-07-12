import React from "react";
import { IndexRoute, Redirect, Route } from "react-router";

import App from "./components/App";
import Home from "./components/Home";
import Contributions from "./containers/Contributions";
import Misc from "./containers/Misc";
import Projects from "./components/Projects";
import Talks from "./containers/Talks";
import PageNotFound from "./components/PageNotFound";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="projects/" component={Projects} />
    <Route path="talks/" component={Talks} />
    <Route path="contributions/" component={Contributions} />
    <Route path="misc/" component={Misc} />
    <Redirect from="news" to="misc/" />
    <Redirect from="news/" to="misc/" />
    <Route path="*" component={PageNotFound} />
  </Route>
);
