import React, { Component } from "react";

const map_range = (value, low1, high1, low2, high2) => {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
};

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

class ReCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false, // checks if the card is on top, if set true raf loop will be executed
      triggerDown: true, // will be used to disable the onMouseDown
      move: false,
      limit: false,
      out: false,
      mouseStartPosX: null,
      mouseStartPosY: null,
      mouseCurrPosX: null,
      mouseCurrPosY: null,
      Posx: null,
      Posy: null,
      k: 0.2,
      restX: 0,
      restY: 0,
      mass: this.props.mass,
      damping: this.props.damping
    };
    // setting initial force, acceleration & velocity
    this.f = { x: 0, y: 0 };
    this.a = { x: 0, y: 0 };
    this.v = { x: 0, y: 0 };
    this.Ref = React.createRef();
  }
  componentDidMount(){
    const { updateChildren, handleOnSwipe, updateActive } = this.props
    if(!(updateChildren || handleOnSwipe || updateActive)){
      console.error('Enclose <ReCard/> component inside a <ReContainer/> component!!')
    }
  }
  handleDown = e => {
    e.stopPropagation();
    e.preventDefault();
    e.persist();
    const { active, triggerDown } = this.state;
    if (triggerDown) {
      if (!active) {
        this.animate();
      }
      this.setState({
        move: true,
        active: true,
        mouseStartPosX: e.touches ? e.touches[0].clientX : e.clientX,
        mouseStartPosY: e.touches ? e.touches[0].clientY : e.clientY
      });
    }
  };
  handleMove = e => {
    e.stopPropagation();
    e.preventDefault();
    e.persist();
    const {
      limit,
      move,
      mouseStartPosX,
      mouseStartPosY,
      Posx,
      Posy
    } = this.state;
    const { left, right } = this.Ref.current.getBoundingClientRect();
    const { parentElement } = this.Ref.current;
    if (!limit) {
      if (move) {
        const width = parentElement.offsetWidth;
        const magY = 2
        // assign current mouse/touch position
        let mouseCurrPosX = e.touches ? e.touches[0].clientX : e.clientX;
        let mouseCurrPosY = e.touches ? e.touches[0].clientY : e.clientY;
        // distance between startPosition and newPosition
        let Posx = mouseCurrPosX - mouseStartPosX;
        let Posy = mouseCurrPosY - mouseStartPosY;
        let mouseRange = mouseCurrPosX;
        if (mouseRange < width / 2) {
          mouseRange = width - mouseRange;
        }
        let damping = map_range(
          mouseRange,
          width / 2,
          (width * 90) / 100,
          0.6,
          0.8
        );
        this.setState({
          Posx,
          Posy,
          damping,
          mouseCurrPosX,
          mouseCurrPosY
        });
        const isFarRight =
          mouseCurrPosX > (width * 80) / 100 || left > (width * 80) / 100;
        const isFarLeft =
          mouseCurrPosX < (width * 20) / 100 || right < (width * 20) / 100;
        let restX, restY;
        restY = this.state.Posy * magY;
        // checks if mouse pointer reached far right of the container
        if (isFarRight) {
          // this implementation for rest position x is still a hacky logic, not solid enough!
          restX = parentElement.offsetWidth / 2 + this.props.height;
          let limit = true;
          let move = false;
          let damping = 0.15;
          this.setState({
            restX,
            restY,
            limit,
            move,
            damping,
            triggerDown: false
          });
        }
        // checks if mouse pointer reached far left of the container
        else if (isFarLeft) {
          restX = -parentElement.offsetWidth / 2 - this.props.height;
          let limit = true;
          let move = false;
          let damping = 0.15;
          this.setState({
            restX,
            restY,
            limit,
            move,
            damping,
            triggerDown: false
          });
        }
      }
    }
  };
  handleUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      move: false
    });
  };
  trigger = direction => {
    const { active,triggerDown } = this.state;
    const { parentElement } = this.Ref.current;
    if (!active) this.animate();
    if(triggerDown){
      const restX =
      direction === "right"
        ? parentElement.offsetWidth * 5
        : -parentElement.offsetWidth * 5;
      const restY = getRandomInt(parentElement.offsetHeight);
      const limit = true;
      const move = false;
      const damping = 0.02;
      this.setState({
        move: true,
        active: true,
        mouseStartPosX: parentElement.offsetWidth / 2,
        mouseStartPosY: parentElement.offsetHeight / 2,
        restX,
        restY,
        limit,
        move,
        damping,
        triggerDown: false
      });
    }
  };
  updateCard = () => {
    const { k, Posx, Posy, restX, restY, mass, damping, move } = this.state;
    if (!move) {
      // calculate the total force using spring constant f=-kx
      this.f.x = -k * (Posx - restX);
      this.f.y = -k * (Posy - restY);
      // use force to determine the acceleration
      this.a.x = this.f.x / mass;
      this.a.y = this.f.y / mass;
      // apply velocity
      this.v.x = damping * (this.v.x + this.a.x);
      this.v.y = damping * (this.v.y + this.a.y);
      // update position
      this.setState({
        Posx: Posx + this.v.x,
        Posy: Posy + this.v.y
      });
    }
  };
  animate = () => {
    const { left, right } = this.Ref.current.getBoundingClientRect();
    const { offsetWidth } = this.Ref.current.parentElement;
    const {
      handleOnSwipe,
      updateActive,
      updateChildren,
      metaData
    } = this.props;
    const { active } = this.state;
    const isRight = left > offsetWidth;
    const isLeft = right < 0;
    const swipeDirection = isLeft ? "left" : "right";    
    // stop the raf loop and unmount the card from the container
    if (isLeft || isRight) {
      cancelAnimationFrame(this._frameId);
      handleOnSwipe(swipeDirection, metaData || {});
      updateActive();
      updateChildren();
    } else {
      this._frameId = requestAnimationFrame(this.animate);
      if (active) {      
        this.updateCard();
      }
    }
  };
  render() {    
    const { children, width, height, num } = this.props;
    const { move, Posx, Posy } = this.state;
    const style = {
      position: "absolute",
      left: "0px",
      right: "0",
      top: "0px",
      bottom: "0",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "auto",
      marginBottom: "auto",
      boxSizing: "border-box",
      width: width + "px",
      height: height + "px",
      borderRadius: "18px",
      userSelect: "none",
      touchAction: "none",
      transform:
        "translate(" +
        Posx +
        "px" +
        "," +
        Posy +
        "px) rotate(" +
        Posx / 9 +
        "deg) perspective(800px)"
    };

    const shadow = {
      position: "absolute",
      width: width + "px",
      height: height + "px",
      borderRadius: "18px",
      background: "#eeeeee",
      boxShadow: move
        ? `0px 0px 31px -11px rgba(0,0,0,0.65)`
        : `0px 0px 31px -9px rgba(0,0,0,0.0)`,
      transform: move ? `scale(1.1)` : `scale(1)`,
      transition: " 0.4s cubic-bezier(0.19, 1, 0.22, 1)"
    };
    return (
      <div
        style={style}
        ref={this.Ref}
        onMouseDown={this.handleDown}
        onMouseMove={this.handleMove}
        onMouseUp={this.handleUp}
        onMouseLeave={this.handleUp}
        onTouchStart={this.handleDown}
        onTouchMove={this.handleMove}
        onTouchEnd={this.handleUp}
        data-num={num}
      >
        <div style={shadow}>{children}</div>
      </div>
    );
  }
}
ReCard.defaultProps = {
  width: 300,
  height: 400,
  metaData: {}
};

export default ReCard;
