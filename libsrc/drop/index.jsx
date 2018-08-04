import React, { Component } from 'react'
import classNames from 'classnames'
import DropTitle from './title'
import DropContent from './content'
import DropCtrl from './ctrl'

export default class Drop extends Component {
	static title = DropTitle
	static content = DropContent
	
	static defaultProps = {
		isOpen: false
	}
	
	componentWillMount () {
		this.eventName = 'monaDropCtrl_' + this._reactInternalInstance._currentElement.key
		const { onChange } = this.props
		
		DropCtrl.on(this.eventName, isOpen => {
			onChange && onChange(isOpen)
		})
	}
	
	render () {
		const {
			className,
			isOpen,
			onChange,
			children,
			...props
		} = this.props
		
		let child = children
		child = React.Children.map(children, (v) => {
			if (!v) {
				return
			}
			if (v.type === DropTitle || v.type === DropContent) {
				return React.cloneElement(v, { isOpen: isOpen, eventName: this.eventName })
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
