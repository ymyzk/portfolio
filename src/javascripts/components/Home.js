import { Card, CardActions, CardTitle } from "material-ui/Card";
import Chip from "material-ui/Chip";
import FontIcon from "material-ui/FontIcon";
import { List, ListItem } from "material-ui/List";
import React from "react";

import Links from "../../data/links";
import Skills from "../../data/skills";

const Home = () => (
  <div className="container">
    <div className="grid">
      <div className="cell-sm-6 cell-md-4">
        <AboutCard />
      </div>
      <div className="cell-sm-6 cell-md-4">
        <AffiliationCard />
      </div>
      <div className="cell-sm-6 cell-md-4">
        <SkillsCard skills={Skills} />
      </div>
      <div className="cell-sm-6 cell-md-4">
        <LinksCard links={Links} />
      </div>
    </div>
  </div>
);

const AboutCard = () => (
  <Card>
    <CardTitle title="Profile" />
    <List>
      <ListItem
        primaryText={"Name"}
        secondaryText={"Yusuke Miyazaki (宮崎 勇輔) @ymyzk"}
        disabled
      />
      <ListItem
        primaryText={"Location"}
        secondaryText={"Kyoto, Japan"}
        disabled
      />
      <ListItem
        primaryText={"Age"}
        secondaryText={"22"}
        disabled
      />
    </List>
  </Card>
);

const iconStyle = {
  top: 0,
  bottom: 0,
  margin: "auto 12px",
  textAlign: "center"
};

const AffiliationCard = () => (
  <Card>
    <CardTitle title="Affiliation" />
    <List>
      <ListItem
        leftIcon={<FontIcon className="fa fa-university" style={iconStyle} />}
        primaryText={"University"}
        secondaryText={"Graduate School of Informatics, Kyoto University"}
        secondaryTextLines={2}
        href={"http://www.fos.kuis.kyoto-u.ac.jp/~miyazaki/"}
      />
      <ListItem
        leftIcon={<FontIcon className="fa fa-building-o" style={iconStyle} />}
        primaryText={"Company"}
        secondaryText={"President & Co-founder, Unimap, Inc."}
        href={"http://www.unimap.co.jp/"}
      />
      <ListItem
        leftIcon={<FontIcon className="fa fa-group" style={iconStyle} />}
        primaryText={"Community"}
        secondaryText={"CAMPHOR-"}
        href={"https://camph.net/"}
      />
    </List>
  </Card>
);

const SkillsCard = ({ skills }) => (
  <Card>
    <CardTitle title="Skills" />
    <CardActions>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {
          skills.map((s) => (
            <Chip key={s} style={{ margin: 4 }}>{s}</Chip>
          ))
        }
      </div>
    </CardActions>
  </Card>
);

SkillsCard.propTypes = {
  skills: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired
};

const LinksCard = ({ links }) => (
  <Card>
    <CardTitle title="Links" />
    <List>
      {
        links.map((l) => (
          <ListItem primaryText={l.title} href={l.link} target="_blank" key={l.link} />
        ))
      }
    </List>
  </Card>
);

LinksCard.propTypes = {
  links: React.PropTypes.arrayOf(React.PropTypes.object.isRequired).isRequired
};

export default Home;
