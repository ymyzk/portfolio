import { ADD_PROJECT_TAG, REMOVE_PROJECT_TAG } from "../actions/projects";
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
  selectedTags: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT_TAG: {
      if (state.selectedTags.includes(action.tag)) {
        // Duplicate tag
        return state;
      }
      const selectedTags = state.selectedTags.concat(action.tag);
      return Object.assign({}, state, {
        selectedTags,
      });
    }
    case REMOVE_PROJECT_TAG: {
      const selectedTags = state.selectedTags.filter(t => t !== action.tag);
      return Object.assign({}, state, {
        selectedTags,
      });
    }
    default:
      return state;
  }
};
