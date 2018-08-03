import React, { Component } from 'react'
import classNames from 'classnames'
import DropCtrl from './ctrl'

export default class DropContent extends Component {
	isOpen = false
	
	componentWillMount () {
		DropCtrl.on('monaDropCtrl', isOpen => {
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
			children,
			...props
		} = this.props
		
		return (
			<div className={classNames('mona-drop-content', className, { 'open': this.isOpen })}>
				{children}
			</div>
		)
	}
}
