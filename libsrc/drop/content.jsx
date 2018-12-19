import React, { Component } from 'react'
import classNames from 'classnames'

export default class DropContent extends Component {
	isOpen = false
	
	componentWillMount () {
		const { ctrl } = this.props
		ctrl.on('monaDropCtrl', isOpen => {
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
			isOpen,
			ctrl,
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
