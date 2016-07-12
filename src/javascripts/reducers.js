import moment from "moment";

import ContributionsList from "../data/contributions";
import MiscList from "../data/misc";
import skills from "../data/skills";
import TalksList from "../data/talks";

const misc = MiscList.map((n) => {
  n.date = moment(n.date);
  return n;
});

const talks = TalksList.map((t) => {
  t.date = moment(t.date);
  return t;
});

const initialState = {
  contributions: ContributionsList.sort(),
  misc,
  skills,
  talks
};

export default (state = initialState) => state;
