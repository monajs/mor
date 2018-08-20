'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *    created by yangxi on 2018-08-05
 *    单页面提供唯一key
 */

var KeyGenerate = function () {
	function KeyGenerate() {
		_classCallCheck(this, KeyGenerate);

		this.keyList = [];
		this.nameSpace = 'mona_key';
		this.start = 1000;
	}

	_createClass(KeyGenerate, [{
		key: 'getMonaKey',
		value: function getMonaKey() {
			this.start += 1;
			var key = this.nameSpace + '_' + this.start;
			this.keyList.push(key);
			return key;
		}
	}, {
		key: 'isKeyAvailable',
		value: function isKeyAvailable(key) {
			return this.keyList.indexOf(key) !== -1;
		}
	}]);

	return KeyGenerate;
}();

exports.default = new KeyGenerate();