import { List, ListItem } from "material-ui/List";
import React from "react";
import Helmet from "react-helmet";

import { loadNews } from "../data";

const News = () => {
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
};

const NewsListItem = ({ news }) => {
  const date = `${news.date.getFullYear()}-${news.date.getMonth() + 1}-${news.date.getDate()}`;
  return (
    <ListItem
      primaryText={news.title}
      secondaryText={`${news.media} — ${date}`}
      href={news.link}
    />
  );
};

NewsListItem.propTypes = {
  news: React.PropTypes.object.isRequired
};

export default News;
