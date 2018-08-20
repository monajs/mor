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

var _swiper = require('../swiper');

var _swiper2 = _interopRequireDefault(_swiper);

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

var _ctrl = require('./ctrl');

var _ctrl2 = _interopRequireDefault(_ctrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = function (_Component) {
	_inherits(Tabs, _Component);

	function Tabs(props) {
		_classCallCheck(this, Tabs);

		var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

		_this.children = [];
		_this.keysList = new Set();

		_this.ctrl = new _ctrl2.default();
		return _this;
	}

	_createClass(Tabs, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var children = this.props.children;

			this.children.length = _react2.default.Children.count(children);
			this.currentIndex = this.props.defaultIndex;
		}
	}, {
		key: 'componentDidMount',
		// 存储tabsItem已经可以展示的项

		value: function componentDidMount() {
			this.keysList.add(this.ctrl.getTabsItemKey()[this.currentIndex]);
			this.ctrlItem();
		}
	}, {
		key: 'changeIndex',
		value: function changeIndex(index) {
			if (index === this.currentIndex) {
				return;
			}
			this.currentIndex = index;
			this.refs.swiper.changeIndex(index);
		}
	}, {
		key: 'updateIndex',
		value: function updateIndex(index) {
			var _props = this.props,
			    tabs = _props.tabs,
			    afterChange = _props.afterChange;

			this.currentIndex = index;
			this.ctrlItem();
			if (tabs && tabs.length > 0) {
				this.setState({});
			}
			afterChange && afterChange(index);
		}
	}, {
		key: 'ctrlItem',
		value: function ctrlItem() {
			this.keysList.add(this.ctrl.getTabsItemKey()[this.currentIndex]);
			this.ctrl.emit('tabsIndexChange', this.keysList);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    className = _props2.className,
			    enableTouch = _props2.enableTouch,
			    beforeChange = _props2.beforeChange,
			    defaultIndex = _props2.defaultIndex,
			    enableDamp = _props2.enableDamp,
			    tabs = _props2.tabs,
			    children = _props2.children,
			    afterChange = _props2.afterChange,
			    props = _objectWithoutProperties(_props2, ['className', 'enableTouch', 'beforeChange', 'defaultIndex', 'enableDamp', 'tabs', 'children', 'afterChange']);

			var swiperProps = {
				enableTouch: enableTouch,
				beforeChange: beforeChange,
				defaultIndex: defaultIndex,
				enableDamp: enableDamp,
				loop: false,
				autoplay: false,
				dots: false
			};
			var indexMarkSty = {
				width: 1 / this.children.length * 100 + '%',
				transform: 'translateX(' + 100 * this.currentIndex + '%)'
			};

			var swiperSty = {
				height: 'calc(100% - ' + (tabs && tabs.length > 0 ? '45px' : '0px') + ')'
			};
			return _react2.default.createElement(
				'div',
				_extends({ className: (0, _classnames2.default)('mona-tabs full', className) }, props),
				tabs && tabs.length > 0 ? _react2.default.createElement(
					'div',
					{ className: 'mona-tabs-header d-f pos-r' },
					tabs.map(function (item, index) {
						return _react2.default.createElement(
							'div',
							{ key: index, className: (0, _classnames2.default)('item flex-1 flex-center', { 'active': this.currentIndex === index }), onClick: this.changeIndex.bind(this, index) },
							item.title
						);
					}, this),
					_react2.default.createElement('div', { className: 'pos-a index-mark', style: indexMarkSty })
				) : null,
				_react2.default.createElement(
					_swiper2.default,
					_extends({}, swiperProps, { afterChange: this.updateIndex.bind(this), ref: 'swiper', style: swiperSty, ctrl: this.ctrl }),
					children
				)
			);
		}
	}]);

	return Tabs;
}(_react.Component);

Tabs.item = _item2.default;
Tabs.defaultProps = {
	enableTouch: true,
	defaultIndex: 0
};
exports.default = Tabs;