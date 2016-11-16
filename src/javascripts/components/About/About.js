import Card from "material-ui/Card/Card";
import CardTitle from "material-ui/Card/CardTitle";
import FontIcon from "material-ui/FontIcon";
import { List, ListItem } from "material-ui/List";
import React from "react";
import { grey700 } from "material-ui/styles/colors";
import "whatwg-fetch";

import RecentEntriesCard from "../../containers/About/RecentEntriesCard";
import RecentTalksCard from "../../containers/About/RecentTalksCard";
import SkillsCard from "../../containers/About/SkillsCard";

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
        <SkillsCard />
      </div>
      <div className="cell-sm-6 cell-md-4">
        <RecentEntriesCard />
      </div>
      <div className="cell-sm-6 cell-md-4">
        <RecentTalksCard />
      </div>
      <div className="cell-sm-6 cell-md-4">
        <LinksCard />
      </div>
      <div className="cell-sm-12">
        <Footer start={2013} end={2016} />
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
        secondaryText={"Yusuke Miyazaki (宮崎 勇輔) (a.k.a. ymyzk)"}
        disabled
      />
      <ListItem
        primaryText={"Location"}
        secondaryText={"Kyoto, Japan"}
        disabled
      />
      <ListItem
        primaryText={"Age"}
        secondaryText={"23"}
        disabled
      />
    </List>
  </Card>
);

const iconStyle = {
  top: 0,
  bottom: 0,
  margin: "auto 12px",
  textAlign: "center",
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

const LinksCard = () => (
  <Card>
    <CardTitle title="Links" />
    <List>
      <ListItem
        primaryText="Bitcoin"
        href="https://blockchain.info/address/12PPiEo7nK67694wZnS7Mw8X6XCzHmWTP9"
        target="_blank"
        leftIcon={<FontIcon className="fa fa-btc" style={iconStyle} />}
      />
      <ListItem
        primaryText="Blog"
        href="https://blog.ymyzk.com/"
        target="_blank"
        leftIcon={<FontIcon className="fa fa-rss" style={iconStyle} />}
      />
      <ListItem
        primaryText="E-mail"
        href="mailto:miyazaki.dev@gmail.com"
        target="_blank"
        leftIcon={<FontIcon className="fa fa-envelope-o" style={iconStyle} />}
      />
      <ListItem
        primaryText="Facebook"
        href="https://www.facebook.com/ymyzk"
        target="_blank"
        leftIcon={<FontIcon className="fa fa-facebook-official" style={iconStyle} />}
      />
      <ListItem
        primaryText="GitHub"
        href="https://github.com/ymyzk"
        target="_blank"
        leftIcon={<FontIcon className="fa fa-github" style={iconStyle} />}
      />
      <ListItem
        primaryText="LinkedIn"
        href="https://www.linkedin.com/in/yusuke-miyazaki-4b197774"
        target="_blank"
        leftIcon={<FontIcon className="fa fa-linkedin-square" style={iconStyle} />}
      />
      <ListItem
        primaryText="Slideshare"
        href="http://www.slideshare.net/yusukemiy/"
        target="_blank"
        leftIcon={<FontIcon className="fa fa-slideshare" style={iconStyle} />}
      />
      <ListItem
        primaryText="Speaker Deck"
        href="https://speakerdeck.com/ymyzk"
        target="_blank"
        leftIcon={<FontIcon className="fa fa-globe" style={iconStyle} />}
      />
      <ListItem
        primaryText="Twitter"
        href="https://twitter.com/ymyzk"
        target="_blank"
        leftIcon={<FontIcon className="fa fa-twitter" style={iconStyle} />}
      />
      <ListItem
        primaryText="Wantedly"
        href="https://www.wantedly.com/users/2289515"
        target="_blank"
        leftIcon={<FontIcon className="fa fa-globe" style={iconStyle} />}
      />
    </List>
  </Card>
);

const Footer = ({ start, end }) => (
  <p style={{ textAlign: "right", color: grey700 }}>
    Copyright &copy; {start}-{end}, Yusuke Miyazaki.
  </p>
);

Footer.propTypes = {
  start: React.PropTypes.number.isRequired,
  end: React.PropTypes.number.isRequired,
};

export default Home;
