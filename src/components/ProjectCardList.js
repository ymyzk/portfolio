// @flow
import PropTypes from "prop-types";
import React from "react";

import Grid from "@material-ui/core/Grid";

import ProjectCard from "./ProjectCard";

type Props = {
  projects: Array<any>,
};

const ProjectCardList = ({ projects }: Props) => (
  // Hack to fix the problem related to negative margin
  // https://material-ui.com/layout/grid/#negative-margin
  <div style={{ padding: 8 }}>
    <Grid container spacing={16}>
      {
        projects.filter(p => p.featured).map(p => (
          <Grid item key={p.id} xs={12} sm={6} md={4}>
            <ProjectCard project={p} />
          </Grid>
        ))
      }
    </Grid>
  </div>
);

ProjectCardList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default ProjectCardList;
