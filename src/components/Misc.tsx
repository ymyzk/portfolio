import { format } from "date-fns";
import { useState } from "react";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import type { Misc } from "../data/types";

function MiscItem({ misc }: { misc: Misc }) {
  return (
    <ListItemButton component="a" href={misc.link}>
      <ListItemText
        primary={misc.title}
        secondary={`${format(misc.date, "yyyy-M-d")} — ${misc.subtitle}`}
      />
    </ListItemButton>
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
      <ListItemButton onClick={() => setExpanded(!expanded)}>
        <ListItemIcon>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemIcon>
        <ListItemText primary={`Show ${expanded ? "less" : "more"}`} />
      </ListItemButton>
    </List>
  );
}
