import moment from "moment";
import { combineReducers } from "redux";

import projects from "./projects";
import ContributionsList from "../../data/contributions";
import MiscList from "../../data/misc";
import skills from "../../data/skills";
import TalksList from "../../data/talks";

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
  projects,
  skills,
  talks
};

const defaultReducer = (state = initialState) => state;

export default combineReducers({
  default: defaultReducer,
  projects
});
