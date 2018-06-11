import { SET_FIAT } from "../actionTypes";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const initialState = {
  fiat: cookies.get("fiat") || "USD"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FIAT:
      return { ...state, fiat: action.fiat };

    default:
      return state;
  }
};
