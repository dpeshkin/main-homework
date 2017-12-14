import { fork } from "redux-saga/effects";
import { authFlow } from "./auth";
import { loginWatch, registrationWatch } from "./login";
import { fetchBtcWatch, fetchEthWatch, currencyWatch } from "./currency";
import { buyWatch, sellWatch, walletWatch } from "./wallet";
import { userInfoWatch } from "./user";
export default function*() {
  yield fork(authFlow);
  yield fork(loginWatch);
  yield fork(registrationWatch);
  yield fork(fetchEthWatch);
  yield fork(fetchBtcWatch);
  yield fork(currencyWatch);
  yield fork(buyWatch);
  yield fork(sellWatch);
  yield fork(walletWatch);
  yield fork(userInfoWatch);
}
