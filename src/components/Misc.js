// @flow
import format from "date-fns/format";
import PropTypes from "prop-types";
import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

type Misc = {
  id: number,
  title: string,
  subtitle: string,
  date: Date,
  link: string,
  featured: boolean,
};

type Props = {
  misc: Array<Misc>,
};

type State = {
  expanded: boolean,
};

const MiscItem = ({ misc }: { misc: Misc }) => (
  <ListItem button component="a" href={misc.link}>
    <ListItemText
      primary={misc.title}
      secondary={`${format(misc.date, "YYYY-M-D")} — ${misc.subtitle}`}
    />
  </ListItem>
);

MiscItem.propTypes = {
  misc: PropTypes.object.isRequired,
};

class MiscList extends React.Component<Props, State> {
  static propTypes = {
    misc: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
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
    const { misc } = this.props;
    const { expanded } = this.state;
    return (
      <List>
        {
          misc
            .filter(m => (expanded ? true : m.featured))
            .map(m => <MiscItem misc={m} key={m.id} />)
        }
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

export default MiscList;
