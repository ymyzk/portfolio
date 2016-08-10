import ListItem from "material-ui/List/ListItem";
import React from "react";

import PropTypes from "../../utils/PropTypes";

const TalkListItem = ({ talk, onTalkSelected }) => {
  const dateString = talk.date.format("YYYY-M-D");
  const dateIso = talk.date.format("YYYY-MM-DD");
  return (
    <ListItem
      primaryText={talk.title}
      secondaryText={<span>{talk.event} - <time dateTime={dateIso}>{dateString}</time></span>}
      onTouchTap={() => onTalkSelected(talk)}
    />
  );
};

TalkListItem.propTypes = {
  talk: PropTypes.Talk.isRequired,
  onTalkSelected: React.PropTypes.func
};

export default TalkListItem;
