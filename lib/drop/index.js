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

var _title = require('./title');

var _title2 = _interopRequireDefault(_title);

var _content = require('./content');

var _content2 = _interopRequireDefault(_content);

var _ctrl = require('./ctrl');

var _ctrl2 = _interopRequireDefault(_ctrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Drop = function (_Component) {
	_inherits(Drop, _Component);

	function Drop(props) {
		_classCallCheck(this, Drop);

		var _this = _possibleConstructorReturn(this, (Drop.__proto__ || Object.getPrototypeOf(Drop)).call(this, props));

		_this.ctrl = new _ctrl2.default();
		return _this;
	}

	_createClass(Drop, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var onChange = this.props.onChange;


			this.ctrl.on('monaDropCtrl', function (isOpen) {
				onChange && onChange(isOpen);
			});
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.ctrl.off('monaDropCtrl');
		}
	}, {
		key: 'optionChildren',
		value: function optionChildren(props) {
			var _this2 = this;

			var children = props.children,
			    _props$isOpen = props.isOpen,
			    isOpen = _props$isOpen === undefined ? false : _props$isOpen;

			return _react2.default.Children.map(children, function (v) {
				if (!v) {
					return;
				}
				if (v.type === _title2.default || v.type === _content2.default) {
					return _react2.default.cloneElement(v, { isOpen: isOpen || false, ctrl: _this2.ctrl });
				} else {
					if (v.props && v.props.children) {
						return _react2.default.cloneElement(v, { children: _this2.optionChildren(v.props) });
					}
					return v;
				}
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    isOpen = _props.isOpen,
			    onChange = _props.onChange,
			    children = _props.children,
			    props = _objectWithoutProperties(_props, ['className', 'isOpen', 'onChange', 'children']);

			var child = this.optionChildren(this.props);

			return _react2.default.createElement(
				'div',
				_extends({ className: (0, _classnames2.default)('mona-drop', className) }, props),
				child
			);
		}
	}]);

	return Drop;
}(_react.Component);

Drop.title = _title2.default;
Drop.content = _content2.default;
Drop.defaultProps = {
	isOpen: false
};
exports.default = Drop;