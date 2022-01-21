import format from "date-fns/format";
import React, { useState } from "react";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Misc } from "../data/types";

function MiscItem({ misc }: { misc: Misc }) {
  return (
    <ListItem button component="a" href={misc.link}>
      <ListItemText
        primary={misc.title}
        secondary={`${format(misc.date, "yyyy-M-d")} — ${misc.subtitle}`}
      />
    </ListItem>
  );
}

interface Props {
  misc: Misc[];
}

export default function MiscList({ misc }: Props) {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <List>
      {
        misc
          .filter((m) => (expanded ? true : m.featured))
          .map((m) => <MiscItem misc={m} key={m.id} />)
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
}
