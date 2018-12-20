import React, { Component } from 'react'
import classnames from 'classnames'
import { MountRoot } from 'mor'

export default class Home extends Component {
	visible = false
	render () {
		return (
			<div className={classnames('page-home flex-center', { 'test': true })}>
				<div onClick={() => {
					this.visible = !this.visible
					this.setState({})
				}}>321
				</div>
				<MountRoot
					closeDelay={100}
					onNodeMount={() => {
						console.log('onNodeMount')
					}}
					onNodeUnmount={() => {
						console.log('onNodeUnmount')
					}}
					visible={this.visible}>
					123
				</MountRoot>
			</div>
		)
	}
}
