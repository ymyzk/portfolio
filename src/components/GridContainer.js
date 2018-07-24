// @flow
import React from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  innerContainer: {
    [theme.breakpoints.up("sm")]: {
      width: 576,
    },
    [theme.breakpoints.up("md")]: {
      width: 936,
    },
    [theme.breakpoints.up("lg")]: {
      width: 1200,
    },
  },
});

const GridContainer = ({ classes, children }) => (
  <Grid container justify="center">
    <Grid container className={classes.innerContainer}>
      { children }
    </Grid>
  </Grid>
);

GridContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(GridContainer);
