import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import PropTypes from "prop-types";
import React from "react";

import CustomPropTypes from "../../utils/CustomPropTypes";

const WorkExperienceItem = ({ work }) => (
  <ListItem
    primaryText={`${work.title} of ${work.company}`}
    secondaryText={`${work.start.format("MMM Y")}–${work.end ? work.end.format("MMM Y") : "Present"}`}
    href={work.link}
  />
);

WorkExperienceItem.propTypes = {
  work: CustomPropTypes.Work.isRequired,
};

const WorkExperience = ({ works }) => (
  <section className="grid">
    <div className="cell-xs-without-gutter cell-sm-12">
      <h2>Work Experience</h2>
      <List>
        { works.map(w => <WorkExperienceItem work={w} key={w.title + w.company} />) }
      </List>
    </div>
  </section>
);

WorkExperience.propTypes = {
  works: PropTypes.arrayOf(CustomPropTypes.Work).isRequired,
};

export default WorkExperience;
