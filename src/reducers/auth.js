import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  authLoginSuccess,
  authLoginFailure,
  authRegistrationSuccess,
  authRegistrationFailure
} from "../actions/auth";

const initialState = null;

export const isAuthorized = handleActions(
  {
    [authLoginSuccess]: () => true,

    [authRegistrationSuccess]: () => true
  },
  false
);

export const loginError = handleActions(
  {
    [authLoginFailure]: (state, action) => action.payload
  },
  initialState
);
export const registationError = handleActions(
  {
    [authRegistrationFailure]: (state, action) => action.payload
  },
  initialState
);

export default combineReducers({
  isAuthorized,
  loginError,
  registationError
});

export const getIsAuthorized = state => state.auth.isAutorized;
export const getLoginError = state => state.auth.loginError;
export const getRegistrationError = state => state.auth.registationError;
