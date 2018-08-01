import React, { Component } from 'react'
import classNames from 'classnames'
import { findDOMNode } from 'react-dom'
import Hammer from '../hammer'
import Tool from '../tool'
import CarouselItem from './item'

export default class Carousel extends Component {
	static item = CarouselItem
	
	static defaultProps = {
		autoplay: true,
		defaultIndex: 0,
		childWidth: 0,
		autoplayInterval: 3000,
		dots: true,
		translateX: 0, // x轴偏移量
		enableTouch: true, // 是否支持手势
		loop: false // 是否循环轮播
	}
	
	componentWillMount () {
		const { defaultIndex, loop } = this.props
		this.trueIndex = this.currentIndex = defaultIndex
		if (loop) {
			this.currentIndex = defaultIndex + 2
		}
	}
	
	componentDidMount () {
		const { autoplay } = this.props
		this.wrap = findDOMNode(this.refs.wrap)
		this.group = this.refs.group
		this.initNode()
		this.move(true)
		autoplay && this.autoplayAction()
	}
	
	componentWillUnmount () {
		clearInterval(this.carouselTimer)
	}
	
	itemWidth = 0
	trueIndex = 0	// 返回的真实index
	currentIndex = 0	// 逻辑控制展示的index
	translateX = 0
	gapWidth = 0 // childWidth和显示content的宽度差的一半
	children = []
	originChildren = []
	isTranslating = false  // 是否正在滚动
	isTouching = false // 是否处于touch状态
	
	initNode () {
		const { childWidth, children, autoplay, loop } = this.props
		this.itemWidth = childWidth || this.wrap.offsetWidth
		this.gapWidth = childWidth ? (this.wrap.offsetWidth - childWidth) / 2 : 0
		this.originChildren.length = this.children.length = React.Children.count(children)
		
		if (this.defaultIndex > this.originChildren.length - 1) {
			throw new Error('默认下标超过长度，请检查')
		}
		
		if ((loop || autoplay) && this.originChildren.length === 1) {
			throw new Error('carousel-item长度为1时不允许循环播放或者自动播放，请设置loop属性和autoplay属性为false')
		}
		
		if (loop && this.originChildren.length > 1) {
			this.children.length += 4
		}
		this.setState({})
	}
	
	autoplayAction () {
		const { autoplayInterval } = this.props
		clearInterval(this.carouselTimer)
		this.carouselTimer = setInterval(() => {
			const index = this.currentIndex + 1
			this.setIndex(index)
			this.move()
		}, autoplayInterval)
	}
	
	verifyPan () {
		const { enableTouch } = this.props
		if (this.isTranslating) {
			return
		}
		if (!enableTouch || this.children.length <= 1) {
			return
		}
		return true
	}
	
	panstart (e) {
		
		let angleAbs = Math.abs(e.angle)
		if (angleAbs < 45 || angleAbs > 135) {
			e.preventDefault()
		}
		if (angleAbs >= 45 && angleAbs <= 135) {
			return
		}
		if (!this.verifyPan() || this.isTouching) {
			return
		}
		this.isTouching = true
		Tool.removeClass(this.group, 'mona-carousel-transition')
		
		this.currentTranslateX = this.translateX // 记录手势开始前的偏移量
		clearInterval(this.carouselTimer)
	}
	
	panmove (e) {
		if (!this.verifyPan() || e.deltaX === 0 || !this.isTouching) {
			return
		}
		let angleAbs = Math.abs(e.angle)
		if (angleAbs < 45 || angleAbs > 135) {
			e.preventDefault()
		}
		if (this.currentIndex === 0 && e.deltaX > 0) {
			// 滚动到第一屏且loop是false的场景
			this.translateX = this.currentTranslateX + e.deltaX / 2.5 // 阻尼效果
		} else if (this.currentIndex === (this.children.length - 1) && e.deltaX < 0) {
			// 滚动到最后一屏且loop是false的场景
			this.translateX = this.currentTranslateX + e.deltaX / 2.5 // 阻尼效果
		} else {
			this.translateX = this.currentTranslateX + e.deltaX
		}
		Tool.css(this.group, {
			'will-change': 'transform',
			transform: `translateX(${this.translateX}px)`
		})
	}
	
	panend (e) {
		const { autoplay } = this.props
		if (!this.verifyPan() || !this.isTouching) {
			return
		}
		let angleAbs = Math.abs(e.angle)
		if (angleAbs < 45 || angleAbs > 135) {
			e.preventDefault()
		}
		this.isTouching = false
		Tool.addClass(this.group, 'mona-carousel-transition')
		this.calcEndIndex(e)
		this.move()
		
		autoplay && this.autoplayAction()
	}
	
