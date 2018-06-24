import PropTypes from "prop-types";
import React from "react";
import ReactGA from "react-ga";

import AppBar from "@material-ui/core/AppBar";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";

import getPageContext from "./getPageContext";

function withRoot(Component) {
  class WithRoot extends React.Component {
    pageContext = null;

    constructor(props, context) {
      super(props, context);

      const { pageContext } = this.props;
      this.pageContext = pageContext || getPageContext();
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector("#jss-server-side");
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }

      // Google Analytics
      // TODO: Update to initialize only once if we support multiple pages
      if (process.env.NODE_ENV === "production") {
        ReactGA.initialize("UA-41988513-2");
        ReactGA.pageview(window.location.pathname);
      }
    }

    render() {
      const title = "Yusuke Miyazaki";

      // MuiThemeProvider makes the theme available down the React tree thanks to React context.
      return (
        <MuiThemeProvider
          theme={this.pageContext.theme}
          sheetsManager={this.pageContext.sheetsManager}
        >
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <AppBar>
            <Toolbar>
              <Typography variant="title" color="inherit">
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
          <Component {...this.props} />
        </MuiThemeProvider>
      );
    }
  }

  WithRoot.propTypes = {
    pageContext: PropTypes.object,  // eslint-disable-line
  };

  WithRoot.getInitialProps = (ctx) => {
    if (Component.getInitialProps) {
      return Component.getInitialProps(ctx);
    }

    return {};
  };

  return WithRoot;
}

export default withRoot;
