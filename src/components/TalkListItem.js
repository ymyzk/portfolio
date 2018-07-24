// @flow
import format from "date-fns/format";
import PropTypes from "prop-types";
import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

type Props = {
  talk: Talk,
};

const TalkListItem = ({ talk }: Props) => {
  const dateString = format(talk.date, "YYYY-M-D");
  const dateIso = format(talk.date, "YYYY-MM-DD");
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
            {" — "}
            {talk.event}
          </span>
)}
      />
    </ListItem>
  );
};

TalkListItem.propTypes = {
  talk: PropTypes.object.isRequired,
};

export default TalkListItem;
