import React from "react";
import { IndexRoute, Route } from "react-router";

import App from "./components/App";
import Home from "./components/Home";
import Contributions from "./components/Contributions";
import News from "./components/News";
import Projects from "./components/Projects";
import Talks from "./components/Talks";
import PageNotFound from "./components/PageNotFound";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="projects/" component={Projects} />
    <Route path="talks/" component={Talks} />
    <Route path="contributions/" component={Contributions} />
    <Route path="news/" component={News} />
    <Route path="*" component={PageNotFound} />
  </Route>
);
