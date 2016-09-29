import moment from "moment";
import combineReducers from "redux/lib/combineReducers";

import entries from "./entries";
import projects from "./projects";
import talks from "./talks";
import ContributionsList from "../../data/contributions.yml";
import MiscList from "../../data/misc.yml";
import skills from "../../data/skills.yml";

const contributions = ContributionsList.sort();
const misc = MiscList.map(n => Object.assign(n, { date: moment(n.date) }));

const initialState = {
  contributions,
  misc,
  skills,
};

const defaultReducer = (state = initialState) => state;

export default combineReducers({
  default: defaultReducer,
  entries,
  projects,
  talks,
});
