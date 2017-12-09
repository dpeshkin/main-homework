import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  authLoginRequest,
  authLoginSuccess,
  authLoginFailure,
  authRegistrationRequest,
  authRegistrationFailure
} from "../actions/auth";

const initialState = null;

export const isAuthorized = handleActions(
  {
    [authLoginRequest]: () => false,
    [authLoginSuccess]: () => true,
    [authLoginFailure]: () => false,
    [authRegistrationRequest]: () => false,
    [authRegistrationFailure]: () => false
  },
  false
);

export const loginError = handleActions(
  {
    [authLoginRequest]: () => initialState,
    [authLoginSuccess]: () => initialState,
    [authLoginFailure]: (state, action) => action.payload,
    [authRegistrationRequest]: () => initialState,
    [authRegistrationFailure]: () => initialState
  },
  initialState
);
export const registationError = handleActions(
  {
    [authLoginRequest]: () => initialState,
    [authLoginSuccess]: () => initialState,
    [authLoginFailure]: () => initialState,
    [authRegistrationRequest]: () => initialState,
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
