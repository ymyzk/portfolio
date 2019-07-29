/* eslint-disable import/prefer-default-export */
import parse from "date-fns/parse";

import {
  Link, Misc, Project, Research, Talk, Work,
} from "./types";
import rawLinks from "./links.json";
import rawMisc from "./misc.json";
import rawProjects from "./projects.json";
import rawResearch from "./research.json";
import rawSkills from "./skills.json";
import rawTalks from "./talks.json";
import rawWorks from "./works.json";

export const links: Link[] = rawLinks;

export const misc: Misc[] = rawMisc.map((m, i) => Object.assign(m, {
  id: i,
  date: parse(m.date),
}));

export const projects: Project[] = rawProjects.map((t, i) => Object.assign(t, {
  id: i,
  start: parse(t.start),
  end: t.end ? parse(t.end) : null,
}));

export const research: Research[] = rawResearch.map((r, i) => Object.assign(r, { id: i }));

export const skills: string[] = rawSkills;

export const talks: Talk[] = rawTalks.map((t, i) => Object.assign(t, {
  id: i,
  date: parse(t.date),
}));

export const works: Work[] = rawWorks.map((w, i) => {
  const start = parse(w.start);
  const end = (w.end !== null) ? parse(w.end) : null;
  return Object.assign(w, {
    id: i,
    start,
    end,
  });
});
