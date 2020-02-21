import React from "react";
import MyNavbar from "../navbar";
import renderer from "react-test-renderer";
import { MemoryRouter, Route } from "react-router-dom";
import "jest-localstorage-mock";

beforeEach(() => {
  localStorage.clear();
});

describe("Tests", () => {
  it("Renders logged out", () => {
    const tree = renderer
      .create(
        <MemoryRouter initialEntries={["/160677"]}>
          <Route path='/:system_id'>
            <MyNavbar />
          </Route>
        </MemoryRouter>
      )
      .toJSON();
    expect(
      tree.children.filter(x => "navbar-brand" == x.props.className)[0].props
        .href
    ).toBe("/160677");
  });

  it("Renders logged in on system level", () => {
    localStorage.setItem(
      "accessToken",
      JSON.stringify({ username: "myusername" })
    );
    const tree = renderer
      .create(
        <MemoryRouter initialEntries={["/160677"]}>
          <Route path='/:system_id'>
            <MyNavbar />
          </Route>
        </MemoryRouter>
      )
      .toJSON();
    expect(
      tree.children
        .filter(x => "div" === x.type)[0]
        .children.filter(x => "div" === x.type)[0].children[0].props.href
    ).toBe("/logout");
  });

  it("Renders logged in on event level", () => {
    localStorage.setItem(
      "accessToken",
      JSON.stringify({ username: "myusername" })
    );
    const tree = renderer
      .create(
        <MemoryRouter initialEntries={["/160677/1"]}>
          <Route path='/:system_id/:event_id'>
            <MyNavbar />
          </Route>
        </MemoryRouter>
      )
      .toJSON();
  });
});

describe("Snapshots", () => {
  it("Renders logged out", () => {
    const tree = renderer
      .create(
        <MemoryRouter initialEntries={["/160677"]}>
          <Route path='/:system_id'>
            <MyNavbar />
          </Route>
        </MemoryRouter>
      )
      .toJSON();
    expect(
      tree.children.filter(x => "navbar-brand" == x.props.className)[0].props
        .href
    ).toBe("/160677");
    expect(tree).toMatchSnapshot();
  });

  it("Renders logged in on system level", () => {
    localStorage.setItem(
      "accessToken",
      JSON.stringify({ username: "myusername" })
    );
    const tree = renderer
      .create(
        <MemoryRouter initialEntries={["/160677"]}>
          <Route path='/:system_id'>
            <MyNavbar />
          </Route>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders logged in on event level", () => {
    localStorage.setItem(
      "accessToken",
      JSON.stringify({ username: "myusername" })
    );
    const tree = renderer
      .create(
        <MemoryRouter initialEntries={["/160677/1"]}>
          <Route path='/:system_id/:event_id'>
            <MyNavbar />
          </Route>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
