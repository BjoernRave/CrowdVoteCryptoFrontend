import { GET_CRYPTORATING } from "../actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_CRYPTORATING:
      return { ...action.data };

    default:
      return state;
  }
};
