import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

export default class HammerComponent extends Component {
	componentDidMount () {
		this.refs.hammer.addEventListener('touchstart', this.touchStart.bind(this), false)
		this.refs.hammer.addEventListener('touchmove', this.touchMove.bind(this), false)
		this.refs.hammer.addEventListener('touchend', this.touchEnd.bind(this), false)
		this.refs.hammer.addEventListener('touchcancel', this.touchCancel.bind(this), false)
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
			angle: angle,
		}
	}
	
	setInfo (e, isStart) {
		let now = Date.now()
		
		let pageY
		let pageX
		
		let nextData = {
			pageY: e.touches[0].pageY,
			pageX: e.touches[0].pageX,
			time: now,
		}
		
		if (isStart) {
			pageX = this.startInfo.pageX
			pageY = this.startInfo.pageY
		} else {
			pageX = this.prevInfo.pageX
			pageY = this.prevInfo.pageY
		}
		
		let preData = {
			pageY: pageY,
			pageX: pageX,
			time: this.prevInfo.time,
		}
		
		let info = this.getInfo(preData, nextData)
		//TODO 目前只考虑单点触控
		info.center = {
			y: e.touches[0].pageY,
			x: e.touches[0].pageX,
		}
		
		this.prevInfo = nextData
		this.currentInfo = Object.assign({}, info)
		
		Object.assign(e, info)
	}
	
	touchStart (e) {
		const {touchstart} = this.props
		//e.preventDefault();
		this.prevInfo = {
			time: Date.now(),
			pageY: e.touches[0].pageY,
			pageX: e.touches[0].pageX,
		}
		this.startInfo = {
			time: Date.now(),
			pageY: e.touches[0].pageY,
			pageX: e.touches[0].pageX,
		}
		if (touchstart) {
			touchstart(e)
		}
		this.pressTime = setTimeout(() => {
			this.press(e)
		}, 500)
	}
	
	touchMove (e) {
		const {pan, panstart, panmove} = this.props
		let isStart = !this.currentInfo
		clearTimeout(this.pressTime)
		this.isPan = true
		this.setInfo(e, isStart)
		if (this.isPan) {
			if (isStart && pan) {
				pan(e)
			}
			if (isStart && panstart) {
				panstart(e)
			}
			if (panmove) {
				panmove(e)
			}
		}
	}
	
	touchEnd (e) {
		const {pan, panend} = this.props
		Object.assign(e, this.currentInfo)
		clearTimeout(this.pressTime)
		let duration = Date.now() - this.startInfo.time
		
		this.startInfo = null
		this.prevInfo = null
		this.currentInfo = null
		
		if (this.isPan) {
			if (pan) {
				pan(e)
			}
			if (panend) {
				panend(e)
			}
		} else {
			if (duration < 250) {
				this.tap(e)
			}
		}
		this.isPan = false
	}
	
	touchCancel (e) {
		const {pancancel} = this.props
		this.startInfo = null
		this.prevInfo = null
		this.currentInfo = null
		this.isPan = false
		clearTimeout(this.pressTime)
		if (this.isPan) {
			if (pancancel) {
				pancancel(e)
			}
		}
	}
	
	tap (e) {
		if (this.props.tap) {
			this.props.tap(e)
		}
	}
	
	press (e) {
		if (this.props.press) {
			this.props.press(e)
		}
	}
	
	render () {
		const {style, pan, touchstart, panstart, panmove, panend, pancancel, options, setUp, ...props} = this.props
		let sty = Object.assign({}, style, {
			touchAction: 'auto',
			userSelect: 'none',
			WebkitUserDrag: 'none',
			WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
		})
		return (
			<div ref="hammer" {...props} style={sty}>
				{this.props.children}
			</div>
		)
	}
}
