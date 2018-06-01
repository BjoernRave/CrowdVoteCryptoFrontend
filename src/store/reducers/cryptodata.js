import { GET_CRYPTOSTATS } from "../actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case GET_CRYPTOSTATS:
      return [...action.data];

    default:
      return state;
  }
};
