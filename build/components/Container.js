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

var Container =
/*#__PURE__*/
function (_Component) {
  _inherits(Container, _Component);

  function Container(props) {
    var _this;

    _classCallCheck(this, Container);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Container).call(this, props));
    _this.state = {
      move: false,
      current: 0,
      clickPos: {
        x: 0,
        y: 0
      },
      pos: {
        x: 0,
        y: 0
      },
      k: 0.2,
      mass: 0.7,
      damping: 0.8,
      arr: []
    };
    _this.handleDown = _this.handleDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleUp = _this.handleUp.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleMove = _this.handleMove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.animate = _this.animate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.updateCard = _this.updateCard.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderChildren = _this.renderChildren.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Container, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log('mounted');
      this.force = {
        x: 0,
        y: 0
      };
      this.acc = {
        x: 0,
        y: 0
      };
      this.vel = {
        x: 0,
        y: 0
      };
      this.elemenTrack = [];
      this.renderChildren(); // window.addEventListener('mousemove',(e)=>{this.handleMove(e)})
      // this.animate();
    }
  }, {
    key: "handleDown",
    value: function handleDown(e, val) {
      e.preventDefault();
      console.log(val + 'card');
      this.setState({
        move: true,
        current: val,
        clickPos: {
          x: e.clientX,
          y: e.clientY
        }
      });
    }
  }, {
    key: "handleUp",
    value: function handleUp(e) {
      e.preventDefault();
      this.setState({
        move: false
      });
    }
  }, {
    key: "handleMove",
    value: function handleMove(e) {
      e.preventDefault();
      var clickPos = this.state.clickPos;

      if (this.state.move) {
        this.setState({
          pos: {
            x: e.clientX - clickPos.x,
            y: e.clientY - clickPos.y
          }
        });
      }
    }
  }, {
    key: "updateCard",
    value: function updateCard() {
      var _this$state = this.state,
          pos = _this$state.pos,
          current = _this$state.current,
          mass = _this$state.mass,
          k = _this$state.k,
          damping = _this$state.damping;
      this.force = {
        x: -k * (pos.x - 0.5),
        y: -k * (pos.y - 0.5)
      };
      this.acc = {
        x: this.force.x / mass,
        y: this.force.y / mass
      };
      this.vel = {
        x: damping * (this.vel.x + this.acc.x),
        y: damping * (this.vel.y + this.acc.y)
      };
      this.setState({
        pos: {
          x: this.vel.x + this.state.pos.x,
          y: this.vel.y + this.state.pos.y
        }
      }, function () {
        document.getElementById("re-card".concat(current)).style.transform = "translate(".concat(pos.x, "px ,").concat(pos.y, "px )");
      });
    }
  }, {
    key: "animate",
    value: function animate() {
      var _this$state2 = this.state,
          pos = _this$state2.pos,
          current = _this$state2.current;
      requestAnimationFrame(this.animate);

      if (!this.state.move) {
        this.updateCard();
      } else {
        document.getElementById("re-card".concat(current)).style.transform = "translate(".concat(pos.x, "px ,").concat(pos.y, "px )");
      }
    }
  }, {
    key: "renderChildren",
    value: function renderChildren() {
      var _this2 = this;

      var children = this.props.children;
      var arr = [];

      _react.default.Children.toArray(children).map(function (child, i) {
        arr.push(_react.default.cloneElement(child, {
          key: i,
          num: i,
          handleDown: _this2.handleDown,
          handleUp: _this2.handleUp
        }));
      }); // console.log(arr);


      this.setState({
        arr: arr
      });
    }
  }, {
    key: "render",
    value: function render() {
      var style = {
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      };
      return _react.default.createElement("div", {
        style: style
      }, this.state.arr);
    }
  }]);

  return Container;
}(_react.Component);

var _default = Container;
exports.default = _default;