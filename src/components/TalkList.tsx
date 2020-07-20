import React, { useState } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Talk } from "../data/types";
import TalkListItem from "./TalkListItem";

interface Props {
  talks: Talk[];
}

const TalkList: React.FC<Props> = ({ talks }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const talksToShow = expanded ? talks : talks.slice(0, 3);
  return (
    <List>
      { talksToShow.map((t) => <TalkListItem talk={t} key={t.id} />) }
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

export default TalkList;
