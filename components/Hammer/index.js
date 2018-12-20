// @flow
/**
 * @fileoverview Hammer 组件
 * @author yangxi | 599321378@qq.com
 */

import * as React from 'react'
import { isPC } from '../tool'

type eventType = (e: { [string]: any }) => mixed

type Props = {
	children: React.Node,                                         // 子节点内容  必填
	className?: string,                                           // 节点 class 样式  选填
	style?: {},                                                   // 节点 style 样式  选填
	onMounted?: () => mixed,                                      // 组件挂载成功后的执行回调  选填
	onUnmount?: () => mixed,                                      // 组件卸载开始前的执行回调  选填
	touchstart?: eventType,                                       // 手指触摸时的触发事件  选填
	pan?: eventType,                                              // 手势的周期事件  选填
	panstart?: eventType,                                         // touchmove的第一帧事件  选填
	panmove?: eventType,                                          // touchmove的除第一帧和最后一帧以外的事件  选填
	panend?: eventType,                                           // touchmove的最后一帧以外的事件  选填
	pancancel?: eventType,                                        // 取消手势的触发事件  选填
	press?: eventType,                                            // 长按事件  选填
	tap?: eventType,                                              // 点击事件  选填
	scroll?: eventType,                                           // 滚动事件  选填
}

type State = {}

class Hammer extends React.PureComponent<Props, State> {
	componentDidMount () {
		this.hammerWrap = this.hammerWrapRef.current
		this.isPC = isPC()
		if (this.isPC) {
			this.hammerWrap.addEventListener('mousedown', this.touchStart, false)
			this.hammerWrap.addEventListener('mousemove', this.touchMove, false)
			this.hammerWrap.addEventListener('mouseup', this.touchEnd, false)
		} else {
			this.hammerWrap.addEventListener('touchstart', this.touchStart, false)
			this.hammerWrap.addEventListener('touchmove', this.touchMove, false)
			this.hammerWrap.addEventListener('touchend', this.touchEnd, false)
			this.hammerWrap.addEventListener('touchcancel', this.touchCancel, false)
		}
		this.hammerWrap.addEventListener('scroll', this.scroll, false)
	}

	hammerWrap: any
	hammerWrapRef: { current: null | HTMLDivElement } = React.createRef()
	isTouching: boolean = false
	isPC: boolean = false
	isPan: boolean = false
	startInfo: { [string]: any } = {}
	prevInfo: { [string]: any } = {}
	currentInfo: { [string]: any } = {}
	/* eslint-disable no-undef */
	pressTimer: TimeoutID = setTimeout(() => {}, 30)
	/* eslint-disable no-undef */

	optionEvent = (e: { [string]: any }) => {
		if (this.isPC) {
			return {
				x: e.clientX,
				y: e.clientY
			}
		} else {
			return {
				x: e.touches[0].pageX,
				y: e.touches[0].pageY
			}
		}
	}

	getInfo = (prev: { [string]: any }, next: { [string]: any }) => {
		let angle
		if (prev.pageY === next.pageY) {
			angle = prev.pageX - next.pageX < 0 ? 0 : 180
		} else if (prev.pageX === next.pageX) {
			angle = prev.pageY - next.pageY < 0 ? -90 : 90
		} else {
			angle = 180 / (Math.PI / Math.atan((prev.pageY - next.pageY) / (prev.pageX - next.pageX)))
		}
		return {
			velocityY: (next.pageY - prev.pageY) / (next.time - prev.time),
			velocityX: (next.pageX - prev.pageX) / (next.time - prev.time),
			deltaY: next.pageY - this.startInfo.pageY,
			deltaX: next.pageX - this.startInfo.pageX,
			angle: angle
		}
	}

	setInfo = (e: { [string]: any }, isStart: boolean) => {
		let pageX, pageY
		const now = Date.now()

		const ePoint = this.optionEvent(e)
		const nextData = {
			pageY: ePoint.y,
			pageX: ePoint.x,
			time: now
		}

		if (isStart) {
			pageX = this.startInfo.pageX
			pageY = this.startInfo.pageY
		} else {
			pageX = this.prevInfo.pageX
			pageY = this.prevInfo.pageY
		}

		const preData = {
			pageY: pageY,
			pageX: pageX,
			time: this.prevInfo.time
		}

		const info: { [string]: any } = this.getInfo(preData, nextData)
		info.center = {
			y: ePoint.y,
			x: ePoint.x
		}

		this.prevInfo = nextData
		this.currentInfo = Object.assign({}, info)

		Object.assign(e, info)
	}

	touchStart = (e: { [string]: any }) => {
		this.isTouching = true
		const { touchstart }:Props = this.props
		const ePoint = this.optionEvent(e)
		this.prevInfo = {
			time: Date.now(),
			pageY: ePoint.y,
			pageX: ePoint.x
		}
		this.startInfo = {
			time: Date.now(),
			pageY: ePoint.y,
			pageX: ePoint.x
		}
		touchstart && touchstart(e)
		clearTimeout(this.pressTimer)
		this.pressTimer = setTimeout(() => {
			this.press(e)
		}, 500)
	}

	touchMove = (e: { [string]: any }) => {
		if (!this.isTouching) {
			return
		}
		const { pan, panstart, panmove }:Props = this.props
		clearTimeout(this.pressTimer)

		// 是否为touchmove的第一次动作
		const isStart = Object.keys(this.currentInfo).length === 0
		// 是否触发了touchmove的第一次动作
		this.isPan = true
		this.setInfo(e, isStart)
		isStart && pan && pan(e)
		isStart && panstart && panstart(e)
		panmove && panmove(e)
	}

	touchEnd = (e: { [string]: any }) => {
		if (!this.isTouching) {
			return
		}
		this.isTouching = false
		const { pan, panend }:Props = this.props
		Object.assign(e, this.currentInfo)
		clearTimeout(this.pressTimer)

		const duration = Date.now() - this.startInfo.time
		this.startInfo = {}
		this.prevInfo = {}
		this.currentInfo = {}

		if (this.isPan) {
			pan && pan(e)
			panend && panend(e)
		} else {
			// 没有移动，没有触发touchmove
			(duration < 250) && this.tap(e)
		}
		this.isPan = false
	}

	touchCancel = (e: { [string]: any }) => {
		const { pancancel }:Props = this.props
		this.startInfo = {}
		this.prevInfo = {}
		this.currentInfo = {}
		this.isPan = false
		clearTimeout(this.pressTimer)
		pancancel && pancancel(e)
	}

	// 滚动事件
	scroll = (e: { [string]: any }) => {
		const { scroll }:Props = this.props
		scroll && scroll(e)
	}

	// 点击事件
	tap = (e: { [string]: any }) => {
		const { tap }:Props = this.props
		tap && tap(e)
	}

	// 长按事件
	press = (e: { [string]: any }) => {
		const { press }:Props = this.props
		press && press(e)
	}

	render () {
		const { style, className }:Props = this.props

		const optionalProps = {}
		if (style) {
			optionalProps.style = Object.assign({
				touchAction: 'auto',
				userSelect: 'none',
				WebkitUserDrag: 'none',
				WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
			}, style)
		}

		return (
			<div ref={this.hammerWrapRef} {...optionalProps} className={className}>
				{this.props.children}
			</div>
		)
	}
}

export default Hammer
