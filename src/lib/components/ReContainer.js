import React, { Component } from "react";
import { CheckMark, Cross } from "../assets/icon";
class ReContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      move: false,
      current: 0,
      clickPos: { x: 0, y: 0 },
      pos: { x: 0, y: 0 },
      k: 0.2,
      mass: 0.7,
      damping: 0.8,
      arr: [],
      displayChildren: [],
      maxElement: 3,
      cardOnTop: 0
    };
  }

  componentDidMount() {
    this.renderChildren();
  }

  renderChildren = () => {
    if (React.Children.toArray(this.props.children).length < 4) {
      const children = this.props.children;
      let arr = [];
      let displayChildren = [];
      React.Children.toArray(children).map((child, i) => {
        arr.push(
          React.cloneElement(child, {
            key: i,
            num: i,
            handleDown: this.handleDown,
            handleUp: this.handleUp,
            updateChildren: this.updateChildren,
            handleOnSwipe: this.handleOnSwipe
          })
        );
      });
      displayChildren = arr;
      this.setState({
        arr: arr,
        children: this.props.children,
        displayChildren
      });
    } else {
      const children = this.props.children.slice(0, this.props.children.length);
      let arr = [];
      let displayChildren = [];
      React.Children.toArray(children).map((child, i) => {
        arr.push(
          React.cloneElement(child, {
            key: i,
            num: i,
            handleDown: this.handleDown,
            handleUp: this.handleUp,
            updateChildren: this.updateChildren,
            handleOnSwipe: this.handleOnSwipe
          })
        );
      });
      displayChildren = arr.slice(
        this.props.children.length - this.state.maxElement,
        this.props.children.length
      );
      this.setState({
        arr: arr,
        children: this.props.children,
        displayChildren
      });
    }
  };

  handleOnSwipe = (swipeDirection, metaData) => {
    const { onSwipe } = this.props;
    if (onSwipe !== undefined) {
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
          {/* <div style={icon}>{Cross()}</div>
        <div style={{...icon,float:'right'}}>{CheckMark()}</div> */}
        </span>
      </>
    );
  }
}

ReContainer.defaultProps = {
  mass: 0.7,
  damping: 0.8,
  trigger: false,
  max: 3
};


export default ReContainer;
