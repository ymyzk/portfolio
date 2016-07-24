import React from "react";
import { IndexRoute, Redirect, Route } from "react-router";

import App from "./components/App";
import Home from "./components/Home";
import Contributions from "./containers/Contributions";
import Misc from "./containers/Misc";
import Projects from "./containers/Projects";
import Talks from "./containers/Talks";
import PageNotFound from "./components/PageNotFound";

export default (themeOptions) => {  // eslint-disable-line
  const AppWrapper = ({ children }) => (
    <App children={children} themeOptions={themeOptions} />
  );

  AppWrapper.propTypes = {
    children: React.PropTypes.node.isRequired
  };

  return (
    <Route path="/" component={AppWrapper}>
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
};
