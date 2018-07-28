// @flow
import React from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import GridContainer from "../src/components/GridContainer";
import Hero from "../src/components/Hero";
import Links from "../src/components/Links";
import Misc from "../src/components/Misc";
import ProjectCardList from "../src/components/ProjectCardList";
import Skills from "../src/components/Skills";
import TalkList from "../src/components/TalkList";
import WorkExperienceList from "../src/components/WorkExperienceList";
import links from "../src/data/links";
import misc from "../src/data/misc";
import projects from "../src/data/projects";
import skills from "../src/data/skills";
import talks from "../src/data/talks";
import works from "../src/data/works";
import withRoot from "../src/withRoot";

const styles = theme => ({
  root: {},
  section: {
    paddingBottom: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 3,
  },
  sectionHeader: {
    fontSize: 34,
    fontWeight: 300,
    paddingBottom: theme.spacing.unit / 2,
    paddingTop: theme.spacing.unit / 2,
    textAlign: "center",
  },
});

const Index = ({ classes }) => (
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
          Misc
        </Typography>
        <Misc misc={misc} />
      </Grid>
    </GridContainer>
  </div>
);

Index.propTypes = {
  classes: PropTypes.object.isRequired,  // eslint-disable-line
};

export default withRoot(withStyles(styles)(Index));
