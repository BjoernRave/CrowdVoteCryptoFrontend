import { GET_HISTDATA } from "../actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case GET_HISTDATA:
      return [...action.data];

    default:
      return state;
  }
};
