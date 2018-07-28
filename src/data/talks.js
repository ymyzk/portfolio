// @flow
import parse from "date-fns/parse";

import rawTalks from "./talks.json";

const talks = rawTalks.map((t, i) => Object.assign(t, {
  id: i,
  date: parse(t.date),
}));

export default talks;
