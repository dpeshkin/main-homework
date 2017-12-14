import {
  takeLatest,
  fork,
  take,
  select,
  put,
  cancel,
  call
} from "redux-saga/effects";
import { delay } from "redux-saga";
import {
  selectBtc,
  selectEth,
  fetchBtcRequest,
  fetchEthRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthFailure,
  fetchEthSuccess,
  selectOffset
} from "../../actions/currency";
import { getOffset } from "../../reducers/currency";
import { candles } from "../../api";
import { authLoginSuccess, logout } from "../../actions/auth";
import {
  fetchCurrencyFlow,
  currencyWatch,
  fetchBtcFlow,
  fetchEthFlow
} from "../currency";
import { createMockTask } from "redux-saga/utils";

describe("in saga Currency", () => {
  describe("Saga currencyWatch", () => {
    const saga = currencyWatch();
    const mockTask = createMockTask();
    it("take actions [authLoginSuccesslogout,selectBtc,selectEth,selectOffset]", () => {
      expect(saga.next({ selectBtc }).value).toEqual(
        take([authLoginSuccess, logout, selectBtc, selectEth, selectOffset])
      );
    });
    it("if action != logout, fork(fetchCurrencyFlow)", () => {
      expect(saga.next({ selectBtc }).value).toEqual(fork(fetchCurrencyFlow));
    });
    it("if action === logout, cancell task =>", () => {
      saga.next(mockTask);
      expect(saga.next({ logout }).value).toEqual(cancel(mockTask));
    });
  });
  describe("Saga fetchCurrencyFlow", () => {
    const saga = fetchCurrencyFlow();
    const offset = "1d";
    it("will select getOffset to state", () => {
      expect(saga.next().value).toEqual(select(getOffset));
    });
    it("dispatch fetchBtcRequest with offset, recieved in previous state", () => {
      expect(saga.next(offset).value).toEqual(put(fetchBtcRequest(offset)));
    });
    it("dispatch fetchEthRequest with offset", () => {
      expect(saga.next(offset).value).toEqual(put(fetchEthRequest(offset)));
    });
  });
  describe("Saga fetchBtcFlow", () => {
    it("it call candles if fetchBtcRequest", () => {
      const action = { payload: "1d" };
      const saga = fetchBtcFlow(action);
      expect(saga.next().value).toEqual(call(candles, "btc", action.payload));
    });
    it("dispatch fetchBtcSuccess with data, recieved from candles request", () => {
      const action = { payload: "1d" };
      const response = { data: { result: 123 } };
      const saga = fetchBtcFlow(action);
      saga.next();
      expect(saga.next(response).value).toEqual(
        put(fetchBtcSuccess(response.data.result))
      );
    });
    it("dispatch fetchBtcFailure with error, if candles requset failure", () => {
      const action = { payload: "1d" };
      const error = new Error("error");
      const saga = fetchBtcFlow(action);
      saga.next();
      expect(saga.throw(error).value).toEqual(put(fetchBtcFailure(error)));
    });
  });
  describe("Saga fetchEthFlow", () => {
    it("it call candles if fetchEthRequest", () => {
      const action = { payload: "1d" };
      const saga = fetchEthFlow(action);
      expect(saga.next().value).toEqual(call(candles, "eth", action.payload));
    });
    it("dispatch fetchEthSuccess with data, recieved from candles request", () => {
      const action = { payload: "1d" };
      const response = { data: { result: 123 } };
      const saga = fetchEthFlow(action);
      saga.next();
      expect(saga.next(response).value).toEqual(
        put(fetchEthSuccess(response.data.result))
      );
    });
    it("dispatch fetchEthFailure with error, if candles requset failure", () => {
      const action = { payload: "1d" };
      const error = new Error("error");
      const saga = fetchEthFlow(action);
      saga.next();
      expect(saga.throw(error).value).toEqual(put(fetchEthFailure(error)));
    });
  });
});
