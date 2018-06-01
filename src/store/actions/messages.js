import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_MESSAGES, REMOVE_MESSAGE } from "../actionTypes";

export const loadMessages = (messages, symbol) => ({
  type: LOAD_MESSAGES,
  messages,
  symbol
});

export const remove = (id, symbol) => ({
  type: REMOVE_MESSAGE,
  id,
  symbol
});

export const removeMessage = (id, symbol) => {
  return dispatch => {
    return apiCall("delete", `/api/messages/${id}`)
      .then(() => dispatch(remove(id, symbol)))
      .then(console.log("removed message"))
      .catch(err => {
        addError(err.message);
      });
  };
};

export const fetchMessages = symbol => {
  return dispatch => {
    return apiCall("get", `/api/messages/${symbol}`)
      .then(res => {
        dispatch(loadMessages(res, symbol));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const postNewMessage = (text, symbol) => (dispatch, getState) => {
  let { currentUser } = getState();
  const user = currentUser.user.username;
  return apiCall("post", `/api/messages`, { text, symbol, user })
    .then(fetchMessages(symbol))
    .catch(err => addError(err.message));
};
