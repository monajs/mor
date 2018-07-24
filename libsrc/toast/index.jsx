/**
 *    created by yangxi on 2018-07-24
 */

import React, { Component } from 'react'
import classNames from 'classnames'
import ReactDOM from 'react-dom'

export default class Toast extends Component {
	static config (options) {
		if (!this.node) {
			this.node = document.createElement('div')
			document.body.appendChild(this.node)
		}
		const { duration = 3000 } = options
		ReactDOM.render(<Toast {...options} />, this.node)
		clearTimeout(this.timeout)
		this.timeout = setTimeout(() => {
			ReactDOM.unmountComponentAtNode(this.node)
			this.node.remove()
			delete this.node
		}, duration)
	}
	
	componentDidMount () {
		Toast.instantce = this
	}
	
	visible = false // 控制展示
	
	render () {
		const {
			type,
			message,
			...props
		} = this.props
		return (
			<div className="mona-toast flex-center pos-f pos-f-full mona-anim-common">
				<div className={classNames('mona-toast-content pos-f', type)}>
					<If condition={type === 'success'}>
						<div className="mona-toast-icon">
							<div className="success-img"></div>
						</div>
					</If>
					<If condition={type === 'error'}>
						<div className="mona-toast-icon">
							<div className="error-img"></div>
						</div>
					</If>
					{message}
				</div>
			</div>
		)
	}
}
