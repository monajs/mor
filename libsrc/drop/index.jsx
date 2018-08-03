import React, { Component } from 'react'
import classNames from 'classnames'
import DropTitle from './title'
import DropContent from './content'
import DropCtrl from './ctrl'

export default class Drop extends Component {
	static title = DropTitle
	static content = DropContent
	
	eventName = 'monaDropCtrl_' + this.props.name
	
	componentWillMount () {
		const { onChange, name } = this.props
		if (!name && name !== 0) {
			throw new Error('name 不允许为空，在同一页面中请对多个 drop 组件使用各不相同的 name 值')
		}
		DropCtrl.on(this.eventName, isOpen => {
			onChange && onChange(isOpen, name)
		})
	}
	
	render () {
		const {
			className,
			isOpen,
			onChange,
			name,
			children,
			...props
		} = this.props
		
		let child = children
		child = React.Children.map(children, (v) => {
			if (!v) {
				return
			}
			if (v.type === DropTitle || v.type === DropContent) {
				return React.cloneElement(v, { isOpen: isOpen, name: name })
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
