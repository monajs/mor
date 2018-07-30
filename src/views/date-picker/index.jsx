import React, { Component } from 'react'
import { DatePicker } from 'mona'
import Util from 'core/util'

export default class Test extends Component {
	open () {
		let defaultDate = Util.moment(this.value).valueOf()
		DatePicker.config({
			format: 'second',
			date: defaultDate,
			onConfirm: (data) => {
				this.value = Util.moment(data).format('YYYY-MM-DD HH:mm:ss')
			},
			onCancel: type => {
				
				console.log(type)
			}
		})
	}
	
	render () {
		return (
			<div>
				<div onClick={this.open.bind(this)}>open</div>
			</div>
		)
	}
}
