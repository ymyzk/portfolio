import AppBar from '../../../node_modules/material-ui/lib/app-bar';
import LeftNav from '../../../node_modules/material-ui/lib/left-nav';
import MenuItem from '../../../node_modules/material-ui/lib/menus/menu-item';
import ThemeManager from '../../../node_modules/material-ui/lib/styles/theme-manager';
import React from 'react';
import { Link } from 'react-router';

import MyRawTheme from './Theme';

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
    return { muiTheme: ThemeManager.getMuiTheme(MyRawTheme) };
  }

  render() {
    return (
      <div>
        <AppBar title="Yusuke Miyazaki"
                onLeftIconButtonTouchTap={this.handleToggle} />
        <LeftNav open={this.state.open}
                 docked={false}
                 onRequestChange={open => this.setState({open})}>
          <MenuItem onTouchTap={this.handleClose} containerElement={<Link to="/" />}>Home</MenuItem>
          <MenuItem onTouchTap={this.handleClose} containerElement={<Link to="/projects" />}>Projects</MenuItem>
          <MenuItem onTouchTap={this.handleClose} containerElement={<Link to="/talks" />}>Talks</MenuItem>
          <MenuItem onTouchTap={this.handleClose} containerElement={<Link to="/contributions" />}>Contributions</MenuItem>
        </LeftNav>
        {this.props.children}
      </div>
    );
  }
}

export default App;
