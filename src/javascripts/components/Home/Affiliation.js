import FontIcon from "material-ui/FontIcon";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import React from "react";

const iconStyle = {
  top: 0,
  bottom: 0,
  margin: "auto 12px",
  textAlign: "center",
};

const Affiliation = () => (
  <section className="grid">
    <div className="cell-xs-without-gutter cell-sm-12">
      <h2>Affiliation</h2>
      <List>
        <ListItem
          leftIcon={<FontIcon className="fa fa-university" style={iconStyle} />}
          primaryText={"University"}
          secondaryText={"Graduate School of Informatics, Kyoto University"}
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
    </div>
  </section>
);

export default Affiliation;
