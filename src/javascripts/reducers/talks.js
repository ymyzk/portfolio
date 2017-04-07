import moment from "moment";

import history from "../history";
import { SELECT_TALK, DESELECT_TALK } from "../actions/talks";
import TalksList from "../../data/talks.yml";

const talks = TalksList.map(t => Object.assign(t, { date: moment(t.date) }));

const initialState = {
  isDialogOpen: false,
  talks,
  selectedTalk: null,
};

const scrollToTop = () => {
  if (__CLIENT__) {
    window.scroll(0, 0);
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_TALK: {
      history.push("/talks/");
      scrollToTop();
      return Object.assign({}, state, {
        isDialogOpen: true,
        selectedTalk: action.talk,
      });
    }
    case DESELECT_TALK: {
      return Object.assign({}, state, {
        isDialogOpen: false,
        selectedTalk: null,
      });
    }
    default:
      return state;
  }
};
