import { REQUEST_RECENT_ENTRIES, REQUEST_RECENT_ENTRIES_FAILURE, REQUEST_RECENT_ENTRIES_SUCCESS } from "../actions/entries";

const initialState = {
  recentEntries: [],
  isRecentEntriesFetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_RECENT_ENTRIES: {
      return Object.assign({}, state, {
        isRecentEntriesFetching: true,
      });
    }
    case REQUEST_RECENT_ENTRIES_SUCCESS: {
      return Object.assign({}, state, {
        recentEntries: action.entries,
        isRecentEntriesFetching: false,
      });
    }
    case REQUEST_RECENT_ENTRIES_FAILURE: {
      return Object.assign({}, state, {
        isRecentEntriesFetching: false,
      });
    }
    default:
      return state;
  }
};
