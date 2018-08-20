'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *    created by yangxi on 2018-07-27
 */
var Generate = function () {
	function Generate() {
		_classCallCheck(this, Generate);
	}

	_createClass(Generate, [{
		key: 'years',

		// 生成年份数组
		value: function years() {
			var _years = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 15;

			var res = [];
			var startYear = new Date().getFullYear() - _years;
			for (var i = 0; i < _years * 2; i++) {
				res.push({
					name: startYear + i + '年',
					value: startYear + i + ''
				});
			}
			return res;
		}
	}, {
		key: 'months',
		value: function months() {
			var res = [];
			for (var i = 1; i <= 12; i++) {
				var v = this.pad(i, 2);
				res.push({
					name: v + '月',
					value: v
				});
			}
			return res;
		}
	}, {
		key: 'days',
		value: function days(year, month) {
			var res = [];
			var l = this.getDaysInOneMonth(year, month);
			for (var i = 1; i <= l; i++) {
				var v = this.pad(i, 2);
				res.push({
					name: v + '日',
					value: v
				});
			}
			return res;
		}
	}, {
		key: 'getDaysInOneMonth',
		value: function getDaysInOneMonth(year, month) {
			month = parseInt(month, 10);
			var d = new Date(year, month, 0);
			return d.getDate();
		}
	}, {
		key: 'hours',
		value: function hours() {
			var res = [];
			for (var i = 0; i < 24; i++) {
				var v = this.pad(i, 2);
				res.push({
					name: v + '时',
					value: v
				});
			}
			return res;
		}
	}, {
		key: 'minutes',
		value: function minutes() {
			var res = [];
			for (var i = 0; i < 60; i++) {
				var v = this.pad(i, 2);
				res.push({
					name: v + '分',
					value: v
				});
			}
			return res;
		}
	}, {
		key: 'seconds',
		value: function seconds() {
			var res = [];
			for (var i = 0; i < 60; i++) {
				var v = this.pad(i, 2);
				res.push({
					name: v + '秒',
					value: v
				});
			}
			return res;
		}

		// 日期对象控制器

	}, {
		key: 'generateCtrl',
		value: function generateCtrl() {
			var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'second';

			var res = {
				yearVisible: false,
				monthVisible: false,
				dayVisible: false,
				hourVisible: false,
				minuteVisible: false,
				secondVisible: false
			};
			for (var i in res) {
				res[i] = true;
				if (i.indexOf(format) > -1) {
					return res;
				}
			}
		}

		// 数字填充,返回字符串，如将9填充为09

	}, {
		key: 'pad',
		value: function pad(num, n) {
			var l = ('' + num).length;
			return Array(n > l ? n - l + 1 : 0).join(0) + num;
		}
	}]);

	return Generate;
}();

exports.default = new Generate();