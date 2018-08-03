import React, { Component } from 'react'
import classNames from 'classnames'
import DropCtrl from './ctrl'

export default class DropContent extends Component {
	isOpen = false
	eventName = 'monaDropCtrl_' + this.props.name
	
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
			name,
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
