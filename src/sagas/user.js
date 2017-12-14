import {
  fetchUserInfoRequest,
  fetchUserInfoSuccess,
  fetchUserInfoFailure
} from "../actions/user";
import { takeLatest, put, call } from "redux-saga/effects";
import { getUserInfo } from "../api";

export function* UserInfoFlow() {
  try {
    const result = yield call(getUserInfo);
    yield put(fetchUserInfoSuccess(result));
  } catch (error) {
    yield put(fetchUserInfoFailure(error));
  }
}

export function* userInfoWatch() {
  yield takeLatest(fetchUserInfoRequest, UserInfoFlow);
}
