import React from "react";
import Homepage from "../homepage";
import Enzyme, { mount, render, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter, Route } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });
describe("Homepage", () => {
  it("Renders logged out", () => {
    const wrapper = shallow(
      <MemoryRouter
        initialEntries={[{ pathname: "/160677/1", key: "testKey" }]}
      >
        <Route key='testRouter' path='/:system_id/:event_id'>
          <Homepage />
        </Route>
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("Renders logged in on event level", () => {
    localStorage.setItem(
      "accessToken",
      JSON.stringify({ username: "myusername" })
    );
    const wrapper = shallow(
      <MemoryRouter
        initialEntries={[{ pathname: "/160677/1", key: "testKey" }]}
      >
        <Route key='testRouter' path='/:system_id/:event_id'>
          <Homepage />
        </Route>
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
