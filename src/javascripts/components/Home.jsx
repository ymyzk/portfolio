import { Card, CardActions, CardTitle } from "material-ui/Card";
import { List, ListItem } from "material-ui/List";
import FlatButton from "material-ui/FlatButton";
import React from "react";

import Links from "../../data/links";
import Skills from "../../data/skills";

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="grid">
          <div className="cell cell-sm-6 cell-md-4">
            <AboutCard />
          </div>
          <div className="cell cell-sm-6 cell-md-4">
            <AffiliationCard />
          </div>
          <div className="cell cell-sm-6 cell-md-4">
            <SkillsCard skills={Skills} />
          </div>
          <div className="cell cell-sm-6 cell-md-4">
            <LinksCard links={Links} />
          </div>
        </div>
      </div>
    );
  }
}

class AboutCard extends React.Component {
  render() {
    return (
      <Card>
        <CardTitle title="Profile"/>
        <List>
          <ListItem primaryText={"Name"}
                    secondaryText={"Yusuke Miyazaki (宮崎 勇輔)"}
                    disabled={true} />
          <ListItem primaryText={"Location"}
                    secondaryText={"Kyoto, Japan"}
                    disabled={true} />
          <ListItem primaryText={"Age"} secondaryText={"22"}
                    disabled={true} />
        </List>
      </Card>
    );
  }
}

class AffiliationCard extends React.Component {
  render() {
    return (
      <Card className="">
        <CardTitle title="Affiliation" />
        <List>
          <ListItem primaryText={"University"}
                    secondaryText={"Graduate School of Informatics, Kyoto University"}
                    secondaryTextLines={2}
                    href={"http://www.fos.kuis.kyoto-u.ac.jp/"} />
          <ListItem primaryText={"Company"}
                    secondaryText={"President & Co-founder, Unimap, Inc."}
                    href={"http://www.unimap.co.jp/"} />
          <ListItem primaryText={"Community"}
                    secondaryText={"CAMPHOR-"}
                    href={"https://camph.net/"} />
        </List>
      </Card>
    );
  }
}

class SkillsCard extends React.Component {
  static get propTypes() {
    return {
      skills: React.PropTypes.arrayOf(React.PropTypes.object.isRequired).isRequired
    };
  }

  render() {
    return (
      <Card>
        <CardTitle title="Skills"/>
        <CardActions>
          {this.props.skills.map((s) => (<FlatButton key={s} label={s} style={{textTransform: "none", minWidth: 20}} />))}
        </CardActions>
      </Card>
    );
  }
}

class LinksCard extends React.Component {
  static get propTypes() {
    return {
      links: React.PropTypes.arrayOf(React.PropTypes.object.isRequired).isRequired
    };
  }

  render() {
    return (
      <Card>
        <CardTitle title="Links"/>
        <List>
          {
            this.props.links.map((l) => (
              <ListItem primaryText={l.title} href={l.link} target="_blank" key={l.link} />
            ))
          }
        </List>
      </Card>
    );
  }
}

export default Home;
