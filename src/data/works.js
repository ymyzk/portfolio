import moment from "moment";

// Day of start & end is not precise!
const works = [
  {
    title: "Engineer",
    company: "HERP, Inc.",
    link: "https://herp.co.jp/",
    start: "2017-04-01",
    end: "2018-03-31",
  },
  {
    title: "President & Co-founder",
    company: "Unimap, Inc.",
    link: "http://www.unimap.co.jp/",
    start: "2014-02-01",
    end: "2017-04-01",
  },
  {
    title: "Office Assistant",
    company: "Graduate School of Pharmaceutical Sciences, Kyoto University",
    link: null,
    start: "2012-10-01",
    end: "2014-09-30",
  },
].map((w) => {
  const start = moment(w.start);
  const end = (w.end !== null) ? moment(w.end) : null;
  return Object.assign(w, {
    start,
    end,
  });
});

export default works;
