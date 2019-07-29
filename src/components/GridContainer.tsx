import React, { ReactNode } from "react";

import Grid from "@material-ui/core/Grid";
import {
  createStyles, Theme, WithStyles, withStyles,
} from "@material-ui/core/styles";

const styles = (theme: Theme) => createStyles({
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

interface Props extends WithStyles<typeof styles> {
  children: ReactNode;
}

const GridContainer = ({ classes, children }: Props) => (
  <Grid container justify="center">
    <Grid container className={classes.innerContainer}>
      { children }
    </Grid>
  </Grid>
);

export default withStyles(styles)(GridContainer);
