import React from "react";

import Activities from "./Activities";
import Affiliation from "./Affiliation";
import Links from "./Links";
import Skills from "./Skills";
import Top from "../../components/Home/Top";

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