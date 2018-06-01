import { LOAD_MESSAGES, REMOVE_MESSAGE } from "../actionTypes";

const message = (state = [], action) => {
  switch (action.type) {
    case LOAD_MESSAGES:
      return { ...state, [action.symbol]: action.messages };
    case REMOVE_MESSAGE:
      return {
        [action.symbol]: state[action.symbol].filter(
          message => message._id !== action.id
        )
      };
    default:
      return state;
  }
};

export default message;
