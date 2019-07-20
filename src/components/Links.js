import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import React from "react";

import { withStyles } from "@material-ui/core/styles";

const LinkButton = dynamic(() => import("./LinkButton"));

const styles = () => ({
  root: {
    textAlign: "center",
  },
});

const Links = ({ classes, links }) => (
  <div className={classes.root}>
    { links.map(l => <LinkButton key={l.url} link={l} />) }
  </div>
);

Links.propTypes = {
  classes: PropTypes.object.isRequired,  // eslint-disable-line
  links: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default withStyles(styles)(Links);
