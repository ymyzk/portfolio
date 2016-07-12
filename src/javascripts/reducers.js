import { loadContributions } from "./data";

const initialState = {
  contributions: loadContributions()
};

export default (state = initialState) => state;
