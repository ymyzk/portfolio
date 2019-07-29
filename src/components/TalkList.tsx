import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Talk } from "../data/types";
import TalkListItem from "./TalkListItem";

interface Props {
  talks: Talk[];
}

interface State {
  expanded: boolean;
}

class TalkList extends React.Component<Props, State> {
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
