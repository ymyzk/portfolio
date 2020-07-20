import format from "date-fns/format";
import React, { useState } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
