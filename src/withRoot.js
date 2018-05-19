import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuIcon from "@material-ui/icons/Menu";

import SideMenu from "./components/SideMenu";
import getPageContext from "./getPageContext";

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function withRoot(Component) {
  class WithRoot extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.pageContext = this.props.pageContext || getPageContext();
    }

    state = {
      isMenuOpened: false,
    };

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector("#jss-server-side");
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    pageContext = null;

    toggleDrawer = value => () => {
      this.setState({
        isMenuOpened: value,
      });
    };

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
              {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"> */}
              <IconButton color="inherit" aria-label="Menu" style={styles.menuButton} onClick={this.toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit">
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
          <SideMenu open={this.state.isMenuOpened} onClose={this.toggleDrawer(false)} />
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
