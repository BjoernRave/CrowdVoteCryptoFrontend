import { GET_TAGS, CREATE_TAG, REMOVE_TAG, VOTE_TAG } from "../actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case GET_TAGS:
      return [...action.tags];
    case CREATE_TAG:
      return [...state, action.tag];
    case REMOVE_TAG:
      return state.filter(tag => tag._id !== action.id);
    case VOTE_TAG:
      state.forEach(tag => {
        if (tag._id === action.id) {
          tag.votes = tag.votes;
        }
      });
      return [...state];
    //needs logic to return array with updated array

    default:
      return state;
  }
};
