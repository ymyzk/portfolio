import { List, ListItem } from "material-ui/List";
import React from "react";

import { loadTalks } from "../data";

class Talks extends React.Component {
  render() {
    const talks = loadTalks();
    return (
      <div className="container">
        <h2>Talks</h2>
        <div className="grid">
          <div className="cell cell-sm-12">
            <List>
              {
                talks.map((t) => (<TalkListItem talk={t} key={t.title + t.event} />))
              }
            </List>
          </div>
        </div>
      </div>
    );
  }
}

class TalkListItem extends React.Component {
  static get propTypes() {
    return {
      talk: React.PropTypes.object.isRequired
    };
  }

  render() {
    const talk = this.props.talk;
    const date = `${talk.date.getFullYear()}-${talk.date.getMonth() + 1}-${talk.date.getDate()}`;
    return (
      <ListItem primaryText={talk.title}
                secondaryText={`${talk.event} — ${date}`}
                href={talk.link} />
    );
  }
}

export default Talks;
