import { List } from "immutable";

import { SET_SELECTED_TAGS } from "../actions/projects";
import ProjectsList from "../../data/projects.yml";

const projects = ProjectsList.map((p) => {
  const start = (p.start !== null) ? new Date(p.start) : null;  // TODO: Error
  const end = (p.end !== null) ? new Date(p.end) : null;
  const duration = (() => {
    const startYear = start.getFullYear();
    if (p.end === null) {
      // 継続中
      return `${startYear}-`;
    }
    const endYear = end.getFullYear();
    // 終了済み
    return startYear === endYear ? `${start.getFullYear()}` : `${startYear}-${endYear}`;
  })();
  return Object.assign(p, {
    start,
    end,
    duration,
  });
});

const initialState = {
  projects,
  selectedTags: List(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_TAGS: {
      return Object.assign({}, state, {
        selectedTags: action.selectedTags,
      });
    }
    default:
      return state;
  }
};
