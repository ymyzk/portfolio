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

type Work = {
  id: number,
  title: string,
  work: ?string,
  company: string,
  start: Date,
  end: ?Date,
  featured: boolean,
  link: ?string,
};

type Props = {
  works: Array<Work>,
};

type State = {
  expanded: boolean,
};

const WorkExperienceItem = ({ work }: { work: Work }) => (
  <ListItem button component="a" href={work.link}>
    <ListItemText
      primary={`${work.title} of ${work.company}`}
      secondary={`${format(work.start, "MMM YYYY")}–${work.end ? format(work.end, "MMM YYYY") : "Present"}`}
    />
  </ListItem>
);

WorkExperienceItem.propTypes = {
  work: PropTypes.object.isRequired,
};

class WorkExperienceList extends React.Component<Props, State> {
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
            .map(w => <WorkExperienceItem work={w} key={w.id} />)
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

export default WorkExperienceList;
