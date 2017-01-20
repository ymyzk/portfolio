import Avatar from "material-ui/Avatar";
import ListItem from "material-ui/List/ListItem";
import React from "react";

import Theme from "../Theme";
import PropTypes from "../../utils/PropTypes";
import oEmbedData from "../../../data/oembed.json";

const TalkListItem = ({ talk, onTalkSelected }) => {
  const dateString = talk.date.format("YYYY-M-D");
  const dateIso = talk.date.format("YYYY-MM-DD");
  const oEmbed = oEmbedData[talk.slide];
  const thumbnail = oEmbed ? oEmbed.thumbnail : null;
  return (
    <ListItem
      className="talk-list-item"
      primaryText={talk.title}
      secondaryText={<span>{talk.event} - <time dateTime={dateIso}>{dateString}</time></span>}
      onTouchTap={() => onTalkSelected(talk)}
      leftAvatar={
        thumbnail ? <Avatar src={thumbnail} /> : <Avatar backgroundColor={Theme.palette.primary1Color}>{talk.title.charAt(0)}</Avatar>
      }
    />
  );
};

TalkListItem.propTypes = {
  talk: PropTypes.Talk.isRequired,
  onTalkSelected: React.PropTypes.func,
};

TalkListItem.defaultProps = {
  onTalkSelected: () => {},
};

export default TalkListItem;
