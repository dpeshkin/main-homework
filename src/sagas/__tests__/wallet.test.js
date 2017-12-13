import { ByuCurrencyFlow, SellCurrencyFlow, WalletFlow } from "../wallet";
import {
  buyCurrencySuccess,
  buyCurrencyFailure,
  sellCurrencySuccess,
  sellCurrencyFailure
} from "../../actions/currency";
import { fetchWalletSuccess, fetchWalletFailure } from "../../actions/wallet";
import { takeLatest, put, call } from "redux-saga/effects";
import { getWallet, buyCurrency, sellCurrency } from "../../api";

describe("Saga Wallet", () => {
  describe("if buyCurrencyRequest", () => {
    it("call buyCurrency from api", () => {
      const action = { payload: { currencyName: "eth", value: 1 } };
      const saga = ByuCurrencyFlow(action);
      expect(saga.next().value).toEqual(
        call(buyCurrency, action.payload.currencyName, action.payload.value)
      );
    });
    it("dispatch buyCurrencySuccess() with results, if byuCurrency success", () => {
      const action = { payload: { currencyName: "eth", value: 1 } };
      const saga = ByuCurrencyFlow(action);
      const result = { btc: 1, eth: 1, usd: 1 };
      saga.next();
      expect(saga.next(result).value).toEqual(put(buyCurrencySuccess(result)));
    });
    it("dispatch buyCurrencyFailure() with error, if byuCurrency failure", () => {
      const action = { payload: { currencyName: "eth", value: 1 } };
      const saga = ByuCurrencyFlow(action);
      const error = new Error("error!");
      saga.next();
      expect(saga.throw(error).value).toEqual(put(buyCurrencyFailure(error)));
    });
  });
  describe("if sellCurrencyRequest", () => {
    it("call sellCurrency from api", () => {
      const action = { payload: { currencyName: "eth", value: 1 } };
      const saga = SellCurrencyFlow(action);
      expect(saga.next().value).toEqual(
        call(sellCurrency, action.payload.currencyName, action.payload.value)
      );
    });
    it("dispatch sellCurrencySuccess() with results, if byuCurrency success", () => {
      const action = { payload: { currencyName: "eth", value: 1 } };
      const saga = SellCurrencyFlow(action);
      const result = { btc: 1, eth: 1, usd: 1 };
      saga.next();
      expect(saga.next(result).value).toEqual(put(sellCurrencySuccess(result)));
    });
    it("dispatch sellCurrencyFailure() with error, if byuCurrency failure", () => {
      const action = { payload: { currencyName: "eth", value: 1 } };
      const saga = SellCurrencyFlow(action);
      const error = new Error("error!");
      saga.next();
      expect(saga.throw(error).value).toEqual(put(sellCurrencyFailure(error)));
    });
  });
  describe("if fetchWalletRequest", () => {
    it("call getWallet from api", () => {
      const saga = WalletFlow();
      expect(saga.next().value).toEqual(call(getWallet));
    });
    it("dispatch fetchWalletSuccess() with results, if getWallet success", () => {
      const saga = WalletFlow();
      const result = { btc: 1, eth: 1, usd: 1 };
      saga.next();
      expect(saga.next(result).value).toEqual(put(fetchWalletSuccess(result)));
    });
    it("dispatch fetchWalletFailure() with error, if getWallet failure", () => {
      const saga = WalletFlow();
      const error = new Error("error!");
      saga.next();
      expect(saga.throw(error).value).toEqual(put(fetchWalletFailure(error)));
    });
  });
});
