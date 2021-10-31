import React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { createStyles, WithStyles, withStyles } from "@mui/styles";

import { Research } from "../data/types";

const styles = createStyles({
  primary: {
    fontSize: ".9rem",
  },
});

interface Props extends WithStyles<typeof styles> {
  classes: any;
  research: Research;
}

const ResearchListItem = ({ classes, research }: Props) => {
  const tags = research.tags.join(" / ");
  return (
    // @ts-ignore
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
