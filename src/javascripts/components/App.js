import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router";

import Theme from "./Theme";

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
    return (
      <div>
        <Helmet titleTemplate="%s - Yusuke Miyazaki"
                defaultTitle="Yusuke Miyazaki" />
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
