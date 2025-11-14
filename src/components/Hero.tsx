import { MouseEvent } from "react";
import smoothScroll from "smoothscroll";

import ArrowDownward from "@mui/icons-material/ArrowDownward";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";

const SCROLL_TARGET_ID = "scrollTarget";

const Background = styled("div")({
  position: "relative",
  backgroundColor: "#11140b",
  backgroundImage: [
    "url(\"/static/images/background.jpg\")",
    "image-set(\"/static/images/background.webp\" type(\"image/webp\"), \"/static/images/background.jpg\" type(\"image/jpeg\"))",
  ],
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  zIndex: 0,
  overflow: "hidden",
  width: "100%",
  height: "100vh",
});

const TitleWrapper = styled("div")({
  position: "absolute",
  textAlign: "center",
  top: "35%",
  left: 0,
  right: 0,
});

const TitleHeader = styled("h1")({
  font: "normal normal 300 10vw Roboto",
  color: "white",
  "@media (min-width: 600px)": {
    fontSize: 60,
  },
});

const TitleLead = styled("small")({
  fontSize: "5vw",
  "@media (min-width: 480px)": {
    fontSize: 24,
  },
});

const ButtonWrapper = styled("div")({
  position: "absolute",
  textAlign: "center",
  width: "100%",
  bottom: 30,
});

export default function Hero() {
  const scroll = (e: MouseEvent) => {
    e.preventDefault();
    const scrollTarget = document.querySelector(`#${SCROLL_TARGET_ID}`);
    if (scrollTarget !== null) {
      smoothScroll(scrollTarget, 1500);
    }
  };
  return (
    <div>
      <Background>
        <TitleWrapper>
          <TitleHeader>
            Yusuke Miyazaki
            <br />
            <TitleLead>
              Site Reliability Engineer in Japan
            </TitleLead>
          </TitleHeader>
        </TitleWrapper>
        <ButtonWrapper>
          <Fab aria-label="Scroll down" color="secondary" onClick={scroll}>
            <ArrowDownward />
          </Fab>
        </ButtonWrapper>
      </Background>
      <div id={SCROLL_TARGET_ID} />
    </div>
  );
}
