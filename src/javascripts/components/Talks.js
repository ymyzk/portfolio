import { List, ListItem } from "material-ui/List";
import React from "react";
import Helmet from "react-helmet";

import { loadTalks } from "../data";

const Talks = () => {
  const title = "Talks";
  const talks = loadTalks();
  return (
    <div className="container">
      <Helmet title={title} />
      <h2>{title}</h2>
      <div className="grid">
        <div className="cell-xs-without-gutter cell-sm-12">
          <List>
            {
              talks.map((t) => (<TalkListItem talk={t} key={t.title + t.event} />))
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
