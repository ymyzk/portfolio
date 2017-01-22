import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Subheader from "material-ui/Subheader";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import React from "react";
import Helmet from "react-helmet";
import Link from "react-router/lib/Link";

import "font-awesome/css/font-awesome.css";
import "ress/ress.css";
import "../../stylesheets/roboto.css";
import "../../stylesheets/index.css";

import Theme from "./Theme";
import AppleTouchIcon from "../../images/apple-touch-icon.png";
import FaviconIco from "../../images/favicon.ico";
import FaviconPng from "../../images/favicon.png";
import MsTileImage from "../../images/ms-tile-image.png";
import OgpImage from "../../images/ogp.png";
import TwitterImage from "../../images/twitter.png";

const Footer = () => {
  const style = {
    margin: 10,
    color: Theme.palette.textColor,
    font: "normal normal 400 12px Roboto",
    textAlign: "right",
  };
  return (
    <footer style={style}>
      &copy; 2017 Yusuke Miyazaki.
    </footer>
  );
};

class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    themeOptions: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  constructor(props, context) {
    super(props, context);
    this.handleToggle = () => this.setState({ open: !this.state.open });
    this.handleClose = () => this.setState({ open: false });
  }

  state = {
    open: false,
  };

  render() {
    const title = "Yusuke Miyazaki";
    const description = "Yusuke Miyazaki's portfolio website.";
    const url = "https://www.ymyzk.com";
    const meta = [
      { name: "description", content: description },
      // Facebook / OGP
      { property: "fb:app_id", content: "997147760366147" },
      { property: "og:type", content: "profile" },
      { property: "og:title", content: title },
      { property: "og:url", content: url },
      { property: "og:image", content: OgpImage },
      { property: "og:locale", content: "ja_JP" },
      { property: "og:locale:alternate", content: "en_US" },
      { property: "og:site_name", content: title },
      { property: "og:description", content: description },
      { property: "profile:first_name", content: "Yusuke" },
      { property: "profile:last_name", content: "Miyazaki" },
      { property: "profile:username", content: "ymyzk" },
      // Twitter Cards
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@ymyzk" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: TwitterImage },
      // Chrome / Android
      { name: "theme-color", content: Theme.palette.primary1Color },
      // Windows / IE / Edge
      { name: "msapplication-TileImage", content: MsTileImage },
      { name: "msapplication-TileColor", content: Theme.palette.primary1Color },
    ];
    const link = [
      // Favicon
      { rel: "shortcut icon", type: "image/x-icon", href: FaviconIco, sizes: "16x16 32x32 48x48" },
      { rel: "icon", type: "image/png", href: FaviconPng, sizes: "256x256" },
      // iOS
      { rel: "apple-touch-icon", href: AppleTouchIcon },
    ];
    const script = [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "http://schema.org",
          "@type": "WebSite",
          name: title,
          url,
        }),
      },
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "http://schema.org",
          "@type": "Person",
          name: "Yusuke Miyazaki",
          url,
          sameAs: [
            "https://www.twitter.com/ymyzk",
          ],
        }),
      },
    ];
    const muiTheme = getMuiTheme(Theme, this.props.themeOptions);
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Helmet
            htmlAttributes={{
              prefix: "og: http://ogp.me/ns# profile: http://ogp.me/ns/profile# fb: http://ogp.me/ns/fb#",
            }}
            titleTemplate={`%s - ${title}`}
            defaultTitle={title}
            meta={meta}
            link={link}
            script={script}
          />
          <AppBar title={title} onLeftIconButtonTouchTap={this.handleToggle} />
          <Drawer
            open={this.state.open}
            docked={false}
            onRequestChange={open => this.setState({ open })}
          >
            <Subheader>Menu</Subheader>
            <MenuItem onTouchTap={this.handleClose} containerElement={<Link to="/" />}>Home</MenuItem>
            <MenuItem onTouchTap={this.handleClose} containerElement={<Link to="/projects/" />}>Projects</MenuItem>
            <MenuItem onTouchTap={this.handleClose} containerElement={<Link to="/talks/" />}>Talks</MenuItem>
            <MenuItem onTouchTap={this.handleClose} containerElement={<Link to="/contributions/" />}>Contributions</MenuItem>
            <MenuItem onTouchTap={this.handleClose} containerElement={<Link to="/misc/" />}>Misc</MenuItem>
          </Drawer>
          {this.props.children}
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
