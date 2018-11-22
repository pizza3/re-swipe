"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Card = function Card(props) {
  var num = props.num;
  var style = {
    position: 'absolute',
    width: '250px',
    height: '350px',
    backgroundImage: 'linear-gradient(to top, #00c6fb 0%, #005bea 100%)',
    color: '#fff',
    fontFamily: 'sans-serif',
    borderRadius: '18px',
    textAlign: 'center',
    fontWeight: 'bolder',
    fontSize: '48px',
    paddingTop: '17%'
  };
  return _react.default.createElement("div", {
    id: 're-card' + num,
    style: style,
    onMouseDown: function onMouseDown(e) {
      props.handleDown(e, num);
    },
    onMouseUp: function onMouseUp() {
      props.handleUp(num);
    }
  }, "Hello\uD83C\uDF89");
};

var _default = Card;
exports.default = _default;