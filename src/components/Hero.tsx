import React, { MouseEvent } from "react";
import smoothScroll from "smoothscroll";

import Fab from "@material-ui/core/Fab";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

import { getAssetPrefix } from "../utils";

const SCROLL_TARGET_ID = "scrollTarget";

const styles = createStyles({
  background: {
    position: "relative",
    backgroundColor: "#11140b",
    backgroundImage: `url(${getAssetPrefix()}/static/images/background.jpg)`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: 0,
    overflow: "hidden",
    width: "100%",
    height: "100vh",
  },
  titleWrapper: {
    position: "absolute",
    textAlign: "center",
    top: "35%",
    left: 0,
    right: 0,
  },
  titleHeader: {
    font: "normal normal 300 10vw Roboto",
    color: "white",
    "@media (min-width: 600px)": {
      fontSize: 60,
    },
  },
  titleLead: {
    fontSize: "5vw",
    "@media (min-width: 480px)": {
      fontSize: 24,
    },
  },
  buttonWrapper: {
    position: "absolute",
    textAlign: "center",
    width: "100%",
    bottom: 30,
  },
});

const Hero = ({ classes }: WithStyles<typeof styles>) => {
  const scroll = (e: MouseEvent) => {
    e.preventDefault();
    const scrollTarget = document.querySelector(`#${SCROLL_TARGET_ID}`);
    if (scrollTarget !== null) {
      smoothScroll(scrollTarget, 1500);
    }
  };
  return (
    <div>
      <div className={classes.background}>
        <div className={classes.titleWrapper}>
          <h1 className={classes.titleHeader}>
            Yusuke Miyazaki
            <br />
            <small className={classes.titleLead}>
              Site Reliability Engineer in Japan
            </small>
          </h1>
        </div>
        <div className={classes.buttonWrapper}>
          <Fab aria-label="Scroll down" color="secondary" onClick={scroll}>
            <ArrowDownward />
          </Fab>
        </div>
      </div>
      <div id={SCROLL_TARGET_ID} />
    </div>
  );
};

export default withStyles(styles)(Hero);
