import List from "material-ui/List/List";
import React from "react";

import PropTypes from "../../utils/PropTypes";
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
    </List>
  </div>
);

RecentTalks.propTypes = {
  talks: React.PropTypes.arrayOf(PropTypes.Talk.isRequired).isRequired,
  numberOfTalks: React.PropTypes.number,
  onTalkSelected: React.PropTypes.func.isRequired,
};

RecentTalks.defaultProps = {
  numberOfTalks: 3,
};

const Activities = ({ talks, onTalkSelected }) => (
  <section className="grid">
    <div className="cell-sm-12">
      <h2>Activities</h2>
      <RecentTalks talks={talks} onTalkSelected={onTalkSelected} />
    </div>
  </section>
);

Activities.propTypes = {
  talks: React.PropTypes.arrayOf(PropTypes.Talk.isRequired).isRequired,
  onTalkSelected: React.PropTypes.func.isRequired,
};

export default Activities;
