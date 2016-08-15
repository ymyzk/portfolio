import List from "material-ui/List/List";
import Subheader from "material-ui/Subheader";
import React from "react";
import Helmet from "react-helmet";

import PropTypes from "../../utils/PropTypes";
import TalkDialog from "./TalkDialog";
import TalkListItem from "./TalkListItem";

const Talks = ({ talks, isDialogOpen, selectedTalk, onTalkSelected, onTalkDeselected }) => {
  const title = "Talks";
  const talksByYear = {};
  talks.forEach((t) => {
    const year = t.date.year();
    if (year in talksByYear) {
      talksByYear[year].push(t);
    } else {
      talksByYear[year] = [t];
    }
  });
  const years = Object.keys(talksByYear).sort().reverse();
  return (
    <div className="container">
      <Helmet title={title} />
      <h2>{title}</h2>
      <div className="grid">
        <div className="cell-xs-without-gutter cell-sm-12">
          <List>
            {
              years.map((year) => (
                <div key={year}>
                  <Subheader>{year}</Subheader>
                  {
                    talksByYear[year].map((t) => (
                      <TalkListItem talk={t} key={t.title + t.event} onTalkSelected={onTalkSelected} />
                    ))
                  }
                </div>
              ))
            }
          </List>
          <TalkDialog open={isDialogOpen} talk={selectedTalk} onClose={onTalkDeselected} />
        </div>
      </div>
    </div>
  );
};

Talks.propTypes = {
  talks: React.PropTypes.arrayOf(PropTypes.Talk.isRequired).isRequired,
  isDialogOpen: React.PropTypes.bool.isRequired,
  selectedTalk: PropTypes.Talk,
  onTalkSelected: React.PropTypes.func.isRequired,
  onTalkDeselected: React.PropTypes.func.isRequired
};

export default Talks;
