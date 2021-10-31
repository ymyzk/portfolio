import format from "date-fns/format";
import React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import { Talk } from "../data/types";

interface Props {
  talk: Talk;
}

const TalkListItem: React.FC<Props> = ({ talk }) => {
  const dateString = format(talk.date, "yyyy-M-d");
  const dateIso = format(talk.date, "yyyy-MM-dd");
  const href = talk.slide ? talk.slide : (talk.link ? talk.link : "#"); // eslint-disable-line no-nested-ternary
  return (
    <ListItem
      button
      component="a"
      href={href}
    >
      <ListItemText
        primary={talk.title}
        secondary={(
          <span>
            <time dateTime={dateIso}>
              {dateString}
            </time>
            &nbsp;—&nbsp;
            {talk.event}
          </span>
        )}
      />
    </ListItem>
  );
};

export default TalkListItem;
