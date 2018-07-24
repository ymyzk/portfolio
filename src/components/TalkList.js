// @flow
import PropTypes from "prop-types";
import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import TalkListItem from "./TalkListItem";

type Props = {
  talks: Array<Talk>,
};

type State = {
  expanded: boolean,
};

class TalkList extends React.Component<Props, State> {
  static propTypes = {
    talks: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  };

  state = {
    expanded: false,
  };

  toggle = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded,
    }));
  };

  render() {
    let { talks } = this.props;
    const { expanded } = this.state;
    talks = expanded ? talks : talks.slice(0, 3);
    return (
      <List>
        { talks.map(t => <TalkListItem talk={t} key={t.id} />) }
        <ListItem button>
          <ListItemIcon>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemIcon>
          <ListItemText
            primary={`Show ${expanded ? "less" : "more"}`}
            onClick={this.toggle}
          />
        </ListItem>
      </List>
    );
  }
}

export default TalkList;
