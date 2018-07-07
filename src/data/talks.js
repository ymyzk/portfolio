import moment from "moment";

import rawTalks from "./talks.json";

const talks = rawTalks.map((t, i) => Object.assign(t, {
  id: i,
  date: moment(t.date),
}));

export default talks;
