// @flow
import parse from "date-fns/parse";

import rawMisc from "./misc.json";

const misc = rawMisc.map((m, i) => Object.assign(m, {
  id: i,
  date: parse(m.date),
}));

export default misc;
