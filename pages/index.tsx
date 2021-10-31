import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";
import { createStyles, WithStyles, withStyles } from "@mui/styles";

import GridContainer from "../src/components/GridContainer";
import Hero from "../src/components/Hero";
import Links from "../src/components/Links";
import Misc from "../src/components/Misc";
import ProjectCardList from "../src/components/ProjectCardList";
import Research from "../src/components/Research";
import Skills from "../src/components/Skills";
import TalkList from "../src/components/TalkList";
import WorkExperienceList from "../src/components/WorkExperienceList";
import {
  links,
  misc,
  projects,
  research,
  skills,
  talks,
  works,
} from "../src/data"; /* eslint-disable-line import/no-unresolved */

const styles = ({ spacing }: Theme) => createStyles({
  root: {},
  section: {
    paddingBottom: spacing(3),
    paddingTop: spacing(3),
  },
  sectionHeader: {
    fontSize: 34,
    fontWeight: 300,
    paddingBottom: spacing(0.5),
    paddingTop: spacing(0.5),
    textAlign: "center",
  },
});

const Index = ({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.root}>
    <Hero />
    <GridContainer>
      <Grid item xs={12} className={classes.section}>
        <div style={{ height: 50 }} />
        <Links links={links} />
      </Grid>
      <Grid item xs={12} className={classes.section}>
        <Typography className={classes.sectionHeader} component="h2">
          Work Experience
        </Typography>
        <WorkExperienceList works={works} />
      </Grid>
      <Grid item xs={12} className={classes.section}>
        <Typography className={classes.sectionHeader} component="h2">
          Talks
        </Typography>
        <TalkList talks={talks} />
      </Grid>
      <Grid item xs={12} className={classes.section}>
        <Typography className={classes.sectionHeader} component="h2">
          Projects
        </Typography>
        <ProjectCardList projects={projects} />
      </Grid>
      <Grid item xs={12} className={classes.section}>
        <Typography className={classes.sectionHeader} component="h2">
          Skills
        </Typography>
        <Skills skills={skills} />
      </Grid>
      <Grid item xs={12} className={classes.section}>
        <Typography className={classes.sectionHeader} component="h2">
          Research
        </Typography>
        <Research research={research} />
      </Grid>
      <Grid item xs={12} className={classes.section}>
        <Typography className={classes.sectionHeader} component="h2">
          Misc
        </Typography>
        <Misc misc={misc} />
      </Grid>
    </GridContainer>
  </div>
);

export default withStyles(styles)(Index);
