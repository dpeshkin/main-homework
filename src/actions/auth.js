import { createActions } from "redux-actions";
export const {
  authLoginRequest,
  authLoginSuccess,
  authLoginFailure,
  authRegistrationRequest,
  authRegistrationSuccess,
  authRegistrationFailure,
  logout
} = createActions(
  "AUTH_LOGIN_REQUEST",
  "AUTH_LOGIN_SUCCESS",
  "AUTH_LOGIN_FAILURE",
  "AUTH_REGISTRATION_REQUEST",
  "AUTH_REGISTRATION_SUCCESS",
  "AUTH_REGISTRATION_FAILURE",
  "LOGOUT"
);
