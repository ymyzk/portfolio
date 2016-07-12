import { Card, CardTitle } from "material-ui/Card";
import React from "react";
import { List, ListItem } from "material-ui/List";

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
              href={talk.link}
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
  talks: React.PropTypes.arrayOf(React.PropTypes.object.isRequired).isRequired
};

export default RecentTalksCard;
