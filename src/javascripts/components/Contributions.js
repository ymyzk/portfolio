import { List, ListItem } from "material-ui/List";
import React from "react";

import { loadContributions } from "../data";

class Contributions extends React.Component {
  render() {
    const contributions = loadContributions();
    return (
      <div className="container">
        <h2>Contributions</h2>
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
  }
}

class ContributionListItem extends React.Component {
  static get propTypes() {
    return {
      contribution: React.PropTypes.string.isRequired
    };
  }

  render() {
    const contribution = this.props.contribution;
    const roles = contribution.roles.reduce((pre, cur) => `${pre}・${cur}`);
    return (
      <ListItem primaryText={contribution.name}
                secondaryText={roles}
                href={contribution.link} />
    );
  }
}

export default Contributions;
