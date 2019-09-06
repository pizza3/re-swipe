"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var map_range = function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
};

var getRandomInt = function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var ReCard =
/*#__PURE__*/
function (_Component) {
  _inherits(ReCard, _Component);

  function ReCard(props) {
    var _this;

    _classCallCheck(this, ReCard);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReCard).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDown", function (e) {
      e.stopPropagation();
      e.preventDefault();
      e.persist();
      console.log(e.clientX);
      var _this$state = _this.state,
          active = _this$state.active,
          triggerDown = _this$state.triggerDown;

      if (triggerDown) {
        if (!active) {
          _this.animate();
        }

        _this.setState({
          move: true,
          active: true,
          mouseStartPosX: e.touches ? e.touches[0].screenX : e.clientX,
          mouseStartPosY: e.touches ? e.touches[0].screenY : e.clientY
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMove", function (e) {
      e.preventDefault();
      e.persist();
      var _this$state2 = _this.state,
          limit = _this$state2.limit,
          move = _this$state2.move,
          mouseStartPosX = _this$state2.mouseStartPosX,
          mouseStartPosY = _this$state2.mouseStartPosY,
          Posx = _this$state2.Posx,
          Posy = _this$state2.Posy;

      var _this$Ref$current$get = _this.Ref.current.getBoundingClientRect(),
          left = _this$Ref$current$get.left,
          right = _this$Ref$current$get.right;

      var parentElement = _this.Ref.current.parentElement;

      if (!limit) {
        if (move) {
          // assign current mouse position
          var mouseCurrPosX = e.touches ? e.touches[0].screenX : e.clientX;
          var mouseCurrPosY = e.touches ? e.touches[0].screenY : e.clientY; // distance between startPosition and newPosition

          var _Posx = mouseCurrPosX - mouseStartPosX;

          var _Posy = mouseCurrPosY - mouseStartPosY;

          var width = parentElement.offsetWidth;
          var mouseRange = mouseCurrPosX;

          if (mouseRange < width / 2) {
            mouseRange = width - mouseRange;
          }

          var damping = map_range(mouseRange, width / 2, width * 90 / 100, 0.6, 0.8);

          _this.setState({
            Posx: _Posx,
            Posy: _Posy,
            damping: damping,
            mouseCurrPosX: mouseCurrPosX,
            mouseCurrPosY: mouseCurrPosY
          });

          var isFarRight = mouseCurrPosX > width * 80 / 100 || left > width * 80 / 100;
          var isFarLeft = mouseCurrPosX < width * 20 / 100 || right < width * 20 / 100;
          var restX, restY; // checks if mouse pointer reached far right of the container

          if (isFarRight) {
            // this implementation for rest position x is still a hacky logic, not solid enough!
            restX = parentElement.offsetWidth / 2 + _this.props.height;
            restY = _this.state.Posy * 5;
            var _limit = true;
            var _move = false;
            var _damping = 0.15;

            _this.setState({
              restX: restX,
              restY: restY,
              limit: _limit,
              move: _move,
              damping: _damping,
              triggerDown: false
            });
          } // checks if mouse pointer reached far left of the container
          else if (isFarLeft) {
              restX = -parentElement.offsetWidth / 2 - _this.props.height;
              restY = _this.state.Posy * 5;
              var _limit2 = true;
              var _move2 = false;
              var _damping2 = 0.15;

              _this.setState({
                restX: restX,
                restY: restY,
                limit: _limit2,
                move: _move2,
                damping: _damping2,
                triggerDown: false
              });
            }
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleUp", function () {
      _this.setState({
        move: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "trigger", function (direction) {
      var _this$setState;

      var active = _this.state.active;
      var parentElement = _this.Ref.current.parentElement;
      if (!active) _this.animate();
      var restX = direction === "right" ? parentElement.offsetWidth * 5 : -parentElement.offsetWidth * 5;
      var restY = getRandomInt(parentElement.offsetHeight);
      var limit = true;
      var move = false;
      var damping = 0.02;

      _this.setState((_this$setState = {
        move: true,
        active: true,
        mouseStartPosX: parentElement.offsetWidth / 2,
        mouseStartPosY: parentElement.offsetHeight / 2,
        restX: restX,
        restY: restY,
        limit: limit
      }, _defineProperty(_this$setState, "move", move), _defineProperty(_this$setState, "damping", damping), _this$setState));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateCard", function () {
      var _this$state3 = _this.state,
          k = _this$state3.k,
          Posx = _this$state3.Posx,
          Posy = _this$state3.Posy,
          restX = _this$state3.restX,
          restY = _this$state3.restY,
          mass = _this$state3.mass,
          damping = _this$state3.damping,
          move = _this$state3.move;

      if (!move) {
        // calculate the total force using spring constant f=-kx
        _this.f.x = -k * (Posx - restX);
        _this.f.y = -k * (Posy - restY); // use force to determine the acceleration

        _this.a.x = _this.f.x / mass;
        _this.a.y = _this.f.y / mass; // apply velocity

        _this.v.x = damping * (_this.v.x + _this.a.x);
        _this.v.y = damping * (_this.v.y + _this.a.y); // update position

        _this.setState({
          Posx: Posx + _this.v.x,
          Posy: Posy + _this.v.y
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "animate", function () {
      var _this$Ref$current$get2 = _this.Ref.current.getBoundingClientRect(),
          left = _this$Ref$current$get2.left,
          right = _this$Ref$current$get2.right;

      var offsetWidth = _this.Ref.current.parentElement.offsetWidth;
      var _this$props = _this.props,
          handleOnSwipe = _this$props.handleOnSwipe,
          updateActive = _this$props.updateActive,
          updateChildren = _this$props.updateChildren,
          metaData = _this$props.metaData;
      var active = _this.state.active;
      var isRight = left > offsetWidth;
      var isLeft = right < 0;
      var swipeDirection = isLeft ? "left" : "right"; // stop the raf loop and unmount the card from the container

      if (isLeft || isRight) {
        cancelAnimationFrame(_this._frameId);
        handleOnSwipe(swipeDirection, metaData || {});
        updateActive();
        updateChildren();
      } else {
        _this._frameId = requestAnimationFrame(_this.animate);
      }

      if (active) {
        _this.updateCard();
      }
    });

    _this.state = {
      active: false,
      // checks if the card is on top, if set true raf loop will be executed
      triggerDown: true,
      // will be used to disable the onMouseDown
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
      mass: _this.props.mass,
      damping: _this.props.damping
    }; // setting initial force, acceleration & velocity

    _this.f = {
      x: 0,
      y: 0
    };
    _this.a = {
      x: 0,
      y: 0
    };
    _this.v = {
      x: 0,
      y: 0
    };
    _this.Ref = _react.default.createRef();
    return _this;
  }

  _createClass(ReCard, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          width = _this$props2.width,
          height = _this$props2.height,
          num = _this$props2.num;
      var _this$state4 = this.state,
          move = _this$state4.move,
          Posx = _this$state4.Posx,
          Posy = _this$state4.Posy;
      var style = {
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
        transform: "translate(" + Posx + "px" + "," + Posy + "px) rotate(" + Posx / 9 + "deg) perspective(800px)"
      };
      var shadow = {
        position: "absolute",
        width: width + "px",
        height: height + "px",
        borderRadius: "18px",
        background: "#eeeeee",
        boxShadow: move ? "0px 0px 31px -11px rgba(0,0,0,0.65)" : "0px 0px 31px -9px rgba(0,0,0,0.0)",
        transform: move ? "scale(1.1)" : "scale(1)",
        transition: " 0.4s cubic-bezier(0.19, 1, 0.22, 1)"
      };
      return _react.default.createElement("div", {
        style: style,
        ref: this.Ref,
        onMouseDown: this.handleDown,
        onMouseMove: this.handleMove,
        onMouseUp: this.handleUp,
        onMouseLeave: this.handleUp,
        onTouchStart: this.handleDown,
        onTouchMove: this.handleMove,
        onTouchEnd: this.handleUp,
        "data-num": num
      }, _react.default.createElement("div", {
        style: shadow
      }, children));
    }
  }]);

  return ReCard;
}(_react.Component);

ReCard.defaultProps = {
  width: 300,
  height: 400,
  metaData: {}
};
var _default = ReCard;
exports.default = _default;