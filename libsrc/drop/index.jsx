import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import classNames from 'classnames'
import DropTitle from './title'
import DropContent from './content'
import DropCtrl from './ctrl'
import './index.less'

export default class Drop extends Component {
	constructor (props) {
		super(props)
		this.ctrl = new DropCtrl
	}
	
	static title = DropTitle
	static content = DropContent
	
	static defaultProps = {
		isOpen: false
	}
	
	componentWillMount () {
		const { onChange } = this.props
		
		this.ctrl.on('monaDropCtrl', isOpen => {
			onChange && onChange(isOpen)
		})
	}
	
	componentWillUnmount () {
		this.ctrl.off('monaDropCtrl')
	}
	
	optionChildren (props) {
		const { children, isOpen = false } = props
		return React.Children.map(children, v => {
			if (!v) {
				return
			}
			if (v.type === DropTitle || v.type === DropContent) {
				return React.cloneElement(v, { isOpen: isOpen || false, ctrl: this.ctrl })
			} else {
				if (v.props && v.props.children) {
					return React.cloneElement(v, { children: this.optionChildren(v.props) })
				}
				return v
			}
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
		
		let child = this.optionChildren(this.props)
		
		return (
			<div className={classNames('mona-drop', className)} {...props}>
				{child}
			</div>
		)
	}
}
