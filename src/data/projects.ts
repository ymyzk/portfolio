// @flow
import parse from "date-fns/parse";

import rawProjects from "./projects.json";

const projects = rawProjects.map((t, i) => Object.assign(t, {
  id: i,
  start: t.start,
  end: t.end ? parse(t.end) : null,
}));

export default projects;
