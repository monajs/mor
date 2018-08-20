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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _mountRoot = require('../mount-root');

var _mountRoot2 = _interopRequireDefault(_mountRoot);

var _tool = require('../tool');

var _tool2 = _interopRequireDefault(_tool);

var _confirm = require('./confirm');

var _confirm2 = _interopRequireDefault(_confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    created by yangxi on 2018-07-24
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    弹框组件（包含dialog）
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Modal = function (_Component) {
	_inherits(Modal, _Component);

	function Modal() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Modal);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.visible = false, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Modal, [{
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
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.visible = false;
		}
	}, {
		key: 'preventDefault',
		value: function preventDefault(e) {
			e.preventDefault();
		}
	}, {
		key: 'show',
		value: function show() {
			_tool2.default.preventScroll();
			this.visible = true;
			this.setState({});
		}

		// 隐藏

	}, {
		key: 'hide',
		value: function hide() {
			_tool2.default.cancelPreventScroll();
			this.visible = false;
			this.setState({});
		}

		// 确认操作

	}, {
		key: 'confirm',
		value: function confirm() {
			var onConfirm = this.props.onConfirm;

			onConfirm && onConfirm();
			this.hide();
		}

		// 取消操作

	}, {
		key: 'cancel',
		value: function cancel(type) {
			var onCancel = this.props.onCancel;

			onCancel && onCancel(type);
			this.hide();
		}

		// 遮罩层点击操作

	}, {
		key: 'tapMask',
		value: function tapMask() {
			var maskClosable = this.props.maskClosable;

			if (!maskClosable) {
				return;
			}
			this.cancel('mask');
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    visible = _props.visible,
			    maskClosable = _props.maskClosable,
			    onConfirm = _props.onConfirm,
			    onCancel = _props.onCancel,
			    isHaveMask = _props.isHaveMask,
			    className = _props.className,
			    title = _props.title,
			    footer = _props.footer,
			    enableCancel = _props.enableCancel,
			    cancelText = _props.cancelText,
			    confirmText = _props.confirmText,
			    children = _props.children,
			    props = _objectWithoutProperties(_props, ['visible', 'maskClosable', 'onConfirm', 'onCancel', 'isHaveMask', 'className', 'title', 'footer', 'enableCancel', 'cancelText', 'confirmText', 'children']);

			return _react2.default.createElement(
				_mountRoot2.default,
				{ visible: this.visible },
				_react2.default.createElement(
					'div',
					_extends({ className: (0, _classnames2.default)('mona-modal pos-f pos-f-full flex-center', className), onTouchMove: this.preventDefault.bind(this) }, props),
					isHaveMask ? _react2.default.createElement('div', { className: 'mona-modal-mask pos-a pos-a-full', onClick: this.tapMask.bind(this) }) : null,
					_react2.default.createElement(
						'div',
						{ className: 'mona-modal-wrap pos-r' },
						title ? _react2.default.createElement(
							'div',
							{ className: 'mona-modal-header' },
							title
						) : null,
						_react2.default.createElement(
							'div',
							{ className: (0, _classnames2.default)('mona-modal-body mona-b-b title', { 'no-title': !title }) },
							children
						),
						footer ? _react2.default.createElement(
							'div',
							{ className: 'mona-modal-footer d-f' },
							enableCancel ? _react2.default.createElement(
								'div',
								{ className: 'flex-1 cancel h-full flex-center mona-b-r', onClick: this.cancel.bind(this, 'button') },
								cancelText
							) : null,
							_react2.default.createElement(
								'div',
								{ className: 'flex-1 confirm h-full flex-center', onClick: this.confirm.bind(this) },
								confirmText
							)
						) : null
					)
				)
			);
		}
	}], [{
		key: 'confirm',
		value: function confirm() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			options.visible = true;
			if (!Modal.modalConfirmNode) {
				Modal.modalConfirmNode = document.createElement('div');
				document.body.appendChild(Modal.modalConfirmNode);
				Modal.modalConfirmNode.remove(); // 多余的节点，当容器用
			}

			_reactDom2.default.render(_react2.default.createElement(_confirm2.default, { options: options }), Modal.modalConfirmNode);
		}
	}]);

	return Modal;
}(_react.Component);

Modal.defaultProps = {
	cancelText: '取消',
	confirmText: '确定',
	footer: true,
	enableCancel: true,
	maskClosable: true,
	isHaveMask: true // 是否需要mask
};
exports.default = Modal;