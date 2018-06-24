import PropTypes from "prop-types";
import React from "react";

import fontawesome from "@fortawesome/fontawesome";
import faBrands from "@fortawesome/fontawesome-free-brands";
import faEnvelope from "@fortawesome/fontawesome-free-solid/faEnvelope";
import faGlobe from "@fortawesome/fontawesome-free-solid/faGlobe";
import faRss from "@fortawesome/fontawesome-free-solid/faRss";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

// Use list of icons instead of faBrands for efficiency
fontawesome.library.add(faBrands, faEnvelope, faGlobe, faRss);

const style = theme => ({
  button: {
    color: "white",
    margin: theme.spacing.unit / 2,
    marginTop: 0,
  },
});

const LinkButton = ({ classes, link }) => {
  let icon;
  if (link.icon) {
    icon = <FontAwesomeIcon icon={link.icon} />;
  } else if (link.text) {
    icon = <span>{ link.text }</span>;
  } else {
    icon = <FontAwesomeIcon icon="globe" />;
  }
  return (
    <Button
      className={classes.button}
      variant="fab"
      color="primary"
      href={link.url}
      target="_blank"
      style={{ backgroundColor: link.color }}
    >
      { icon }
    </Button>
  );
};

LinkButton.propTypes = {
  classes: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired,
};

export default withStyles(style)(LinkButton);
