'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _hammer = require('../hammer');

var _hammer2 = _interopRequireDefault(_hammer);

var _tool = require('../tool');

var _tool2 = _interopRequireDefault(_tool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListView = function (_Component) {
    _inherits(ListView, _Component);

    function ListView() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ListView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListView.__proto__ || Object.getPrototypeOf(ListView)).call.apply(_ref, [this].concat(args))), _this), _this.startY = 0, _this.startScrollTop = 0, _this.status = 0, _this.top = 0, _this.touching = false, _this.infiniting = false, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ListView, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                enableInfinite = _props.enableInfinite,
                enableRefresh = _props.enableRefresh,
                onRefresh = _props.onRefresh,
                onInfinite = _props.onInfinite;

            if (enableRefresh && !onRefresh) {
                throw new Error('允许下拉的情况下（enableRefresh: true），onRefresh 回调函数不允许为空');
            }
            if (enableInfinite && !onInfinite) {
                throw new Error('允许加载更多的情况下（enableInfinite: true），onInfinite 回调函数不允许为空');
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            ListView.instance = this;
            this.container = (0, _reactDom.findDOMNode)(this.refs.container);
            this.wrap = this.refs.wrap;
            this.refreshIcon = this.refs.refreshIcon;
            this.footerWrap = this.refs.footerWrap;
        } // 起点的位置
        // 开始touch事件时的scrollTop值
        // 0-下降状态以及初始状态、1-上升状态、2-停止状态，正在刷新

    }, {
        key: 'panstart',
        // 加载更多区块处理状态中

        value: function panstart(e) {
            var angleAbs = Math.abs(e.angle);
            this.startScrollTop = this.container.scrollTop || 0;
            if (e.velocityY > 0 && this.startScrollTop <= 0) {
                e.preventDefault();
            }
            if (angleAbs > 45 && angleAbs < 135) {
                _tool2.default.removeClass(this.wrap, 'mona-list-view-transition');
                this.startY = e.center.y;
                this.touching = true;
            }
        }
    }, {
        key: 'panmove',
        value: function panmove(e) {
            var diff = e.center.y - this.startY - this.startScrollTop;
            if (diff > 0) {
                e.preventDefault();
            }

            var _props2 = this.props,
                enableRefresh = _props2.enableRefresh,
                offset = _props2.offset;

            if (!enableRefresh || this.container.scrollTop > 0 || !this.touching) {
                return;
            }

            this.top = Math.pow(diff, 0.8) + (this.status === 2 ? offset : 0); // 弹性阻尼
            this.setHeaderPosition();

            if (this.status === 2) {
                return;
            }
            if (this.top >= offset) {
                this.status = 1; // 位移过程中，超过header高度
            } else {
                this.status = 0; // 位移过程中，未超过header高度
            }
        }
    }, {
        key: 'panend',
        value: function panend(e) {
            var _props3 = this.props,
                enableRefresh = _props3.enableRefresh,
                offset = _props3.offset;

            if (!enableRefresh || !this.touching) {
                return;
            }
            _tool2.default.addClass(this.wrap, 'mona-list-view-transition');
            this.touching = false;

            if (this.status === 2) {
                this.top = offset;
                this.setHeaderPosition();
                return;
            }

            if (this.top >= offset) {
                // 执行刷新
                this.status = 2;
                this.top = offset;
                this.refresh();
            } else {
                this.status = 0;
                this.top = 0;
            }
            this.setHeaderPosition();
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            var onRefresh = this.props.onRefresh;

            _tool2.default.addClass(this.refreshIcon, 'animate');
            onRefresh && onRefresh(this.refreshDone.bind(this));
        }

        // 刷新结束钩子函数，回调

    }, {
        key: 'refreshDone',
        value: function refreshDone() {
            this.status = 0;
            this.top = 0;
            _tool2.default.removeClass(this.refreshIcon, 'animate');
            this.setHeaderPosition();
        }
    }, {
        key: 'scroll',
        value: function scroll(e) {
            var _this2 = this;

            var _props4 = this.props,
                enableRefresh = _props4.enableRefresh,
                offset = _props4.offset,
                enableInfinite = _props4.enableInfinite,
                infiniteTimer = _props4.infiniteTimer,
                isEnd = _props4.isEnd,
                bottomEmit = _props4.bottomEmit;

            if (!enableInfinite || this.infiniting) {
                return;
            }
            if (isEnd) {
                return;
            }
            if (this.isTiming) {
                return;
            }
            this.isTiming = true;

            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                _this2.containerHeight = _this2.containerHeight || _this2.container.clientHeight;
                _this2.sectionHeight = _this2.sectionHeight || _this2.wrap.clientHeight;
                var scrollTop = _this2.container.scrollTop;
                _this2.headerHeight = _this2.headerHeight || (enableRefresh ? offset : 0);
                _this2.footerHeight = _this2.footerHeight || _this2.footerWrap.clientHeight;
                var bottom = _this2.sectionHeight - _this2.containerHeight - scrollTop - _this2.headerHeight;
                if (bottom < _this2.footerHeight + bottomEmit) {
                    _this2.infinite();
                }
                _this2.isTiming = false;
            }, infiniteTimer);
        }
    }, {
        key: 'infinite',
        value: function infinite() {
            var onInfinite = this.props.onInfinite;

            this.infiniting = true;
            onInfinite && onInfinite(this.infiniteDone.bind(this));
        }
    }, {
        key: 'infiniteDone',
        value: function infiniteDone() {
            this.infiniting = false;
        }

        // 头部下拉刷新区块位移

    }, {
        key: 'setHeaderPosition',
        value: function setHeaderPosition() {
            _tool2.default.css(this.wrap, {
                'will-change': 'transform',
                transform: this.top ? 'translateY(' + this.top + 'px)' : 'none'
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props5 = this.props,
                offset = _props5.offset,
                enableRefresh = _props5.enableRefresh,
                enableInfinite = _props5.enableInfinite,
                isEnd = _props5.isEnd,
                children = _props5.children,
                style = _props5.style;

            // section 区块向上初始化隐藏位移

            var sectionSty = { top: -offset
                // header 下拉刷新区块高度
            };var headerSty = { height: offset };

            return _react2.default.createElement(
                _hammer2.default,
                {
                    className: 'mona-list-view full o-a pos-r',
                    panstart: this.panstart.bind(this),
                    panmove: this.panmove.bind(this),
                    panend: this.panend.bind(this),
                    scroll: this.scroll.bind(this),
                    style: style,
                    ref: 'container' },
                _react2.default.createElement(
                    'section',
                    { className: 'mona-list-view-section pos-a w-full', style: sectionSty, ref: 'wrap' },
                    enableRefresh ? _react2.default.createElement(
                        'header',
                        { className: 'list-view-refresh flex-center', style: headerSty },
                        _react2.default.createElement('div', { ref: 'refreshIcon', className: 'list-view-refresh-icon' })
                    ) : null,
                    children,
                    enableInfinite && !isEnd ? _react2.default.createElement(
                        'footer',
                        { className: 'list-view-infinite', ref: 'footerWrap' },
                        _react2.default.createElement('div', { className: 'list-view-infinite-icon block-center' })
                    ) : null
                )
            );
        }
    }], [{
        key: 'toTop',


        // 返回顶部
        value: function toTop() {
            ListView.instance.container.scrollTop = 0;
        }
    }]);

    return ListView;
}(_react.Component);

ListView.defaultProps = {
    offset: 50,
    bottomEmit: 100,
    infiniteTimer: 200, // 上拉加载更多检测频率
    enableInfinite: true,
    enableRefresh: true,
    isEnd: false };
exports.default = ListView;