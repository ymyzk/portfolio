import PropTypes from "prop-types";
import React from "react";

import LinkButton from "./LinkButton";

const Links = ({ links }) => (
  <div className="text-center">
    { links.map(l => <LinkButton key={l.url} link={l} />) }
  </div>
);

Links.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default Links;
