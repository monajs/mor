import React, { Component } from 'react'
import { MountRoot } from 'mona'

export default class Test extends Component {
	visible = false
	
	toggle () {
		this.visible = !this.visible
		this.setState({})
	}
	
	render () {
		return (
			<div>
				<div onClick={this.toggle.bind(this)}>open</div>
				<MountRoot visible={this.visible}>
					<div className="pos-f-full pos-f mount-root-modal flex-center" onClick={this.toggle.bind(this)}>弹层</div>
				</MountRoot>
			</div>
		)
	}
}
