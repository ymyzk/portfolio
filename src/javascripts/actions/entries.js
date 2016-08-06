export const REQUEST_RECENT_ENTRIES = "REQUEST_RECENT_ENTRIES";
export const REQUEST_RECENT_ENTRIES_SUCCESS = "REQUEST_RECENT_ENTRIES_SUCCESS";
export const REQUEST_RECENT_ENTRIES_FAILURE = "REQUEST_RECENT_ENTRIES_FAILURE";

export const requestRecentEntries = () => ({
  type: REQUEST_RECENT_ENTRIES
});

export const requestRecentEntriesSuccess = (json) => ({
  type: REQUEST_RECENT_ENTRIES_SUCCESS,
  entries: json
});

export const requestRecentEntriesFailure = (error) => ({
  type: REQUEST_RECENT_ENTRIES_FAILURE,
  error
});
