'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tool = require('../tool');

var _tool2 = _interopRequireDefault(_tool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hammer = function (_Component) {
	_inherits(Hammer, _Component);

	function Hammer() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Hammer);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Hammer.__proto__ || Object.getPrototypeOf(Hammer)).call.apply(_ref, [this].concat(args))), _this), _this.isTouching = false, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Hammer, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.isPC = _tool2.default.isPC();
			if (this.isPC) {
				this.refs.hammer.addEventListener('mousedown', this.touchStart.bind(this), false);
				this.refs.hammer.addEventListener('mousemove', this.touchMove.bind(this), false);
				this.refs.hammer.addEventListener('mouseup', this.touchEnd.bind(this), false);
			} else {
				this.refs.hammer.addEventListener('touchstart', this.touchStart.bind(this), false);
				this.refs.hammer.addEventListener('touchmove', this.touchMove.bind(this), false);
				this.refs.hammer.addEventListener('touchend', this.touchEnd.bind(this), false);
				this.refs.hammer.addEventListener('touchcancel', this.touchCancel.bind(this), false);
			}
			this.refs.hammer.addEventListener('scroll', this.scroll.bind(this), false);
		}
	}, {
		key: 'optionEvent',
		value: function optionEvent(e) {
			if (this.isPC) {
				return {
					x: e.clientX,
					y: e.clientY
				};
			} else {
				return {
					x: e.touches[0].pageX,
					y: e.touches[0].pageY
				};
			}
		}
	}, {
		key: 'getInfo',
		value: function getInfo(prev, next) {
			var angle = void 0;
			if (prev.pageY === next.pageY) {
				angle = prev.pageX - next.pageX < 0 ? 0 : 180;
			} else if (prev.pageX === next.pageX) {
				angle = prev.pageY - next.pageY < 0 ? -90 : 90;
			} else {
				angle = 180 / (Math.PI / Math.atan((prev.pageY - next.pageY) / (prev.pageX - next.pageX)));
			}
			return {
				velocityY: (next.pageY - prev.pageY) / (next.time - prev.time),
				velocityX: (next.pageX - prev.pageX) / (next.time - prev.time),
				deltaY: next.pageY - this.startInfo.pageY,
				deltaX: next.pageX - this.startInfo.pageX,
				angle: angle
			};
		}
	}, {
		key: 'setInfo',
		value: function setInfo(e, isStart) {
			var pageX = void 0,
			    pageY = void 0;
			var now = Date.now();

			var ePoint = this.optionEvent(e);
			var nextData = {
				pageY: ePoint.y,
				pageX: ePoint.x,
				time: now
			};

			if (isStart) {
				pageX = this.startInfo.pageX;
				pageY = this.startInfo.pageY;
			} else {
				pageX = this.prevInfo.pageX;
				pageY = this.prevInfo.pageY;
			}

			var preData = {
				pageY: pageY,
				pageX: pageX,
				time: this.prevInfo.time
			};

			var info = this.getInfo(preData, nextData);
			info.center = {
				y: ePoint.y,
				x: ePoint.x
			};

			this.prevInfo = nextData;
			this.currentInfo = _extends({}, info);

			_extends(e, info);
		}
	}, {
		key: 'touchStart',
		value: function touchStart(e) {
			var _this2 = this;

			this.isTouching = true;
			var touchstart = this.props.touchstart;

			var ePoint = this.optionEvent(e);
			this.prevInfo = {
				time: Date.now(),
				pageY: ePoint.y,
				pageX: ePoint.x
			};
			this.startInfo = {
				time: Date.now(),
				pageY: ePoint.y,
				pageX: ePoint.x
			};
			touchstart && touchstart(e);
			clearTimeout(this.pressTimer);
			this.pressTimer = setTimeout(function () {
				_this2.press(e);
			}, 500);
		}
	}, {
		key: 'touchMove',
		value: function touchMove(e) {
			if (!this.isTouching) {
				return;
			}
			var _props = this.props,
			    pan = _props.pan,
			    panstart = _props.panstart,
			    panmove = _props.panmove;

			clearTimeout(this.pressTimer);

			// 是否为touchmove的第一次动作
			var isStart = !this.currentInfo;
			// 是否触发了touchmove的第一次动作
			this.isPan = true;
			this.setInfo(e, isStart);
			isStart && pan && pan(e);
			isStart && panstart && panstart(e);
			panmove && panmove(e);
		}
	}, {
		key: 'touchEnd',
		value: function touchEnd(e) {
			if (!this.isTouching) {
				return;
			}
			this.isTouching = false;
			var _props2 = this.props,
			    pan = _props2.pan,
			    panend = _props2.panend;

			_extends(e, this.currentInfo);
			clearTimeout(this.pressTimer);

			var duration = Date.now() - this.startInfo.time;
			this.startInfo = null;
			this.prevInfo = null;
			this.currentInfo = null;

			if (this.isPan) {
				pan && pan(e);
				panend && panend(e);
			} else {
				// 没有移动，没有触发touchmove
				duration < 250 && this.tap(e);
			}
			this.isPan = false;
		}
	}, {
		key: 'touchCancel',
		value: function touchCancel(e) {
			var pancancel = this.props.pancancel;

			this.startInfo = null;
			this.prevInfo = null;
			this.currentInfo = null;
			this.isPan = false;
			clearTimeout(this.pressTimer);
			pancancel && pancancel(e);
		}

		// 滚动事件

	}, {
		key: 'scroll',
		value: function scroll(e) {
			var scroll = this.props.scroll;

			scroll && scroll(e);
		}

		// 点击事件

	}, {
		key: 'tap',
		value: function tap(e) {
			var tap = this.props.tap;

			tap && tap(e);
		}

		// 长按事件

	}, {
		key: 'press',
		value: function press(e) {
			var press = this.props.press;

			press && press(e);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props3 = this.props,
			    style = _props3.style,
			    pan = _props3.pan,
			    scroll = _props3.scroll,
			    touchstart = _props3.touchstart,
			    panstart = _props3.panstart,
			    panmove = _props3.panmove,
			    panend = _props3.panend,
			    press = _props3.press,
			    pancancel = _props3.pancancel,
			    props = _objectWithoutProperties(_props3, ['style', 'pan', 'scroll', 'touchstart', 'panstart', 'panmove', 'panend', 'press', 'pancancel']);

			var sty = _extends({}, style, {
				touchAction: 'auto',
				userSelect: 'none',
				WebkitUserDrag: 'none',
				WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
			});

			return _react2.default.createElement(
				'div',
				_extends({ ref: 'hammer' }, props, { style: sty }),
				this.props.children
			);
		}
	}]);

	return Hammer;
}(_react.Component);

exports.default = Hammer;