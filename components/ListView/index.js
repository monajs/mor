// @flow
/**
 * @fileoverview ListView 组件
 * @author yangxi | yangxi@babytree-inc.com
 */

import * as React from 'react'
import Hammer from '../Hammer'
import classnames from 'classnames'
import { addClass, removeClass, css, isFunction } from '../tool'

type Props = {
	children: React.Node,                                         // 子节点内容  必填
	className?: string,                                           // 节点 class 样式  选填
	style?: {},                                                   // 节点 style 样式  选填
	onMounted?: () => mixed,                                      // 组件挂载成功后的执行回调  选填
	onUnmount?: () => mixed,                                      // 组件卸载开始前的执行回调  选填
	enableRefresh?: boolean,                                      // 是否允许下拉刷新 选填
	offset: number,                                               // 下拉刷新的高度  选填
	onRefresh?: (onRefreshDone: () => void) => void,              // 下拉刷新的执行函数  选填
	enableInfinite?: boolean,                                     // 是否允许触底加载更多 选填
	infiniteTimer?: number,                                       // 触底检测频率  选填
	onMove?: (scrollTop: number) => void,                         // 滚动的钩子函数  选填
	onInfinite?: (onInfiniteDone: () => void) => void,            // 触底加载的执行函数  选填
	isEnd: boolean,                                               // 是否已经加载结束  必填
	bottomEmit?: number,                                          // 触底触发的高度  选填
	renderFooter?: () => React.Node                               // 自定义 listView 底部  选填
}

type State = {}

class ListView extends React.PureComponent<Props, State> {
	constructor (props: Props) {
		super(props)
		const { enableInfinite, enableRefresh, onRefresh, onInfinite } = props
		if (enableRefresh && !onRefresh) {
			throw new Error('允许下拉的情况下（enableRefresh: true），onRefresh 回调函数不允许为空')
		}
		if (enableInfinite && !onInfinite) {
			throw new Error('允许加载更多的情况下（enableInfinite: true），onInfinite 回调函数不允许为空')
		}
	}

	static defaultProps = {
		enableRefresh: true,
		enableInfinite: true,
		offset: 60,
		infiniteTimer: 200,
		bottomEmit: 100,
		isEnd: false
	}

	container: any
	containerRef: { current: null | Hammer } = React.createRef()
	wrap: any
	wrapRef: { current: null | HTMLElement } = React.createRef()
	refreshIcon: any
	refreshIconRef: { current: null | HTMLDivElement } = React.createRef()
	footer: any
	footerRef: { current: null | HTMLElement } = React.createRef()
	containerHeight: ?number
	headerHeight: ?number
	footerHeight: ?number

	// 起点的位置
	startY: number = 0
	// 开始 touch 事件时的 scrollTop 值
	startScrollTop: number = 0
	// 0-下降状态以及初始状态、1-上升状态、2-停止状态，正在刷新
	status: number = 0
	top: number = 0
	touching: boolean = false
	/* eslint-disable no-undef */
	timer: TimeoutID = setTimeout(() => {}, 30)
	/* eslint-disable no-undef */
	infiniting: boolean = false
	isTiming: boolean = false

	componentDidMount () {
		this.container = this.containerRef.current ? this.containerRef.current.hammerWrap : null
		this.wrap = this.wrapRef.current
		this.refreshIcon = this.refreshIconRef.current
		this.footer = this.footerRef.current
		const { onMounted }: Props = this.props
		onMounted && onMounted()
	}

	componentWillUnmount () {
		const { onUnmount }: Props = this.props
		onUnmount && onUnmount()
	}

	/**
	 * 手势滑动开始
	 * @param e
	 */
	panstart = (e: { [string]: any }) => {
		removeClass(this.refreshIcon, 'animate')
		const angleAbs = Math.abs(e.angle)
		if (this.container) {
			this.startScrollTop = this.container.scrollTop || 0
		}
		if (e.velocityY > 0 && this.startScrollTop <= 0) {
			e.preventDefault()
		}
		if (angleAbs > 45 && angleAbs < 135) {
			removeClass(this.wrap, 'mor-list-view-transition')
			this.startY = e.center.y
			this.touching = true
		}
	}