	// 计算手势结束时候的终点下标
	// 计算this.currentIndex
	calcEndIndex (e) {
		const distance = ((this.translateX - this.currentTranslateX) / this.itemWidth).toFixed(1)
		const distanceABS = Math.abs(distance)
		const symbol = distance < 0 ? -1 : 1
		const vSymbol = e.velocityX < 0 ? -1 : 1
		const distanceInt = Math.floor(distanceABS)
		const distanceFloat = distanceABS - Math.floor(distanceABS)
		const indexChanged = distanceInt + distanceFloat > 0.2 ? 1 : 0
		
		let index
		if (indexChanged === 0) {
			// 未切换index
			if (Math.abs(e.velocityX) > 0.1 && vSymbol === symbol) { // 速度超过0.1，且速度方向和位移方向一致
				index = this.currentIndex - vSymbol
			} else {
				index = this.currentIndex
			}
		} else {
			// 已经切换index
			if (Math.abs(e.velocityX) > 0.1 && vSymbol === -1 * symbol) { // 速度超过0.1，且速度方向和位移方向相反
				index = this.currentIndex - vSymbol
			} else {
				index = this.currentIndex - indexChanged * symbol
			}
		}
		if (index === -1) {
			this.currentIndex = 0
		} else if (index === this.children.length) {
			this.currentIndex = this.children.length - 1
		} else {
			this.currentIndex = index
		}
	}
	
	setIndex (index) {
		if (index === this.currentIndex) {
			return
		}
		if (index === this.children.length) {
			this.currentIndex = 0
		} else {
			this.currentIndex = index
		}
	}
	
	// 钩子函数
	changeIndex (index) {
		this.setIndex(index)
		this.move()
	}
	
	move (isFirst) {
		if (!this.group) {
			return
		}
		const { beforeChange, loop, afterChange } = this.props
		this.isTranslating = true
		!isFirst && Tool.addClass(this.group, 'mona-carousel-transition') // 避免首次加载定位的时候有动画
		this.moveOption(() => {
			beforeChange && beforeChange(this.trueIndex)
		})
		
		if (loop) {
			if (this.currentIndex === 1) {
				this.currentIndex += this.originChildren.length
			} else if (this.currentIndex === this.children.length - 2) {
				this.currentIndex = 2
			}
			clearTimeout(this.translateTimer)
			this.translateTimer = setTimeout(() => {
				Tool.removeClass(this.group, 'mona-carousel-transition')
				this.moveOption()
				
				clearTimeout(this.classTimer)
				this.classTimer = setTimeout(() => {
					Tool.addClass(this.group, 'mov-carousel-transition')
					this.isTranslating = false
				}, 50)
			}, 300)
			this.trueIndex = this.currentIndex - 2
		} else {
			this.isTranslating = false
			this.trueIndex = this.currentIndex
		}
		!isFirst && afterChange && afterChange(this.trueIndex)
	}
	
	// 最终操作
	moveOption (fn) {
		this.translateX = -1 * this.itemWidth * this.currentIndex + this.gapWidth // 偏移量
		fn && fn()
		Tool.css(this.group, {
			'will-change': 'transform',
			transform: `translateX(${this.translateX}px)`
		})
	}
	
	render () {
		const {
			children,
			loop,
			className,
			...props
		} = this.props
		
		let child = React.Children.toArray(children)
		
		// 循环的场景改变children
		if (loop) {
			const childLen = React.Children.toArray(child).length
			let first1, first2, last1, last2
			if (childLen === 2) {
				first1 = last1 = child[0]
				first2 = last2 = child[2]
			} else {
				first1 = child[childLen - 3]
				first2 = child[childLen - 1]
				last1 = child[0]
				last2 = child[2]
			}
			
			child.unshift(first2)
			child.unshift(first1)
			child.push(last1)
			child.push(last2)
		}
		
		child = child.map((v, i) => {
			if (!v) {
				return
			}
			return React.cloneElement(v, {
				itemWidth: this.itemWidth,
				key: `mona_${i}`
			})
		})
		
		const groupSty = {
			width: this.children.length * this.itemWidth
		}
		return (
			<Hammer
				className={classNames('mona-carousel full pos-r o-h', className)}
				panmove={this.panmove.bind(this)}
				panstart={this.panstart.bind(this)}
				panend={this.panend.bind(this)}
				ref="wrap">
				<div className="mona-carousel-group h-full o-h" ref="group" style={groupSty}>
					{child}
				</div>
			</Hammer>
		)
	}
}
