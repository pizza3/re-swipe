import React, { Component } from "react";

const map_range = (value, low1, high1, low2, high2) => {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
};

class ReCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      triggerDown: true,
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
      mass: 0.7,
      damping: 0.8
    };
    this.f = { x: 0, y: 0 };
    this.a = { x: 0, y: 0 };
    this.v = { x: 0, y: 0 };
    this.Ref = React.createRef();
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
        mouseStartPosX: e.touches ? e.touches[0].screenX : e.clientX,
        mouseStartPosY: e.touches ? e.touches[0].screenY : e.clientY
      });
    }
  };
  handleMove = e => {
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
        // assign current mouse position
        let mouseCurrPosX = e.touches ? e.touches[0].screenX : e.clientX;
        let mouseCurrPosY = e.touches ? e.touches[0].screenY : e.clientY;
        // distance between startPosition and newPosition
        let Posx = mouseCurrPosX - mouseStartPosX;
        let Posy = mouseCurrPosY - mouseStartPosY;
        let width = parentElement.offsetWidth;
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

        // checks if mouse pointer reached far right of the container
        if (mouseCurrPosX > (width * 80) / 100 || left > (width * 80) / 100) {
          let restX, restY;
          // this implementation for rest position x is still a hacky logic, not solid enough!
          restX = parentElement.offsetWidth / 2 + this.props.height;
          restY = this.state.Posy * 5;
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
        else if (
          mouseCurrPosX < (width * 20) / 100 ||
          right < (width * 20) / 100
        ) {
          let restX, restY;
          restX = -parentElement.offsetWidth / 2 - this.props.height;
          restY = this.state.Posy * 5;
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

  handleUp = () => {
    this.setState({
      move: false
    });
  };

  moveRight = () => {
    let restX, restY;
    const { parentElement } = this.Ref.current;
    this.setState({
      move: true,
      active: true,
      mouseStartPosX: parentElement.offsetWidth / 2,
      mouseStartPosY: parentElement.offsetHeight / 2
    });
    restX = parentElement.offsetWidth * 5;
    restY = parentElement.offsetHeight / 2;
    let limit = true;
    let move = false;
    let damping = 0.02;
    this.setState({
      restX,
      restY,
      limit,
      move,
      damping
    });
  };

  moveLeft = () => {
    let restX, restY;
    const { parentElement } = this.Ref.current.parentElement;
    this.setState({
      move: true,
      active: true,
      mouseStartPosX: parentElement.offsetWidth / 2,
      mouseStartPosY: parentElement.offsetHeight / 2
    });
    restX = -parentElement.offsetWidth * 5;
    restY = parentElement.offsetHeight / 2;
    let limit = true;
    let move = false;
    let damping = 0.02;
    this.setState({
      restX,
      restY,
      limit,
      move,
      damping
    });
  };

  updateCard = () => {
    const { k, Posx, Posy, restX, restY, mass, damping } = this.state;
    if (!this.state.move) {
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
    // stop the raf loop and unmount the card from the container
    const { offsetWidth } = this.Ref.current.parentElement;
    const isRight = left > offsetWidth;
    const isLeft = right < 0;
    const swipeDirection = isLeft ? "left" : "right";
    if (isLeft || isRight) {
      cancelAnimationFrame(this._frameId);
      this.props.handleOnSwipe(swipeDirection, this.props.metaData || {});
      this.props.updateChildren();
    } else {
      this._frameId = requestAnimationFrame(this.animate);
    }
    if (this.state.active) {
      this.updateCard();
    }
  };

  render() {
    const { children, width, height } = this.props;
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
      border: children.length ? "1px solid #cecece" : "none",
      boxShadow: move
        ? `0px 0px 31px -15px rgba(0,0,0,0.75)`
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
