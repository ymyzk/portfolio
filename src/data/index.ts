/* eslint-disable import/prefer-default-export */
import parse from "date-fns/parse";

import rawLinks from "./links.json";
import rawMisc from "./misc.json";
import rawProjects from "./projects.json";
import rawResearch from "./research.json";
import rawSkills from "./skills.json";
import rawTalks from "./talks.json";
import rawWorks from "./works.json";

export const links = rawLinks;

export const misc = rawMisc.map((m, i) => Object.assign(m, {
  id: i,
  date: parse(m.date),
}));

export const projects = rawProjects.map((t, i) => Object.assign(t, {
  id: i,
  start: t.start,
  end: t.end ? parse(t.end) : null,
}));

export const research = rawResearch.map((r, i) => Object.assign(r, { id: i }));

export const skills = rawSkills;

export const talks = rawTalks.map((t, i) => Object.assign(t, {
  id: i,
  date: parse(t.date),
}));

export const works = rawWorks.map((w, i) => {
  const start = parse(w.start);
  const end = (w.end !== null) ? parse(w.end) : null;
  return Object.assign(w, {
    id: i,
    start,
    end,
  });
});
