import Events from 'mona-events'
import Item from './item'

export default class ScrollWatcher extends Events {
    static item = Item
    
    constructor (props) {
        super(props)
        this.options = Object.assign({}, this.options, props)
        this._verify()
        this._bindEvents()
    }
    
    EMIT_EVENT_NAME = 'mona_scroll_watcher_emit'
    
    options = {
        watcherInterval: 200 // 滚动检测时间间隔
    }
    
    // 参数校验
    _verify () {
        const { wrap } = this.options
        if (!wrap) {
            throw new Error('滚动监听的容器不允许为空！')
        }
    }
    
    // 绑定滚动事件
    _bindEvents () {
        const { wrap } = this.options
        wrap.addEventListener('scroll', this._scroll.bind(this), false)
    }
    
    // 滚动事件
    _scroll (e) {
        if (this.isTiming) {
            return
        }
        this.isTiming = true
        const { watcherInterval } = this.options
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.emit(this.EMIT_EVENT_NAME, e)
            this.isTiming = false
        }, watcherInterval)
    }
}
