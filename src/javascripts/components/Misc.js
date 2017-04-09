import { List, ListItem } from "material-ui/List";
import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";

import CustomPropTypes from "../utils/PropTypes";

const Misc = ({ misc }) => {
  const title = "Misc";
  return (
    <div className="container">
      <Helmet title={title} />
      <h2>{title}</h2>
      <div className="grid">
        <div className="cell-xs-without-gutter cell-sm-12">
          <List>
            {
              misc.map(i => (<MiscListItem item={i} key={i.title} />))
            }
          </List>
        </div>
      </div>
    </div>
  );
};

Misc.propTypes = {
  misc: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

const MiscListItem = ({ item }) => (
  <ListItem
    primaryText={item.title}
    secondaryText={`${item.subtitle} — ${item.date.format("YYYY-M-D")}`}
    href={item.link}
  />
);

MiscListItem.propTypes = {
  item: CustomPropTypes.Misc.isRequired,
};

export default Misc;
