import PropTypes from "prop-types";
import React from "react";

import List from "@material-ui/core/List";

import TalkListItem from "./TalkListItem";

const TalkList = ({ talks }) => (
  <List>
    { talks.map(t => <TalkListItem talk={t} key={t.title} />) }
  </List>
);

TalkList.propTypes = {
  talks: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default TalkList;
