// @flow
import PropTypes from "prop-types";
import React from "react";

import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

const Skills = ({ classes, skills }) => (
  <div className={classes.root}>
    {
      skills.map(s => (
        <Chip className={classes.chip} label={s} key={s} />
      ))
    }
  </div>
);

Skills.propTypes = {
  classes: PropTypes.object.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default withStyles(styles)(Skills);
