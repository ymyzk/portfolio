import React from "react";

import { ratioForCanvas, requestAnimationFrame } from "../utils/canvas";

class State {
  constructor() {
    this.screenWidth = 0;
    this.screenHeight = 0;
    this.parallaxX = 0;
    this.parallaxY = 0;
  }
}

const STATE = new State();

class GradientBackground {
  constructor() {
    this._counter = 0;
    this._period = 300;
  }

  draw(_ctx) {
    const ctx = _ctx;
    const grad = ctx.createLinearGradient(0, 0, 0, STATE.screenHeight);
    const ratio = 0.5 + (Math.sin(2 * Math.PI * (this._counter / this._period)) * 0.5);
    const calc = (one, other) => Math.round((ratio * (other - one)) + one);
    grad.addColorStop(0, "rgb(63, 81, 181)");
    grad.addColorStop(1, `rgb(${calc(57, 40)}, ${calc(73, 53)}, ${calc(171, 147)})`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, STATE.screenWidth, STATE.screenHeight);

    this._counter++;
    this._counter = this._counter % this._period;
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
    this._counter = 0;

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
    this.x = STATE.screenWidth * Math.random();
    this.y = STATE.screenHeight * Math.random();
  }

  draw(_ctx) {
    const ctx = _ctx;
    const [x, y] = [this.x, this.y];
    const [backgroundParallaxX, backgroundParallaxY] = [-STATE.parallaxX * 50, -STATE.parallaxY * 50];

    // Draw balls
    for (const [_x, _y, draw] of this._history) {
      if (draw) {
        const ball = new Ball(_x + backgroundParallaxX, _y + backgroundParallaxY, 3, "rgba(255, 255, 255, 0.3)");
        ball.draw(ctx);
      }
    }

    // Draw lines
    ctx.beginPath();
    if (this._history.length > 1) {
      ctx.moveTo(this._history[0][0] + backgroundParallaxX, this._history[0][1] + backgroundParallaxY);
      for (const history of this._history) {
        if (history[3]) {
          ctx.lineTo(history[0] + backgroundParallaxX, history[1] + backgroundParallaxY);
        }
      }
      ctx.lineTo(
        this._history[this._history.length - 1][0] + backgroundParallaxX,
        this._history[this._history.length - 1][1] + backgroundParallaxY);
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.stroke();
    }

    // Draw moving ball
    ctx.beginPath();
    ctx.arc(this.x + backgroundParallaxX, this.y + backgroundParallaxY, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.fillStyle;
    ctx.fill();

    // Calc next
    let drawBall = false;
    let changeVelocity = false;
    const margin = 70;

    this._counter++;
    if (this._counter % this._ballInterval === 0) {
      this.r += 0.6 * Math.PI * Math.random();
      drawBall = true;
      changeVelocity = true;
    }

    if (y + this.vy > STATE.screenHeight + margin || y + this.vy < -margin) {
      this.vy = -this.vy;
      changeVelocity = true;
    }
    if (x + this._vx > STATE.screenWidth + margin || x + this.vx < -margin) {
      this.vx = -this.vx;
      changeVelocity = true;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Add to history
    this._history.push([x, y, drawBall, changeVelocity]);
    this._history = this._history.slice(Math.max(0, this._history.length - this._maxHistory));
  }
}

class Title {
  draw(_ctx) {
    const ctx = _ctx;
    const fontSize = Math.min(STATE.screenWidth * 0.1, 60);
    const [parallaxX, parallaxY] = [STATE.parallaxX * 10, STATE.parallaxY * 10];
    ctx.font = `normal normal 300 ${fontSize}px Roboto`;
    ctx.strokeStyle = "rgb(255, 255, 255)";
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Yusuke Miyazaki", (STATE.screenWidth / 2) + parallaxX, (STATE.screenHeight / 2) + parallaxY);
  }
}

class HomeCanvas extends React.Component {
  componentDidMount() {
    this.initCanvas();
  }

  initCanvas() {
    const canvas = this.canvas;
    const ctx = canvas.getContext("2d");
    const background = new GradientBackground();
    const ball = new BallWithLines(0, 0, 5, "rgba(255, 255, 255, 0.8)");
    const title = new Title();

    const resizeCanvas = () => {
      const ratio = ratioForCanvas(ctx);
      [STATE.screenWidth, STATE.screenHeight] = [window.innerWidth, window.innerHeight - 64];
      canvas.width = ratio * STATE.screenWidth;
      canvas.height = ratio * STATE.screenHeight;
      canvas.style.width = `${STATE.screenWidth}px`;
      canvas.style.height = `${STATE.screenHeight}px`;
      ctx.scale(ratio, ratio);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const parallaxCanvas = (e) => {
      // normalize: -1 <= parallax <= 1
      STATE.parallaxX = (e.clientX - (STATE.screenWidth / 2)) / (STATE.screenWidth / 2);
      STATE.parallaxY = (e.clientY - (STATE.screenHeight / 2)) / (STATE.screenHeight / 2);
    };
    canvas.addEventListener("mousemove", parallaxCanvas);

    ball.v = 10;
    ball.r = 2 * Math.PI * Math.random();
    const draw = () => {
      background.draw(ctx);
      ball.draw(ctx);
      title.draw(ctx);
      requestAnimationFrame(draw);
    };
    draw();
  }

  render() {
    return (
      <canvas
        ref={(c) => { this.canvas = c; }}
        style={{ display: "block" }}
      />
    );
  }
}

const Home = () => (<HomeCanvas />);

export default Home;
