import { RATE_CRYPTO } from "../actionTypes";

const initialState = {
  votes: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPVOTE_CRYPTO:
      return { ...state };

    default:
      return state;
  }
};
