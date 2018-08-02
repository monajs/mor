import React, { Component } from 'react'

export default class Hammer extends Component {
	componentDidMount () {
		this.refs.hammer.addEventListener('touchstart', this.touchStart.bind(this), false)
		this.refs.hammer.addEventListener('touchmove', this.touchMove.bind(this), false)
		this.refs.hammer.addEventListener('touchend', this.touchEnd.bind(this), false)
		this.refs.hammer.addEventListener('touchcancel', this.touchCancel.bind(this), false)
		this.refs.hammer.addEventListener('scroll', this.scroll.bind(this), false)
	}
	
	getInfo (prev, next) {
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
	
	setInfo (e, isStart) {
		let pageX, pageY
		let now = Date.now()
		
		const nextData = {
			pageY: e.touches[0].pageY,
			pageX: e.touches[0].pageX,
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
		
		let info = this.getInfo(preData, nextData)
		info.center = {
			y: e.touches[0].pageY,
			x: e.touches[0].pageX
		}
		
		this.prevInfo = nextData
		this.currentInfo = Object.assign({}, info)
		
		Object.assign(e, info)
	}
	
	touchStart (e) {
		const { touchstart } = this.props
		this.prevInfo = {
			time: Date.now(),
			pageY: e.touches[0].pageY,
			pageX: e.touches[0].pageX
		}
		this.startInfo = {
			time: Date.now(),
			pageY: e.touches[0].pageY,
			pageX: e.touches[0].pageX
		}
		touchstart && touchstart(e)
		clearTimeout(this.pressTimer)
		this.pressTimer = setTimeout(() => {
			this.press(e)
		}, 500)
	}
	
	touchMove (e) {
		const { pan, panstart, panmove } = this.props
		clearTimeout(this.pressTimer)
		
		// 是否为touchmove的第一次动作
		const isStart = !this.currentInfo
		this.isPan = true // 是否触发了touchmove的第一次动作
		this.setInfo(e, isStart)
		
		isStart && pan && pan(e)
		isStart && panstart && panstart(e)
		panmove && panmove(e)
	}
	
	touchEnd (e) {
		const { pan, panend } = this.props
		Object.assign(e, this.currentInfo)
		clearTimeout(this.pressTimer)
		
		this.startInfo = null
		this.prevInfo = null
		this.currentInfo = null
		
		if (this.isPan) {
			pan && pan(e)
			panend && panend(e)
		} else {
			const duration = Date.now() - this.startInfo.time
			// 没有移动，没有触发touchmove
			(duration < 250) && this.tap(e)
		}
		this.isPan = false
	}
	
	touchCancel (e) {
		const { pancancel } = this.props
		this.startInfo = null
		this.prevInfo = null
		this.currentInfo = null
		this.isPan = false
		clearTimeout(this.pressTimer)
		pancancel && pancancel(e)
	}
	
	// 滚动事件
	scroll (e) {
		const { scroll } = this.props
		scroll && scroll(e)
	}
	
	// 点击事件
	tap (e) {
		const { tap } = this.props
		tap && tap(e)
	}
	
	// 长按事件
	press (e) {
		const { press } = this.props
		press && press(e)
	}
	
	render () {
		const {
			style,
			pan,
			scroll,
			touchstart,
			panstart,
			panmove,
			panend,
			press,
			pancancel,
			...props
		} = this.props
		
		const sty = Object.assign({}, style, {
			touchAction: 'auto',
			userSelect: 'none',
			WebkitUserDrag: 'none',
			WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
		})
		
		return (
			<div ref="hammer" {...props} style={sty}>
				{this.props.children}
			</div>
		)
	}
}
