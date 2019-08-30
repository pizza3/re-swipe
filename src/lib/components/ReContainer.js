import React, { Component } from "react";
import { CheckMark, Cross } from "../assets/icon";
class ReContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allChildren: [],
      displayChildren: [],
      maxElement: this.props.max,
      activeCardIndex: 0
    };
    this.child = React.createRef();
  }

  componentDidMount() {
    this.renderChildren();
  }

  renderChildren = () => {
    const { children } = this.props;
    const allChildren = this.createChildren(children);
    let displayChildren = [];
    let activeCardIndex = allChildren.length-1
    // only adds maxElement children only, default is 3
    displayChildren = allChildren.slice(
      children.length - this.state.maxElement,
      children.length
    );
    displayChildren[displayChildren.length-1] = React.cloneElement(displayChildren[displayChildren.length-1], {ref:this.child}) 
    this.setState({
      allChildren,
      displayChildren,
      activeCardIndex
    });
  };

  // create each card component and pass down the neccessary props
  createChildren = children => {
    return React.Children.toArray(children).map((child, i) => {
      return React.cloneElement(child, {
        key: i,
        num: i,
        mass: this.props.mass,
        damping: this.props.damping,
        updateChildren: this.updateChildren,
        handleOnSwipe: this.handleOnSwipe,
        updateActive: this.updateActive
      });
    });
  };

  updateActive = () => {
    const { activeCardIndex } = this.state    
    this.setState({
      activeCardIndex:activeCardIndex-1
    })
  }

  handleOnSwipe = (swipeDirection, metaData) => {
    const { onSwipe } = this.props;
    if (onSwipe) {
      onSwipe(swipeDirection, metaData);
    }
  };

  updateChildren = () => {
    let { allChildren, maxElement, displayChildren } = this.state;
    maxElement += 1;
    displayChildren.pop();
    if (this.props.children.length >= maxElement) {
      displayChildren.unshift(allChildren[this.props.children.length - maxElement]);
      displayChildren[displayChildren.length-1] = React.cloneElement(displayChildren[displayChildren.length-1], {ref:this.child})       
      this.setState({
        displayChildren,
        maxElement
      });
    } else {
      if(displayChildren.length){
        displayChildren[displayChildren.length-1] = React.cloneElement(displayChildren[displayChildren.length-1], {ref:this.child})       
      }
      this.setState({
        displayChildren,
        maxElement
      });
    }
  }

  handleTrigger = (direction) => {            
    this.child.current.trigger(direction)
  }

  render() {
    const { trigger } = this.props
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
    const defaultIcon = {
      border: 'none',
      background:'transparent'
    };
    return (
      <>
        <div style={style}>
          {this.state.displayChildren}
        </div>
        {trigger?
          <span style={iconContainer}>
            <button style={defaultIcon} onClick={()=>{this.handleTrigger('left')}}>{Cross()}</button>
            <button style={{...defaultIcon,float:'right'}} onClick={()=>{this.handleTrigger('right')}}>{CheckMark()}</button>
          </span>
          :null
        }
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
