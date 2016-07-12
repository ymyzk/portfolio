export const ADD_PROJECT_TAG = "ADD_PROJECT_TAG";
export const REMOVE_PROJECT_TAG = "REMOVE_PROJECT_TAG";

export const addProjectTag = (tag) => ({
  type: ADD_PROJECT_TAG,
  tag
});

export const removeProjectTag = (tag) => ({
  type: REMOVE_PROJECT_TAG,
  tag
});
