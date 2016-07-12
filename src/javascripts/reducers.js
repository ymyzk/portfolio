import moment from "moment";

import ContributionsList from "../data/contributions";
import MiscList from "../data/misc";
import ProjectsList from "../data/projects";
import skills from "../data/skills";
import TalksList from "../data/talks";

const misc = MiscList.map((n) => {
  n.date = moment(n.date);
  return n;
});

const projects = ProjectsList.map((p) => {
  if (p.start !== null) {
    // TODO: Error
    p.start = new Date(p.start);
  }
  if (p.end !== null) {
    p.end = new Date(p.end);
  }
  p.duration = (() => {
    const startYear = p.start.getFullYear();
    if (p.end === null) {
      // 継続中
      return `${startYear}-`;
    }
    const endYear = p.end.getFullYear();
    // 終了済み
    return startYear === endYear ? `${p.start.getFullYear()}` : `${startYear}-${endYear}`;
  })();
  return p;
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
  talks,
  selectedProjectTags: []
};

const defaultReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PROJECT_TAG": {
      const selectedProjectTags = state.selectedProjectTags.concat(action.tag);
      return Object.assign({}, state, {
        selectedProjectTags
      });
    }
    case "REMOVE_PROJECT_TAG": {
      const selectedProjectTags = state.selectedProjectTags.filter((t) => t !== action.tag);
      return Object.assign({}, state, {
        selectedProjectTags
      });
    }
    default:
      return state;
  }
};

export default defaultReducer;
