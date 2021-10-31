import format from "date-fns/format";
import React, { useState } from "react";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Work } from "../data/types";

const WorkExperienceItem = ({ work }: { work: Work }) => (
  // @ts-ignore
  <ListItem button component="a" href={work.link} target="_blank" rel="noopener">
    <ListItemText
      primary={`${work.title} of ${work.company}`}
      secondary={`${format(work.start, "MMM yyyy")}–${work.end ? format(work.end, "MMM yyyy") : "Present"}`}
    />
  </ListItem>
);

interface Props {
  works: Work[];
}

const WorkExperienceList: React.FC<Props> = ({ works }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <List>
      {
        works
          .filter((w) => (expanded ? true : w.featured))
          .map((w) => <WorkExperienceItem work={w} key={w.id} />)
      }
      <ListItem button>
        <ListItemIcon>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemIcon>
        <ListItemText
          primary={`Show ${expanded ? "less" : "more"}`}
          onClick={() => setExpanded(!expanded)}
        />
      </ListItem>
    </List>
  );
};

export default WorkExperienceList;
