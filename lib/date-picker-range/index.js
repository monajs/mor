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

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

var _generate = require('../tool/generate');

var _generate2 = _interopRequireDefault(_generate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    created by yangxi
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    时间选择器
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var DatePickerRange = function (_Component) {
    _inherits(DatePickerRange, _Component);

    function DatePickerRange() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, DatePickerRange);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DatePickerRange.__proto__ || Object.getPrototypeOf(DatePickerRange)).call.apply(_ref, [this].concat(args))), _this), _this.visible = false, _this.options = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(DatePickerRange, [{
        key: 'componentWillMount',
        // 配置集合

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

            this.options.years = this.options.years || _generate2.default.years(15);
            this.options.months = this.options.months || _generate2.default.months();
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

            this.hide();
            onCancel && onCancel(type);
        }
    }, {
        key: 'onConfirm',
        value: function onConfirm() {
            var onConfirm = this.options.onConfirm;

            var start = this.getValue('dateItemStart');
            var end = this.getValue('dateItemEnd');

            onConfirm && onConfirm({
                start: start,
                end: end
            });
            this.hide();
        }
    }, {
        key: 'getValue',
        value: function getValue(key) {
            var dayVisible = this.options.dayVisible;

            var _refs$key$getValue = this.refs[key].getValue(),
                year = _refs$key$getValue.year,
                month = _refs$key$getValue.month,
                day = _refs$key$getValue.day;

            day = dayVisible ? day : '01';
            return key === 'dateItemStart' ? new Date(year, month - 1, day, 0, 0, 0).getTime() : new Date(year, month - 1, day, 23, 59, 59).getTime();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _popup2.default,
                { visible: this.visible, placement: 'bottom', onClose: this.onCancel.bind(this, 'mask') },
                _react2.default.createElement(
                    'div',
                    { className: 'mona-date-picker-range w-full' },
                    _react2.default.createElement(
                        'div',
                        { className: 'mona-date-picker-range-header d-f mona-b-b' },
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
                        { className: 'mona-date-picker-range-wrap full d-f' },
                        _react2.default.createElement(_item2.default, _extends({ className: 'flex-1 h-full' }, this.options, { itemKey: 'start', ref: 'dateItemStart' })),
                        _react2.default.createElement('div', { className: 'mona-date-picker-range-to' }),
                        _react2.default.createElement(_item2.default, _extends({ className: 'flex-1 h-full' }, this.options, { options: this.options, itemKey: 'end', ref: 'dateItemEnd' }))
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
            options.format = options.format || 'day';
            options.date = _extends({}, options.date);
            _reactDom2.default.render(_react2.default.createElement(DatePickerRange, options), this.node);
        }
    }]);

    return DatePickerRange;
}(_react.Component);

exports.default = DatePickerRange;