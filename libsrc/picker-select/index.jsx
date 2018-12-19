/**
 *    created by yangxi on 2018-07-27
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Popup from '../popup'
import PickerView from '../picker-view'

export default class PickerSelect extends Component {
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
		ReactDOM.render(<PickerSelect {...options} />, this.node)
	}
	
	visible = false
	mainData = null
	
	componentWillMount () {
		const { visible } = this.props
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
	
	select (data) {
		this.mainData = data
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
		const { onConfirm } = this.props
		onConfirm && (onConfirm(this.mainData))
		this.hide()
	}
	
	render () {
		const { isKv, nameKey, source, valueKey, defaultValue } = this.props
		return (
			<Popup visible={this.visible} placement="bottom" onClose={this.onCancel.bind(this, 'mask')}>
				<div className="mona-picker-select w-full">
					<div className="mona-picker-select-header d-f mona-b-b">
						<div className="flex-1 item flex-center-y" onClick={this.onCancel.bind(this, 'button')}>取消</div>
						<div className="flex-1 item flex-center-y flex-right-x" onClick={this.onConfirm.bind(this)}>确认
						</div>
					</div>
					<div className="mona-picker-select-wrap o-a">
						<PickerView
							source={source}
							isKv={isKv}
							nameKey={nameKey}
							valueKey={valueKey}
							defaultValue={defaultValue}
							onChange={this.select.bind(this)} />
					</div>
				</div>
			</Popup>
		)
	}
}
