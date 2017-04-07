import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import App from "./components/App";
import Home from "./components/Home";
import Contributions from "./containers/Contributions";
import Misc from "./containers/Misc";
import Projects from "./containers/Projects";
import Talks from "./containers/Talks/Talks";
import PageNotFound from "./components/PageNotFound";

export default (themeOptions) => {  // eslint-disable-line
  // TODO: Use redirect with status?
  return (
    <App themeOptions={themeOptions}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/projects/" component={Projects} />
        <Route path="/talks/" component={Talks} />
        <Route path="/contributions/" component={Contributions} />
        <Route path="/misc/" component={Misc} />
        <Redirect from="/about/" to="/" />
        <Redirect from="/news/" to="/misc/" />
        <Route component={PageNotFound} />
      </Switch>
    </App>
  );
};
