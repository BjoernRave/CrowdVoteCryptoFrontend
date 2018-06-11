import { apiCall } from "../../services/api";
import { RATE_CRYPTO } from "../actionTypes";

export const rateCrypto = amount => ({
  type: RATE_CRYPTO,
  amount
});

export const sendRating = amount => {
  return dispatch => {
    let { currentUser } = getState();
    const user = currentUser.user.id;
    return apiCall("put", "/api/crypto/rating", { amount, user });
  };
};
