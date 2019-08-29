"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cross = exports.CheckMark = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckMark = function CheckMark(fill) {
  var style = {
    width: '70px',
    float: 'right'
  };
  return _react.default.createElement("svg", {
    style: style,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, _react.default.createElement("path", {
    fill: fill || "rgb(90, 255, 49)",
    d: "M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm106.5 150.5L228.8 332.8h-.1c-1.7 1.7-6.3 5.5-11.6 5.5-3.8 0-8.1-2.1-11.7-5.7l-56-56c-1.6-1.6-1.6-4.1 0-5.7l17.8-17.8c.8-.8 1.8-1.2 2.8-1.2 1 0 2 .4 2.8 1.2l44.4 44.4 122-122.9c.8-.8 1.8-1.2 2.8-1.2 1.1 0 2.1.4 2.8 1.2l17.5 18.1c1.8 1.7 1.8 4.2.2 5.8z"
  }));
};

exports.CheckMark = CheckMark;

var Cross = function Cross(fill) {
  var style = {
    width: '70px'
  };
  return _react.default.createElement("svg", {
    style: style,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, _react.default.createElement("path", {
    fill: fill || "#FB325A",
    d: "M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm52.7 283.3L256 278.6l-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3l52.7-52.7-52.7-52.7c-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3 6.2-6.2 16.4-6.2 22.6 0l52.7 52.7 52.7-52.7c6.2-6.2 16.4-6.2 22.6 0 6.2 6.2 6.2 16.4 0 22.6L278.6 256l52.7 52.7c6.2 6.2 6.2 16.4 0 22.6-6.2 6.3-16.4 6.3-22.6 0z"
  }));
};

exports.Cross = Cross;