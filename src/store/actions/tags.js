import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { GET_TAGS, REMOVE_TAG, CREATE_TAG, VOTE_TAG } from "../actionTypes";

export const GetTags = tags => ({
  type: GET_TAGS,
  tags
});

export const RemoveTag = id => ({
  type: REMOVE_TAG,
  id
});

export const CreateTag = tag => ({
  type: CREATE_TAG,
  tag
});

export const upvoteTag = id => ({
  type: VOTE_TAG,
  id
});

export const getTags = () => {
  return dispatch => {
    return apiCall("get", "/api/tags/")
      .then(res => dispatch(GetTags(res)))
      .catch(err => {
        addError(err.message);
      });
  };
};

export const CreateNewTag = (text, symbol) => (dispatch, getState) => {
  let { currentUser } = getState();
  const user = currentUser.user.username;
  return apiCall("post", "/api/tags/" + symbol, { text, user })
    .then(res => dispatch(CreateTag(res)))
    .catch(err => addError(err.message));
};

export const DeleteTag = id => {
  return dispatch => {
    return apiCall("delete", `/api/tags/${id}`)
      .then(dispatch(RemoveTag(id)))
      .then(console.log("tag removed"))
      .catch(err => addError(err.message));
  };
};

export const VoteTag = (id, vote) => {
  return dispatch => {
    return apiCall("put", `/api/tags/${id}`, { vote })
      .then(dispatch(upvoteTag(id)))
      .catch(err => addError(err.message));
  };
};
