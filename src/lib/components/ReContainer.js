import React, { Component } from "react";
import { CheckMark, Cross } from "../assets/icon";
class ReContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      displayChildren: [],
      maxElement: this.props.max,
    };
  }

  componentDidMount() {
    this.renderChildren();
  }

  renderChildren = () => {
    const { children } = this.props;
    let arr = this.createChildren(children);
    let displayChildren = [];
    // only adds maxElement children only
    displayChildren = arr.slice(
      children.length - this.state.maxElement,
      children.length
    );
    this.setState({
      arr: arr,
      children: children,
      displayChildren
    });
  };

  // create each card component and pass down neccessary props
  createChildren = children => {
    return React.Children.toArray(children).map((child, i) => {
      return React.cloneElement(child, {
        key: i,
        num: i,
        mass: this.props.mass,
        damping: this.props.damping,
        handleDown: this.handleDown,
        handleUp: this.handleUp,
        updateChildren: this.updateChildren,
        handleOnSwipe: this.handleOnSwipe
      });
    });
  };

  handleOnSwipe = (swipeDirection, metaData) => {
    const { onSwipe } = this.props;
    if (onSwipe) {
      onSwipe(swipeDirection, metaData);
    }
  };

  updateChildren = () => {
    let { arr, maxElement, displayChildren } = this.state;
    maxElement += 1;
    displayChildren.pop();
    if (this.props.children.length >= maxElement) {
      displayChildren.unshift(arr[this.props.children.length - maxElement]);
      this.setState({
        displayChildren,
        maxElement
      });
    } else {
      this.setState({
        displayChildren,
        maxElement
      });
    }
  };

  render() {
    const style = {
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden"
    };
    const iconContainer = {
      position: "absolute",
      left: "0px",
      right: "0px",
      marginLeft: "auto",
      marginRight: "auto",
      width: "350px",
      bottom: "50px"
    };
    const icon = {
      width: 0,
      margin: 0,
      padding: 0,
      height: 0
    };
    return (
      <>
        <div style={style}>
          <>{this.state.displayChildren}</>
        </div>
        <span style={iconContainer}>
          <div style={icon}>{Cross()}</div>
        <div style={{...icon,float:'right'}}>{CheckMark()}</div>
        </span>
      </>
    );
  }
}

ReContainer.defaultProps = {
  mass: 0.7,
  damping: 0.8,
  trigger: false,
  max: 3,
  onSwipe: undefined
};

export default ReContainer;
