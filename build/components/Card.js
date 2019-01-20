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

var Card =
/*#__PURE__*/
function (_Component) {
  _inherits(Card, _Component);

  function Card(props) {
    var _this;

    _classCallCheck(this, Card);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Card).call(this, props));
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
    _this.handleTouchStart = _this.handleTouchStart.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleTouchMove = _this.handleTouchMove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
    return _this;
  }

  _createClass(Card, [{
    key: "handleDown",
    value: function handleDown(e) {
      if (!this.state.active) {
        this.animate();
      }

      e.stopPropagation();
      e.preventDefault();
      this.setState({
        move: true,
        active: true,
        mouseStartPosX: e.clientX,
        mouseStartPosY: e.clientY
      });
    }
  }, {
    key: "handleTouchStart",
    value: function handleTouchStart(e) {
      if (!this.state.active) {
        this.animate();
      }

      e.stopPropagation();
      e.preventDefault();
      e.persist();
      this.setState({
        move: true,
        active: true,
        mouseStartPosX: e.touches[0].screenX,
        mouseStartPosY: e.touches[0].screenY
      });
    }
  }, {
    key: "handleMove",
    value: function handleMove(e) {
      var _this2 = this;

      e.preventDefault();

      if (!this.state.limit) {
        if (this.state.move) {
          var mouseCurrPosX = e.clientX;
          var mouseCurrPosY = e.clientY;
          var Posx = mouseCurrPosX - this.state.mouseStartPosX;
          var Posy = mouseCurrPosY - this.state.mouseStartPosY;
          var height = window.innerHeight;
          var width = window.innerWidth;

          var map_range = function map_range(value, low1, high1, low2, high2) {
            return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
          };

          var mouseRange = mouseCurrPosX;

          if (mouseRange < width / 2) {
            mouseRange = width - mouseRange;
          }

          var damping = map_range(mouseRange, width / 2, width - width * 10 / 100, 0.6, 0.8);
          this.setState({
            Posx: Posx,
            Posy: Posy,
            damping: damping,
            mouseCurrPosX: mouseCurrPosX,
            mouseCurrPosY: mouseCurrPosY
          });

          if (mouseCurrPosX > width - width * 20 / 100) {
            var restX, restY;

            if (mouseCurrPosX > width / 2) {
              restX = this.state.Posx * 5;
            } else {
              restX = -this.state.Posx * 5;
            }

            if (mouseCurrPosY > height / 2) {
              restY = this.state.Posy * 5;
            } else {
              restY = this.state.Posy * 5;
            }

            var limit = true;
            var move = false;
            var _damping = 0.06;
            this.setState({
              restX: restX,
              restY: restY,
              limit: limit,
              move: move,
              damping: _damping
            }, function () {
              setTimeout(function () {
                window.cancelAnimationFrame(_this2.animate);
              }, 10);
            });
          } else if (mouseCurrPosX < width * 20 / 100) {
            var _restX, _restY;

            if (mouseCurrPosX > width / 2) {
              _restX = -this.state.Posx * 5;
            } else {
              _restX = this.state.Posx * 5;
            }

            if (mouseCurrPosY > height / 2) {
              _restY = this.state.Posy * 5;
            } else {
              _restY = this.state.Posy * 5;
            }

            var _limit = true;
            var _move = false;
            var _damping2 = 0.08;
            this.setState({
              restX: _restX,
              restY: _restY,
              limit: _limit,
              move: _move,
              damping: _damping2
            });
          }
        }
      }
    }
  }, {
    key: "handleTouchMove",
    value: function handleTouchMove(e) {
      var _this3 = this;

      e.persist();

      if (!this.state.limit) {
        if (this.state.move) {
          var mouseCurrPosX = e.touches[0].screenX;
          var mouseCurrPosY = e.touches[0].screenY;
          var Posx = mouseCurrPosX - this.state.mouseStartPosX;
          var Posy = mouseCurrPosY - this.state.mouseStartPosY;
          var el = document.getElementById("card" + this.props.no);
          var height = window.innerHeight;
          var width = window.innerWidth;
          var maxX = width - width * 20 / 100;

          var map_range = function map_range(value, low1, high1, low2, high2) {
            return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
          };

          var mouseRange = mouseCurrPosX;

          if (mouseRange < width / 2) {
            mouseRange = width - mouseRange;
          }

          var damping = map_range(mouseRange, width / 2, width - width * 10 / 100, 0.6, 0.8);
          this.setState({
            Posx: Posx,
            Posy: Posy,
            damping: damping,
            mouseCurrPosX: mouseCurrPosX,
            mouseCurrPosY: mouseCurrPosY
          });

          if (mouseCurrPosX > width - width * 10 / 100) {
            var restX, restY;

            if (mouseCurrPosX > width / 2) {
              restX = this.state.Posx * 5;
            } else {
              restX = -this.state.Posx * 5;
            }

            if (mouseCurrPosY > height / 2) {
              restY = this.state.Posy * 5;
            } else {
              restY = this.state.Posy * 5;
            }

            var limit = true;
            var move = false;
            var _damping3 = 0.08;
            this.setState({
              restX: restX,
              restY: restY,
              limit: limit,
              move: move,
              damping: _damping3
            }, function () {
              setTimeout(function () {
                window.cancelAnimationFrame(_this3.animate);
              }, 10);
            });
          } else if (mouseCurrPosX < width * 10 / 100) {
            var _restX2, _restY2;

            if (mouseCurrPosX > width / 2) {
              _restX2 = -this.state.Posx * 5;
            } else {
              _restX2 = this.state.Posx * 5;
            }

            if (mouseCurrPosY > height / 2) {
              _restY2 = this.state.Posy * 5;
            } else {
              _restY2 = this.state.Posy * 5;
            }

            var _limit2 = true;
            var _move2 = false;
            var _damping4 = 0.08;
            this.setState({
              restX: _restX2,
              restY: _restY2,
              limit: _limit2,
              move: _move2,
              damping: _damping4
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
      if (!this.state.move) {
        this.f.x = -this.state.k * (this.state.Posx - this.state.restX);
        this.f.y = -this.state.k * (this.state.Posy - this.state.restY);
        this.a.x = this.f.x / this.state.mass;
        this.a.y = this.f.y / this.state.mass;
        this.v.x = this.state.damping * (this.v.x + this.a.x);
        this.v.y = this.state.damping * (this.v.y + this.a.y);
        this.setState({
          Posx: this.state.Posx + this.v.x,
          Posy: this.state.Posy + this.v.y
        });
      }
    }
  }, {
    key: "animate",
    value: function animate() {
      var el = document.getElementById("re-card" + this.props.num);

      if (this.state.Posx > window.innerWidth + 400 || this.state.Posx < -window.innerWidth - 400) {
        cancelAnimationFrame(this.animate);
        this.props.updateChildren();
      } else {
        requestAnimationFrame(this.animate);
      }

      if (this.state.active) {
        this.updateCard();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          num = _this$props.num,
          children = _this$props.children,
          width = _this$props.width,
          height = _this$props.height;
      var style = {
        position: 'absolute',
        left: '0px',
        right: '0',
        top: '0px',
        bottom: '0',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        boxSizing: 'border-box',
        width: width,
        height: height,
        transform: "translate(" + this.state.Posx + "px" + "," + this.state.Posy + "px) rotate(" + this.state.Posx / 9 + "deg) perspective(800px)"
      };
      return _react.default.createElement("div", {
        id: 're-card' + num,
        style: style,
        onMouseDown: this.handleDown,
        onMouseMove: this.handleMove,
        onMouseUp: this.handleUp,
        onMouseLeave: this.handleUp,
        onTouchStart: this.handleTouchStart,
        onTouchMove: this.handleTouchMove,
        onTouchEnd: this.handleUp
      }, children);
    }
  }]);

  return Card;
}(_react.Component);

var _default = Card;
exports.default = _default;