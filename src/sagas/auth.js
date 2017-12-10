import {
  authLoginRequest,
  authLoginSuccess,
  authRegistrationRequest
} from "../actions/auth";
import { take, put, call, select } from "redux-saga/effects";
import { setTokenApi, clearTokenApi, login, registration } from "../api";
import { getIsAuthorized } from "../reducers/auth";
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage
} from "../localStorage";
import { requestFlow } from "./request";

export function* authFlow() {
  let token;
  while (true) {
    const isAuthorized = yield select(getIsAuthorized);
    const localStorageToken = yield call(getTokenFromLocalStorage);
    if (!isAuthorized) {
      if (localStorageToken) {
        token = localStorageToken;
        yield put(authLoginSuccess());
      } else {
        const action = yield take([authLoginRequest, authRegistrationRequest]);
        if (action.type === authLoginRequest.toString()) {
          token = yield call(requestFlow, login, action.payload);
        } else if (action.type === authRegistrationRequest.toString()) {
          token = yield call(requestFlow, registration, action.payload);
        }
        yield put(authLoginSuccess());
      }
    }

    yield call(setTokenApi, token);
    yield call(setTokenToLocalStorage, token);
    // yield take(logout);
    yield call(removeTokenFromLocalStorage);
    yield call(clearTokenApi);
  }
}
