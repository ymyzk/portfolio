import React from "react";

import Chip from "@material-ui/core/Chip";
import {
  createStyles, Theme, WithStyles, withStyles,
} from "@material-ui/core";

const styles = ({ spacing }: Theme) => createStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  chip: {
    margin: spacing(0.5),
  },
});

interface Props extends WithStyles<typeof styles> {
  skills: string[];
}

const Skills = ({ classes, skills }: Props) => (
  <div className={classes.root}>
    {
      skills.map(s => (
        <Chip className={classes.chip} label={s} key={s} />
      ))
    }
  </div>
);

export default withStyles(styles)(Skills);
