import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import React from 'react';

import { loadContributions } from '../data';

class Contributions extends React.Component {
  render() {
    const contributions = loadContributions();
    return (
      <div className="container">
        <h2>Contributions</h2>
        <div className="grid">
          <div className="cell cell-sm-12">
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
