/**
 *    created by yangxi on 2018-07-24
 *    弹框组件（包含dialog）
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import MountRoot from '../mount-root'
import Tool from '../tool'
import Confirm from './confirm'

export default class Modal extends Component {
	static defaultProps = {
		cancelText: '取消',
		confirmText: '确定',
		footer: true,
		enableCancel: true,
		maskClosable: true,
		isHaveMask: true	// 是否需要mask
	}
	
	static confirm (options = {}) {
		options.visible = true
		if (!Modal.modalConfirmNode) {
			Modal.modalConfirmNode = document.createElement('div')
			document.body.appendChild(Modal.modalConfirmNode)
			Modal.modalConfirmNode.remove() 	// 多余的节点，当容器用
		}
		
		ReactDOM.render(<Confirm options={options} />, Modal.modalConfirmNode)
	}
	
	visible = false
	
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
		}
	}
	
	componentWillUnmount () {
		this.visible = false
	}
	
	preventDefault (e) {
		e.preventDefault()
	}
	
	show () {
		Tool.preventScroll()
		this.visible = true
		this.setState({})
	}
	
	// 隐藏
	hide () {
		Tool.cancelPreventScroll()
		this.visible = false
		this.setState({})
	}
	
	// 确认操作
	confirm () {
		const { onConfirm } = this.props
		onConfirm && onConfirm()
		this.hide()
	}
	
	// 取消操作
	cancel (type) {
		const { onCancel } = this.props
		onCancel && onCancel(type)
		this.hide()
	}
	
	// 遮罩层点击操作
	tapMask () {
		const { maskClosable } = this.props
		if (!maskClosable) {
			return
		}
		this.cancel('mask')
	}
	
	render () {
		const {
			visible,
			maskClosable,
			onConfirm,
			onCancel,
			isHaveMask,
			className,
			title,
			footer,
			enableCancel,
			cancelText,
			confirmText,
			children,
			...props
		} = this.props
		
		return (
			<MountRoot visible={this.visible}>
				<div className={classNames('mona-modal pos-f pos-f-full flex-center', className)} onTouchMove={this.preventDefault.bind(this)} {...props}>
					<If condition={isHaveMask}>
						<div className="mona-modal-mask pos-a pos-a-full" onClick={this.tapMask.bind(this)}></div>
					</If>
					<div className="mona-modal-wrap pos-r">
						<If condition={title}>
							<div className="mona-modal-header">{title}</div>
						</If>
						<div className={classNames('mona-modal-body mona-b-b title', { 'no-title': !title })}>
							{children}
						</div>
						<If condition={footer}>
							<div className="mona-modal-footer d-f">
								<If condition={enableCancel}>
									<div className="flex-1 cancel h-full flex-center mona-b-r" onClick={this.cancel.bind(this, 'button')}>{cancelText}</div>
								</If>
								<div className="flex-1 confirm h-full flex-center" onClick={this.confirm.bind(this)}>{confirmText}</div>
							</div>
						</If>
					</div>
				</div>
			</MountRoot>
		)
	}
}
