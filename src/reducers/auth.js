import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  authLoginSuccess,
  authLoginFailure,
  authRegistrationSuccess,
  authRegistrationFailure,
  logout
} from "../actions/auth";

export const isAuthorized = handleActions(
  {
    [authLoginSuccess]: () => true,
    [authRegistrationSuccess]: () => true,
    [logout]: () => false
  },
  false
);

export const loginError = handleActions(
  {
    [authLoginSuccess]: () => null,
    [authRegistrationSuccess]: () => null,
    [authLoginFailure]: (state, action) => action.payload
  },
  null
);
export const registrationError = handleActions(
  {
    [authLoginSuccess]: () => null,
    [authRegistrationSuccess]: () => null,
    [authRegistrationFailure]: (state, action) => action.payload
  },
  null
);

export default combineReducers({
  isAuthorized,
  loginError,
  registrationError
});

export const getIsAuthorized = state => state.auth.isAuthorized;
export const getLoginError = state => state.auth.loginError;
export const getRegistrationError = state => state.auth.registrationError;
