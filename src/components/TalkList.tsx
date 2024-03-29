import React, { useState } from "react";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import type { Talk } from "../data/types";
import TalkListItem from "./TalkListItem";

interface Props {
  talks: Talk[];
}

export default function TalkList({ talks }: Props) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const talksToShow = expanded ? talks : talks.slice(0, 3);
  return (
    <List>
      { talksToShow.map((t) => <TalkListItem talk={t} key={t.id} />) }
      <ListItemButton onClick={() => setExpanded(!expanded)}>
        <ListItemIcon>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemIcon>
        <ListItemText primary={`Show ${expanded ? "less" : "more"}`} />
      </ListItemButton>
    </List>
  );
}
