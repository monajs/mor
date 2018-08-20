'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tool = function () {
	function Tool() {
		_classCallCheck(this, Tool);
	}

	_createClass(Tool, [{
		key: 'pad',

		//数字填充,返回字符串，如将9填充为09
		value: function pad(num, n) {
			var l = ('' + num).length;
			return Array(n > l ? n - l + 1 : 0).join(0) + num;
		}
	}, {
		key: 'prefixList',
		value: function prefixList() {
			return ['transform', 'transition'];
		}
	}, {
		key: 'css',
		value: function css(dom, data) {
			if (!dom) {
				return;
			}
			//换个方式实现，性能应该会有比较大的提升
			var _data = this.parseStyleObj(data);
			Object.keys(_data).forEach(function (v) {
				dom.style.setProperty(v, _data[v]);
			});
		}
	}, {
		key: 'removeCss',
		value: function removeCss(dom, props) {
			if (!dom) {
				return;
			}
			dom.style.removeProperty(props);
			if (this.prefixList().indexOf(props) >= 0) {
				dom.style.removeProperty('-webkit-' + props);
			}
		}

		//将样式对象转化为可使用的样式对象

	}, {
		key: 'parseStyleObj',
		value: function parseStyleObj(data) {
			var _this = this;

			var cssNumber = ['columnCount', 'fillOpacity', 'fontWeight', 'lineHeight', 'opacity', 'order', 'orphans', 'widows', 'z-index', 'zoom'];

			var _data = _extends({}, data);
			Object.keys(_data).forEach(function (v) {
				if (_this.prefixList().indexOf(v) >= 0) {
					_data['-webkit-' + v] = _data[v];
				}
				if (typeof _data[v] === 'number' && cssNumber.indexOf(v) < 0) {
					_data[v] = _data[v] + 'px';
				}
			});
			return _data;
		}
	}, {
		key: 'addClass',
		value: function addClass(dom, cls) {
			var className = dom.className;
			var cArr = className.split(' ');
			var addArr = cls.split(' ');
			addArr.forEach(function (v) {
				if (cArr.indexOf(v) < 0) {
					cArr.push(v);
				}
			});
			dom.className = cArr.join(' ');
		}
	}, {
		key: 'removeClass',
		value: function removeClass(dom, cls) {
			var className = dom.className;
			var cArr = className.split(' ');
			var removeArr = cls.split(' ');
			cArr = cArr.filter(function (v) {
				return removeArr.indexOf(v) < 0;
			});
			dom.className = cArr.join(' ');
		}
	}, {
		key: 'preventScroll',
		value: function preventScroll() {
			this.addClass(document.body, 'o-h');
		}
	}, {
		key: 'cancelPreventScroll',
		value: function cancelPreventScroll() {
			this.removeClass(document.body, 'o-h');
		}
	}, {
		key: 'preLoadImages',
		value: function preLoadImages(arr) {
			var newImages = [];
			for (var i = 0; i < arr.length; i++) {
				newImages[i] = new Image();
				newImages[i].src = arr[i];
			}
		}
	}, {
		key: 'newArray',
		value: function newArray(start, end) {
			var result = [];
			for (var i = start; i < end; i++) {
				result.push(i);
			}
			return result;
		}
	}, {
		key: 'isPC',
		value: function isPC() {
			var userAgentInfo = navigator.userAgent;
			var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod'];
			var flag = true;
			for (var v = 0; v < Agents.length; v++) {
				if (userAgentInfo.indexOf(Agents[v]) > 0) {
					flag = false;
					break;
				}
			}
			return flag;
		}
	}]);

	return Tool;
}();

exports.default = new Tool();