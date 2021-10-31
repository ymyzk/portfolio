import React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import { Research } from "../data/types";

interface Props {
  research: Research;
}

const ResearchListItem = ({ research }: Props) => {
  const tags = research.tags.join(" / ");
  return (
    // @ts-ignore
    <ListItem button component="a" href={research.link} target="_blank" rel="noopener">
      <ListItemText
        sx={{ fontSize: ".9rem" }}
        primary={research.title}
        secondary={tags}
      />
    </ListItem>
  );
};

export default ResearchListItem;
