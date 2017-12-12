import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  fetchWalletRequest,
  fetchWalletSuccess,
  fetchWalletFailure
} from "../actions/wallet";
import { buyCurrencySuccess, sellCurrencySuccess } from "../actions/currency";

export const isLoading = handleActions(
  {
    [fetchWalletRequest]: () => true,
    [fetchWalletSuccess]: () => false,
    [fetchWalletFailure]: () => false
  },
  false
);

export const error = handleActions(
  {
    [fetchWalletRequest]: () => null,
    [fetchWalletSuccess]: () => null,
    [fetchWalletFailure]: (state, action) => action.payload
  },
  null
);

export const btc = handleActions(
  {
    [sellCurrencySuccess]: (state, action) =>
      action.payload.currencyName === "btc"
        ? state.coins.usd - action.payload.value
        : state,
    [buyCurrencySuccess]: (state, action) =>
      action.payload.currencyName === "btc"
        ? state.coins.usd + action.payload.value
        : state
  },
  0
);
export const eth = handleActions(
  {
    [sellCurrencySuccess]: (state, action) =>
      action.payload.currencyName === "eth"
        ? state.coins.usd - action.payload.value
        : state,
    [buyCurrencySuccess]: (state, action) =>
      action.payload.currencyName === "eth"
        ? state.coins.usd + action.payload.value
        : state
  },
  0
);
export const usd = handleActions(
  {
    [sellCurrencySuccess]: (state, action) => action.payload,
    [buyCurrencySuccess]: (state, action) => action.payload
  },
  10000
);

export const coins = combineReducers({
  btc,
  eth,
  usd
});

export default combineReducers({
  isLoading,
  coins,
  error
});

export const getWalletError = state => state.wallet.error;
export const getWalletUsd = state => state.wallet.coins.usd;
export const getWalletBtc = state => state.wallet.coins.btc;
export const getWalletEth = state => state.wallet.coins.eth;
