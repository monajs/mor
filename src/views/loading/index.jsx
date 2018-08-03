import React, { Component } from 'react'
import { Loading, MountRoot } from 'mona'

export default class Test extends Component {
	open () {
		Loading.show()
		setTimeout(() => {
			Loading.hide()
		}, 2000)
	}
	
	render () {
		return (
			<div onClick={this.open.bind(this)}>open</div>
		)
	}
}
