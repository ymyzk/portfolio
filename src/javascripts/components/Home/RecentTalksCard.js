import Card from "material-ui/Card/Card";
import CardTitle from "material-ui/Card/CardTitle";
import React from "react";
import { List, ListItem } from "material-ui/List";

import PropTypes from "../../utils/PropTypes";

const RecentTalksCard = ({ talks }) => (
  <Card>
    <CardTitle title="Recent Talks" />
    <List>
      {
        talks.map((talk) => {
          const dateString = talk.date.format("YYYY-M-D");
          const dateIso = talk.date.format("YYYY-MM-DD");
          return (
            <ListItem
              primaryText={talk.title}
              secondaryText={<span>{talk.event} - <time dateTime={dateIso}>{dateString}</time></span>}
              href={talk.slide || talk.link}
              target="_blank"
              key={talk.title + talk.event}
            />
          );
        })
      }
      <ListItem primaryText="More Talks..." href="/talks/" />
    </List>
  </Card>
);

RecentTalksCard.propTypes = {
  talks: React.PropTypes.arrayOf(PropTypes.Talk.isRequired).isRequired
};

export default RecentTalksCard;
