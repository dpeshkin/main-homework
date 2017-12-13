import {
  buyCurrencyRequest,
  buyCurrencySuccess,
  buyCurrencyFailure,
  sellCurrencyRequest,
  sellCurrencySuccess,
  sellCurrencyFailure
} from "../actions/currency";
import { takeLatest, put, call } from "redux-saga/effects";
import { getWallet, getUserInfo, buyCurrency, sellCurrency } from "../api";

export function* ByuCurrencyFlow(action) {
  try {
    const result = yield call(
      buyCurrency,
      action.payload.currencyName,
      action.payload.value
    );
    yield put(buyCurrencySuccess(result));
  } catch (error) {
    yield put(buyCurrencyFailure(error));
  }
}

export function* SellCurrencyFlow(action) {
  try {
    const result = yield call(
      sellCurrency,
      action.payload.currencyName,
      action.payload.value
    );
    yield put(sellCurrencySuccess(result));
  } catch (error) {
    yield put(sellCurrencyFailure(error));
  }
}

export function* buyWatch() {
  yield takeLatest(buyCurrencyRequest, ByuCurrencyFlow);
}

export function* sellWatch() {
  yield takeLatest(sellCurrencyRequest, SellCurrencyFlow);
}
