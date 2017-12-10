import {
  authLoginRequest,
  authLoginSuccess,
  authLoginFailure,
  authRegistrationRequest,
  authRegistrationSuccess,
  authRegistrationFailure
} from "../../actions/auth";
import { takeLatest, put, call } from "redux-saga/effects";
import { login, registration } from "../../api";
import { loginFlow, registrationFlow } from "../login";

describe("Saga Login", () => {
  describe("if authRegistrationRequest", () => {
    it("Call registration from /api", () => {
      const action = {
        payload: 123
      };
      const saga = registrationFlow(action);
      expect(saga.next().value).toEqual(call(registration, action.payload));
    });
    it("Dispatch authRegistrationSuccess() with results if registration success", () => {
      const action = {
        payload: 123
      };
      const result = { data: { jwt: 123 } };
      const saga = registrationFlow(action);
      saga.next();
      expect(saga.next(result).value).toEqual(
        put(authRegistrationSuccess(result.data.jwt))
      );
    });
    it("Dispatch authRegistrationFailure() with error, if registration fuilure", () => {
      const action = {
        payload: 123
      };
      const error = { data: { message: "error!!!" } };
      const saga = registrationFlow(action);
      saga.next();
      expect(saga.throw(error).value).toEqual(
        put(authRegistrationFailure(error.data.message))
      );
    });
  });

  describe("if authLoginRequest", () => {
    it("Call login from /api", () => {
      const action = {
        payload: 123
      };
      const saga = loginFlow(action);
      expect(saga.next().value).toEqual(call(login, action.payload));
    });
    it("Dispatch authLoginSuccess() with results if login success", () => {
      const action = {
        payload: 123
      };
      const result = { data: { jwt: 123 } };
      const saga = loginFlow(action);
      saga.next();
      expect(saga.next(result).value).toEqual(
        put(authLoginSuccess(result.data.jwt))
      );
    });
    it("Dispatch authLoginFailure() with error, if login fuilure", () => {
      const action = {
        payload: 123
      };
      const error = { data: { message: "error!!!" } };
      const saga = loginFlow(action);
      saga.next();
      expect(saga.throw(error).value).toEqual(
        put(authLoginFailure(error.data.message))
      );
    });
  });
});
