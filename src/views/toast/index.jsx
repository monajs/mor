import React, { Component } from 'react'
import { Toast } from 'mona'

export default class Test extends Component {
	visible = false
	
	open () {
		Toast.config({
			message: 123,
			duration: 1500,
			type: 'error'
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
