import { List, ListItem } from "material-ui/List";
import React from "react";
import Helmet from "react-helmet";

import { loadMisc } from "../data";

const Misc = () => {
  const title = "Misc";
  return (
    <div className="container">
      <Helmet title={title} />
      <h2>{title}</h2>
      <div className="grid">
        <div className="cell-xs-without-gutter cell-sm-12">
          <List>
            {
              loadMisc().map((i) => (<MiscListItem item={i} key={i.title} />))
            }
          </List>
        </div>
      </div>
    </div>
  );
};

const MiscListItem = ({ item }) => {
  const date = `${item.date.getFullYear()}-${item.date.getMonth() + 1}-${item.date.getDate()}`;
  return (
    <ListItem
      primaryText={item.title}
      secondaryText={`${item.subtitle} — ${date}`}
      href={item.link}
    />
  );
};

MiscListItem.propTypes = {
  item: React.PropTypes.object.isRequired
};

export default Misc;
