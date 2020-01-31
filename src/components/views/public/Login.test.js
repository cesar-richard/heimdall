import React from "react";
import Login from "./Login";
import renderer from "react-test-renderer";
import { MemoryRouter, Route } from "react-router-dom";
import "jest-localstorage-mock";

beforeEach(() => {
  localStorage.clear();
});
jest.mock("../../../api/gill/resources");

describe("Login Component", () => {
  describe("Render for a CAS orga", () => {
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
    });
  });
});
