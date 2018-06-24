import PropTypes from "prop-types";
import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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

const WorkExperience = ({ works }) => (
  <List>
    { works.map(w => <WorkExperienceItem work={w} key={w.title + w.company} />) }
  </List>
);

WorkExperience.propTypes = {
  works: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default WorkExperience;
