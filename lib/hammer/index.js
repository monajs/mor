'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HammerComponent = function (_Component) {
	_inherits(HammerComponent, _Component);

	function HammerComponent() {
		_classCallCheck(this, HammerComponent);

		return _possibleConstructorReturn(this, (HammerComponent.__proto__ || Object.getPrototypeOf(HammerComponent)).apply(this, arguments));
	}

	_createClass(HammerComponent, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.refs.hammer.addEventListener('touchstart', this.touchStart.bind(this), false);
			this.refs.hammer.addEventListener('touchmove', this.touchMove.bind(this), false);
			this.refs.hammer.addEventListener('touchend', this.touchEnd.bind(this), false);
			this.refs.hammer.addEventListener('touchcancel', this.touchCancel.bind(this), false);
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
			var now = Date.now();

			var pageY = void 0;
			var pageX = void 0;

			var nextData = {
				pageY: e.touches[0].pageY,
				pageX: e.touches[0].pageX,
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
			//TODO 目前只考虑单点触控
			info.center = {
				y: e.touches[0].pageY,
				x: e.touches[0].pageX
			};

			this.prevInfo = nextData;
			this.currentInfo = _extends({}, info);

			_extends(e, info);
		}
	}, {
		key: 'touchStart',
		value: function touchStart(e) {
			var _this2 = this;

			var touchstart = this.props.touchstart;
			//e.preventDefault();

			this.prevInfo = {
				time: Date.now(),
				pageY: e.touches[0].pageY,
				pageX: e.touches[0].pageX
			};
			this.startInfo = {
				time: Date.now(),
				pageY: e.touches[0].pageY,
				pageX: e.touches[0].pageX
			};
			if (touchstart) {
				touchstart(e);
			}
			this.pressTime = setTimeout(function () {
				_this2.press(e);
			}, 500);
		}
	}, {
		key: 'touchMove',
		value: function touchMove(e) {
			var _props = this.props,
			    pan = _props.pan,
			    panstart = _props.panstart,
			    panmove = _props.panmove;

			var isStart = !this.currentInfo;
			clearTimeout(this.pressTime);
			this.isPan = true;
			this.setInfo(e, isStart);
			if (this.isPan) {
				if (isStart && pan) {
					pan(e);
				}
				if (isStart && panstart) {
					panstart(e);
				}
				if (panmove) {
					panmove(e);
				}
			}
		}
	}, {
		key: 'touchEnd',
		value: function touchEnd(e) {
			var _props2 = this.props,
			    pan = _props2.pan,
			    panend = _props2.panend;

			_extends(e, this.currentInfo);
			clearTimeout(this.pressTime);
			var duration = Date.now() - this.startInfo.time;

			this.startInfo = null;
			this.prevInfo = null;
			this.currentInfo = null;

			if (this.isPan) {
				if (pan) {
					pan(e);
				}
				if (panend) {
					panend(e);
				}
			} else {
				if (duration < 250) {
					this.tap(e);
				}
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
			clearTimeout(this.pressTime);
			if (this.isPan) {
				if (pancancel) {
					pancancel(e);
				}
			}
		}
	}, {
		key: 'tap',
		value: function tap(e) {
			if (this.props.tap) {
				this.props.tap(e);
			}
		}
	}, {
		key: 'press',
		value: function press(e) {
			if (this.props.press) {
				this.props.press(e);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props3 = this.props,
			    style = _props3.style,
			    pan = _props3.pan,
			    touchstart = _props3.touchstart,
			    panstart = _props3.panstart,
			    panmove = _props3.panmove,
			    panend = _props3.panend,
			    pancancel = _props3.pancancel,
			    options = _props3.options,
			    setUp = _props3.setUp,
			    props = _objectWithoutProperties(_props3, ['style', 'pan', 'touchstart', 'panstart', 'panmove', 'panend', 'pancancel', 'options', 'setUp']);

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

	return HammerComponent;
}(_react.Component);

exports.default = HammerComponent;