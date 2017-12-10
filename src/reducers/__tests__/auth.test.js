import auth from "../auth";

import {
  authLoginSuccess,
  authLoginFailure,
  authRegistrationSuccess,
  authRegistrationFailure
} from "../../actions/auth";

describe("In auth reducer", () => {
  describe("action authLoginSuccess", () => {
    it("change isAuthorized from false to true", () => {
      const next = auth({ isAuthorized: false }, authLoginSuccess());
      expect(next.isAthorized).toBeTruthy;
    });
    it("clear loginError field", () => {
      const next = auth({ loginError: "error" }, authLoginSuccess());
      expect(next.loginError).toBeNull();
    });
    it("clear registrationError field", () => {
      const next = auth({ registrationError: "error" }, authLoginSuccess());
      expect(next.registrationError).toBeNull();
    });
  });

  describe("action authRegistrationSuccess", () => {
    it("change isAuthorized from false to true", () => {
      const next = auth({ isAuthorized: false }, authRegistrationSuccess());
      expect(next.isAthorized).toBeTruthy;
    });
    it("clear loginError field", () => {
      const next = auth({ loginError: "error" }, authRegistrationSuccess());
      expect(next.loginError).toBeNull();
    });
    it("clear registrationError field", () => {
      const next = auth(
        { registrationError: "error" },
        authRegistrationSuccess()
      );
      expect(next.registrationError).toBeNull();
    });
  });

  describe("action authLoginFailure", () => {
    it("fill loginError field", () => {
      const payload = "error";
      const next = auth({ loginError: null }, authLoginFailure(payload));
      expect(next.loginError).toEqual(payload);
    });
  });

  describe("action authRegistrationFailure", () => {
    it("fill registrationError field", () => {
      const payload = "error";
      const next = auth(
        { registrationError: null },
        authRegistrationFailure(payload)
      );
      expect(next.registrationError).toEqual(payload);
    });
  });
});
