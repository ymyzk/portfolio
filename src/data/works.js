import moment from "moment";

import rawWorks from "./works.json";

const works = rawWorks.map((w) => {
  const start = moment(w.start);
  const end = (w.end !== null) ? moment(w.end) : null;
  return Object.assign(w, {
    start,
    end,
  });
});

export default works;
