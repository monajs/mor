'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

var _pickerView = require('../picker-view');

var _pickerView2 = _interopRequireDefault(_pickerView);

var _generate = require('../tool/generate');

var _generate2 = _interopRequireDefault(_generate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    created by yangxi
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    时间选择器
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var DatePicker = function (_Component) {
    _inherits(DatePicker, _Component);

    function DatePicker() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, DatePicker);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call.apply(_ref, [this].concat(args))), _this), _this.visible = false, _this.options = {}, _this.years = [], _this.months = [], _this.days = [], _this.minutes = [], _this.seconds = [], _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(DatePicker, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var format = this.props.format;
            this.setOptions(format);
            var visible = this.props.visible;

            visible && this.show();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.visible === this.visible) {
                return;
            }

            this.options.onConfirm = nextProps.onConfirm;
            this.options.onCancel = nextProps.onCancel;

            if (nextProps.date !== this.options.date) {
                this.options.date = nextProps.date;
                this.setDefault();
            }
            if (nextProps.format !== this.options.format) {
                this.options.format = nextProps.format;
                this.setOptions(this.options.format, 'update');
            }
            if (nextProps.visible === true) {
                this.show();
            } else if (nextProps.visible === false) {
                this.hide();
            }
        }
    }, {
        key: 'setOptions',
        value: function setOptions(format, type) {
            var ctrl = _generate2.default.generateCtrl(format);
            if (type === 'update') {
                this.options = _extends(this.options, ctrl);
            } else {
                this.options = _extends({}, this.props, ctrl);
            }

            var _options = this.options,
                yearVisible = _options.yearVisible,
                monthVisible = _options.monthVisible,
                hourVisible = _options.hourVisible,
                minuteVisible = _options.minuteVisible,
                secondVisible = _options.secondVisible;

            yearVisible && (this.years = this.options.years || _generate2.default.years(15));
            monthVisible && (this.months = this.options.months || _generate2.default.months());
            hourVisible && (this.hours = this.options.hours || _generate2.default.hours());
            minuteVisible && (this.minutes = this.options.minutes || _generate2.default.minutes());
            secondVisible && (this.seconds = this.options.seconds || _generate2.default.seconds());

            this.setDefault();
        }
    }, {
        key: 'setDefault',
        value: function setDefault(type) {
            var dayVisible = this.options.dayVisible;

            var date = this.options.date ? new Date(this.options.date) : new Date();
            this.year = date.getFullYear() + '';
            this.month = _generate2.default.pad(date.getMonth() + 1, 2);
            this.day = _generate2.default.pad(date.getDate(), 2);
            this.hour = _generate2.default.pad(date.getHours(), 2);
            this.minute = _generate2.default.pad(date.getMinutes(), 2);
            this.second = _generate2.default.pad(date.getSeconds(), 2);

            type !== 'reset' && dayVisible && (this.days = _generate2.default.days(this.year, this.month));
        }
    }, {
        key: 'getValue',
        value: function getValue(type, val) {
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
        key: 'show',
        value: function show() {
            this.visible = true;
            this.setState({});
        }

        // 隐藏

    }, {
        key: 'hide',
        value: function hide() {
            this.visible = false;
            this.setState({});
        }
    }, {
        key: 'onCancel',
        value: function onCancel(type) {
            var onCancel = this.props.onCancel;

            this.setDefault('reset');
            this.hide();
            onCancel && onCancel(type);
        }
    }, {
        key: 'onConfirm',
        value: function onConfirm() {
            var _options2 = this.options,
                dayVisible = _options2.dayVisible,
                hourVisible = _options2.hourVisible,
                minuteVisible = _options2.minuteVisible,
                secondVisible = _options2.secondVisible,
                onConfirm = _options2.onConfirm;
            var year = this.year,
                month = this.month;

            var day = dayVisible ? this.day : '01';
            var hour = hourVisible ? this.hour : '00';
            var minute = minuteVisible ? this.minute : '00';
            var second = secondVisible ? this.second : '00';
            var date = new Date(year, month - 1, day, hour, minute, second).getTime();

            onConfirm && onConfirm(date);
            this.hide();
        }
    }, {
        key: 'render',
        value: function render() {
            var _options3 = this.options,
                yearVisible = _options3.yearVisible,
                monthVisible = _options3.monthVisible,
                dayVisible = _options3.dayVisible,
                hourVisible = _options3.hourVisible,
                minuteVisible = _options3.minuteVisible,
                secondVisible = _options3.secondVisible;

            return _react2.default.createElement(
                _popup2.default,
                { visible: this.visible, placement: 'bottom', onClose: this.onCancel.bind(this, 'mask') },
                _react2.default.createElement(
                    'div',
                    { className: 'mona-date-picker w-full' },
                    _react2.default.createElement(
                        'div',
                        { className: 'mona-date-picker-header d-f mona-b-b' },
                        _react2.default.createElement(
                            'div',
                            { className: 'flex-1 item flex-center-y', onClick: this.onCancel.bind(this, 'button') },
                            '\u53D6\u6D88'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'flex-1 item flex-center-y flex-right-x', onClick: this.onConfirm.bind(this) },
                            '\u786E\u8BA4'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'mona-date-picker-wrap d-f' },
                        yearVisible ? _react2.default.createElement(
                            'div',
                            { className: 'flex-1 h-full' },
                            _react2.default.createElement(_pickerView2.default, { source: this.years, defaultValue: this.year, onChange: this.getValue.bind(this, 'year') })
                        ) : null,
                        monthVisible ? _react2.default.createElement(
                            'div',
                            { className: 'flex-1 h-full' },
                            _react2.default.createElement(_pickerView2.default, { source: this.months, defaultValue: this.month, onChange: this.getValue.bind(this, 'month') })
                        ) : null,
                        dayVisible ? _react2.default.createElement(
                            'div',
                            { className: 'flex-1 h-full' },
                            _react2.default.createElement(_pickerView2.default, { source: this.days, defaultValue: this.day, onChange: this.getValue.bind(this, 'day'), ref: 'day' })
                        ) : null,
                        hourVisible ? _react2.default.createElement(
                            'div',
                            { className: 'flex-1 h-full' },
                            _react2.default.createElement(_pickerView2.default, { source: this.hours, defaultValue: this.hour, onChange: this.getValue.bind(this, 'hour') })
                        ) : null,
                        minuteVisible ? _react2.default.createElement(
                            'div',
                            { className: 'flex-1 h-full' },
                            _react2.default.createElement(_pickerView2.default, { source: this.minutes, defaultValue: this.minute, onChange: this.getValue.bind(this, 'minute') })
                        ) : null,
                        secondVisible ? _react2.default.createElement(
                            'div',
                            { className: 'flex-1 h-full' },
                            _react2.default.createElement(_pickerView2.default, { source: this.seconds, defaultValue: this.second, onChange: this.getValue.bind(this, 'second') })
                        ) : null
                    )
                )
            );
        }
    }], [{
        key: 'config',
        value: function config(options) {
            if (!this.node) {
                this.node = document.createElement('div');
                document.body.appendChild(this.node);
                this.node.remove();
            }
            options.visible = true;
            options.format = options.format || 'second';
            _reactDom2.default.render(_react2.default.createElement(DatePicker, options), this.node);
        } // 配置集合

    }]);

    return DatePicker;
}(_react.Component);

exports.default = DatePicker;