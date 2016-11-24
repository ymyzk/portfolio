import RaisedButton from "material-ui/RaisedButton";
import React from "react";
import React3 from "react-three-renderer";
import THREE from "three";

const calculateParallax = (x, y, pX, pY, z = 0, depth = 50) =>
  [x + (pX * z * depth), y + (pY * z * depth)];

const getDevicePixelRatio = () => {
  if (typeof window === "undefined") return 1.0;
  return window.devicePixelRatio || 1.0;
};

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
    this._onAnimate = this._onAnimate.bind(this);

    this.requestId = null;
  }

  state = {
    parallaxX: 0,
    parallaxY: 0,
    screenWidth: 0,
    screenHeight: 0,
    cubeRotation: new THREE.Euler(),
  };

  componentDidMount() {
    this.resizeCanvas();
    this.wrapper.addEventListener("mousemove", this.parallaxCanvasOnMouseMove);
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
    const [screenWidth, screenHeight] = [window.innerWidth, window.innerHeight - 64];
    this.setState({ screenWidth, screenHeight });
  }

  _onAnimate() {
    this.setState({
      cubeRotation: new THREE.Euler(
        this.state.cubeRotation.x + 0.005,
        this.state.cubeRotation.y + 0.005,
        0,
      ),
    });
  }

  render() {
    const [width, height] = [this.state.screenWidth, this.state.screenHeight];
    const backgroundStyle = {
      position: "relative",
      background: "linear-gradient(rgb(63, 81, 181), rgb(57, 73, 171))",
      height,
    };
    const z = 5;
    return (
      <div style={backgroundStyle} ref={(e) => { this.wrapper = e; }} >
        <React3
          mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
          width={width}
          height={height}
          canvasStyle={{ display: "block" }}
          onAnimate={this._onAnimate}
          pixelRatio={getDevicePixelRatio()}
          antialias
          alpha
        >
          <scene>
            <perspectiveCamera
              name="camera"
              fov={90}
              aspect={width / height}
              near={0.1}
              far={1000}
              position={new THREE.Vector3(-this.state.parallaxX / 2, this.state.parallaxY / 2, z)}
            />
            <points position={new THREE.Vector3(0, 0, -6)} rotation={this.state.cubeRotation}>
              <sphereGeometry radius={7} widthSegments={10} heightSegments={10} />
              <pointsMaterial color={0xffffff} size={0.1} opacity={0.1} transparent />
            </points>
          </scene>
        </React3>
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
