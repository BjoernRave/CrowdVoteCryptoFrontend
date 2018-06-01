import { addError } from "./errors";
import { ADD_ROUTES } from "../actionTypes";

export const addRoutes = routes => ({
  type: ADD_ROUTES,
  routes
});

export const GetDetailRoutes = routes => {
  return dispatch => {
    return () =>
      dispatch(addRoutes(routes)).catch(err => addError(err.message));
  };
};
