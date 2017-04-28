import React from "react";

import Activities from "../containers/Home/Activities";
import Affiliation from "../components/Home/Affiliation";
import Links from "../containers/Home/Links";
import Skills from "../containers/Home/Skills";
import Top from "./Home/Top";


const Home = () => (
  <div className="home">
    <Top />
    <div className="container" id="about">
      <Affiliation />
      <Activities />
      <Skills />
      <Links />
    </div>
  </div>
);

export default Home;
