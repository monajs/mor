'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _hammer = require('../hammer');

var _hammer2 = _interopRequireDefault(_hammer);

var _tool = require('../tool');

var _tool2 = _interopRequireDefault(_tool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    created by yangxi on 2018-07-25
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var PickerView = function (_Component) {
	_inherits(PickerView, _Component);

	function PickerView() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, PickerView);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PickerView.__proto__ || Object.getPrototypeOf(PickerView)).call.apply(_ref, [this].concat(args))), _this), _this.selectIndex = 0, _this.list = [], _this.y = 0, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(PickerView, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var source = this.props.source;

			this.list = source;
			this.selectItem = this.list[0];
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props,
			    defaultValue = _props.defaultValue,
			    cellHeight = _props.cellHeight;

			this.wrap = this.refs.wrap;
			if (defaultValue) {
				var _index = this.getIndex(defaultValue);
				this.setIndex(_index, false);
				this.move(-_index * cellHeight);
			}
		}
	}, {
		key: 'getValue',
		value: function getValue() {
			return this.selectItem;
		}

		// 对外暴露的钩子函数
		// 设置组件的数据状态

	}, {
		key: 'setData',
		value: function setData(data) {
			var cellHeight = this.props.cellHeight;

			this.list = data;
			this.setState({});
			this.setIndex(this.selectIndex);
			this.move(-this.selectIndex * cellHeight);
		}

		// 获取下标

	}, {
		key: 'getIndex',
		value: function getIndex(value) {
			var _props2 = this.props,
			    isKv = _props2.isKv,
			    valueKey = _props2.valueKey;

			value = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value[valueKey] : value;
			var index = 0;
			if (isKv) {
				this.list.forEach(function (v, i) {
					v[valueKey] === value && (index = i);
				});
			} else {
				index = this.list.indexOf(value);
			}
			index = index >= 0 ? index : 0;
			return index;
		}
	}, {
		key: 'setIndex',
		value: function setIndex(index) {
			var checkChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
			var onChange = this.props.onChange;

			if (index >= this.list.length) {
				index = this.list.length - 1;
			}

			this.selectItem = this.list[index];
			if (index !== this.selectIndex && checkChange) {
				onChange && onChange(this.getValue());
			}
			this.selectIndex = index;
		}
	}, {
		key: 'panstart',
		value: function panstart(e) {
			e.preventDefault();
			var cellHeight = this.props.cellHeight;

			this.startY = this.y;
			_tool2.default.removeClass(this.wrap, 'mona-picker-view-transition');
			this.maxHeight = (this.list.length - 1) * cellHeight;
		}
	}, {
		key: 'panmove',
		value: function panmove(e) {
			e.preventDefault();
			this.move(this.parseY(e.deltaY));
		}
	}, {
		key: 'panend',
		value: function panend(e) {
			var _this2 = this;

			e.preventDefault();
			var cellHeight = this.props.cellHeight;

			_tool2.default.addClass(this.wrap, 'mona-picker-view-transition');

			var speed = this.calcSpeed(e.velocityY);
			var endPoint = this.calcEndPoint(e.deltaY + speed * cellHeight); //获取终点位置;
			var index = this.parseY(endPoint) / cellHeight; //获取终点位置对应的index,最终运动距离根据index计算
			this.setIndex(Math.abs(index));

			if (Math.abs(e.velocityY) > 0.8) {
				// 作缓冲效果
				var buffer = e.velocityY > 0 ? 15 : -15;
				this.move(index * cellHeight, buffer);
				clearTimeout(this.moveTimeout);
				this.moveTimeout = setTimeout(function () {
					_this2.move(index * cellHeight);
				}, 400);
			} else {
				this.move(index * cellHeight);
			}

			clearTimeout(this.removeTimeout);
			this.removeTimeout = setTimeout(function () {
				_tool2.default.removeClass(_this2.wrap, 'mona-picker-view-transition');
			}, 1000);
		}

		// 手指离开后的运动系数,限制最大速度

	}, {
		key: 'calcSpeed',
		value: function calcSpeed(_v) {
			var _maxV = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

			if (Math.abs(_v) > _maxV) {
				return _v > 0 ? _maxV * 4 : -1 * _maxV * 4;
			} else {
				return _v * 4;
			}
		}

		// 取整操作，保证终点的位置准确

	}, {
		key: 'calcEndPoint',
		value: function calcEndPoint(_y) {
			var cellHeight = this.props.cellHeight;

			if (_y % cellHeight === 0) {
				return _y;
			} else {
				return Math.round(_y / cellHeight) * cellHeight;
			}
		}
	}, {
		key: 'parseY',
		value: function parseY(_y) {
			var y = this.startY + _y;
			if (y > 0) {
				return 0;
			}
			if (y < -this.maxHeight) {
				return -this.maxHeight;
			}
			return y;
		}
	}, {
		key: 'move',
		value: function move(y) {
			var buffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			if (!this.wrap) {
				return;
			}
			this.y = y;
			_tool2.default.css(this.wrap, {
				transform: 'translateY(' + (buffer + y) + 'px)'
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _props3 = this.props,
			    className = _props3.className,
			    isKv = _props3.isKv,
			    source = _props3.source,
			    valueKey = _props3.valueKey,
			    value = _props3.value,
			    nameKey = _props3.nameKey,
			    cellHeight = _props3.cellHeight,
			    props = _objectWithoutProperties(_props3, ['className', 'isKv', 'source', 'valueKey', 'value', 'nameKey', 'cellHeight']);

			return _react2.default.createElement(
				'div',
				_extends({ className: (0, _classnames2.default)('mona-picker-view mona-form-control', className) }, props),
				_react2.default.createElement(
					'div',
					{ className: 'h-full flex-center' },
					_react2.default.createElement(
						'div',
						{ className: 'mona-picker-view-wrap', ref: 'wrap', style: { height: cellHeight + 'px' } },
						isKv ? this.list.map(function (item) {
							return _react2.default.createElement(
								'div',
								{ className: 'mona-picker-view-item',
									key: item[valueKey],
									style: {
										height: cellHeight + 'px',
										lineHeight: cellHeight + 'px'
									} },
								item[nameKey]
							);
						}, this) : this.list.map(function (item, index) {
							return _react2.default.createElement(
								'div',
								{ className: 'mona-picker-view-item',
									key: 'item' + index,
									style: {
										height: cellHeight + 'px',
										lineHeight: cellHeight + 'px'
									} },
								item
							);
						}, this)
					)
				),
				_react2.default.createElement(_hammer2.default, {
					style: { backgroundSize: '100% calc(50% - ' + cellHeight / 2 + 'px)' },
					className: 'mona-picker-view-mask',
					panmove: this.panmove.bind(this),
					panend: this.panend.bind(this),
					panstart: this.panstart.bind(this) })
			);
		}
	}]);

	return PickerView;
}(_react.Component);

PickerView.defaultProps = {
	isKv: true, // 数据结构类型
	nameKey: 'name',
	valueKey: 'value',
	source: [],
	cellHeight: 34 // 单元格高度
};
exports.default = PickerView;