import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router";

import Theme from "./Theme";
import OgpImage from "../../images/ogp.png";

require("../../stylesheets/index");

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false
    };
    this.handleToggle = () => this.setState({open: !this.state.open});
    this.handleClose = () => this.setState({open: false});
  }

  static get childContextTypes() {
    return { muiTheme: React.PropTypes.object };
  }

  getChildContext(){
    return { muiTheme: getMuiTheme(Theme) };
  }

  static get propTypes() {
    return {
      children: React.PropTypes.node.isRequired
    };
  }

  render() {
    const title = "Yusuke Miyazaki";
    const description = "Yusuke Miyazaki's portfolio website.";
    return (
      <div>
        <Helmet htmlAttributes={{prefix: "og: http://ogp.me/ns# profile: http://ogp.me/ns/profile#"}}
                titleTemplate={`%s - ${title}`}
                defaultTitle={title}
                meta={[
                  {name: "description", content: description},
                  {property: "og:type", content: "profile"},
                  {property: "og:title", content: title},
                  {property: "og:url", content: "https://www.ymyzk.com"},
                  {property: "og:image", content: OgpImage},
                  {property: "og:locale", content: "ja_JP"},
                  {property: "og:locale:alternate", content: "en_US"},
                  {property: "og:site_name", content: title},
                  {property: "og:description", content: description},
                  {property: "profile:first_name", content: "Yusuke"},
                  {property: "profile:last_name", content: "Miyazaki"},
                  {property: "profile:username", content: "ymyzk"},
                  // TODO: Update color
                  {name: "theme-color", content: "#222"}
                ]} />
        <AppBar title="Yusuke Miyazaki"
                onLeftIconButtonTouchTap={this.handleToggle} />
        <Drawer open={this.state.open}
                 docked={false}
                 onRequestChange={open => this.setState({open})}>
          <MenuItem onTouchTap={this.handleClose} containerElement={<Link to="/" />}>Home</MenuItem>
          <MenuItem onTouchTap={this.handleClose} containerElement={<Link to="/projects" />}>Projects</MenuItem>
          <MenuItem onTouchTap={this.handleClose} containerElement={<Link to="/talks" />}>Talks</MenuItem>
          <MenuItem onTouchTap={this.handleClose} containerElement={<Link to="/contributions" />}>Contributions</MenuItem>
          <MenuItem onTouchTap={this.handleClose} containerElement={<Link to="/news" />}>News</MenuItem>
        </Drawer>
        {this.props.children}
      </div>
    );
  }
}

export default App;