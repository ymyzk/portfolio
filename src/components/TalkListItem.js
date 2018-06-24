import PropTypes from "prop-types";
import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const TalkListItem = ({ talk }) => {
  const dateString = talk.date.format("YYYY-M-D");
  const dateIso = talk.date.format("YYYY-MM-DD");
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
            {talk.event}
            {" - "}
            <time dateTime={dateIso}>
              {dateString}
            </time>
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
