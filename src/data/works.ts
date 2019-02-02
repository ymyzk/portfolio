// @flow
import parse from "date-fns/parse";

import rawWorks from "./works.json";

const works = rawWorks.map((w, i) => {
  const start = parse(w.start);
  const end = (w.end !== null) ? parse(w.end) : null;
  return Object.assign(w, {
    id: i,
    start,
    end,
  });
});

export default works;
