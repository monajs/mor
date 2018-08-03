import React, { Component } from 'react'
import classNames from 'classnames'
import DropCtrl from './ctrl'

export default class DropTitle extends Component {
	componentDidMount () {
		this.isOpen = this.props.isOpen
		DropCtrl.emit('monaDropCtrl', this.isOpen)
	}
	
	ctrlContent () {
		this.isOpen = !this.isOpen
		DropCtrl.emit('monaDropCtrl', this.isOpen)
	}
	
	render () {
		const {
			className,
			children,
			...props
		} = this.props
		
		return (
			<div className={classNames('mona-drop-title', className)} onClick={this.ctrlContent.bind(this)}>
				{children}
			</div>
		)
	}
}
