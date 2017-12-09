import { createActions } from "redux-actions";
export const {
  authLoginRequest,
  authLoginSuccess,
  authLoginFailure,
  authRegistrationRequest,
  authRegistrationFailure
} = createActions(
  "AUTH_LOGIN_REQUEST",
  "AUTH_LOGIN_SUCCESS",
  "AUTH_LOGIN_FAILURE",
  "AUTH_REGISTRATION_REQUEST",
  "AUTH_REGISTRATION_FAILURE"
);
