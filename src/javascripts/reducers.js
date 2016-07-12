import ContributionsList from "../data/contributions";

const initialState = {
  contributions: ContributionsList.sort()
};

export default (state = initialState) => state;
