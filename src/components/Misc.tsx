import format from "date-fns/format";
import React, { useState } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Misc } from "../data/types";

const MiscItem = ({ misc }: { misc: Misc }) => (
  <ListItem button component="a" href={misc.link}>
    <ListItemText
      primary={misc.title}
      secondary={`${format(misc.date, "yyyy-M-d")} — ${misc.subtitle}`}
    />
  </ListItem>
);

interface Props {
  misc: Misc[];
}

const MiscList = ({ misc }: Props) => {
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
};

export default MiscList;
