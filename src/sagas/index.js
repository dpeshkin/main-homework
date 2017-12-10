import { fork } from "redux-saga/effects";
import { authFlow } from "./auth";
import { loginWatch, registrationWatch } from "./login";

export default function*() {
  yield fork(authFlow);
  yield fork(loginWatch);
  yield fork(registrationWatch);
}
