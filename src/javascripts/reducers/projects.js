import { ADD_PROJECT_TAG, REMOVE_PROJECT_TAG } from "../actions/projects";
import ProjectsList from "../../data/projects";

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

const initialState = {
  projects,
  selectedTags: []
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
        selectedTags
      });
    }
    case REMOVE_PROJECT_TAG: {
      const selectedTags = state.selectedTags.filter((t) => t !== action.tag);
      return Object.assign({}, state, {
        selectedTags
      });
    }
    default:
      return state;
  }
};
