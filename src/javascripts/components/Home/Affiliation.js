import FontIcon from "material-ui/FontIcon";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import PropTypes from "prop-types";
import React from "react";

import CustomPropTypes from "../../utils/CustomPropTypes";

const iconStyle = {
  top: 0,
  bottom: 0,
  margin: "auto 12px",
  textAlign: "center",
};

const TYPE_ICON_MAP = {
  Community: "fa-group",
  Company: "fa-building-o",
  University: "fa-university",
};

const AffiliationItem = ({ affiliation }) => {
  const icon = TYPE_ICON_MAP[affiliation.type] || "";
  return (
    <ListItem
      leftIcon={<FontIcon className={`fa ${icon}`} style={iconStyle} />}
      primaryText={affiliation.type}
      secondaryText={affiliation.name}
      href={affiliation.link}
    />
  );
};

AffiliationItem.propTypes = {
  affiliation: CustomPropTypes.Affiliation.isRequired,
};

const Affiliation = ({ affiliation }) => (
  <section className="grid">
    <div className="cell-xs-without-gutter cell-sm-12">
      <h2>Affiliation</h2>
      <List>
        { affiliation.map(a => <AffiliationItem affiliation={a} key={a.name} />) }
      </List>
    </div>
  </section>
);

Affiliation.propTypes = {
  affiliation: PropTypes.arrayOf(CustomPropTypes.Affiliation).isRequired,
};

export default Affiliation;
