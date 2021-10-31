import React from "react";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import withStyles from "@mui/styles/withStyles";

import ResearchListItem from "./ResearchListItem";

const styles = (theme: Theme) => ({
  root: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
});

interface Props {
  classes: any;
  research: any[];
}

const Research = ({ classes, research }: Props) => (
  <div className={classes.root}>
    <Grid container justifyContent="center" spacing={4}>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Typography variant="body1">
          Received my Masters of Informatics and Bachelor of Engineering from Kyoto University
          in 2018 and 2016, respectively. Worked on programming language theory including
          gradual typing, type inference, delimited continuations (shift/reset).
        </Typography>
      </Grid>
    </Grid>
    <List>
      {
        research.map((r) => <ResearchListItem research={r} key={r.id} />)
      }
    </List>
  </div>
);

export default withStyles(styles)(Research);
