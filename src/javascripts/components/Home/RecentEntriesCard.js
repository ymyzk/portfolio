import { Card, CardTitle } from "material-ui/Card";
import LinearProgress from "material-ui/LinearProgress";
import { List, ListItem } from "material-ui/List";
import moment from "moment";
import React from "react";

class RecentEntriesCard extends React.Component {
  state = {
    entries: null
  };

  componentDidMount() {
    fetch("https://blog.ymyzk.com/wp-json/wp/v2/posts")
      .then((response) => response.json())
      .then((json) => this.setState({ entries: json.slice(0, 3) }));
  }

  render() {
    return (
      <Card>
        <CardTitle title="Recent Entries" />
        <RecentEntriesList entries={this.state.entries} />
      </Card>
    );
  }
}

const RecentEntriesList = ({ entries }) => {
  const hasEntries = entries !== null;
  const progress = hasEntries ? null : (<LinearProgress mode="indeterminate" />);
  const entriesForList = hasEntries ? entries : [];
  return (
    <div>
      {progress}
      <List>
        {
          entriesForList.map((e) => {
            const time = moment.utc(e.date);
            const timeIso = time.toISOString();
            const timeString = time.format("YYYY-M-D H:mm");
            return (
              <ListItem
                primaryText={e.title.rendered}
                secondaryText={<time dateTime={timeIso}>{timeString}</time>}
                href={e.link}
                target="_blank"
                key={e.id}
              />);
          })
        }
        <ListItem
          primaryText="More Entries..."
          href="https://blog.ymyzk.com/"
          target="_blank"
        />
      </List>
    </div>
  );
};

RecentEntriesList.propTypes = {
  entries: React.PropTypes.arrayOf(React.PropTypes.object.isRequired)
};

export default RecentEntriesCard;
