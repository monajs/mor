import React, { Component } from 'react'
import classNames from 'classnames'
import DropTitle from './title'
import DropContent from './content'

export default class Drop extends Component {
	static title = DropTitle
	static content = DropContent
	
	render () {
		const {
			className,
			isOpen,
			children,
			...props
		} = this.props
		
		let child = children
		child = React.Children.map(children, (v) => {
			if (!v) {
				return
			}
			if (v.type === DropTitle) {
				return React.cloneElement(v, { isOpen: isOpen })
			} else {
				return v
			}
		})
		
		return (
			<div className={classNames('mona-drop', className)} {...props}>
				{child}
			</div>
		)
	}
}
