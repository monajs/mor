/**
 *    created by yangxi on 2018-07-25
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import Popup from '../popup'

export default class ModalSelect extends Component {
	static defaultProps = {
		isKv: true,	// 数据结构类型
		nameKey: 'name',	//  目前没用
		valueKey: 'value',
		source: []
	}
	
	static config (options) {
		if (!this.node) {
			this.node = document.createElement('div')
			document.body.appendChild(this.node)
			this.node.remove()
		}
		options.visible = true
		ReactDOM.render(<ModalSelect {...options} />, this.node)
	}
	
	visible = false
	selectedIndex = -1
	
	componentWillMount () {
		const { visible } = this.props
		this.setOptions()
		visible && this.show()
	}
	
	componentWillReceiveProps (nextProps) {
		if (nextProps.visible === this.visible) {
			return
		}
		if (nextProps.visible === true) {
			this.show()
		} else if (nextProps.visible === false) {
			this.hide()
		}
	}
	
	// 初始化数据处理
	setOptions () {
		const { source, isKv, valueKey, defaultValue } = this.props
		source.forEach((item, index) => {
			if (isKv) {
				if (typeof defaultValue === 'object') {
					item[valueKey] === defaultValue[valueKey] && (this.selectedIndex = index)
				} else {
					item[valueKey] === defaultValue && (this.selectedIndex = index)
				}
			} else {
				item === defaultValue && (this.selectedIndex = index)
			}
		})
	}
	
	select (index) {
		if (index === this.selectedIndex) {
			return
		}
		this.selectedIndex = index
		this.setState({})
	}
	
	show () {
		this.visible = true
		this.setState({})
	}
	
	// 隐藏
	hide () {
		this.visible = false
		this.setState({})
	}
	
	onCancel (type) {
		const { onCancel } = this.props
		this.hide()
		onCancel && onCancel(type)
		
	}
	
	onConfirm () {
		const { onConfirm, source } = this.props
		this.selectedIndex !== -1 && onConfirm && (onConfirm(source[this.selectedIndex]))
		this.hide()
	}
	
	render () {
		const { isKv, nameKey, source } = this.props
		return (
			<Popup visible={this.visible} placement="bottom" onClose={this.onCancel.bind(this, 'mask')}>
				<div className="mona-modal-select w-full">
					<div className="mona-modal-select-header d-f mona-b-b">
						<div className="flex-1 item flex-center-y" onClick={this.onCancel.bind(this, 'button')}>取消</div>
						<div className="flex-1 item flex-center-y flex-right-x" onClick={this.onConfirm.bind(this)}>确认
						</div>
					</div>
					<div className="mona-modal-select-body o-a">
						<For of={source} each="item" index="index">
							<div
								key={index}
								className={classNames('mona-modal-select-item flex-center-y pos-r', { 'selected': index === this.selectedIndex })}
								onClick={this.select.bind(this, index)}>
								{isKv ? item[nameKey] : item}
							</div>
						</For>
					
					</div>
				</div>
			</Popup>
		)
	}
}
