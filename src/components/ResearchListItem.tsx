import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  primary: {
    fontSize: ".9rem",
  },
};

interface Props {
  classes: any;
  research: any;
}

const ResearchListItem = ({ classes, research }: Props) => {
  const tags = research.tags.join(" / ");
  return (
    <ListItem button component="a" href={research.link} target="_blank" rel="noopener">
      <ListItemText
        classes={{ primary: classes.primary }}
        primary={research.title}
        secondary={tags}
      />
    </ListItem>
  );
};

export default withStyles(styles)(ResearchListItem);
