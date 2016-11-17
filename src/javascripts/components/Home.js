import RaisedButton from "material-ui/RaisedButton";
import React from "react";

import { calculateParallax, ratioForCanvas } from "../utils/canvas";

const Title = ({ parallaxX, parallaxY, screenWidth, screenHeight }) => {
  const [x, y] = calculateParallax(0, screenHeight * 0.35, parallaxX, parallaxY, 0.2);
  const fontSize = Math.min(screenWidth * 0.1, 60);
  const style = {
    position: "absolute",
    textAlign: "center",
    width: screenWidth,
    left: x,
    top: y,
  };
  const textStyle = {
    font: `normal normal 300 ${fontSize}px Roboto`,
    color: "white",
  };
  return (<div style={style}><span style={textStyle}>Yusuke Miyazaki</span></div>);
};

Title.propTypes = {
  parallaxX: React.PropTypes.number.isRequired,
  parallaxY: React.PropTypes.number.isRequired,
  screenWidth: React.PropTypes.number.isRequired,
  screenHeight: React.PropTypes.number.isRequired,
};

const AboutMe = ({ parallaxX, parallaxY, screenWidth, screenHeight }) => {
  const [x, y] = calculateParallax(0, screenHeight * (3 / 4), parallaxX, parallaxY, 0.1);
  const style = {
    position: "absolute",
    textAlign: "center",
    width: screenWidth,
    left: x,
    top: y,
  };
  return (<div style={style}><RaisedButton href="/about/" label="About Me" /></div>);
};

AboutMe.propTypes = {
  parallaxX: React.PropTypes.number.isRequired,
  parallaxY: React.PropTypes.number.isRequired,
  screenWidth: React.PropTypes.number.isRequired,
  screenHeight: React.PropTypes.number.isRequired,
};

const Footer = ({ parallaxX, parallaxY, screenWidth, screenHeight }) => {
  const margin = 12;
  const [x, y] = calculateParallax(screenWidth - margin, screenHeight - margin, parallaxX, parallaxY, 0.1);
  const style = {
    position: "absolute",
    font: "normal normal 400 12px Roboto",
    color: "white",
    right: screenWidth - x,
    bottom: screenHeight - y,
  };
  return (<div style={style}>Copyright &copy; 2013-2016, Yusuke Miyazaki.</div>);
};

Footer.propTypes = {
  parallaxX: React.PropTypes.number.isRequired,
  parallaxY: React.PropTypes.number.isRequired,
  screenWidth: React.PropTypes.number.isRequired,
  screenHeight: React.PropTypes.number.isRequired,
};

class HomeCanvas extends React.Component {
  constructor() {
    super();

    this.parallaxCanvasOnMouseMove = this.parallaxCanvasOnMouseMove.bind(this);
    this.resizeCanvas = this.resizeCanvas.bind(this);

    this.requestId = null;
  }

  state = {
    parallaxX: 0,
    parallaxY: 0,
    screenWidth: 0,
    screenHeight: 0,
  };

  componentDidMount() {
    this.resizeCanvas();
    this.canvas.addEventListener("mousemove", this.parallaxCanvasOnMouseMove);
    window.addEventListener("resize", this.resizeCanvas);
  }

  componentWillUnmount() {
    this.canvas.removeEventListener("mousemove", this.parallaxCanvasOnMouseMove);
    window.removeEventListener("resize", this.resizeCanvas);
  }

  parallaxCanvasOnMouseMove(e) {
    // normalize: -1 <= parallax <= 1
    this.setState({
      parallaxX: (e.clientX - (this.state.screenWidth / 2)) / (this.state.screenWidth / 2),
      parallaxY: (e.clientY - (this.state.screenHeight / 2)) / (this.state.screenHeight / 2),
    });
  }

  resizeCanvas() {
    const ctx = this.canvas.getContext("2d");
    const ratio = ratioForCanvas(ctx);
    const [screenWidth, screenHeight] = [window.innerWidth, window.innerHeight - 64];
    this.setState({ screenWidth, screenHeight });
    this.canvas.width = ratio * screenWidth;
    this.canvas.height = ratio * screenHeight;
    this.canvas.style.width = `${screenWidth}px`;
    this.canvas.style.height = `${screenHeight}px`;
    ctx.scale(ratio, ratio);
  }

  render() {
    const backgroundStyle = {
      position: "relative",
      background: "linear-gradient(rgb(63, 81, 181), rgb(57, 73, 171))",
    };
    return (
      <div style={backgroundStyle}>
        <canvas ref={(c) => { this.canvas = c; }} style={{ display: "block" }} />
        <div>
          <Title {...this.state} />
          <AboutMe {...this.state} />
          <Footer {...this.state} />
        </div>
      </div>
    );
  }
}

const Home = () => (<HomeCanvas />);

export default Home;
