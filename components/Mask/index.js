// @flow
/**
 * @fileoverview Mask 组件
 * @author yangxi | 599321378@qq.com
 */

import * as React from 'react'
import MountRoot from '../MountRoot'
import classnames from 'classnames'

type Props = {
	visible: boolean,                     // 是否打卡蒙层  必填
	rootNode?: HTMLElement,                // 挂载节点或者选择器 选填
	fade: boolean,                        // 是否需要渐变效果  选填
	fadeTime: number,                     // 如果有渐变效果，则渐变时间  选填
	children: React.Node,                 // 子节点内容  必填
	className?: string,                   // 节点class样式  选填
	style?: {},                           // 节点style样式  选填
	transparent: boolean,                 // 是否透明背景  选填
	onMounted?: () => mixed,              // 组件挂载成功后的执行回调  选填
	onUnmount?: () => mixed,              // 组件卸载开始前的执行回调  选填
	onHide?: () => mixed,                 // 组件隐藏后的执行回调  选填
	onShow?: () => mixed,                 // 组件显示后的执行回调  选填
	onTap?: () => mixed                   // 组件蒙层的点击执行回调  选填
}

type State = {}

class Mask extends React.PureComponent<Props, State> {
	static defaultProps = {
		fade: false,
		transparent: false,
		fadeTime: 200
	}

	componentDidMount () {
		const { onMounted }: Props = this.props
		onMounted && onMounted()
	}

	componentWillUnmount () {
		const { onUnmount }: Props = this.props
		onUnmount && onUnmount()
	}

	/**
	 * 隐藏事件
	 */
	onHide = () => {
		const { onHide }: Props = this.props
		onHide && onHide()
	}

	/**
	 * 展示事件
	 */
	onShow = () => {
		const { onShow }: Props = this.props
		onShow && onShow()
	}

	/**
	 * 点击蒙层事件
	 */
	onTap = () => {
		const { onTap }: Props = this.props
		onTap && onTap()
	}

	render () {
		const { children, className, fade, fadeTime, style, visible, rootNode, transparent }: Props = this.props
		const optionalProps = { style: {} }
		fade && (optionalProps.style.transitionDuration = `${fadeTime}ms`)
		style && (optionalProps.style = Object.assign(optionalProps.style, style))

		const classes = classnames('mor-mask',
			{ 'fade': fade, 'visible': visible },
			className)
		return (
			<MountRoot
				rootNode={rootNode}
				closeDelay={fade ? fadeTime : null}
				visible={visible}
				onNodeUnmount={this.onHide}
				onNodeMount={this.onShow}>
				<div role="mor-mask" className={classes} {...optionalProps}>
					<div className={classnames('mask', {
						'transparent': transparent
					})} onClick={this.onTap} />
					{children}
				</div>
			</MountRoot>
		)
	}
}

export default Mask
