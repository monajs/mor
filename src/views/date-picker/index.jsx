import React, { Component } from 'react'
import { DatePicker } from 'mona'
import PageModel from 'components/pageModel'
import DemoBlock from 'components/demoBlock'
import DemoButton from 'components/demoButton'
import Data from 'static/data'
import Util from 'core/util'

export default class Test extends Component {
	data = Data.getComponentItemInfo('datePicker')
	
	demo2Value = '2019-01-02 00:00:00'
	
	demo1 () {
		let defaultDate = Util.moment(this.demo1Value).valueOf()
		DatePicker.config({
			date: defaultDate,
			onConfirm: (data) => {
				this.demo1Value = Util.moment(data).format('YYYY-MM-DD HH:mm:ss')
				this.setState({})
			},
			onCancel: type => {
				Util.info(type)
			}
		})
	}
	
	demo2 () {
		let defaultDate = Util.moment(this.demo2Value).valueOf()
		DatePicker.config({
			format: 'second',
			date: defaultDate,
			onConfirm: (data) => {
				this.demo2Value = Util.moment(data).format('YYYY-MM-DD HH:mm:ss')
				this.setState({})
			}
		})
	}
	
	demo3Month () {
		let defaultDate = Util.moment(this.demo3MonthValue).valueOf()
		DatePicker.config({
			format: 'month',
			date: defaultDate,
			onConfirm: (data) => {
				this.demo3MonthValue = Util.moment(data).format('YYYY-MM')
				this.setState({})
			}
		})
	}
	
	demo3Day () {
		let defaultDate = Util.moment(this.demo3DayValue).valueOf()
		DatePicker.config({
			format: 'day',
			date: defaultDate,
			onConfirm: (data) => {
				this.demo3DayValue = Util.moment(data).format('YYYY-MM-DD')
				this.setState({})
			}
		})
	}
	
	demo3Hour () {
		let defaultDate = Util.moment(this.demo3HourValue).valueOf()
		DatePicker.config({
			format: 'hour',
			date: defaultDate,
			onConfirm: (data) => {
				this.demo3HourValue = Util.moment(data).format('YYYY-MM-DD HH')
				this.setState({})
			}
		})
	}
	
	demo3Minute () {
		let defaultDate = Util.moment(this.demo3MinuteValue).valueOf()
		DatePicker.config({
			format: 'minute',
			date: defaultDate,
			onConfirm: (data) => {
				this.demo3MinuteValue = Util.moment(data).format('YYYY-MM-DD HH:mm')
				this.setState({})
			}
		})
	}
	
	render () {
		return (
			<PageModel {...this.data}>
				<DemoBlock title="基础用法" desc="demo1 - 默认">
					<DemoButton className="w-full" onClick={this.demo1.bind(this)}>选择时间 {this.demo1Value}</DemoButton>
				</DemoBlock>
				<DemoBlock title="自定义用法" desc="demo2 - 初始化时间设定">
					<DemoButton className="w-full" onClick={this.demo2.bind(this)}>选择时间 {this.demo2Value}</DemoButton>
				</DemoBlock>
				<DemoBlock title="自定义用法" desc="demo3 - 指定时间格式">
					<DemoButton className="w-full" onClick={this.demo3Month.bind(this)}>获取到月 {this.demo3MonthValue}</DemoButton>
					<DemoButton className="w-full m-t-10" onClick={this.demo3Day.bind(this)}>获取到天 {this.demo3DayValue}</DemoButton>
					<DemoButton className="w-full m-t-10" onClick={this.demo3Hour.bind(this)}>获取到小时 {this.demo3HourValue}</DemoButton>
					<DemoButton className="w-full m-t-10" onClick={this.demo3Minute.bind(this)}>获取到分钟 {this.demo3MinuteValue}</DemoButton>
				</DemoBlock>
			</PageModel>
		)
	}
}
