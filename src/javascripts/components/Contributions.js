import { List, ListItem } from "material-ui/List";
import React from "react";
import Helmet from "react-helmet";

const Contributions = ({ contributions }) => {
  const title = "Contributions";
  return (
    <div className="container">
      <Helmet title={title} />
      <h2>{title}</h2>
      <p>
        I'm interested in the open source community and software.
        The following are some of the open source communities and software which I contributed to.
      </p>
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

Contributions.propTypes = {
  contributions: React.PropTypes.arrayOf(React.PropTypes.object.isRequired).isRequired
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
