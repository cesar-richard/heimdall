import React from "react";
import Login from "./Login";
import Enzyme, { mount, render, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter, Route } from "react-router-dom";
import "jest-localstorage-mock";

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  localStorage.clear();
});
jest.mock("../../../api/gill/resources");

describe("Login Component", () => {
  describe("Render for a CAS orga", () => {
    it("Render for logged out user", () => {
      const match = { params: { system_id: 160677 } };
      const wrapper = shallow(<Login match={match} context={5} />);
      expect(wrapper).toMatchSnapshot();
      console.log(wrapper);
    });
    /*
    it("Render for logged in user", () => {
      localStorage.setItem(
        "accessToken",
        JSON.stringify({ username: "myusername" })
      );
      const tree = renderer
        .create(
          <MemoryRouter initialEntries={["/80405"]}>
            <Route path='/:system_id'>
              <Login />
            </Route>
          </MemoryRouter>
        )
        .toJSON();
    });
  });

  describe("Render for a non CAS orga", () => {
    it("Render for logged out user", () => {
      const tree = renderer
        .create(
          <MemoryRouter initialEntries={["/80405"]}>
            <Route path='/:system_id'>
              <Login />
            </Route>
          </MemoryRouter>
        )
        .toJSON();
    });
    it("Render for logged in user", () => {
      localStorage.setItem(
        "accessToken",
        JSON.stringify({ username: "myusername" })
      );
      const tree = renderer
        .create(
          <MemoryRouter initialEntries={["/80405"]}>
            <Route path='/:system_id'>
              <Login />
            </Route>
          </MemoryRouter>
        )
        .toJSON();
    });*/
  });
});
