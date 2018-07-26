import React, { Component } from 'react'
import { Popup } from 'mona'

export default class Test extends Component {
	visible = false
	
	open () {
		this.visible = true
		this.setState({})
	}
	close() {
		this.visible = false
		this.setState({})
	}
	
	render () {
		return (
			<div className="full">
				<div style={{height: '1200px'}} onClick={this.open.bind(this)}>open</div>
				<Popup visible={this.visible} placement="bottom">
					<div style={{ height: '286px' }} className="w-full bg-white">
						<button onClick={this.close.bind(this)}>关闭</button>
					</div>
				</Popup>
			</div>
		)
	}
}
