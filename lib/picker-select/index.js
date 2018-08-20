'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

var _pickerView = require('../picker-view');

var _pickerView2 = _interopRequireDefault(_pickerView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    created by yangxi on 2018-07-27
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var PickerSelect = function (_Component) {
	_inherits(PickerSelect, _Component);

	function PickerSelect() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, PickerSelect);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PickerSelect.__proto__ || Object.getPrototypeOf(PickerSelect)).call.apply(_ref, [this].concat(args))), _this), _this.visible = false, _this.mainData = null, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(PickerSelect, [{
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
		key: 'select',
		value: function select(data) {
			this.mainData = data;
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
			var onConfirm = this.props.onConfirm;

			onConfirm && onConfirm(this.mainData);
			this.hide();
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    isKv = _props.isKv,
			    nameKey = _props.nameKey,
			    source = _props.source,
			    valueKey = _props.valueKey,
			    defaultValue = _props.defaultValue;

			return _react2.default.createElement(
				_popup2.default,
				{ visible: this.visible, placement: 'bottom', onClose: this.onCancel.bind(this, 'mask') },
				_react2.default.createElement(
					'div',
					{ className: 'mona-picker-select w-full' },
					_react2.default.createElement(
						'div',
						{ className: 'mona-picker-select-header d-f mona-b-b' },
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
						{ className: 'mona-picker-select-wrap o-a' },
						_react2.default.createElement(_pickerView2.default, {
							source: source,
							isKv: isKv,
							nameKey: nameKey,
							valueKey: valueKey,
							defaultValue: defaultValue,
							onChange: this.select.bind(this) })
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
			_reactDom2.default.render(_react2.default.createElement(PickerSelect, options), this.node);
		}
	}]);

	return PickerSelect;
}(_react.Component);

PickerSelect.defaultProps = {
	isKv: true, // 数据结构类型
	nameKey: 'name', //  目前没用
	valueKey: 'value',
	source: []
};
exports.default = PickerSelect;