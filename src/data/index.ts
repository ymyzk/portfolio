/* eslint-disable import/prefer-default-export */
import { parseISO } from "date-fns";

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

export const links: Link[] = rawLinks as Link[];

export const misc: Misc[] = rawMisc.map((m, i) => Object.assign(m, {
  id: i,
  date: parseISO(m.date),
}));

export const projects: Project[] = rawProjects.map((t, i) => Object.assign(t, {
  id: i,
  start: parseISO(t.start),
  end: t.end ? parseISO(t.end) : null,
}));

export const research: Research[] = rawResearch.map((r, i) => Object.assign(r, { id: i }));

export const skills: string[] = rawSkills;

export const talks: Talk[] = rawTalks.map((t, i) => Object.assign(t, {
  id: i,
  date: parseISO(t.date),
}));

export const works: Work[] = rawWorks.map((w, i) => {
  const start = parseISO(w.start);
  const end = (w.end !== null) ? parseISO(w.end) : null;
  return Object.assign(w, {
    id: i,
    start,
    end,
  });
});
