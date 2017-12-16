import React from "react";
import { LoginPage, Button, Input } from "../LoginPage/LoginPage";
import { shallow } from "enzyme";
import styled from "styled-components";

describe("Components LoginPage", () => {
  const wrapper = shallow(<LoginPage />);

  describe("Render", () => {
    it('contain input with name="email', () => {
      expect(
        wrapper.findWhere(
          el => el.type() === Input && el.prop("name") === "email"
        )
      ).toHaveLength(1);
    });

    it('contain input with name="password', () => {
      expect(
        wrapper.findWhere(
          el => el.type() === Input && el.prop("name") === "password"
        )
      ).toHaveLength(1);
    });

    it("contain submit button", () => {
      expect(wrapper.find(Button)).toHaveLength(1);
    });

    it("contain link, that change login/register submit of form", () => {
      const authorized = wrapper.state().isAuthorized;
      wrapper.find("a").simulate("click", { preventDefault: jest.fn() }); //второй аргументы нужен чтобы не было ошибки эвента
      expect(wrapper.state().isAuthorized).toEqual(!authorized);
    });

    describe("contain error message, if", () => {
      it("login error", () => {
        wrapper.setProps({ loginError: "error message" });
        expect(wrapper.find("p.error-message").text()).toEqual("error message");
      });
      it("registration error", () => {
        wrapper.setProps({ registrationError: "error message" });
        expect(wrapper.find("p.error-message").text()).toEqual("error message");
      });
    });
  });
  describe("Contains methods", () => {
    it("toggleForm", () => {
      expect(wrapper.instance().toggleForm).toBeDefined();
    });
    it("handleChange", () => {
      expect(wrapper.instance().handleChange).toBeDefined();
    });
    it("handleSubmit", () => {
      expect(wrapper.instance().handleSubmit).toBeDefined();
    });
  });
});
