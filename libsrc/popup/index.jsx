/**
 *    created by yangxi on 2018-07-25
 */

import React, { Component } from 'react'
import classNames from 'classnames'
import MountRoor from '../mount-root'
import Tool from '../tool'

export default class Popup extends Component {
	static defaultProps = {
		maskClosable: true
	}
	
	componentWillMount () {
		const { visible } = this.props
		visible && this.show()
	}
	
	visible = false
	
	showWrap = false
	
	componentWillReceiveProps (nextProps) {
		if (nextProps.visible === true) {
			this.show()
		} else if (nextProps.visible === false) {
			this.hide()
		}
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
		this.showWrap = false
		this.setState({})
	}
	
	// 遮罩层点击操作
	tapMask () {
		const { maskClosable, onClose } = this.props
		if (!maskClosable) {
			return
		}
		this.hide()
		onClose && onClose()
	}
	
	preventDefault (e) {
		e.preventDefault()
	}
	
	onMounted () {
		this.showWrap = true
		this.setState({})
	}
	
	render () {
		const {
			className,
			visible,
			placement,
			maskClosable,
			animate,
			onClose,
			children,
			...props
		} = this.props
		return (
			<MountRoor closeDelay={300} onMounted={this.onMounted.bind(this)} visible={this.visible}>
				<div className={classNames('mona-popup pos-f pos-f-full', {
					'have-animate': animate,
					'show-wrap': this.showWrap
				}, placement, className)} {...props}>
					<div className="mona-popup-mask pos-a pos-a-full" onClick={this.tapMask.bind(this)} onTouchMove={this.preventDefault.bind(this)}></div>
					<div className="mona-popup-wrap pos-a">
						{children}
					</div>
				</div>
			</MountRoor>
		)
	}
}
