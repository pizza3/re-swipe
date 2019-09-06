import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import ReContainer, { ReCard } from "../src/lib/index";
configure({
  adapter: new Adapter()
});
global.console = {
  error: jest.fn(),
  log: jest.fn()
}
const foo = [1, 2, 3, 4, 5];
const parentStyle = {
  position: "relative",
  width: "900px",
  height: "900px"
};
const MountApp = () => {
  // NOTE: it is important to enclose <ReContainer/> component inside a parent div, being an absolute container it will inherit the parent dimensions (width & height).
  return (
    <div style={parentStyle}>
      <ReContainer>
        {foo.map((value, index) => (
          <ReCard key={index}>{value}</ReCard>
        ))}
      </ReContainer>
    </div>
  );
};
const wrapper = mount(<MountApp />);

describe("<ReContainer/>", () => {
  it("Creates basic snapshot", () => {
    wrapper;
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it("Checks the state after initial render", () => {
    const component = shallow(
      <ReContainer max={2}>
        {foo.map((value, index) => (
          <ReCard key={index}>{value}</ReCard>
        ))}
      </ReContainer>
    );
    const instance = component.instance();
    expect(instance.state.allChildren.length).toEqual(foo.length);
    expect(instance.state.displayChildren.length).toEqual(2);
    expect(instance.state.activeCardIndex).toEqual(foo.length - 1);
  });
  it("Checks internal methods", () => {
    const mockCallback = jest.fn((dir, data) => {});
    const component = mount(
      <ReContainer onSwipe={mockCallback}>
        {foo.map((value, index) => (
          <ReCard key={index}>{value}</ReCard>
        ))}
      </ReContainer>
    );
    const instance = component.instance();
    // update updateActive() updateChildren()
    expect(instance.state.activeCardIndex).toEqual(foo.length - 1);
    expect(instance.state.maxElement).toEqual(3);
    expect(instance.state.displayChildren.length).toEqual(3);
    instance.updateActive();
    instance.updateChildren();
    instance.handleOnSwipe("left", {});
    expect(instance.state.activeCardIndex).toEqual(foo.length - 2);
    expect(instance.state.maxElement).toEqual(4);
    expect(instance.state.displayChildren.length).toEqual(3);
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toBe("left");
    expect(mockCallback.mock.calls[0][1]).toEqual({});
  });
});

describe("<ReCard/>", () => {
  const component = mount(
    <div style={parentStyle}>
      <ReContainer max={2}>
        {[1].map((value, index) => (
          <ReCard key={index}>{value}</ReCard>
        ))}
      </ReContainer>
    </div>
  );

  const mouseDownEvent = {
    clientX: 450,
    clientY: 450
  }
  it('Checks props after initial render',()=>{
    const component = mount(
      <ReCard>'1'</ReCard>
    )
    expect(global.console.error).toHaveBeenCalledWith('Enclose <ReCard/> component inside a <ReContainer/> component!!')
  })
  it("Checks internal methods", () => {
    const card = component.find(ReCard);
    const instance = card.instance();
    expect(instance.state.active).toEqual(false);
    expect(instance.state.move).toEqual(false);
    card
      .find("div")
      .at(0)
      .simulate("mousedown",mouseDownEvent);
    expect(instance.state.active).toEqual(true);
    expect(instance.state.move).toEqual(true);
    expect(instance.state.mouseStartPosX).toEqual(450);
    expect(instance.state.mouseStartPosY).toEqual(450);
  });
});
