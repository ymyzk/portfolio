import PropTypes from "prop-types";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import App from "./components/App";
import Home from "./containers/Home";
import Contributions from "./containers/Contributions";
import Misc from "./containers/Misc";
import Projects from "./containers/Projects";
import Talks from "./containers/Talks/Talks";
import PageNotFound from "./components/PageNotFound";

const Status = ({ code, children }) => {
  const render = ({ staticContext }) => {
    if (staticContext) {
      staticContext.status = code; // eslint-disable-line no-param-reassign
    }
    return children;
  };
  return <Route render={render} />;
};

Status.propTypes = {
  code: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

const PageNotFoundWithStatus = () => (
  <Status code={404}>
    <PageNotFound />
  </Status>
);

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
        <Route component={PageNotFoundWithStatus} />
      </Switch>
    </App>
  );
};
