import { apiCall } from "../../services/api";
import { addError } from "./errors";
import {
  GET_CRYPTOSTATS,
  GET_CRYPTORATING,
  GET_HISTDATA
} from "../actionTypes";

export const loadCryptoStats = data => ({
  type: GET_CRYPTOSTATS,
  data
});

export const loadCryptoRating = data => ({
  type: GET_CRYPTORATING,
  data
});

export const loadHistCryptodata = data => ({
  type: GET_HISTDATA,
  data
});

export const fetchCryptoStats = data => {
  return dispatch => {
    return apiCall("get", "/api/crypto/price")
      .then(res => {
        dispatch(loadCryptoStats(res));
      })
      .catch(err => dispatch(addError(err.message)));
  };
};

export const fetchCryptoVotes = votes => {
  return dispatch => {
    return apiCall("get", "/api/crypto/rating/")
      .then(res => {
        dispatch(loadCryptoRating(res));
      })
      .catch(err => dispatch(addError(err.message)));
  };
};

export const fetchHistCryptoData = (coin, days) => {
  return dispatch => {
    return apiCall("get", "/api/crypto/histdata/" + coin + "/" + days).then(
      res => {
        dispatch(loadHistCryptodata(res));
      }
    );
  };
};
