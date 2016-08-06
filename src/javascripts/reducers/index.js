import moment from "moment";
import { combineReducers } from "redux";

import entries from "./entries";
import projects from "./projects";
import ContributionsList from "../../data/contributions";
import MiscList from "../../data/misc";
import skills from "../../data/skills";
import TalksList from "../../data/talks";

const contributions = ContributionsList.sort();
const misc = MiscList.map((n) => Object.assign(n, { date: moment(n.date) }));
const talks = TalksList.map((t) => Object.assign(t, { date: moment(t.date) }));

const initialState = {
  contributions,
  misc,
  skills,
  talks
};

const defaultReducer = (state = initialState) => state;

export default combineReducers({
  default: defaultReducer,
  entries,
  projects
});
