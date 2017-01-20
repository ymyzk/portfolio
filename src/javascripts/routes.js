import React from "react";
import IndexRoute from "react-router/lib/IndexRoute";
import Redirect from "react-router/lib/Redirect";
import Route from "react-router/lib/Route";

import App from "./components/App";
import Home from "./components/Home";
import About from "./components/About/About";
import Contributions from "./containers/Contributions";
import Misc from "./containers/Misc";
import Projects from "./containers/Projects";
import Talks from "./containers/Talks/Talks";
import PageNotFound from "./components/PageNotFound";

export default (themeOptions) => {  // eslint-disable-line
  const AppWrapper = ({ children }) => (
    <App themeOptions={themeOptions}>
      {children}
    </App>
  );

  AppWrapper.propTypes = {
    children: React.PropTypes.node.isRequired,
  };

  return (
    <Route path="/" component={AppWrapper}>
      <IndexRoute component={Home} />
      <Route path="about/" component={About} />
      <Route path="projects/" component={Projects} />
      <Route path="talks/" component={Talks} onEnter={() => window.scroll(0, 0)} />
      <Route path="contributions/" component={Contributions} />
      <Route path="misc/" component={Misc} />
      <Redirect from="news" to="misc/" />
      <Redirect from="news/" to="misc/" />
      <Route path="*" component={PageNotFound} />
    </Route>
  );
};
