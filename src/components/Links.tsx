import dynamic from "next/dynamic";
import React from "react";

import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";

import { Link } from "../data/types";

const LinkButton = dynamic(() => import("./LinkButton"));

const styles = () => createStyles({
  root: {
    textAlign: "center",
  },
});

interface Props extends WithStyles<typeof styles> {
  links: Link[];
}

const Links = ({ classes, links }: Props) => (
  <div className={classes.root}>
    { links.map((l) => <LinkButton key={l.url} link={l} />) }
  </div>
);

export default withStyles(styles)(Links);
