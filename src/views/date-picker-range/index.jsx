import React, { Component } from 'react'
import { DatePickerRange } from 'mona'
import PageModel from 'components/pageModel'
import DemoBlock from 'components/demoBlock'
import DemoButton from 'components/demoButton'
import Data from 'static/data'
import Util from 'core/util'

export default class Test extends Component {
	data = Data.getComponentItemInfo('datePickerRange')
	
	demo1 () {
		DatePickerRange.config({
			onConfirm: (data) => {
				this.demo1Start = Util.moment(data.start).format('YYYY-MM-DD')
				this.demo1End = Util.moment(data.end).format('YYYY-MM-DD')
				this.setState({})
			},
			onCancel: type => {
				console.log(type)
			}
		})
	}
	
	demo2Start = '2018-01-02'
	demo2End = '2019-02-08'
	
	demo2 () {
		let start = Util.moment(this.demo2Start).valueOf()
		let end = Util.moment(this.demo2End).valueOf()
		DatePickerRange.config({
			date: {
				start,
				end
			},
			onConfirm: (data) => {
				this.demo2Start = Util.moment(data.start).format('YYYY-MM-DD')
				this.demo2End = Util.moment(data.end).format('YYYY-MM-DD')
				this.setState({})
			}
		})
	}
	
	demo3Month () {
		let start = Util.moment(this.demo3MonthStart).valueOf()
		let end = Util.moment(this.demo3MonthEnd).valueOf()
		DatePickerRange.config({
			format: 'month',
			date: {
				start,
				end
			},
			onConfirm: (data) => {
				this.demo3MonthStart = Util.moment(data.start).format('YYYY-MM')
				this.demo3MonthEnd = Util.moment(data.end).format('YYYY-MM')
				this.setState({})
			}
		})
	}
	
	demo3Year () {
		let start = Util.moment(this.demo3YearStart).valueOf()
		let end = Util.moment(this.demo3YearEnd).valueOf()
		DatePickerRange.config({
			format: 'year',
			date: {
				start,
				end
			},
			onConfirm: (data) => {
				this.demo3YearStart = Util.moment(data.start).format('YYYY')
				this.demo3YearEnd = Util.moment(data.end).format('YYYY')
				this.setState({})
			}
		})
	}
	
	open () {
		let start = Util.moment(this.start).valueOf()
		let end = Util.moment(this.end).valueOf()
		
		DatePickerRange.config({
			date: {
				start: start,
				end: end
			},
			onConfirm: (data) => {
				this.start = Util.moment(data.start).format('YYYY-MM-DD')
				this.end = Util.moment(data.end).format('YYYY-MM-DD')
				console.log(Util.moment(data.start).format('YYYY-MM-DD HH:mm:ss'))
				console.log(Util.moment(data.end).format('YYYY-MM-DD HH:mm:ss'))
			},
			onCancel: (type) => {
				console.log(type)
			}
		})
	}
	
	render () {
		return (
			<PageModel {...this.data}>
				<DemoBlock title="基础用法" desc="demo1 - 默认">
					<DemoButton className="w-full" onClick={this.demo1.bind(this)}>选择时间 {this.demo1Start}至{this.demo1End}</DemoButton>
				</DemoBlock>
				<DemoBlock title="自定义用法" desc="demo2 - 初始化时间设定">
					<DemoButton className="w-full" onClick={this.demo2.bind(this)}>选择时间 {this.demo2Start}至{this.demo2End}</DemoButton>
				</DemoBlock>
				<DemoBlock title="自定义用法" desc="demo3 - 指定时间格式">
					<DemoButton className="w-full" onClick={this.demo3Year.bind(this)}>获取到月年 {this.demo3YearStart}至{this.demo3YearEnd}</DemoButton>
					<DemoButton className="w-full m-t-10" onClick={this.demo3Month.bind(this)}>获取到月 {this.demo3MonthStart}至{this.demo3MonthEnd}</DemoButton>
				</DemoBlock>
			</PageModel>
		)
	}
}
