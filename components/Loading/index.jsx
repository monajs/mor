// @flow
/**
 * @fileoverview Toast 组件
 * @author yangxi | 599321378@qq.com
 */

import * as React from 'react'
import { render } from 'react-dom'
import MountRoot from '../MountRoot'
import { isFunction } from '../tool'

type Props = {
	renderContent?: () => React.Node,           // 自定义 toast 底部  选填
	message: string
}

type State = {
	visible: boolean
}

class Loading extends React.PureComponent<Props, State> {
	static defaultProps = {
		message: '加载中'
	}

	static node: HTMLDivElement
	static loadingRef: { current: null | Loading } = React.createRef()

	static show (options: { [string]: any }) {
		if (!Loading.node) {
			Loading.node = document.createElement('div')
		}
		render(<Loading ref={Loading.loadingRef} {...options} />, Loading.node)
		Loading.loadingRef.current && Loading.loadingRef.current.show()
	}

	static hide () {
		Loading.loadingRef.current && Loading.loadingRef.current.hide()
	}

	state = {
		visible: false
	}

	show = () => {
		this.setState({
			visible: true
		})
	}

	hide = () => {
		this.setState({
			visible: false
		})
	}

	renderContent = () => {
		const { renderContent, message }:Props = this.props
		if (renderContent) {
			if (isFunction(renderContent)) {
				return renderContent()
			}
			return renderContent
		}
		return (
			<div className="mor-loading-wrap">
				<div className="mor-loading-icon" />
				{message}
			</div>
		)
	}

	render () {
		const { visible }:State = this.state
		return (
			<MountRoot visible={visible}>
				<div className="mor-loading">
					{this.renderContent()}
				</div>
			</MountRoot>
		)
	}
}

export default Loading
