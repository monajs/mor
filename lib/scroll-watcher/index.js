'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _monaEvents = require('mona-events');

var _monaEvents2 = _interopRequireDefault(_monaEvents);

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollWatcher = function (_Events) {
    _inherits(ScrollWatcher, _Events);

    function ScrollWatcher(props) {
        _classCallCheck(this, ScrollWatcher);

        var _this = _possibleConstructorReturn(this, (ScrollWatcher.__proto__ || Object.getPrototypeOf(ScrollWatcher)).call(this, props));

        _this.EMIT_EVENT_NAME = 'mona_scroll_watcher_emit';
        _this.options = {
            watcherInterval: 200 // 滚动检测时间间隔


            // 参数校验
        };

        _this.options = _extends({}, _this.options, props);
        _this._verify();
        _this._bindEvents();
        return _this;
    }

    _createClass(ScrollWatcher, [{
        key: '_verify',
        value: function _verify() {
            var wrap = this.options.wrap;

            if (!wrap) {
                throw new Error('滚动监听的容器不允许为空！');
            }
        }

        // 绑定滚动事件

    }, {
        key: '_bindEvents',
        value: function _bindEvents() {
            var wrap = this.options.wrap;

            wrap.addEventListener('scroll', this._scroll.bind(this), false);
        }

        // 滚动事件

    }, {
        key: '_scroll',
        value: function _scroll(e) {
            var _this2 = this;

            if (this.isTiming) {
                return;
            }
            this.isTiming = true;
            var watcherInterval = this.options.watcherInterval;

            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                _this2.emit(_this2.EMIT_EVENT_NAME, e);
                _this2.isTiming = false;
            }, watcherInterval);
        }
    }, {
        key: 'render',
        value: function render() {
            return null;
        }
    }]);

    return ScrollWatcher;
}(_monaEvents2.default);

ScrollWatcher.item = _item2.default;
exports.default = ScrollWatcher;