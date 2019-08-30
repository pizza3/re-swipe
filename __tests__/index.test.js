import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import ReContainer, { ReCard } from "../src/lib/index";

configure({
  adapter: new Adapter()
});

const App = () => {
  const foo = [1, 2, 3, 4, 5];
  const parentStyle = {
    position: "relative",
    width: "100%",
    height: "100vh"
  };
  // NOTE: it is important to enclose <ReContainer/> component inside a parent div, being an absolute container it will inherit the parent dimensions (width & height).
  return (
    <div style={parentStyle}>
      <ReContainer>
        {foo.map((value, index) => {
          return <ReCard key={index}>{value}</ReCard>;
        })}
      </ReContainer>
    </div>
  );
};

const wrapper = shallow(<App/>);

describe("<ReContainer/>", () => {
  it("Creates basic snapshot", () => {
    wrapper;
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
