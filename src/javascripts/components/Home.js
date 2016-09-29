import RaisedButton from "material-ui/RaisedButton";
import React from "react";

import { calculateParallax, ratioForCanvas, cancelAnimationFrame, requestAnimationFrame } from "../utils/canvas";

class GradientBackground {
  constructor() {
    this._period = 300;
  }

  draw(_ctx, { counter, screenWidth, screenHeight }) {
    const ctx = _ctx;
    const grad = ctx.createLinearGradient(0, 0, 0, screenHeight);
    const ratio = 0.5 + (Math.sin(2 * Math.PI * (counter / this._period)) * 0.5);
    const calc = (one, other) => Math.round((ratio * (other - one)) + one);
    grad.addColorStop(0, "rgb(63, 81, 181)");
    grad.addColorStop(1, `rgb(${calc(57, 40)}, ${calc(73, 53)}, ${calc(171, 147)})`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, screenWidth, screenHeight);
  }
}

class Ball {
  constructor(x = 0, y = 0, radius = 5, fillStyle = "") {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.fillStyle = fillStyle;
  }

  draw(_ctx) {
    const ctx = _ctx;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.fillStyle;
    ctx.fill();
  }
}

class BallWithLines extends Ball {
  constructor(x = 0, y = 0, radius = 5, fillStyle = "") {
    super(x, y, radius, fillStyle);
    this._v = 0;
    this._r = 0;
    this._vx = 0;
    this._vy = 0;

    this._ballInterval = 50;
    this._maxHistory = 50 * 50;
    this._history = [];
  }

  get v() {
    return this._v;
  }

  set v(value) {
    this._v = value;
    this._vx = this._v * Math.cos(this._r);
    this._vy = this._v * Math.sin(this._r);
  }

  get r() {
    return this._r;
  }

  set r(value) {
    this._r = value;
    this._vx = this._v * Math.cos(this._r);
    this._vy = this._v * Math.sin(this._r);
  }

  get vx() {
    return this._vx;
  }

  set vx(value) {
    this._vx = value;
    this._v = Math.sqrt((this._vx ** 2) + (this._vy ** 2));
    this._r = this._v === 0 ? 0 : Math.atan2(this._vy, this._vx);
  }

  get vy() {
    return this._vy;
  }

  set vy(value) {
    this._vy = value;
    this._v = Math.sqrt((this._vx ** 2) + (this._vy ** 2));
    this._r = this._v === 0 ? 0 : Math.atan2(this._vy, this._vx);
  }

  reset() {
    this._counter = 0;
    this._history = [];
    this.x = 0;
    this.y = 0;
  }

  draw(_ctx, { counter, parallaxX, parallaxY, screenWidth, screenHeight }) {
    const ctx = _ctx;
    const z = -1;

    // Draw balls
    for (const [x, y, draw] of this._history) {
      if (draw) {
        const ball = new Ball(...calculateParallax(x, y, parallaxX, parallaxY, z), 3, "rgba(255, 255, 255, 0.3)");
        ball.draw(ctx);
      }
    }

    // Draw lines
    ctx.beginPath();
    if (this._history.length > 1) {
      const [firstX, firstY] = this._history[0];
      ctx.moveTo(...calculateParallax(firstX, firstY, parallaxX, parallaxY, z));
      for (const [x, y, _, changeVelocity] of this._history) {  // eslint-disable-line no-unused-vars
        if (changeVelocity) {
          ctx.lineTo(...calculateParallax(x, y, parallaxX, parallaxY, z));
        }
      }
      const [lastX, lastY] = this._history[this._history.length - 1];
      ctx.lineTo(...calculateParallax(lastX, lastY, parallaxX, parallaxY, z));
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.stroke();
    }

    // Draw moving ball
    ctx.beginPath();
    ctx.arc(...calculateParallax(this.x, this.y, parallaxX, parallaxY, z), this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = this.fillStyle;
    ctx.fill();

    // Calc next
    let drawBall = false;
    let changeVelocity = false;
    const margin = 70;

    this.x += this.vx;
    this.y += this.vy;

    if (this.y + this.vy > screenHeight + margin || this.y + this.vy < -margin) {
      this.vy = -this.vy;
      changeVelocity = true;
    }
    if (this.x + this.vx > screenWidth + margin || this.x + this.vx < -margin) {
      this.vx = -this.vx;
      changeVelocity = true;
    }

    if (counter % this._ballInterval === 0) {
      this.r += 0.6 * Math.PI * Math.random();
      drawBall = true;
      changeVelocity = true;
    }

    // Add to history
    this._history.push([this.x, this.y, drawBall, changeVelocity]);
    this._history = this._history.slice(Math.max(0, this._history.length - this._maxHistory));
  }
}

const drawTitle = (_ctx, { parallaxX, parallaxY, screenWidth, screenHeight }) => {
  const ctx = _ctx;
  const fontSize = Math.min(screenWidth * 0.1, 60);
  const [x, y] = calculateParallax(screenWidth / 2, screenHeight * (4 / 10), parallaxX, parallaxY, 0.2);
  ctx.font = `normal normal 300 ${fontSize}px Roboto`;
  ctx.strokeStyle = ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Yusuke Miyazaki", x, y);
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
    this.parallaxCanvasOnDeviceOrientation = this.parallaxCanvasOnDeviceOrientation.bind(this);
    this.resizeCanvas = this.resizeCanvas.bind(this);

    this.ball = new BallWithLines(0, 0, 5, "rgba(255, 255, 255, 0.8)");
    this.requestId = null;
  }

