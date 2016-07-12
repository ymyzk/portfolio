import moment from "moment";

import ContributionsList from "../data/contributions";
import MiscList from "../data/misc";

const initialState = {
  contributions: ContributionsList.sort(),
  misc: MiscList.map((n) => {
    n.date = moment(n.date);
    return n;
  })
};

export default (state = initialState) => state;
