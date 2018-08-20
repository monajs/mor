'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    created by yangxi on 2018-07-25
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ModalSelect = function (_Component) {
	_inherits(ModalSelect, _Component);

	function ModalSelect() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, ModalSelect);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ModalSelect.__proto__ || Object.getPrototypeOf(ModalSelect)).call.apply(_ref, [this].concat(args))), _this), _this.visible = false, _this.selectedIndex = -1, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(ModalSelect, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var visible = this.props.visible;

			this.setOptions(this.props);
			visible && this.show();
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.visible === this.visible) {
				return;
			}
			this.selectedIndex = -1;
			this.setOptions(nextProps);

			if (nextProps.visible === true) {
				this.show();
			} else if (nextProps.visible === false) {
				this.hide();
			}
		}

		// 初始化数据处理

	}, {
		key: 'setOptions',
		value: function setOptions(props) {
			var _this2 = this;

			var source = props.source,
			    isKv = props.isKv,
			    valueKey = props.valueKey,
			    defaultValue = props.defaultValue;

			source.forEach(function (item, index) {
				if (isKv) {
					if ((typeof defaultValue === 'undefined' ? 'undefined' : _typeof(defaultValue)) === 'object') {
						item[valueKey] === defaultValue[valueKey] && (_this2.selectedIndex = index);
					} else {
						item[valueKey] === defaultValue && (_this2.selectedIndex = index);
					}
				} else {
					item === defaultValue && (_this2.selectedIndex = index);
				}
			});
		}
	}, {
		key: 'select',
		value: function select(index) {
			if (index === this.selectedIndex) {
				return;
			}
			this.selectedIndex = index;
			this.setState({});
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
			var _props = this.props,
			    onConfirm = _props.onConfirm,
			    source = _props.source;

			this.selectedIndex !== -1 && onConfirm && onConfirm(source[this.selectedIndex]);
			this.hide();
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    isKv = _props2.isKv,
			    nameKey = _props2.nameKey,
			    source = _props2.source;

			return _react2.default.createElement(
				_popup2.default,
				{ visible: this.visible, placement: 'bottom', onClose: this.onCancel.bind(this, 'mask') },
				_react2.default.createElement(
					'div',
					{ className: 'mona-modal-select w-full' },
					_react2.default.createElement(
						'div',
						{ className: 'mona-modal-select-header d-f mona-b-b' },
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
						{ className: 'mona-modal-select-body o-a' },
						source.map(function (item, index) {
							return _react2.default.createElement(
								'div',
								{
									key: index,
									className: (0, _classnames2.default)('mona-modal-select-item flex-center-y pos-r', { 'selected': index === this.selectedIndex }),
									onClick: this.select.bind(this, index) },
								isKv ? item[nameKey] : item
							);
						}, this)
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
			_reactDom2.default.render(_react2.default.createElement(ModalSelect, options), this.node);
		}
	}]);

	return ModalSelect;
}(_react.Component);

ModalSelect.defaultProps = {
	isKv: true, // 数据结构类型
	nameKey: 'name', //  目前没用
	valueKey: 'value',
	source: []
};
exports.default = ModalSelect;