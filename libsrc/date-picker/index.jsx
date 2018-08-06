/**
 *    created by yangxi
 *    时间选择器
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Popup from '../popup'
import PickerView from '../picker-view'
import Generate from '../tool/generate'

export default class DatePicker extends Component {
	static config (options) {
		if (!this.node) {
			this.node = document.createElement('div')
			document.body.appendChild(this.node)
			this.node.remove()
		}
		options.visible = true
		options.format = options.format || 'second'
		ReactDOM.render(<DatePicker {...options} />, this.node)
	}
	
	visible = false
	options = {}	// 配置集合
	years = []
	months = []
	days = []
	minutes = []
	seconds = []
	
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
			this.setDefault()
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
		
		const { yearVisible, monthVisible, hourVisible, minuteVisible, secondVisible } = this.options
		yearVisible && (this.years = this.options.years || Generate.years(15))
		monthVisible && (this.months = this.options.months || Generate.months())
		hourVisible && (this.hours = this.options.hours || Generate.hours())
		minuteVisible && (this.minutes = this.options.minutes || Generate.minutes())
		secondVisible && (this.seconds = this.options.seconds || Generate.seconds())
		
		this.setDefault()
	}
	
	setDefault () {
		const { dayVisible } = this.options
		const date = this.options.date ? new Date(this.options.date) : new Date()
		this.year = date.getFullYear() + ''
		this.month = Generate.pad(date.getMonth() + 1, 2)
		this.day = Generate.pad(date.getDate(), 2)
		this.hour = Generate.pad(date.getHours(), 2)
		this.minute = Generate.pad(date.getMinutes(), 2)
		this.second = Generate.pad(date.getSeconds(), 2)
		
		dayVisible && (this.days = Generate.days(this.year, this.month))
	}
	
	getValue (type, val) {
		this[type] = val.value
		if (this.options.dayVisible && (type === 'year' || type === 'month')) {
			const days = Generate.days(this.year, this.month)
			if (days.length === this.days.length) {
				return
			}
			this.days = days
			this.refs.day.setData(this.days)
		}
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
		const { dayVisible, hourVisible, minuteVisible, secondVisible, onConfirm } = this.options
		const { year, month } = this
		const day = dayVisible ? this.day : '01'
		const hour = hourVisible ? this.hour : '00'
		const minute = minuteVisible ? this.minute : '00'
		const second = secondVisible ? this.second : '00'
		const date = new Date(year, month - 1, day, hour, minute, second).getTime()
		
		onConfirm && onConfirm(date)
		this.hide()
	}
	
	render () {
		const { yearVisible, monthVisible, dayVisible, hourVisible, minuteVisible, secondVisible } = this.options
		return (
			<Popup visible={this.visible} placement="bottom" onClose={this.onCancel.bind(this, 'mask')}>
				<div className="mona-date-picker w-full">
					<div className="mona-date-picker-header d-f mona-b-b">
						<div className="flex-1 item flex-center-y" onClick={this.onCancel.bind(this, 'button')}>取消</div>
						<div className="flex-1 item flex-center-y flex-right-x" onClick={this.onConfirm.bind(this)}>确认
						</div>
					</div>
					<div className="mona-date-picker-wrap d-f">
						<If condition={yearVisible}>
							<div className="flex-1 h-full">
								<PickerView source={this.years} defaultValue={this.year} onChange={this.getValue.bind(this, 'year')} />
							</div>
						</If>
						<If condition={monthVisible}>
							<div className="flex-1 h-full">
								<PickerView source={this.months} defaultValue={this.month} onChange={this.getValue.bind(this, 'month')} />
							</div>
						</If>
						<If condition={dayVisible}>
							<div className="flex-1 h-full">
								<PickerView source={this.days} defaultValue={this.day} onChange={this.getValue.bind(this, 'day')} ref="day" />
							</div>
						</If>
						<If condition={hourVisible}>
							<div className="flex-1 h-full">
								<PickerView source={this.hours} defaultValue={this.hour} onChange={this.getValue.bind(this, 'hour')} />
							</div>
						</If>
						<If condition={minuteVisible}>
							<div className="flex-1 h-full">
								<PickerView source={this.minutes} defaultValue={this.minute} onChange={this.getValue.bind(this, 'minute')} />
							</div>
						</If>
						<If condition={secondVisible}>
							<div className="flex-1 h-full">
								<PickerView source={this.seconds} defaultValue={this.second} onChange={this.getValue.bind(this, 'second')} />
							</div>
						</If>
					</div>
				</div>
			</Popup>
		)
	}
}
