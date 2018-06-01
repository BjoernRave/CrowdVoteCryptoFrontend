import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import messages from "./messages";
import cryptodata from "./cryptodata";
import cryptovotes from "./cryptovotes";
import Tags from "./tags";
import DetailRoutes from "./Detailroutes";
import histData from "./histCryptodata";

const rootReducer = combineReducers({
  currentUser,
  errors,
  messages,
  cryptodata,
  cryptovotes,
  Tags,
  DetailRoutes,
  histData
});

export default rootReducer;
