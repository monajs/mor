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

var _mountRoot = require('../mount-root');

var _mountRoot2 = _interopRequireDefault(_mountRoot);

var _tool = require('../tool');

var _tool2 = _interopRequireDefault(_tool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    created by yangxi on 2018-07-25
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Popup = function (_Component) {
	_inherits(Popup, _Component);

	function Popup() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Popup);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Popup.__proto__ || Object.getPrototypeOf(Popup)).call.apply(_ref, [this].concat(args))), _this), _this.visible = false, _this.showWrap = false, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Popup, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var visible = this.props.visible;

			visible && this.show();
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.visible === this.visible) {
				return;
			}
			if (nextProps.visible === true) {
				this.show();
			} else if (nextProps.visible === false) {
				this.hide();
			}
		}
	}, {
		key: 'show',
		value: function show() {
			_tool2.default.preventScroll();
			this.visible = true;
			this.setState({});
		}

		// 隐藏

	}, {
		key: 'hide',
		value: function hide() {
			_tool2.default.cancelPreventScroll();
			this.visible = false;
			this.showWrap = false;
			this.setState({});
		}

		// 遮罩层点击操作

	}, {
		key: 'tapMask',
		value: function tapMask() {
			var _props = this.props,
			    maskClosable = _props.maskClosable,
			    onClose = _props.onClose;

			if (!maskClosable) {
				return;
			}
			this.hide();
			onClose && onClose();
		}
	}, {
		key: 'preventDefault',
		value: function preventDefault(e) {
			e.preventDefault();
		}
	}, {
		key: 'onMounted',
		value: function onMounted() {
			this.showWrap = true;
			this.setState({});
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    className = _props2.className,
			    visible = _props2.visible,
			    placement = _props2.placement,
			    maskClosable = _props2.maskClosable,
			    isHaveMask = _props2.isHaveMask,
			    animate = _props2.animate,
			    onClose = _props2.onClose,
			    children = _props2.children,
			    props = _objectWithoutProperties(_props2, ['className', 'visible', 'placement', 'maskClosable', 'isHaveMask', 'animate', 'onClose', 'children']);

			return _react2.default.createElement(
				_mountRoot2.default,
				{ closeDelay: animate ? 300 : null, onMounted: this.onMounted.bind(this), visible: this.visible },
				_react2.default.createElement(
					'div',
					_extends({ className: (0, _classnames2.default)('mona-popup pos-f pos-f-full', {
							'have-animate': animate,
							'show-wrap': this.showWrap
						}, placement, className) }, props),
					isHaveMask ? _react2.default.createElement('div', { className: 'mona-popup-mask pos-a pos-a-full', onClick: this.tapMask.bind(this), onTouchMove: this.preventDefault.bind(this) }) : null,
					_react2.default.createElement(
						'div',
						{ className: 'mona-popup-wrap pos-a' },
						children
					)
				)
			);
		}
	}]);

	return Popup;
}(_react.Component);

Popup.defaultProps = {
	isHaveMask: true,
	maskClosable: true,
	animate: true,
	placement: 'bottom'
};
exports.default = Popup;