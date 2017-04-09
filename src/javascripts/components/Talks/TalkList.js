import List from "material-ui/List/List";
import Subheader from "material-ui/Subheader";
import PropTypes from "prop-types";
import React from "react";

import CustomPropTypes from "../../utils/PropTypes";
import TalkListItem from "./TalkListItem";

const TalkList = ({ talks, onTalkSelected }) => {
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
    <List>
      {
        years.map(year => (
          <div key={year}>
            <Subheader>{year}</Subheader>
            {
              talksByYear[year].map(t => (
                <TalkListItem talk={t} key={t.title + t.event} onTalkSelected={onTalkSelected} />
              ))
            }
          </div>
        ))
      }
    </List>
  );
};

TalkList.propTypes = {
  talks: PropTypes.arrayOf(CustomPropTypes.Talk.isRequired).isRequired,
  onTalkSelected: PropTypes.func.isRequired,
};

export default TalkList;
