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

var pythagorean = function pythagorean(sideA, sideB) {
  return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
};

var ReCard =
/*#__PURE__*/
function (_Component) {
  _inherits(ReCard, _Component);

  function ReCard(props) {
    var _this;

    _classCallCheck(this, ReCard);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReCard).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "moveRight", function () {
      var restX, restY;

      _this.setState({
        move: true,
        active: true,
        mouseStartPosX: window.innerWidth / 2,
        mouseStartPosY: window.innerHeight / 2
      });

      restX = window.innerWidth * 5;
      restY = window.innerHeight / 2;
      var limit = true;
      var move = false;
      var damping = 0.02;

      _this.setState({
        restX: restX,
        restY: restY,
        limit: limit,
        move: move,
        damping: damping
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "moveLeft", function () {
      var restX, restY;

      _this.setState({
        move: true,
        active: true,
        mouseStartPosX: window.innerWidth / 2,
        mouseStartPosY: window.innerHeight / 2
      });

      restX = -window.innerWidth * 5;
      restY = window.innerHeight / 2;
      var limit = true;
      var move = false;
      var damping = 0.02;

      _this.setState({
        restX: restX,
        restY: restY,
        limit: limit,
        move: move,
        damping: damping
      });
    });

    _this.state = {
      active: false,
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
    _this.handleDown = _this.handleDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleUp = _this.handleUp.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleMove = _this.handleMove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.animate = _this.animate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.updateCard = _this.updateCard.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
    key: "handleDown",
    value: function handleDown(e) {
      var active = this.state.active;

      if (!active) {
        this.animate();
      }

      e.stopPropagation();
      e.preventDefault();
      e.persist();
      this.setState({
        move: true,
        active: true,
        mouseStartPosX: e.touches ? e.touches[0].screenX : e.clientX,
        mouseStartPosY: e.touches ? e.touches[0].screenY : e.clientY
      }); // this.moveLeft()
    }
  }, {
    key: "handleMove",
    value: function handleMove(e) {
      var _this2 = this;

      e.preventDefault();
      e.persist();
      var _this$state = this.state,
          limit = _this$state.limit,
          move = _this$state.move,
          mouseStartPosX = _this$state.mouseStartPosX,
          mouseStartPosY = _this$state.mouseStartPosY,
          Posx = _this$state.Posx,
          Posy = _this$state.Posy;

      var _this$Ref$current$get = this.Ref.current.getBoundingClientRect(),
          left = _this$Ref$current$get.left,
          right = _this$Ref$current$get.right;

      if (!limit) {
        if (move) {
          // assign current mouse position
          var mouseCurrPosX = e.touches ? e.touches[0].screenX : e.clientX;
          var mouseCurrPosY = e.touches ? e.touches[0].screenY : e.clientY; // distance between startPosition and newPosition

          var _Posx = mouseCurrPosX - mouseStartPosX;

          var _Posy = mouseCurrPosY - mouseStartPosY;

          var height = window.innerHeight;
          var width = window.innerWidth;
          var mouseRange = mouseCurrPosX;

          if (mouseRange < width / 2) {
            mouseRange = width - mouseRange;
          }

          var damping = map_range(mouseRange, width / 2, width - width * 10 / 100, 0.6, 0.8);
          this.setState({
            Posx: _Posx,
            Posy: _Posy,
            damping: damping,
            mouseCurrPosX: mouseCurrPosX,
            mouseCurrPosY: mouseCurrPosY
          }); // checks if mouse pointer reached far right of the container

          if (mouseCurrPosX > width * 80 / 100 || left > width * 80 / 100) {
            var restX, restY;
            restX = this.state.Posx + pythagorean(this.props.width, this.props.height);
            restY = this.state.Posy * 5;
            var _limit = true;
            var _move = false;
            var _damping = 0.1;
            this.setState({
              restX: restX,
              restY: restY,
              limit: _limit,
              move: _move,
              damping: _damping
            }, function () {
              setTimeout(function () {
                window.cancelAnimationFrame(_this2.animate);
              }, 10);
            });
          } // checks if mouse pointer reached far left of the container
          else if (mouseCurrPosX < width * 20 / 100 || right < width * 20 / 100) {
              var _restX, _restY;

              _restX = this.state.Posx - pythagorean(this.props.width, this.props.height);
              _restY = this.state.Posy * 5;
              var _limit2 = true;
              var _move2 = false;
              var _damping2 = 0.1;
              this.setState({
                restX: _restX,
                restY: _restY,
                limit: _limit2,
                move: _move2,
                damping: _damping2
              });
            }
        }
      }
    }
  }, {
    key: "handleUp",
    value: function handleUp() {
      this.setState({
        move: false
      });
    }
  }, {
    key: "updateCard",
    value: function updateCard() {
      var _this$state2 = this.state,
          k = _this$state2.k,
          Posx = _this$state2.Posx,
          Posy = _this$state2.Posy,
          restX = _this$state2.restX,
          restY = _this$state2.restY,
          mass = _this$state2.mass,
          damping = _this$state2.damping;

      if (!this.state.move) {
        // calculate the total force using spring constant f=-kx
        this.f.x = -k * (Posx - restX);
        this.f.y = -k * (Posy - restY); // use force to determine the acceleration

        this.a.x = this.f.x / mass;
        this.a.y = this.f.y / mass; // apply velocity

        this.v.x = damping * (this.v.x + this.a.x);
        this.v.y = damping * (this.v.y + this.a.y); // update position

        this.setState({
          Posx: Posx + this.v.x,
          Posy: Posy + this.v.y
        });
      }
    }
  }, {
    key: "animate",
    value: function animate() {
      var _this$Ref$current$get2 = this.Ref.current.getBoundingClientRect(),
          left = _this$Ref$current$get2.left,
          right = _this$Ref$current$get2.right; // stop the raf loop and unmount the card from the container


      var isRight = left > window.innerWidth;
      var isLeft = right < 0;
      var swipeDirection = isLeft ? 'left' : 'right';

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
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          width = _this$props.width,
          height = _this$props.height;
      var _this$state3 = this.state,
          move = _this$state3.move,
          Posx = _this$state3.Posx,
          Posy = _this$state3.Posy;
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
        boxShadow: move ? "0px 0px 31px -15px rgba(0,0,0,0.75)" : "0px 0px 31px -9px rgba(0,0,0,0.0)",
        transform: move ? "scale(1.1)" : "scale(1)",
        transition: " 1s cubic-bezier(0.19, 1, 0.22, 1)"
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
        onTouchEnd: this.handleUp
      }, _react.default.createElement("div", {
        style: shadow
      }, children));
    }
  }]);

  return ReCard;
}(_react.Component);

var _default = ReCard;
exports.default = _default;