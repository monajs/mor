/**
 *    created by yangxi
 *    时间选择器
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import DateItem from './item'
import Popup from '../popup'
import Generate from '../tool/generate'

export default class DatePickerRange extends Component {
    static config (options) {
        if (!this.node) {
            this.node = document.createElement('div')
            document.body.appendChild(this.node)
            this.node.remove()
        }
        options.visible = true
        options.format = options.format || 'day'
        options.date = Object.assign({}, options.date)
        ReactDOM.render(<DatePickerRange {...options} />, this.node)
    }
    
    visible = false
    options = {}	// 配置集合
    
    componentWillMount () {
        const format = this.props.format
        this.setOptions(format)
        const { visible } = this.props
        visible && this.show()
    }
    
    componentWillReceiveProps (nextProps) {
        if (nextProps.visible === this.visible) {
            return
        }
        
        this.options.onConfirm = nextProps.onConfirm
        this.options.onCancel = nextProps.onCancel
        
        if (nextProps.date !== this.options.date) {
            this.options.date = nextProps.date
        }
        if (nextProps.format !== this.options.format) {
            this.options.format = nextProps.format
            this.setOptions(this.options.format, 'update')
        }
        if (nextProps.visible === true) {
            this.show()
        } else if (nextProps.visible === false) {
            this.hide()
        }
    }
    
    setOptions (format, type) {
        const ctrl = Generate.generateCtrl(format)
        if (type === 'update') {
            this.options = Object.assign(this.options, ctrl)
        } else {
            this.options = Object.assign({}, this.props, ctrl)
        }
        
        this.options.years = this.options.years || Generate.years(15)
        this.options.months = this.options.months || Generate.months()
    }
    
    show () {
        this.visible = true
        this.setState({})
    }
    
    // 隐藏
    hide () {
        this.visible = false
        this.setState({})
    }
    
    onCancel (type) {
        const { onCancel } = this.props
        this.hide()
        onCancel && onCancel(type)
        
    }
    
    onConfirm () {
        const { onConfirm } = this.options
        const start = this.getValue('dateItemStart')
        const end = this.getValue('dateItemEnd')
        
        onConfirm && onConfirm({
            start: start,
            end: end
        })
        this.hide()
    }
    
    getValue (key) {
        const { dayVisible } = this.options
        let { year, month, day } = this.refs[key].getValue()
        day = dayVisible ? day : '01'
        return (key === 'dateItemStart') ? new Date(year, month - 1, day, 0, 0, 0).getTime() : new Date(year, month - 1, day, 23, 59, 59).getTime()
    }
    
    render () {
        return (
            <Popup visible={this.visible} placement="bottom" onClose={this.onCancel.bind(this, 'mask')}>
                <div className="mona-date-picker-range w-full">
                    <div className="mona-date-picker-range-header d-f mona-b-b">
                        <div className="flex-1 item flex-center-y" onClick={this.onCancel.bind(this, 'button')}>取消</div>
                        <div className="flex-1 item flex-center-y flex-right-x" onClick={this.onConfirm.bind(this)}>确认
                        </div>
                    </div>
                    <div className="mona-date-picker-range-wrap full d-f">
                        <DateItem className="flex-1 h-full" {...this.options} itemKey="start" ref="dateItemStart" />
                        <div className="mona-date-picker-range-to"></div>
                        <DateItem className="flex-1 h-full" {...this.options} options={this.options} itemKey="end" ref="dateItemEnd" />
                    </div>
                </div>
            </Popup>
        )
    }
}
