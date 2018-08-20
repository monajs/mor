'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _col = require('../col');

var _col2 = _interopRequireDefault(_col);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Row = function (_Component) {
	_inherits(Row, _Component);

	function Row() {
		_classCallCheck(this, Row);

		return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));
	}

	_createClass(Row, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    align = _props.align,
			    gutter = _props.gutter,
			    justify = _props.justify,
			    direction = _props.direction,
			    children = _props.children,
			    style = _props.style,
			    className = _props.className,
			    props = _objectWithoutProperties(_props, ['align', 'gutter', 'justify', 'direction', 'children', 'style', 'className']);

			var sty = _extends({}, style);
			var child = children;

			if (gutter) {
				sty.paddingLeft = gutter / 2;
				sty.paddingRight = gutter / 2;

				child = _react2.default.Children.map(children, function (v) {
					if (!v) {
						return;
					}
					if (v.type === _col2.default) {
						return _react2.default.cloneElement(v, {
							gutter: gutter
						});
					} else {
						return v;
					}
				});
			}

			var cls = (0, _classnames2.default)('mona-row', justify ? 'mona-row-' + justify : '', align ? 'mona-row-align-' + align : '', direction ? 'mona-row-direction-' + direction : '', className);

			return _react2.default.createElement(
				'div',
				_extends({ className: cls, style: sty }, props),
				child
			);
		}
	}]);

	return Row;
}(_react.Component);

exports.default = Row;