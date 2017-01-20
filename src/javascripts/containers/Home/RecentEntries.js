import LinearProgress from "material-ui/LinearProgress";
import { List, ListItem } from "material-ui/List";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";

import { requestRecentEntries, requestRecentEntriesFailure, requestRecentEntriesSuccess } from "../../actions/entries";

class RecentEntriesCard extends React.Component {
  static propTypes = {
    entries: React.PropTypes.arrayOf(React.PropTypes.object.isRequired),
    isFetching: React.PropTypes.bool.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    entries: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestRecentEntries());
    fetch("https://blog.ymyzk.com/wp-json/wp/v2/posts")
      .then((response) => {
        if (response.status !== 200) {
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
        return response;
      })
      .then(response => response.json())
      .then(json => dispatch(requestRecentEntriesSuccess(json)))
      .catch(error => dispatch(requestRecentEntriesFailure(error)));
  }

  render() {
    const { entries, isFetching } = this.props;
    const progress = isFetching ? (<LinearProgress mode="indeterminate" />) : null;
    return (
      <div>
        <h3>Recent Entries</h3>
        {progress}
        <List>
          {
            entries.map((e) => {
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
  }
}

const mapStateToProps = state => ({
  entries: state.entries.recentEntries.slice(0, 3),
  isFetching: state.entries.isRecentEntriesFetching,
});

export default connect(mapStateToProps)(RecentEntriesCard);
