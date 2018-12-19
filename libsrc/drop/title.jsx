import React, { Component } from 'react'
import classNames from 'classnames'

export default class DropTitle extends Component {
	componentDidMount () {
		const { ctrl } = this.props
		this.isOpen = this.props.isOpen
		ctrl.emit('monaDropCtrl', this.isOpen)
	}
	
	ctrlContent () {
		const { ctrl } = this.props
		this.isOpen = !this.isOpen
		ctrl.emit('monaDropCtrl', this.isOpen)
	}
	
	render () {
		const {
			className,
			eventName,
			isOpen,
			ctrl,
			children,
			...props
		} = this.props
		
		return (
			<div className={classNames('mona-drop-title', className)} onClick={this.ctrlContent.bind(this)} {...props}>
				{children}
			</div>
		)
	}
}
