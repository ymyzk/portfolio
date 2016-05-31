import { List, ListItem } from "material-ui/List";
import React from "react";
import Helmet from "react-helmet";

import { loadContributions } from "../data";

const Contributions = () => {
  const title = "Contributions";
  const contributions = loadContributions();
  return (
    <div className="container">
      <Helmet title={title} />
      <h2>{title}</h2>
      <div className="grid">
        <div className="cell-xs-without-gutter cell-sm-12">
          <List>
            {
              contributions.map((c) => (<ContributionListItem contribution={c} key={c.name} />))
            }
          </List>
        </div>
      </div>
    </div>
  );
};

const ContributionListItem = ({ contribution }) => {
  const roles = contribution.roles.reduce((pre, cur) => `${pre}・${cur}`);
  return (
    <ListItem
      primaryText={contribution.name}
      secondaryText={roles}
      href={contribution.link}
    />
  );
};

ContributionListItem.propTypes = {
  contribution: React.PropTypes.object.isRequired
};

export default Contributions;