	/**
	 * 手势滑动
	 * @param e
	 */
	panmove = (e: { [string]: any }) => {
		const diff = e.center.y - this.startY - this.startScrollTop
		if (diff > 0) {
			e.preventDefault()
		}

		const { offset }: Props = this.props
		if (!this.touching || this.container.scrollTop > 0) {
			return
		}

		this.top = Math.pow(diff, 0.8) + (this.status === 2 ? offset : 0) // 弹性阻尼
		this.setHeaderPosition()

		if (this.status === 2) {
			return
		}
		if (this.top >= offset) {
			// 位移过程中，超过 header 高度
			this.status = 1
		} else {
			// 位移过程中，未超过 header 高度
			this.status = 0
		}
	}

	/**
	 * 手势滑动结束
	 */
	panend = () => {
		const { offset }: Props = this.props
		if (!this.touching) {
			return
		}
		addClass(this.wrap, 'mor-list-view-transition')
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

	/**
	 * 执行刷新
	 */
	refresh = () => {
		const { onRefresh } = this.props
		addClass(this.refreshIcon, 'animate')
		onRefresh && onRefresh(this.refreshDone)
	}

	/**
	 * 刷新结束钩子回调函数
	 */
	refreshDone = () => {
		this.status = 0
		this.top = 0
		this.setHeaderPosition()
	}

	/**
	 * 头部下拉刷新区块位移
	 */
	setHeaderPosition = () => {
		css(this.wrap, {
			'will-change': 'transform',
			transform: this.top ? `translateY(${this.top}px)` : 'none'
		})
	}

	/**
	 * 滚动逻辑
	 */
	scroll = (e: { [string]: any }) => {
		const { onMove }: Props = this.props
		onMove && onMove(e.target.scrollTop)
		const { enableRefresh, offset, enableInfinite, infiniteTimer, isEnd, bottomEmit }: Props = this.props
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
			const sectionHeight = this.wrap.clientHeight
			const scrollTop = this.container.scrollTop
			this.headerHeight = this.headerHeight || (enableRefresh ? offset : 0)
			this.footerHeight = this.footerHeight || this.footer.clientHeight

			const bottom = sectionHeight - this.containerHeight - scrollTop - this.headerHeight
			if (bottom < (this.footerHeight + bottomEmit)) {
				this.infinite()
			}
			this.isTiming = false
		}, infiniteTimer)
	}

	/**
	 * 执行触底加载
	 */
	infinite = () => {
		const { onInfinite }: Props = this.props
		this.infiniting = true
		onInfinite && onInfinite(this.infiniteDone)
	}

	/**
	 * 触底加载结束钩子回调函数
	 */
	infiniteDone = () => {
		this.infiniting = false
	}

	/**
	 * 渲染底部
	 * @returns {React.node}
	 */
	renderFooter = (): React.Node => {
		const { renderFooter }: Props = this.props
		if (renderFooter) {
			if (isFunction(renderFooter)) {
				return renderFooter()
			}
			return renderFooter
		}

		return (
			<div className="mor-list-view-infinite">
				<div className="mor-list-view-infinite-icon" />
				<div className="mor-list-view-infinite-text">加载中...</div>
			</div>
		)
	}

	render () {
		const {
			className,
			style = {},
			children,
			enableRefresh,
			enableInfinite,
			isEnd,
			offset
		}: Props = this.props
		const optionalProps = { style }

		// section 区块向上初始化隐藏位移
		const sectionStyle = { marginTop: enableRefresh ? -offset : 0 }
		// header 下拉刷新区块高度
		const headerStyle = { height: offset }

		return (
			<Hammer
				className={classnames('mor-list-view', className)}
				panstart={enableRefresh ? this.panstart : () => {console.log(123)}}
				panmove={enableRefresh ? this.panmove : () => {}}
				panend={enableRefresh ? this.panend : () => {}}
				scroll={this.scroll}
				ref={this.containerRef}
				{...optionalProps}>
				<section className="mor-list-view-section" ref={this.wrapRef} style={sectionStyle}>
					{
						enableRefresh &&
						<header className="mor-list-view-refresh" style={headerStyle}>
							<div ref={this.refreshIconRef} className="mor-list-view-refresh-icon" />
						</header>
					}
					{children}
					{
						enableInfinite && !isEnd &&
						<footer ref={this.footerRef}>
							{this.renderFooter()}
						</footer>
					}
				</section>
			</Hammer>
		)
	}
}

export default ListView
