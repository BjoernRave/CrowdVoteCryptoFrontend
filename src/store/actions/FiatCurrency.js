import { SET_FIAT } from "../actionTypes";

export const setfiat = fiat => ({
  type: SET_FIAT,
  fiat
});

export const SetFiatCurrency = fiat => {
  return dispatch => {
    return dispatch(setfiat(fiat));
  };
};
