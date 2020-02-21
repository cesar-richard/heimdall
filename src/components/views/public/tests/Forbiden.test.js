import React from "react";
import Forbiden from "../Forbiden";
import Enzyme, { mount, render, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
describe("Dashboard", () => {
  it("Render without crashing", () => {
    const wrapper = shallow(<Forbiden />);
    expect(wrapper).toMatchSnapshot();
  });
});
