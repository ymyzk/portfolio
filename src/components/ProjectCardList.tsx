import React from "react";

import Grid from "@mui/material/Grid";

import { Project } from "../data/types";
import ProjectCard from "./ProjectCard";

interface Props {
  projects: Project[];
}

const ProjectCardList: React.FC<Props> = ({ projects }) => (
  // Hack to fix the problem related to negative margin
  // https://material-ui.com/layout/grid/#negative-margin
  <div style={{ padding: 8 }}>
    <Grid container spacing={2}>
      {
        projects.filter((p) => p.featured).map((p) => (
          <Grid item key={p.id} xs={12} sm={6} md={4}>
            <ProjectCard project={p} />
          </Grid>
        ))
      }
    </Grid>
  </div>
);

export default ProjectCardList;
