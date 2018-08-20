'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _wrap = require('./wrap');

var _wrap2 = _interopRequireDefault(_wrap);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _mountRoot = require('../mount-root');

var _mountRoot2 = _interopRequireDefault(_mountRoot);

var _tool = require('../tool');

var _tool2 = _interopRequireDefault(_tool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    created by yangxi on 2018-08-03
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    loading组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Loading = function (_Component) {
	_inherits(Loading, _Component);

	function Loading() {
		_classCallCheck(this, Loading);

		return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
	}

	_createClass(Loading, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    template = _props.template,
			    isHaveMask = _props.isHaveMask,
			    loadingText = _props.loadingText,
			    props = _objectWithoutProperties(_props, ['template', 'isHaveMask', 'loadingText']);

			return _react2.default.createElement(
				_mountRoot2.default,
				{ visible: true },
				_react2.default.createElement(
					'div',
					{ className: (0, _classnames2.default)('mona-loading pos-f pos-f-full flex-center', { 'mask': isHaveMask }) },
					template ? template : null,
					!template ? _react2.default.createElement(_wrap2.default, { loadingText: loadingText }) : null
				)
			);
		}
	}], [{
		key: 'show',
		value: function show(config) {
			if (!this.node) {
				this.node = document.createElement('div');
				document.body.appendChild(this.node);
				this.node.remove();
			}
			_tool2.default.preventScroll();
			_reactDom2.default.render(_react2.default.createElement(Loading, config), this.node);
		}
	}, {
		key: 'hide',
		value: function hide() {
			_tool2.default.cancelPreventScroll();
			_reactDom2.default.unmountComponentAtNode(this.node);
		}
	}]);

	return Loading;
}(_react.Component);

Loading.defaultProps = {
	isHaveMask: false,
	loadingText: '加载中'
};
exports.default = Loading;