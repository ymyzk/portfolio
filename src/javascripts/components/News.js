import { List, ListItem } from "material-ui/List";
import React from "react";
import Helmet from "react-helmet";

import { loadNews } from "../data";

class News extends React.Component {
  render() {
    const title = "News";
    const news = loadNews();
    return (
      <div className="container">
        <Helmet title={title} />
        <h2>{title}</h2>
        <div className="grid">
          <div className="cell-xs-without-gutter cell-sm-12">
            <List>
              {
                news.map((n) => (<NewsListItem news={n} key={n.title} />))
              }
            </List>
          </div>
        </div>
      </div>
    );
  }
}

class NewsListItem extends React.Component {
  static get propTypes() {
    return {
      news: React.PropTypes.object.isRequired
    };
  }

  render() {
    const news = this.props.news;
    const date = `${news.date.getFullYear()}-${news.date.getMonth() + 1}-${news.date.getDate()}`;
    return (
      <ListItem primaryText={news.title}
                secondaryText={`${news.media} — ${date}`}
                href={news.link} />
    );
  }
}

export default News;
