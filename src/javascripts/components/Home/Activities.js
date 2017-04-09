import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import PropTypes from "prop-types";
import React from "react";

import RecentEntries from "../../containers/Home/RecentEntries";
import CustomPropTypes from "../../utils/CustomPropTypes";
import TalkListItem from "../Talks/TalkListItem";

const RecentTalks = ({ talks, numberOfTalks, onTalkSelected }) => (
  <div>
    <h3>Recent Talks</h3>
    <List>
      {
        talks.slice(0, numberOfTalks).map(t => (
          <TalkListItem talk={t} key={t.title + t.event} onTalkSelected={onTalkSelected} />
        ))
      }
      <ListItem primaryText="More talks..." href="/talks/" />
    </List>
  </div>
);

RecentTalks.propTypes = {
  talks: PropTypes.arrayOf(CustomPropTypes.Talk.isRequired).isRequired,
  numberOfTalks: PropTypes.number,
  onTalkSelected: PropTypes.func.isRequired,
};

RecentTalks.defaultProps = {
  numberOfTalks: 3,
};

const Activities = ({ talks, onTalkSelected }) => (
  <section className="grid">
    <div className="cell-xs-without-gutter cell-sm-12">
      <h2>Activities</h2>
      <RecentEntries />
      <RecentTalks talks={talks} onTalkSelected={onTalkSelected} />
    </div>
  </section>
);

Activities.propTypes = {
  talks: PropTypes.arrayOf(CustomPropTypes.Talk.isRequired).isRequired,
  onTalkSelected: PropTypes.func.isRequired,
};

export default Activities;
