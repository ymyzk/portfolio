import moment from "moment";

import { SELECT_TALK, DESELECT_TALK } from "../actions/talks";
import TalksList from "../../data/talks";

const talks = TalksList.map((t) => Object.assign(t, { date: moment(t.date) }));

const initialState = {
  talks,
  selectedTalk: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_TALK: {
      return Object.assign({}, state, {
        selectedTalk: action.talk
      });
    }
    case DESELECT_TALK: {
      return Object.assign({}, state, {
        selectedTalk: null
      });
    }
    default:
      return state;
  }
};