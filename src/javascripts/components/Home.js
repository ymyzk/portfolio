import FloatingActionButton from "material-ui/FloatingActionButton";
import FontIcon from "material-ui/FontIcon";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import ArrowDownward from "material-ui/svg-icons/navigation/arrow-downward";
import React from "react";
import SmoothScroll from "smoothscroll";

import BackgroundImage from "../../images/background.jpg";
import Activities from "../containers/Home/Activities";
import Links from "../containers/Home/Links";
import Skills from "../containers/Home/Skills";
import Theme from "./Theme";

const calculateParallax = (x, y, pX, pY, z = 0, depth = 50) =>
  [x + (pX * z * depth), y + (pY * z * depth)];

const Title = ({ parallaxX, parallaxY, screenWidth, screenHeight }) => {
  const [x, y] = calculateParallax(0, screenHeight * 0.43, parallaxX, parallaxY, 0.2);
  const style = {
    position: "absolute",
    textAlign: "center",
    width: screenWidth,
    left: x,
    top: y,
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
  parallaxX: React.PropTypes.number.isRequired,
  parallaxY: React.PropTypes.number.isRequired,
  screenWidth: React.PropTypes.number.isRequired,
  screenHeight: React.PropTypes.number.isRequired,
};

const AboutMe = ({ parallaxX, parallaxY, screenWidth, screenHeight }) => {
  const [x, y] = calculateParallax(0, screenHeight * 0.1, parallaxX, parallaxY, 0.1);
  const style = {
    position: "absolute",
    textAlign: "center",
    width: screenWidth,
    left: x,
    bottom: y,
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

AboutMe.propTypes = {
  parallaxX: React.PropTypes.number.isRequired,
  parallaxY: React.PropTypes.number.isRequired,
  screenWidth: React.PropTypes.number.isRequired,
  screenHeight: React.PropTypes.number.isRequired,
};

class HomeCanvas extends React.Component {
  constructor() {
    super();

    // this.parallaxCanvasOnMouseMove = this.parallaxCanvasOnMouseMove.bind(this);
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
    this.wrapper.addEventListener("mousemove", this.parallaxCanvasOnMouseMove);
    window.addEventListener("resize", this.resizeCanvas);
  }

  componentWillUnmount() {
    this.wrapper.removeEventListener("mousemove", this.parallaxCanvasOnMouseMove);
    window.removeEventListener("resize", this.resizeCanvas);
  }

  // parallaxCanvasOnMouseMove(e) {
  //   // normalize: -1 <= parallax <= 1
  //   this.setState({
  //     parallaxX: 0,
  //     parallaxY: 0,
  //     parallaxX: (e.clientX - (this.state.screenWidth / 2)) / (this.state.screenWidth / 2),
  //     parallaxY: (e.clientY - (this.state.screenHeight / 2)) / (this.state.screenHeight / 2),
  //   });
  // }

  resizeCanvas() {
    const [screenWidth, screenHeight] = [window.innerWidth, window.innerHeight - 64];
    this.setState({ screenWidth, screenHeight });
  }

  render() {
    const backgroundStyle = {
      position: "relative",
      background: `rgb(63, 81, 181) url(${BackgroundImage}) center no-repeat`,
      backgroundSize: "cover",
      zIndex: 0,
      overflow: "hidden",
      marginTop: -64,
      width: this.state.screenWidth,
      height: this.state.screenHeight + 64,
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

const Home = () => (
  <div className="home">
    <HomeCanvas />
    <div className="container" id="about">
      <Affiliation />
      <Activities />
      <Skills />
      <Links />
    </div>
  </div>
);

export default Home;
