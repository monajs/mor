// @flow
/**
 * @fileoverview MountRoot 组件
 * @author yangxi | 599321378@qq.com
 */

import * as React from 'react'
import { createPortal } from 'react-dom'

type Props = {
	rootNode?: HTMLElement,                       // 节点挂载的位置  选填
	visible: boolean,                             // 节点是否进行挂载  必填
	closeDelay?: ?number,                          // 节点延迟销毁的时间  选填
	children: React.Node,                         // 子节点内容  必填
	onMounted?: () => mixed,                      // 组件挂载结束后的执行回调  选填
	onUnmount?: () => mixed,                      // 组件卸载开始前的执行回调  选填
	onNodeMount?: () => mixed,                    // 节点挂载成功后的执行回调  选填
	beforeNodeUnmount?: () => mixed,              // 节点卸载开始前的执行回调  选填
	onNodeUnmount?: () => mixed                   // 节点卸载成功后的执行回调  选填
}

type State = {
	isMounted: boolean
}

class MountRoot extends React.PureComponent<Props, State> {
	constructor (props: Props) {
		super(props)
		this.state.isMounted = props.visible
		this.generateProtalContainer()
	}

	componentDidMount () {
		const { visible, onMounted, onNodeMount }: Props = this.props
		if (visible) {
			onNodeMount && onNodeMount()
		}

		onMounted && onMounted()
	}

	componentDidUpdate (prevProps: Props, prevState: State) {
		const { visible, closeDelay, beforeNodeUnmount }: Props = this.props
		const { isMounted } = this.state
		if (visible === prevState.isMounted) {
			return
		}
		if (visible && !isMounted) {
			this.mountNode()
		} else if (!visible && isMounted) {
			beforeNodeUnmount && beforeNodeUnmount()
			if (closeDelay) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.unmuntNode()
				}, closeDelay)
			} else {
				this.unmuntNode()
			}
		}
	}

	componentWillUnmount () {
		const { onUnmount }: Props = this.props
		onUnmount && onUnmount()
	}

	state = {}

	/* eslint-disable no-undef */
	timer: TimeoutID = setTimeout(() => {}, 30)
	/* eslint-disable no-undef */
	portalContainer: Element

	generateProtalContainer = () => {
		const { rootNode } = this.props
		if (rootNode) {
			this.portalContainer = rootNode
		} else {
			const portalId = 'mount-portal'
			this.portalContainer = document.body.querySelector(`#${portalId}`)
			if (!this.portalContainer) {
				this.portalContainer = document.createElement('div')
				this.portalContainer.id = portalId
				document.body.appendChild(this.portalContainer)
			}
		}
	}

	/**
	 * 节点挂载
	 */
	mountNode = () => {
		const { onNodeMount }: Props = this.props
		this.setState({
			isMounted: true
		}, onNodeMount)
	}

	/**
	 * 节点卸载
	 */
	unmuntNode = () => {
		const { onNodeUnmount }: Props = this.props
		this.setState({
			isMounted: false
		}, onNodeUnmount)
	}

	render () {
		const { children }: Props = this.props
		const { isMounted } = this.state

		if (isMounted && this.portalContainer) {
			return createPortal(
				children,
				this.portalContainer
			)
		}
		return null
	}
}

export default MountRoot
