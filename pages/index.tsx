import React from "react";

import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import GridContainer from "../src/components/GridContainer";
import Hero from "../src/components/Hero";
import Links from "../src/components/Links";
import Misc from "../src/components/Misc";
import ProjectCardList from "../src/components/ProjectCardList";
import Research from "../src/components/Research";
import Skills from "../src/components/Skills";
import TalkList from "../src/components/TalkList";
import WorkExperienceList from "../src/components/WorkExperienceList";
import {
  links,
  misc,
  projects,
  research,
  skills,
  talks,
  works,
} from "../src/data";

const Section = styled(Grid)(({ theme }) => ({
  paddingBottom: theme.spacing(3),
  paddingTop: theme.spacing(3),
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  fontSize: 34,
  fontWeight: 300,
  paddingBottom: theme.spacing(0.5),
  paddingTop: theme.spacing(0.5),
  textAlign: "center",
})) as typeof Typography;

export default function Index() {
  return (
    <div>
      <Hero />
      <GridContainer>
        <Section size={{ xs: 12 }}>
          <div style={{ height: 50 }} />
          <Links links={links} />
        </Section>
        <Section size={{ xs: 12 }}>
          <SectionHeader component="h2">
            Work Experience
          </SectionHeader>
          <WorkExperienceList works={works} />
        </Section>
        <Section size={{ xs: 12 }}>
          <SectionHeader component="h2">
            Talks
          </SectionHeader>
          <TalkList talks={talks} />
        </Section>
        <Section size={{ xs: 12 }}>
          <SectionHeader component="h2">
            Projects
          </SectionHeader>
          <ProjectCardList projects={projects} />
        </Section>
        <Section size={{ xs: 12 }}>
          <SectionHeader component="h2">
            Skills
          </SectionHeader>
          <Skills skills={skills} />
        </Section>
        <Section size={{ xs: 12 }}>
          <SectionHeader component="h2">
            Research
          </SectionHeader>
          <Research research={research} />
        </Section>
        <Section size={{ xs: 12 }}>
          <SectionHeader component="h2">
            Misc
          </SectionHeader>
          <Misc misc={misc} />
        </Section>
      </GridContainer>
    </div>
  );
}
