'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('../events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabsCtrl = function (_Events) {
	_inherits(TabsCtrl, _Events);

	function TabsCtrl() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, TabsCtrl);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TabsCtrl.__proto__ || Object.getPrototypeOf(TabsCtrl)).call.apply(_ref, [this].concat(args))), _this), _this.itemKeyList = [], _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(TabsCtrl, [{
		key: 'setTabItemKey',
		// 控制tabsItem的加载

		value: function setTabItemKey(key) {
			if (this.itemKeyList.indexOf(key) !== -1) {
				return;
			}
			this.itemKeyList.push(key);
		}
	}, {
		key: 'getTabsItemKey',
		value: function getTabsItemKey() {
			return this.itemKeyList;
		}
	}]);

	return TabsCtrl;
}(_events2.default);

exports.default = TabsCtrl;