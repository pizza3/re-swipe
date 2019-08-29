"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _icon = require("../assets/icon");

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

var ReContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(ReContainer, _Component);

  function ReContainer(props) {
    var _this;

    _classCallCheck(this, ReContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReContainer).call(this, props));
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
      arr: [],
      displayChildren: [],
      maxElement: 3,
      cardOnTop: 0
    };
    _this.renderChildren = _this.renderChildren.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.updateChildren = _this.updateChildren.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ReContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.renderChildren();
    }
  }, {
    key: "renderChildren",
    value: function renderChildren() {
      var _this2 = this;

      if (_react.default.Children.toArray(this.props.children).length < 4) {
        var children = this.props.children;
        var arr = [];
        var displayChildren = [];

        _react.default.Children.toArray(children).map(function (child, i) {
          arr.push(_react.default.cloneElement(child, {
            key: i,
            num: i,
            handleDown: _this2.handleDown,
            handleUp: _this2.handleUp,
            updateChildren: _this2.updateChildren
          }));
        });

        displayChildren = arr;
        this.setState({
          arr: arr,
          children: this.props.children,
          displayChildren: displayChildren
        });
      } else {
        var _children = this.props.children.slice(0, this.props.children.length);

        var _arr = [];
        var _displayChildren = [];

        _react.default.Children.toArray(_children).map(function (child, i) {
          _arr.push(_react.default.cloneElement(child, {
            key: i,
            num: i,
            handleDown: _this2.handleDown,
            handleUp: _this2.handleUp,
            updateChildren: _this2.updateChildren
          }));
        });

        _displayChildren = _arr.slice(this.props.children.length - this.state.maxElement, this.props.children.length);
        this.setState({
          arr: _arr,
          children: this.props.children,
          displayChildren: _displayChildren
        });
      }
    }
  }, {
    key: "updateChildren",
    value: function updateChildren() {
      var _this$state = this.state,
          arr = _this$state.arr,
          maxElement = _this$state.maxElement,
          displayChildren = _this$state.displayChildren;
      maxElement += 1;
      displayChildren.pop();

      if (this.props.children.length >= maxElement) {
        displayChildren.unshift(arr[this.props.children.length - maxElement]);
        this.setState({
          displayChildren: displayChildren,
          maxElement: maxElement
        });
      } else {
        this.setState({
          displayChildren: displayChildren,
          maxElement: maxElement
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var style = {
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden"
      };
      var iconContainer = {
        position: 'absolute',
        left: '0px',
        right: '0px',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '350px',
        bottom: '50px'
      };
      var icon = {
        width: 0,
        margin: 0,
        padding: 0,
        height: 0
      };
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
        style: style
      }, _react.default.createElement(_react.default.Fragment, null, this.state.displayChildren)), _react.default.createElement("span", {
        style: iconContainer
      }));
    }
  }]);

  return ReContainer;
}(_react.Component);

var _default = ReContainer;
exports.default = _default;