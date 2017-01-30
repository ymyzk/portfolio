import FloatingActionButton from "material-ui/FloatingActionButton";
import ArrowDownward from "material-ui/svg-icons/navigation/arrow-downward";
import React from "react";
import SmoothScroll from "smoothscroll";

import BackgroundImage from "../../../images/background.jpg";
import Theme from "../Theme";

const Title = ({ screenWidth }) => {
  const style = {
    position: "absolute",
    textAlign: "center",
    top: "40%",
    left: 0,
    right: 0,
  };
  const headerFontSize = Math.min(screenWidth * 0.1, 60);
  const headerStyle = {
    font: `normal normal 300 ${headerFontSize}px Roboto`,
    color: "white",
  };
  const leadStyle = {
    fontSize: Math.max(headerFontSize * 0.35, 16),
    minFontSize: 15,
  };
  return (
    <div style={style}>
      <h1 style={headerStyle}>
        Yusuke Miyazaki<br />
        <small style={leadStyle}>Software Engineer in Kyoto, Japan</small>
      </h1>
    </div>
  );
};

Title.propTypes = {
  screenWidth: React.PropTypes.number.isRequired,
};

const AboutMe = () => {
  const style = {
    position: "absolute",
    textAlign: "center",
    width: "100%",
    bottom: 30,
  };
  const scrollTargetId = "#about";
  const onClick = (e) => {
    e.preventDefault();
    SmoothScroll(document.querySelector(scrollTargetId), 1500);
  };
  return (
    <div style={style}>
      <FloatingActionButton secondary href={scrollTargetId} onClick={onClick}>
        <ArrowDownward color={Theme.palette.textColor} />
      </FloatingActionButton>
    </div>
  );
};

class Top extends React.Component {
  constructor() {
    super();

    this.resizeCanvas = this.resizeCanvas.bind(this);

    this.requestId = null;
  }

  state = {
    screenWidth: 0,
    screenHeight: 0,
  };

  componentDidMount() {
    this.resizeCanvas();
    window.addEventListener("resize", this.resizeCanvas);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeCanvas);
  }

  resizeCanvas() {
    const [screenWidth, screenHeight] = [window.innerWidth, window.innerHeight - 64];
    this.setState({ screenWidth, screenHeight });
  }

  render() {
    const backgroundStyle = {
      position: "relative",
      background: `rgb(63, 81, 181) url(${BackgroundImage}) center no-repeat fixed`,
      backgroundSize: "cover",
      zIndex: 0,
      overflow: "hidden",
      marginTop: -64,
      width: "100%",
      height: this.state.screenHeight + 64,  // 100vh
    };
    return (
      <div>
        <div style={backgroundStyle} ref={(e) => { this.wrapper = e; }}>
          <Title {...this.state} />
          <AboutMe {...this.state} />
        </div>
      </div>
    );
  }
}

export default Top;
