import FloatingActionButton from "material-ui/FloatingActionButton";
import FontIcon from "material-ui/FontIcon";
import PropTypes from "prop-types";
import React from "react";

import CustomPropTypes from "../../utils/CustomPropTypes";

const floatingButtonStyle = {
  margin: "0 6px 6px",
};

const Link = ({ link }) => {
  let icon;
  if (link.icon) {
    icon = <FontIcon className={`fa fa-${link.icon}`} />;
  } else if (link.text) {
    icon = <FontIcon>{ link.text }</FontIcon>;
  } else {
    icon = <FontIcon className="fa fa-globe" />;
  }
  return (
    <FloatingActionButton
      href={link.url}
      target="_blank"
      style={floatingButtonStyle}
      backgroundColor={link.color}
    >
      { icon }
    </FloatingActionButton>
  );
};

Link.propTypes = {
  link: CustomPropTypes.Link.isRequired,
};

const Links = ({ links }) => (
  <section className="grid">
    <div className="cell-sm-12">
      <h2>Links</h2>
      <div className="text-center">
        { links.map(l => <Link key={l.url} link={l} />) }
      </div>
    </div>
  </section>
);

Links.propTypes = {
  links: PropTypes.arrayOf(CustomPropTypes.Link.isRequired).isRequired,
};

export default Links;
