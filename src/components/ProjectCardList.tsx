import React from "react";

import Grid from "@mui/material/Grid";

import type { Project } from "../data/types";
import ProjectCard from "./ProjectCard";

interface Props {
  projects: Project[];
}

export default function ProjectCardList({ projects }: Props) {
  return (
    // Hack to fix the problem related to negative margin
    // https://material-ui.com/layout/grid/#negative-margin
    <div style={{ padding: 8 }}>
      <Grid container spacing={2}>
        {
          projects.filter((p) => p.featured)
            .map((p) => (
              <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <ProjectCard project={p} />
              </Grid>
            ))
        }
      </Grid>
    </div>
  );
}
