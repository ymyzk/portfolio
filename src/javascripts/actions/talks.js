export const SELECT_TALK = "SELECT_TALK";
export const DESELECT_TALK = "DESELECT_TALK";

export const selectTalk = talk => ({
  type: SELECT_TALK,
  talk
});

export const deselectTalk = () => ({
  type: DESELECT_TALK
});
