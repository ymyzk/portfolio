import PropTypes from "prop-types";
import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const WorkExperienceItem = ({ work }) => (
  <ListItem button component="a" href={work.link}>
    <ListItemText
      primary={`${work.title} of ${work.company}`}
      secondary={`${work.start.format("MMM Y")}–${work.end ? work.end.format("MMM Y") : "Present"}`}
    />
  </ListItem>
);

WorkExperienceItem.propTypes = {
  work: PropTypes.object.isRequired,
};

class WorkExperience extends React.Component {
  static propTypes = {
    works: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
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
    const { works } = this.props;
    const { expanded } = this.state;
    return (
      <List>
        {
          works
            .filter(w => (expanded ? true : w.featured))
            .map(w => <WorkExperienceItem work={w} key={w.title + w.company + w.start.unix()} />)
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

export default WorkExperience;
