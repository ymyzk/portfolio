import React from "react";

import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Typography from "@material-ui/core/Typography";

const listItemStyles = {
  primary: {
    fontSize: ".9rem",
  },
};

const styles = (theme: Theme) => ({
  root: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

interface ResearchListItemProps {
    classes: any;
    research: any;
}

const ResearchListItem = withStyles(listItemStyles)(
  ({ classes, research }: ResearchListItemProps) => {
    const tags = research.tags.join(" / ");
    return (
      <ListItem button>
        {/* TODO REDUCE FONT SIZE add link */}
        <ListItemText
          classes={{ primary: classes.primary }}
          primary={research.title}
          secondary={tags}
        />
      </ListItem>
    );
  },
);

interface ResearchProps {
    classes: any;
    research: any[];
}

const Research = ({ classes, research }: ResearchProps) => (
  <div className={classes.root}>
    <Grid container justify="center" spacing={24}>
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
        research.map(r => <ResearchListItem research={r} key={r.id} />)
      }
    </List>
  </div>
);

export default withStyles(styles)(Research);
