"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _icon = require("../assets/icon");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ReContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(ReContainer, _Component);

  function ReContainer(props) {
    var _this;

    _classCallCheck(this, ReContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReContainer).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderChildren", function () {
      var children = _this.props.children;
      var maxElement = _this.state.maxElement;

      var allChildren = _this.createChildren(children);

      var displayChildren = [];
      var activeCardIndex = allChildren.length - 1; // only adds maxElement children only, default is 3

      displayChildren = allChildren.slice(children.length - maxElement, children.length);
      displayChildren[displayChildren.length - 1] = _react.default.cloneElement(displayChildren[displayChildren.length - 1], {
        ref: _this.child
      });

      _this.setState({
        allChildren: allChildren,
        displayChildren: displayChildren,
        activeCardIndex: activeCardIndex
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "createChildren", function (children) {
      return _react.default.Children.toArray(children).map(function (child, i) {
        return _react.default.cloneElement(child, {
          key: i,
          num: i,
          mass: _this.props.mass,
          damping: _this.props.damping,
          updateChildren: _this.updateChildren,
          handleOnSwipe: _this.handleOnSwipe,
          updateActive: _this.updateActive
        });
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateActive", function () {
      var activeCardIndex = _this.state.activeCardIndex;

      _this.setState({
        activeCardIndex: activeCardIndex - 1
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOnSwipe", function (swipeDirection, metaData) {
      var onSwipe = _this.props.onSwipe;

      if (onSwipe) {
        onSwipe(swipeDirection, metaData);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateChildren", function () {
      var _this$state = _this.state,
          allChildren = _this$state.allChildren,
          maxElement = _this$state.maxElement,
          displayChildren = _this$state.displayChildren;
      var children = _this.props.children;
      var newMaxElement = maxElement + 1;
      var newDisplayChildren = displayChildren;
      newDisplayChildren.pop(); // remove the card on top

      if (children.length >= newMaxElement) {
        newDisplayChildren.unshift(allChildren[children.length - newMaxElement]); // add card on bottom
      }

      if (newDisplayChildren.length) {
        newDisplayChildren[newDisplayChildren.length - 1] = _react.default.cloneElement(newDisplayChildren[newDisplayChildren.length - 1], {
          ref: _this.child
        });
      }

      _this.setState({
        displayChildren: newDisplayChildren,
        maxElement: newMaxElement
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleTrigger", function (direction) {
      _this.child.current.trigger(direction);
    });

    _this.state = {
      allChildren: [],
      displayChildren: [],
      maxElement: _this.props.max,
      activeCardIndex: 0
    };
    _this.child = _react.default.createRef();
    return _this;
  }

  _createClass(ReContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.renderChildren();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var trigger = this.props.trigger;
      var style = {
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden"
      };
      var iconContainer = {
        position: "absolute",
        left: "0px",
        right: "0px",
        marginLeft: "auto",
        marginRight: "auto",
        width: "350px",
        bottom: "50px"
      };
      var defaultIcon = {
        border: "none",
        background: "transparent"
      };
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
        style: style
      }, this.state.displayChildren), trigger ? _react.default.createElement("span", {
        style: iconContainer
      }, _react.default.createElement("button", {
        style: defaultIcon,
        onClick: function onClick() {
          _this2.handleTrigger("left");
        }
      }, (0, _icon.Cross)()), _react.default.createElement("button", {
        style: _objectSpread({}, defaultIcon, {
          float: "right"
        }),
        onClick: function onClick() {
          _this2.handleTrigger("right");
        }
      }, (0, _icon.CheckMark)())) : null);
    }
  }]);

  return ReContainer;
}(_react.Component);

ReContainer.defaultProps = {
  mass: 0.7,
  damping: 0.8,
  trigger: false,
  max: 3,
  onSwipe: undefined
};
var _default = ReContainer;
exports.default = _default;