import moment from "moment";

import rawTalks from "./talks.json";

const talks = rawTalks.map(t => Object.assign(t, { date: moment(t.date) }));

export default talks;
