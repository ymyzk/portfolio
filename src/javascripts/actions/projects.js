export const SET_SELECTED_TAGS = "SET_SELECTED_TAGS";

export const selectTag = (selectedTags, tag) => ({
  type: SET_SELECTED_TAGS,
  selectedTags: selectedTags.includes(tag) ? selectedTags : selectedTags.concat(tag),
});

export const deselectTag = (selectedTags, tag) => ({
  type: SET_SELECTED_TAGS,
  selectedTags: selectedTags.filter(t => t !== tag),
});
