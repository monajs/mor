import React, { Component } from 'react'
import Hammer from '../hammer'
import Tool from '../tool'

export default class ListView extends Component {
	static defaultProps = {
		offset: 50,
		bottomEmit: 100,
		infiniteTimer: 200, // 上拉加载更多检测频率
		enableInfinite: true,
		enableRefresh: true,
		isEnd: false
	}
	
	componentWillMount () {
		const { enableInfinite, enableRefresh, onRefresh, onInfinite } = this.props
		if (enableRefresh && !onRefresh) {
			throw new Error('允许下拉的情况下（enableRefresh: true），onRefresh 回调函数不允许为空')
		}
		if (enableInfinite && !onInfinite) {
			throw new Error('允许加载更多的情况下（enableInfinite: true），onInfinite 回调函数不允许为空')
		}
	}
	
	componentDidMount () {
		this.container = this.refs.container.refs.hammer
		this.wrap = this.refs.wrap
		this.refreshIcon = this.refs.refreshIcon
		console.log(this.refreshIcon)
	}
	
	startY = 0 // 起点的位置
	status = 0	// 0-下降状态以及初始状态、1-上升状态、2-停止状态，正在刷新
	top = 0
	touching = false
	infiniting = false // 加载更多区块处理状态中
	
	panstart (e) {
		if (this.container.scrollTop > 0) {
			return
		}
		this.preventDefault(e)
		const angleAbs = Math.abs(e.angle)
		if (angleAbs < 50 || angleAbs > 130) {
			return
		}
		Tool.removeClass(this.wrap, 'mona-list-view-transition')
		this.startY = e.targetTouches[0].pageY
		this.touching = true
	}
	
	panmove (e) {
		const { enableRefresh, offset } = this.props
		if (!enableRefresh || !this.touching) {
			return
		}
		this.preventDefault(e)
		const diff = e.targetTouches[0].pageY - this.startY
		this.top = Math.pow(diff, 0.8) // 弹性阻尼
		this.setHeaderPosition()
		
		if (this.status === 2) {
			return
		}
		
		if (this.top >= offset) {
			this.status = 1	// 位移过程中，超过header高度
		} else {
			this.status = 0	// 位移过程中，未超过header高度
		}
	}
	
	panend (e) {
		const { enableRefresh, offset } = this.props
		if (!enableRefresh || !this.touching) {
			return
		}
		this.preventDefault(e)
		Tool.addClass(this.wrap, 'mona-list-view-transition')
		this.touching = false
		
		if (this.status === 2) {
			this.top = offset
			this.setHeaderPosition()
			return
		}
		
		if (this.top >= offset) {
			// 执行刷新
			this.status = 2
			this.top = offset
			this.refresh()
		} else {
			this.status = 0
			this.top = 0
		}
		this.setHeaderPosition()
	}
	
	preventDefault (e) {
		const angleAbs = Math.abs(e.angle)
		if (angleAbs >= 50 && angleAbs <= 130) {
			e.preventDefault()
		}
	}
	
	refresh () {
		const { onRefresh } = this.props
		Tool.addClass(this.refreshIcon, 'animate')
		onRefresh && onRefresh(this.refreshDone.bind(this))
	}
	
	// 刷新结束钩子函数，回调
	refreshDone () {
		this.status = 0
		this.top = 0
		Tool.removeClass(this.refreshIcon, 'animate')
		this.setHeaderPosition()
	}
	
	scroll (e) {
		const { enableRefresh, offset, enableInfinite, infiniteTimer, isEnd, bottomEmit } = this.props
		if (!enableInfinite || this.infiniting) {
			return
		}
		if (isEnd) {
			return
		}
		if (this.isTiming) {
			return
		}
		this.isTiming = true
		
		clearTimeout(this.timer)
		this.timer = setTimeout(() => {
			this.containerHeight = this.containerHeight || this.container.clientHeight
			this.sectionHeight = this.sectionHeight || this.wrap.clientHeight
			const scrollTop = this.container.scrollTop
			this.headerHeight = this.headerHeight || (enableRefresh ? offset : 0)
			this.footerHeight = this.footerHeight || this.wrap.querySelector('.list-view-infinite').clientHeight
			
			const bottom = this.sectionHeight - this.containerHeight - scrollTop - this.headerHeight
			if (bottom < (this.sectionHeight + bottomEmit)) {
				this.infinite()
			}
			this.isTiming = false
		}, infiniteTimer)
	}
	
	infinite () {
		const { onInfinite } = this.props
		this.infiniting = true
		onInfinite && onInfinite(this.infiniteDone.bind(this))
	}
	
	infiniteDone () {
		this.infiniting = false
	}
	
	// 头部下拉刷新区块位移
	setHeaderPosition () {
		Tool.css(this.wrap, {
			'will-change': 'transform',
			transform: `translateY(${this.top || 0}px)`
		})
	}
	
	render () {
		const {
			offset,
			enableRefresh,
			enableInfinite,
			isEnd,
			children,
			style
		} = this.props
		
		// section 区块向上初始化隐藏位移
		const sectionSty = { top: -offset }
		// header 下拉刷新区块高度
		const headerSty = { height: offset }
		
		return (
			<Hammer
				className="mona-list-view full o-a pos-r"
				panstart={this.panstart.bind(this)}
				panmove={this.panmove.bind(this)}
				panend={this.panend.bind(this)}
				scroll={this.scroll.bind(this)}
				style={style}
				ref="container">
				<section className="mona-list-view-section pos-a w-full" style={sectionSty} ref="wrap">
					<If condition={enableRefresh}>
						<header className="list-view-refresh flex-center" style={headerSty}>
							<div ref="refreshIcon" className="list-view-refresh-icon"></div>
						</header>
					</If>
					{children}
					<If condition={enableInfinite && !isEnd}>
						<footer className="list-view-infinite">
							<div className="list-view-infinite-icon block-center"></div>
						</footer>
					</If>
				</section>
			</Hammer>
		)
	}
}
