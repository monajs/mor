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

var _keyGenerate = require('../key-generate');

var _keyGenerate2 = _interopRequireDefault(_keyGenerate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SwiperTabItem = function (_Component) {
	_inherits(SwiperTabItem, _Component);

	function SwiperTabItem() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, SwiperTabItem);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SwiperTabItem.__proto__ || Object.getPrototypeOf(SwiperTabItem)).call.apply(_ref, [this].concat(args))), _this), _this.isShow = false, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(SwiperTabItem, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _this2 = this;

			var ctrl = this.props.ctrl;

			this.key = _keyGenerate2.default.getMonaKey();
			ctrl.setTabItemKey(this.key);
			ctrl.on('tabsIndexChange', function (keysList) {
				if (_this2.isShow) {
					return;
				}
				_this2.isShow = keysList.has(_this2.key);
				_this2.setState({});
			});
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			var ctrl = this.props.ctrl;

			ctrl.off('tabsIndexChange');
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    children = _props.children,
			    className = _props.className,
			    style = _props.style,
			    itemWidth = _props.itemWidth,
			    ctrl = _props.ctrl,
			    props = _objectWithoutProperties(_props, ['children', 'className', 'style', 'itemWidth', 'ctrl']);

			var sty = _extends({}, style, {
				width: itemWidth
			});
			return _react2.default.createElement(
				'div',
				_extends({ style: sty, className: (0, _classnames2.default)('mona-swiper-item pull-left h-full', className) }, props),
				this.isShow ? children : null
			);
		}
	}]);

	return SwiperTabItem;
}(_react.Component);

exports.default = SwiperTabItem;