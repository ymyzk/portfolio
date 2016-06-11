import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import React from "react";
import Helmet from "react-helmet";

import { loadTalks } from "../data";

const Talks = () => {
  const title = "Talks";
  const talks = loadTalks();
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
                <div>
                  <Subheader>{year}</Subheader>
                  {
                    talksByYear[year].map((t) => (
                      <TalkListItem talk={t} key={t.title + t.event} />
                    ))
                  }
                </div>
              ))
            }
          </List>
        </div>
      </div>
    </div>
  );
};

const TalkListItem = ({ talk }) => {
  const dateString = talk.date.format("YYYY-M-D");
  const dateIso = talk.date.format("YYYY-MM-DD");
  return (
    <ListItem
      primaryText={talk.title}
      secondaryText={<span>{talk.event} - <time dateTime={dateIso}>{dateString}</time></span>}
      href={talk.link}
    />
  );
};

TalkListItem.propTypes = {
  talk: React.PropTypes.object.isRequired
};

export default Talks;
