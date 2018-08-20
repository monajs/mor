'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    created by yangxi on 2018-07-19
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MountRoot = function (_Component) {
	_inherits(MountRoot, _Component);

	function MountRoot() {
		_classCallCheck(this, MountRoot);

		return _possibleConstructorReturn(this, (MountRoot.__proto__ || Object.getPrototypeOf(MountRoot)).apply(this, arguments));
	}

	_createClass(MountRoot, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.visible) {
				this.mountRoot(this.props);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			//卸载
			if (!this.node) {
				return;
			}
			_reactDom2.default.unmountComponentAtNode(this.node);
			this.node.remove();
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var _this2 = this;

			//显示
			if (nextProps.visible && !this.props.visible) {
				this.mountRoot(nextProps);
			}
			//卸载
			if (this.props.visible && !nextProps.visible) {
				if (this.props.closeDelay) {
					this.domRender(nextProps);
				}
				setTimeout(function () {
					_reactDom2.default.unmountComponentAtNode(_this2.node);
					_this2.node.remove();
				}, this.props.closeDelay);
			} else if (nextProps.visible) {
				this.domRender(nextProps);
			}
		}
	}, {
		key: 'mountRoot',
		value: function mountRoot(props) {
			var onMounted = props.onMounted,
			    getContainer = props.getContainer,
			    className = props.className;

			this.node = document.createElement('div');
			this.node.className = className || '';
			var rootDom = document.body;
			getContainer && (rootDom = getContainer());
			rootDom.appendChild(this.node);
			this.domRender(props);
			setTimeout(function () {
				onMounted && onMounted();
			}, 10);
		}
	}, {
		key: 'domRender',
		value: function domRender(props) {
			_reactDom2.default.render(props.children, this.node);
		}
	}, {
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return MountRoot;
}(_react.Component);

MountRoot.defaultProps = {
	closeDelay: 0 //延迟关闭时间(毫秒)
};
exports.default = MountRoot;