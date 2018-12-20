// @flow
/**
 * @fileoverview Toast 组件
 * @author yangxi | 599321378@qq.com
 */

import * as React from 'react'
import { render } from 'react-dom'
import MountRoot from '../MountRoot'
import classnames from 'classnames'
import { isFunction } from '../tool'

type Props = {
	renderContent?: () => React.Node,           // 自定义 toast 底部  选填
	type: 'info' | 'success' | 'error' | 'warn',
	duration: number,
	message: string
}

type State = {
	visible: boolean
}

class Toast extends React.PureComponent<Props, State> {
	static node: HTMLDivElement
	static toastRef: { current: null | Toast } = React.createRef()

	static config (options: { [string]: any }) {
		if (!Toast.node) {
			Toast.node = document.createElement('div')
		}
		options = Object.assign({
			type: 'info',
			duration: 2000
		}, options)
		render(<Toast ref={Toast.toastRef} {...options} />, Toast.node)
		Toast.toastRef.current && Toast.toastRef.current.show()
	}

	static success (options: { [string]: any }) {
		Toast.config(Object.assign({}, options, { type: 'success' }))
	}

	static error (options: { [string]: any }) {
		Toast.config(Object.assign({}, options, { type: 'error' }))
	}

	static info (options: { [string]: any }) {
		Toast.config(options)
	}

	constructor (props: Props) {
		super(props)
		this.handleError()
	}

	/* eslint-disable no-undef */
	timer: TimeoutID = setTimeout(() => {}, 30)
	/* eslint-disable no-undef */

	state = {
		visible: false
	}

	handleError = () => {
		const { message }: Props = this.props
		if (undefined === message) {
			throw new Error('提示信息不允许为空')
		}
	}

	show = () => {
		const { duration }: Props = this.props
		this.setState({
			visible: true
		}, () => {
			clearTimeout(this.timer)
			this.timer = setTimeout(this.hide, duration)
		})
	}

	hide = () => {
		this.setState({
			visible: false
		})
	}

	renderContent = () => {
		const { renderContent, message, type }:Props = this.props
		if (renderContent) {
			if (isFunction(renderContent)) {
				return renderContent()
			}
			return renderContent
		}
		return (
			<div className={classnames('mor-toast-wrap', type)}>
				{
					type && type !== 'info' &&
					<div className="mor-toast-icon" />
				}
				{message}
			</div>
		)
	}

	render () {
		const { visible }:State = this.state
		return (
			<MountRoot visible={visible}>
				<div className="mor-toast">
					{this.renderContent()}
				</div>
			</MountRoot>
		)
	}
}

export default Toast
