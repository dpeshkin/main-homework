import {
  authLoginRequest,
  authLoginSuccess,
  authLoginFailure,
  authRegistrationRequest,
  authRegistrationSuccess,
  authRegistrationFailure
} from "../actions/auth";
import { takeLatest, put, call } from "redux-saga/effects";
import { login, registration } from "../api";

function* registrationFlow(action) {
  try {
    const result = yield call(registration, action.payload);
    yield put(authRegistrationSuccess(result.data.jwt));
  } catch (error) {
    yield put(authRegistrationFailure(error.data.message));
  }
}

function* loginFlow(action) {
  try {
    const result = yield call(login, action.payload);
    yield put(authLoginSuccess(result.data.jwt));
  } catch (error) {
    yield put(authLoginFailure(error.data.message));
  }
}

export function* registrationWatch() {
  yield takeLatest(authRegistrationRequest, registrationFlow);
}

export function* loginWatch() {
  yield takeLatest(authLoginRequest, loginFlow);
}
