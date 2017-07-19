import moment from "moment";
import combineReducers from "redux/lib/combineReducers";

import entries from "./entries";
import projects from "./projects";
import talks from "./talks";
import AffiliationList from "../../data/affiliation.yml";
import ContributionsList from "../../data/contributions.yml";
import links from "../../data/links.yml";
import MiscList from "../../data/misc.yml";
import skills from "../../data/skills.yml";
import WorksList from "../../data/works.yml";

const affiliation = AffiliationList;
const contributions = ContributionsList.sort();
const misc = MiscList.map(n => Object.assign(n, { date: moment(n.date) }));
const works = WorksList.map((w) => {
  const start = moment(w.start);
  const end = (w.end !== null) ? moment(w.end) : null;
  return Object.assign(w, {
    start,
    end,
  });
});

const initialState = {
  affiliation,
  contributions,
  links,
  misc,
  skills,
  works,
};

const defaultReducer = (state = initialState) => state;

export default combineReducers({
  default: defaultReducer,
  entries,
  projects,
  talks,
});
