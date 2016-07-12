import moment from "moment";

import MiscList from "../data/misc";
import ProjectsList from "../data/projects";
import TalksList from "../data/talks";

const misc = MiscList.map((n) => {
  n.date = new Date(n.date);
  return n;
});

const projects = ProjectsList.map((p) => {
  if (p.start !== null) {
    // TODO: Error
    p.start = new Date(p.start);
  }
  if (p.end !== null) {
    p.end = new Date(p.end);
  }
  p.duration = (() => {
    const startYear = p.start.getFullYear();
    if (p.end === null) {
      // 継続中
      return `${startYear}-`;
    }
    const endYear = p.end.getFullYear();
    // 終了済み
    return startYear === endYear ? `${p.start.getFullYear()}` : `${startYear}-${endYear}`;
  })();
  return p;
});

const talks = TalksList.map((t) => {
  t.date = moment(t.date);
  return t;
});

function loadMisc() {
  return misc;
}

function loadProjects() {
  return projects;
}

function loadTalks() {
  return talks;
}

export { loadMisc, loadProjects, loadTalks };
