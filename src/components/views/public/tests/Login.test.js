import React from "react";
import Login from "../Login";
import Enzyme, { mount, render, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-localstorage-mock";

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  localStorage.clear();
});
jest.mock("../../../api/gill/resources");
jest.mock("react", () => {
  const ActualReact = require.requireActual("react");
  return {
    ...ActualReact,
    useContext: () => ({ match: { params: { system_id: 160677 } } })
  };
});

describe("Login Component", () => {
  describe("Render for a CAS orga", () => {
    it("Render for logged out user", () => {
      const wrapper = shallow(<Login />);
      expect(wrapper).toMatchSnapshot();
    });
    it("Render for logged in user", () => {
      localStorage.setItem(
        "accessToken",
        JSON.stringify({ username: "unicorn" })
      );
      const wrapper = shallow(<Login />);
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe("Render for a non CAS orga", () => {
    it("Render for logged out user", () => {
      const wrapper = shallow(<Login />);
      expect(wrapper).toMatchSnapshot();
    });
    it("Render for logged in user", () => {
      localStorage.setItem(
        "accessToken",
        JSON.stringify({ username: "unicorn" })
      );
      const wrapper = shallow(<Login />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
