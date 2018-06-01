import { ADD_ROUTES } from "../actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_ROUTES:
      console.log("routes added");
      return { ...state };

    default:
      return state;
  }
};
