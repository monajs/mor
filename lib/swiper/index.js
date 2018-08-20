'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactDom = require('react-dom');

var _hammer = require('../hammer');

var _hammer2 = _interopRequireDefault(_hammer);

var _tool = require('../tool');

var _tool2 = _interopRequireDefault(_tool);

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

var _tabItem = require('./tabItem');

var _tabItem2 = _interopRequireDefault(_tabItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Swiper = function (_Component) {
	_inherits(Swiper, _Component);

	function Swiper() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Swiper);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Swiper.__proto__ || Object.getPrototypeOf(Swiper)).call.apply(_ref, [this].concat(args))), _this), _this.itemWidth = 0, _this.trueIndex = 0, _this.currentIndex = 0, _this.translateX = 0, _this.gapWidth = 0, _this.children = [], _this.originChildren = [], _this.isTranslating = false, _this.isTouching = false, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Swiper, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _props = this.props,
			    defaultIndex = _props.defaultIndex,
			    loop = _props.loop;

			this.trueIndex = this.currentIndex = defaultIndex;
			if (loop) {
				this.currentIndex = defaultIndex + 2;
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var autoplay = this.props.autoplay;

			this.wrap = (0, _reactDom.findDOMNode)(this.refs.wrap);
			this.group = this.refs.group;
			this.initNode();
			this.move(true);
			autoplay && this.autoplayAction();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			clearInterval(this.swiperTimer);
		} // 返回的真实index
		// 逻辑控制展示的index
		// childWidth和显示content的宽度差的一半
		// 是否正在滚动

	}, {
		key: 'initNode',
		// 是否处于touch状态

		value: function initNode() {
			var _props2 = this.props,
			    childWidth = _props2.childWidth,
			    children = _props2.children,
			    loop = _props2.loop,
			    autoplay = _props2.autoplay,
			    defaultIndex = _props2.defaultIndex;

			if (typeof defaultIndex !== 'number') {
				throw new Error('请检查defaultIndex的数据类型，仅支持Number类型');
			}
			if (childWidth && typeof childWidth !== 'number') {
				throw new Error('请检查childWidth的数据类型，仅支持Number类型');
			}

			this.itemWidth = childWidth || this.wrap.offsetWidth;
			this.gapWidth = childWidth ? (this.wrap.offsetWidth - childWidth) / 2 : 0;
			this.originChildren.length = this.children.length = _react2.default.Children.count(children);

			if (defaultIndex > this.originChildren.length - 1) {
				throw new Error('默认下标超过长度，请检查');
			}
			if ((loop || autoplay) && this.originChildren.length === 1) {
				throw new Error('swiper-item长度为1时不允许循环播放或者自动播放，请设置loop属性和autoplay属性为false');
			}

			if (loop && this.originChildren.length > 1) {
				this.children.length += 4;
			}
			this.setState({});
		}
	}, {
		key: 'autoplayAction',
		value: function autoplayAction() {
			var _this2 = this;

			var autoplayInterval = this.props.autoplayInterval;

			clearInterval(this.swiperTimer);
			this.swiperTimer = setInterval(function () {
				var index = _this2.currentIndex + 1;
				_this2.setIndex(index);
				_this2.move();
			}, autoplayInterval);
		}
	}, {
		key: 'verifyPan',
		value: function verifyPan() {
			var enableTouch = this.props.enableTouch;

			if (this.isTranslating) {
				return;
			}
			if (!enableTouch || this.children.length <= 1) {
				return;
			}
			return true;
		}
	}, {
		key: 'panstart',
		value: function panstart(e) {
			var angleAbs = Math.abs(e.angle);
			if (angleAbs < 45 || angleAbs > 135) {
				e.preventDefault();
			}
			if (angleAbs >= 45 && angleAbs <= 135) {
				return;
			}
			if (!this.verifyPan() || this.isTouching) {
				return;
			}
			this.isTouching = true;
			_tool2.default.removeClass(this.group, 'mona-swiper-transition');

			this.currentTranslateX = this.translateX; // 记录手势开始前的偏移量
			clearInterval(this.swiperTimer);
		}
	}, {
		key: 'panmove',
		value: function panmove(e) {
			var enableDamp = this.props.enableDamp;

			if (!this.verifyPan() || e.deltaX === 0 || !this.isTouching) {
				return;
			}
			var angleAbs = Math.abs(e.angle);
			if (angleAbs < 45 || angleAbs > 135) {
				e.preventDefault();
			}
			if (this.currentIndex === 0 && e.deltaX > 0) {
				if (enableDamp) {
					// 滚动到第一屏且loop是false的场景
					this.translateX = this.currentTranslateX + e.deltaX / 2.5; // 阻尼效果
				}
			} else if (this.currentIndex === this.children.length - 1 && e.deltaX < 0) {
				if (enableDamp) {
					// 滚动到最后一屏且loop是false的场景
					this.translateX = this.currentTranslateX + e.deltaX / 2.5; // 阻尼效果
				}
			} else {
				this.translateX = this.currentTranslateX + e.deltaX;
			}
			_tool2.default.css(this.group, {
				'will-change': 'transform',
				transform: 'translateX(' + this.translateX + 'px)'
			});
		}
	}, {
		key: 'panend',
		value: function panend(e) {
			var autoplay = this.props.autoplay;

			if (!this.verifyPan() || !this.isTouching) {
				return;
			}
			var angleAbs = Math.abs(e.angle);
			if (angleAbs < 45 || angleAbs > 135) {
				e.preventDefault();
			}
			this.isTouching = false;
			_tool2.default.addClass(this.group, 'mona-swiper-transition');
			this.calcEndIndex(e);
			this.move();

			autoplay && this.autoplayAction();
		}

		// 计算手势结束时候的终点下标
		// 计算this.currentIndex

	}, {
		key: 'calcEndIndex',
		value: function calcEndIndex(e) {
			var distance = ((this.translateX - this.currentTranslateX) / this.itemWidth).toFixed(1);
			var distanceABS = Math.abs(distance);
			var symbol = distance < 0 ? -1 : 1;
			var vSymbol = e.velocityX < 0 ? -1 : 1;
			var distanceInt = Math.floor(distanceABS);
			var distanceFloat = distanceABS - Math.floor(distanceABS);
			var indexChanged = distanceInt + distanceFloat > 0.2 ? 1 : 0;

			var index = void 0;
			if (indexChanged === 0) {
				// 未切换index
				if (Math.abs(e.velocityX) > 0.1 && vSymbol === symbol) {
					// 速度超过0.1，且速度方向和位移方向一致
					index = this.currentIndex - vSymbol;
				} else {
					index = this.currentIndex;
				}
			} else {
				// 已经切换index
				if (Math.abs(e.velocityX) > 0.1 && vSymbol === -1 * symbol) {
					// 速度超过0.1，且速度方向和位移方向相反
					index = this.currentIndex - vSymbol;
				} else {
					index = this.currentIndex - indexChanged * symbol;
				}
			}
			if (index === -1) {
				this.currentIndex = 0;
			} else if (index === this.children.length) {
				this.currentIndex = this.children.length - 1;
			} else {
				this.currentIndex = index;
			}
		}
	}, {
		key: 'setIndex',
		value: function setIndex(index) {
			if (index === this.currentIndex) {
				return;
			}
			if (index === this.children.length) {
				this.currentIndex = 0;
			} else {
				this.currentIndex = index;
			}
		}

		// 钩子函数

	}, {
		key: 'changeIndex',
		value: function changeIndex(index) {
			var loop = this.props.loop;

			if (loop) {
				index += 2;
			}
			this.setIndex(index);
			this.move();
		}
	}, {
		key: 'move',
		value: function move(isFirst) {
			var _this3 = this;

			if (!this.group) {
				return;
			}
			var _props3 = this.props,
			    beforeChange = _props3.beforeChange,
			    loop = _props3.loop,
			    afterChange = _props3.afterChange,
			    dots = _props3.dots;

			this.isTranslating = true;
			!isFirst && _tool2.default.addClass(this.group, 'mona-swiper-transition'); // 避免首次加载定位的时候有动画
			this.moveOption(function () {
				beforeChange && beforeChange(_this3.trueIndex);
			});

			if (loop) {
				if (this.currentIndex === 1) {
					this.currentIndex += this.originChildren.length;
				} else if (this.currentIndex === this.children.length - 2) {
					this.currentIndex = 2;
				}
				clearTimeout(this.translateTimer);
				this.translateTimer = setTimeout(function () {
					_tool2.default.removeClass(_this3.group, 'mona-swiper-transition');
					_this3.moveOption();

					clearTimeout(_this3.classTimer);
					_this3.classTimer = setTimeout(function () {
						_tool2.default.addClass(_this3.group, 'mov-swiper-transition');
						_this3.isTranslating = false;
					}, 50);
				}, 300);
				this.trueIndex = this.currentIndex - 2;
			} else {
				this.isTranslating = false;
				this.trueIndex = this.currentIndex;
			}
			dots && this.setState({});
			!isFirst && afterChange && afterChange(this.trueIndex);
		}

		// 最终操作

	}, {
		key: 'moveOption',
		value: function moveOption(fn) {
			this.translateX = -1 * this.itemWidth * this.currentIndex + this.gapWidth; // 偏移量
			fn && fn();
			_tool2.default.css(this.group, {
				'will-change': 'transform',
				transform: 'translateX(' + this.translateX + 'px)'
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _props4 = this.props,
			    children = _props4.children,
			    loop = _props4.loop,
			    dots = _props4.dots,
			    style = _props4.style,
			    className = _props4.className,
			    ctrl = _props4.ctrl,
			    props = _objectWithoutProperties(_props4, ['children', 'loop', 'dots', 'style', 'className', 'ctrl']);

			var child = _react2.default.Children.toArray(children);

			// 循环的场景改变children
			if (loop) {
				var childLen = _react2.default.Children.toArray(child).length;
				var first1 = void 0,
				    first2 = void 0,
				    last1 = void 0,
				    last2 = void 0;
				if (childLen === 2) {
					first1 = last1 = child[0];
					first2 = last2 = child[2];
				} else {
					first1 = child[childLen - 3];
					first2 = child[childLen - 1];
					last1 = child[0];
					last2 = child[2];
				}

				child.unshift(first2);
				child.unshift(first1);
				child.push(last1);
				child.push(last2);
			}

			child = child.map(function (v, i) {
				if (!v) {
					return;
				}
				return _react2.default.cloneElement(v, {
					itemWidth: _this4.itemWidth,
					key: 'mona_' + i,
					ctrl: ctrl
				});
			});

			var groupSty = {
				width: this.children.length * this.itemWidth
			};
			return _react2.default.createElement(
				_hammer2.default,
				{
					className: (0, _classnames2.default)('mona-swiper full pos-r o-h', className),
					panmove: this.panmove.bind(this),
					panstart: this.panstart.bind(this),
					panend: this.panend.bind(this),
					style: style,
					ref: 'wrap' },
				_react2.default.createElement(
					'div',
					{ className: 'mona-swiper-group h-full o-h', ref: 'group', style: groupSty },
					child
				),
				dots && this.originChildren.length > 1 ? _react2.default.createElement(
					'div',
					{ className: 'mona-swiper-dots pos-a flex-center w-full' },
					_tool2.default.newArray(0, this.originChildren.length).map(function (item, index) {
						return _react2.default.createElement('div', { key: index, className: (0, _classnames2.default)('item', { 'active': this.trueIndex === index }) });
					}, this)
				) : null
			);
		}
	}]);

	return Swiper;
}(_react.Component);

Swiper.item = _item2.default;
Swiper.tabItem = _tabItem2.default;
Swiper.defaultProps = {
	autoplay: true,
	defaultIndex: 0,
	childWidth: 0,
	autoplayInterval: 3000,
	dots: true,
	enableTouch: true, // 是否支持手势
	enableDamp: true, // 是否支持弹性阻尼
	loop: false // 是否循环轮播,
};
exports.default = Swiper;