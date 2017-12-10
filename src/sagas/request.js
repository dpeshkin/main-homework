import { call, put, select } from "redux-saga/effects";
import { authLoginFailure, authRegistrationFailure } from "../actions/auth";
import { login, registration } from "../api";

export function* requestFlow(fn, args) {
  try {
    const response = yield call(fn, args);
    return response;
  } catch (error) {
    if (fn === login) {
      yield put(authLoginFailure(error));
    } else if (fn === registration) {
      yield put(authRegistrationFailure(error));
    }
    throw error;
  }
}
