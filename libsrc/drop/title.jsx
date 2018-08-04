import React, { Component } from 'react'
import classNames from 'classnames'
import DropCtrl from './ctrl'

export default class DropTitle extends Component {
	eventName = this.props.eventName
	
	componentDidMount () {
		this.isOpen = this.props.isOpen
		DropCtrl.emit(this.eventName, this.isOpen)
	}
	
	ctrlContent () {
		this.isOpen = !this.isOpen
		DropCtrl.emit(this.eventName, this.isOpen)
	}
	
	render () {
		const {
			className,
			eventName,
			isOpen,
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
