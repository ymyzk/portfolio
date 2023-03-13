import format from "date-fns/format";
import React, { useState } from "react";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Work } from "../data/types";

function WorkExperienceItem({ work }: { work: Work }) {
  return (
    // @ts-ignore
    <ListItemButton component="a" href={work.link} target="_blank" rel="noopener">
      <ListItemText
        primary={`${work.title} of ${work.company}`}
        secondary={`${format(work.start, "MMM yyyy")}–${work.end ? format(work.end, "MMM yyyy") : "Present"}`}
      />
    </ListItemButton>
  );
}

interface Props {
  works: Work[];
}

export default function WorkExperienceList({ works }: Props) {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <List>
      {
        works
          .filter((w) => (expanded ? true : w.featured))
          .map((w) => <WorkExperienceItem work={w} key={w.id} />)
      }
      <ListItemButton onClick={() => setExpanded(!expanded)}>
        <ListItemIcon>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemIcon>
        <ListItemText primary={`Show ${expanded ? "less" : "more"}`} />
      </ListItemButton>
    </List>
  );
}