  state = {
    counter: 0,
    parallaxX: 0,
    parallaxY: 0,
    screenWidth: 0,
    screenHeight: 0,
  };

  componentDidMount() {
    this.startCanvas();
    this.canvas.addEventListener("mousemove", this.parallaxCanvasOnMouseMove);
    window.addEventListener("deviceorientation", this.parallaxCanvasOnDeviceOrientation, true);
    window.addEventListener("resize", this.resizeCanvas);
  }

  componentWillUnmount() {
    this.stopCanvas();
    this.canvas.removeEventListener("mousemove", this.parallaxCanvasOnMouseMove);
    window.removeEventListener("deviceorientation", this.parallaxCanvasOnDeviceOrientation, true);
    window.removeEventListener("resize", this.resizeCanvas);
  }

  startCanvas() {
    const ctx = this.canvas.getContext("2d");
    const background = new GradientBackground();

    this.resizeCanvas();
    this.ball.v = 10;
    this.ball.r = 2 * Math.PI * Math.random();

    const draw = () => {
      const context = Object.assign({}, this.state);
      background.draw(ctx, context);
      this.ball.draw(ctx, context);
      drawTitle(ctx, context);
      this.requestId = requestAnimationFrame(draw);
      this.setState({ counter: this.state.counter + 1 });
    };
    draw();
  }

  stopCanvas() {
    if (this.requestId !== null) {
      cancelAnimationFrame(this.requestId);
    }
  }

  parallaxCanvasOnMouseMove(e) {
    // normalize: -1 <= parallax <= 1
    this.setState({
      parallaxX: (e.clientX - (this.state.screenWidth / 2)) / (this.state.screenWidth / 2),
      parallaxY: (e.clientY - (this.state.screenHeight / 2)) / (this.state.screenHeight / 2),
    });
  }

  parallaxCanvasOnDeviceOrientation(e) {
    let x = Math.max(Math.min(e.gamma, 90), -90);  // -90 <= x <= 90
    let y = Math.max(Math.min(e.beta, 180), -180);  // -180 <= y <= 180
    if (y > 90) {
      x = -x;
      y = 180 - y;
    } else if (y < -90) {
      x = -x;
      y = -180 - y;
    }
    // -90 <= x <= 90 && -90 <= y <= 90
    this.setState({
      parallaxX: x / 90,
      parallaxY: y / 90,
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
    this.ball.reset();
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <canvas ref={(c) => { this.canvas = c; }} style={{ display: "block" }} />
        <div>
          <AboutMe {...this.state} />
          <Footer {...this.state} />
        </div>
      </div>
    );
  }
}

const Home = () => (<HomeCanvas />);

export default Home;
