/**
 *    created by yangxi on 2018-07-30
 */

import React, { Component } from 'react'
import classNames from 'classnames'
import PickerView from '../picker-view'
import Generate from '../tool/generate'

export default class DatePickerRangeItem extends Component {
	options = {}	// 配置集合
	years = []
	months = []
	days = []
	year = ''
	month = ''
	day = ''
	
	componentWillMount () {
		this.setOptions()
	}
	
	setOptions () {
		const { format } = this.props
		const ctrl = Generate.generateCtrl(format)
		this.options = Object.assign({}, this.props, ctrl)
		
		this.years = this.options.years || Generate.years(15)
		this.months = this.options.months || Generate.months()
		
		this.setDefault()
	}
	
	setDefault () {
		const { itemKey } = this.props
		const date = this.options.date[itemKey] ? new Date(this.options.date[itemKey]) : new Date()
		this.year = date.getFullYear() + ''
		this.month = Generate.pad(date.getMonth() + 1, 2)
		this.day = Generate.pad(date.getDate(), 2)
		
		this.days = Generate.days(this.year, this.month)
	}
	
	_getValue (type, val) {
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
	
	getValue () {
		return {
			year: this.year,
			month: this.month,
			day: this.day
		}
	}
	
	render () {
		const { yearVisible, monthVisible, dayVisible, className } = this.options
		return (
			<div className={classNames('mona-date-picker-range-item flex-center', className)}>
				<If condition={yearVisible}>
					<div className="mona-date-picker-range-year h-full">
						<PickerView source={this.years} defaultValue={this.year} onChange={this._getValue.bind(this, 'year')} />
					</div>
				</If>
				<If condition={monthVisible}>
					<div className="flex-1 h-full">
						<PickerView source={this.months} defaultValue={this.month} onChange={this._getValue.bind(this, 'month')} />
					</div>
				</If>
				<If condition={dayVisible}>
					<div className="flex-1 h-full">
						<PickerView source={this.days} defaultValue={this.day} onChange={this._getValue.bind(this, 'day')} ref="day" />
					</div>
				</If>
			</div>
		)
	}
}
