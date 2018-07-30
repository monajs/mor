import React, { Component } from 'react'
import { DatePickerRange } from 'mona'
import Util from 'core/util'

export default class Test extends Component {
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
			<div>
				<div onClick={this.open.bind(this)}>open</div>
			</div>
		)
	}
}
