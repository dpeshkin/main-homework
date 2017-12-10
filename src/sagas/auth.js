import {
  authLoginSuccess,
  authRegistrationSuccess,
  logout
} from "../actions/auth";
import { take, put, call, select } from "redux-saga/effects";
import { setTokenApi, clearTokenApi } from "../api";
import { getIsAuthorized } from "../reducers/auth";
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage
} from "../localStorage";

export function* authFlow() {
  while (true) {
    const isAuthorized = yield select(getIsAuthorized);
    const localStorageToken = yield call(getTokenFromLocalStorage);
    let token;

    if (!isAuthorized) {
      if (localStorageToken) {
        token = localStorageToken;
      } else {
        const action = yield take([authLoginSuccess, authRegistrationSuccess]);
        token = action.payload;
      }
    }

    yield call(setTokenApi, token);
    yield call(setTokenToLocalStorage, token);

    yield put(authLoginSuccess());

    yield take(logout);
    yield call(removeTokenFromLocalStorage);
    yield call(clearTokenApi);
  }
}
