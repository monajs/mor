import React, { Component } from 'react'
import { Modal } from 'mona'

export default class Test extends Component {
	visible = false
	
	open () {
		// this.visible = true
		// this.setState({})
		Modal.confirm({
			title: 123,
			content: 321,
			confirmText: '知道了',
			cancelText: '不要了',
			onConfirm () {
				console.log('ds')
			},
			onCancel (type) {
				console.log(type)
			}
		})
	}
	
	confirm () {
		console.log('confirm')
	}
	
	cancel (type) {
		console.log(type)
	}
	
	render () {
		return (
			<div>
				<div style={{height: '1000px'}} onClick={this.open.bind(this)}>open</div>
				<Modal
					visible={this.visible}
					title="<span>header</span>"
					confirmText="知道了"
					cancelText="不要了"
					onCancel={this.cancel.bind(this)}
					onConfirm={this.confirm.bind(this)}>
					<img src="https://avatars3.githubusercontent.com/u/13312192?s=40&v=4" alt="" />
					<div>sd</div>
				</Modal>
			</div>
		)
	}
}
