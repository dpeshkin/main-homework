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
} from "../actions/currency";
import { handleActions } from "redux-actions";
import { combineReducers } from "redux";

export const selected = handleActions(
  {
    [selectBtc]: () => "btc",
    [selectEth]: () => "eth"
  },
  "btc"
);
export const offset = handleActions(
  {
    [selectOffset]: (state, action) => action.payload
  },
  "4h"
);
export const btc = handleActions(
  {
    [fetchBtcSuccess]: (state, action) => action.payload
  },
  []
);
export const eth = handleActions(
  {
    [fetchEthSuccess]: (state, action) => action.payload
  },
  []
);
export const isBtcLoading = handleActions(
  {
    [fetchBtcRequest]: () => true,
    [fetchBtcSuccess]: () => false,
    [fetchBtcFailure]: () => false
  },
  false
);
export const isEthLoading = handleActions(
  {
    [fetchEthRequest]: () => true,
    [fetchEthSuccess]: () => false,
    [fetchEthFailure]: () => false
  },
  false
);
export default combineReducers({
  selected,
  offset,
  btc,
  eth,
  isBtcLoading,
  isEthLoading
});

export const getOffset = state => state.currency.offset;
export const getSelected = state => state.currency.selected;
export const getIsBtcLoading = state => state.currency.isBtcLoading;
export const getIsEthLoading = state => state.currency.isEthLoading;

export const getCurrentBtcPurchase = state => {
  if (state.currency.btc[0]) return state.currency.btc[0].purchase;
  return 0;
};
export const getCurrentEthPurchase = state => {
  if (state.currency.eth[0]) return state.currency.eth[0].purchase;
  return 0;
};
export const getCurrentBtcSell = state => {
  if (state.currency.btc[0]) return state.currency.btc[0].sell;
  return 0;
};
export const getCurrentEthSell = state => {
  if (state.currency.eth[0]) return state.currency.eth[0].sell;
  return 0;
};

export const sellBtc = state =>
  state.currency.btc.map(item => [new Date(item.mts), item.sell]);
export const purchaseBtc = state =>
  state.currency.btc.map(item => [new Date(item.mts), item.purchase]);
export const sellEth = state =>
  state.currency.eth.map(item => [new Date(item.mts), item.sell]);
export const purchaseEth = state =>
  state.currency.eth.map(item => [new Date(item.mts), item.purchase]);

export const getMax = currency =>
  currency.reduce(
    (acc, { sell, purchase }) => Math.max(acc, sell, purchase),
    0
  );
export const getMin = currency =>
  currency.reduce(
    (acc, { sell, purchase }) => Math.min(acc, sell, purchase),
    Number.MAX_SAFE_INTEGER
  );
