// @flow
import PropTypes from "prop-types";
import React from "react";
import smoothScroll from "smoothscroll";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

const SCROLL_TARGET_ID = "scrollTarget";

const styles = () => ({
  background: {
    position: "relative",
    backgroundColor: "rgb(63, 81, 181)",
    backgroundImage: "url(/static/images/background.jpg)",
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

const Hero = ({ classes }) => {
  const scroll = (e) => {
    e.preventDefault();
    smoothScroll(document.querySelector(`#${SCROLL_TARGET_ID}`), 1500);
  };
  return (
    <div>
      <div className={classes.background}>
        <div className={classes.titleWrapper}>
          <h1 className={classes.titleHeader}>
            Yusuke Miyazaki
            <br />
            <small className={classes.titleLead}>
              Software Engineer in Japan
            </small>
          </h1>
        </div>
        <div className={classes.buttonWrapper}>
          <Button variant="fab" color="secondary" onClick={scroll}>
            <ArrowDownward />
          </Button>
        </div>
      </div>
      <div id={SCROLL_TARGET_ID} />
    </div>
  );
};

Hero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Hero);
