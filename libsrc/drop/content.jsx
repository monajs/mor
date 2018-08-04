import React, { Component } from 'react'
import classNames from 'classnames'
import DropCtrl from './ctrl'

export default class DropContent extends Component {
	isOpen = false
	eventName = this.props.eventName
	
	componentWillMount () {
		DropCtrl.on(this.eventName, isOpen => {
			if (this.isOpen === isOpen) {
				return
			}
			this.isOpen = isOpen
			this.setState({})
		})
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
			<div className={classNames('mona-drop-content', className, { 'open': this.isOpen })} {...props}>
				{children}
			</div>
		)
	}
}
