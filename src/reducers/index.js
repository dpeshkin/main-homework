import { combineReducers } from "redux";
import auth from "./auth";
import currency from "./currency";
import wallet from "./wallet";
import user from "./user";

export default combineReducers({
  auth,
  currency,
  wallet,
  user
});
