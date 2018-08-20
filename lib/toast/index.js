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

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    created by yangxi on 2018-07-24
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Toast = function (_Component) {
	_inherits(Toast, _Component);

	function Toast() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Toast);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Toast.__proto__ || Object.getPrototypeOf(Toast)).call.apply(_ref, [this].concat(args))), _this), _this.visible = false, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Toast, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			Toast.instantce = this;
		}
	}, {
		key: 'render',
		// 控制展示

		value: function render() {
			var _props = this.props,
			    type = _props.type,
			    message = _props.message,
			    props = _objectWithoutProperties(_props, ['type', 'message']);

			return _react2.default.createElement(
				'div',
				{ className: 'mona-toast flex-center pos-f pos-f-full mona-anim-common' },
				_react2.default.createElement(
					'div',
					{ className: (0, _classnames2.default)('mona-toast-content pos-f', type) },
					type === 'success' ? _react2.default.createElement(
						'div',
						{ className: 'mona-toast-icon' },
						_react2.default.createElement('div', { className: 'success-img' })
					) : null,
					type === 'error' ? _react2.default.createElement(
						'div',
						{ className: 'mona-toast-icon' },
						_react2.default.createElement('div', { className: 'error-img' })
					) : null,
					message
				)
			);
		}
	}], [{
		key: 'config',
		value: function config(options) {
			var _this2 = this;

			if (!this.node) {
				this.node = document.createElement('div');
				document.body.appendChild(this.node);
			}
			var _options$duration = options.duration,
			    duration = _options$duration === undefined ? 2000 : _options$duration;

			_reactDom2.default.render(_react2.default.createElement(Toast, options), this.node);
			clearTimeout(this.timeout);
			this.timeout = setTimeout(function () {
				_reactDom2.default.unmountComponentAtNode(_this2.node);
				_this2.node.remove();
				delete _this2.node;
			}, duration);
		}
	}]);

	return Toast;
}(_react.Component);

exports.default = Toast;