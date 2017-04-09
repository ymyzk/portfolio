import { List, ListItem } from "material-ui/List";
import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";

import CustomPropTypes from "../utils/PropTypes";

const Contributions = ({ contributions }) => {
  const title = "Contributions";
  return (
    <div className="container">
      <Helmet title={title} />
      <h2>{title}</h2>
      <p>
        I&apos;m interested in the open source community and software.
        The following are some of the open source communities and software which I contributed to.
      </p>
      <div className="grid">
        <div className="cell-xs-without-gutter cell-sm-12">
          <List>
            {
              contributions.map(c => (<ContributionListItem contribution={c} key={c.name} />))
            }
          </List>
        </div>
      </div>
    </div>
  );
};

Contributions.propTypes = {
  contributions: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
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
  contribution: CustomPropTypes.Contribution.isRequired,
};

export default Contributions;
