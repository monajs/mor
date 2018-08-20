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

var _pickerView = require('../picker-view');

var _pickerView2 = _interopRequireDefault(_pickerView);

var _generate = require('../tool/generate');

var _generate2 = _interopRequireDefault(_generate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    created by yangxi on 2018-07-30
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var DatePickerRangeItem = function (_Component) {
	_inherits(DatePickerRangeItem, _Component);

	function DatePickerRangeItem() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, DatePickerRangeItem);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DatePickerRangeItem.__proto__ || Object.getPrototypeOf(DatePickerRangeItem)).call.apply(_ref, [this].concat(args))), _this), _this.options = {}, _this.years = [], _this.months = [], _this.days = [], _this.year = '', _this.month = '', _this.day = '', _temp), _possibleConstructorReturn(_this, _ret);
	} // 配置集合


	_createClass(DatePickerRangeItem, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.setOptions();
		}
	}, {
		key: 'setOptions',
		value: function setOptions() {
			var format = this.props.format;

			var ctrl = _generate2.default.generateCtrl(format);
			this.options = _extends({}, this.props, ctrl);

			var _options = this.options,
			    yearVisible = _options.yearVisible,
			    monthVisible = _options.monthVisible;


			yearVisible && (this.years = this.options.years || _generate2.default.years(15));
			monthVisible && (this.months = this.options.months || _generate2.default.months());

			this.setDefault();
		}
	}, {
		key: 'setDefault',
		value: function setDefault() {
			var itemKey = this.props.itemKey;

			var date = this.options.date[itemKey] ? new Date(this.options.date[itemKey]) : new Date();
			this.year = date.getFullYear() + '';
			this.month = _generate2.default.pad(date.getMonth() + 1, 2);
			this.day = _generate2.default.pad(date.getDate(), 2);

			var dayVisible = this.options.dayVisible;

			dayVisible && (this.days = _generate2.default.days(this.year, this.month));
		}
	}, {
		key: '_getValue',
		value: function _getValue(type, val) {
			this[type] = val.value;
			if (this.options.dayVisible && (type === 'year' || type === 'month')) {
				var days = _generate2.default.days(this.year, this.month);
				if (days.length === this.days.length) {
					return;
				}
				this.days = days;
				this.refs.day.setData(this.days);
			}
		}
	}, {
		key: 'getValue',
		value: function getValue() {
			return {
				year: this.year,
				month: this.month,
				day: this.day
			};
		}
	}, {
		key: 'render',
		value: function render() {
			var _options2 = this.options,
			    yearVisible = _options2.yearVisible,
			    monthVisible = _options2.monthVisible,
			    dayVisible = _options2.dayVisible,
			    className = _options2.className;

			return _react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)('mona-date-picker-range-item flex-center', className) },
				yearVisible ? _react2.default.createElement(
					'div',
					{ className: 'mona-date-picker-range-year h-full' },
					_react2.default.createElement(_pickerView2.default, { source: this.years, defaultValue: this.year, onChange: this._getValue.bind(this, 'year') })
				) : null,
				monthVisible ? _react2.default.createElement(
					'div',
					{ className: 'flex-1 h-full' },
					_react2.default.createElement(_pickerView2.default, { source: this.months, defaultValue: this.month, onChange: this._getValue.bind(this, 'month') })
				) : null,
				dayVisible ? _react2.default.createElement(
					'div',
					{ className: 'flex-1 h-full' },
					_react2.default.createElement(_pickerView2.default, { source: this.days, defaultValue: this.day, onChange: this._getValue.bind(this, 'day'), ref: 'day' })
				) : null
			);
		}
	}]);

	return DatePickerRangeItem;
}(_react.Component);

exports.default = DatePickerRangeItem;