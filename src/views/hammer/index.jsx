import React, { Component } from 'react'
import { Hammer } from 'mona'

export default class Test extends Component {
	pan (e) {
		console.log(e)
		e.preventDefault()
	}
	
	render () {
		return (
			<Hammer
				pan={this.pan.bind(this)}
				className="full">
			</Hammer>
		)
	}
}
