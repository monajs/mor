/**
 *    created by yangxi on 2018-07-25
 */

import React, { Component } from 'react'
import classNames from 'classnames'
import Hammer from '../hammer'
import Tool from '../tool'

export default class PickerView extends Component {
	static defaultProps = {
		isKv: true,	// 数据结构类型
		nameKey: 'name',	//  目前没用
		valueKey: 'value',
		source: [],
		cellHeight: 34	// 单元格高度
	}
	
	selectIndex = 0
	list = []
	y = 0
	
	componentWillMount () {
		const { source } = this.props
		this.list = source
		this.selectItem = this.list[0]
	}
	
	componentDidMount () {
		const { defaultValue, cellHeight } = this.props
		this.wrap = this.refs.wrap
		if (defaultValue) {
			const index = this.getIndex(defaultValue)
			this.setIndex(index, false)
			this.move(-index * cellHeight)
		}
	}
	
	getValue () {
		return this.selectItem
	}
	
	// 对外暴露的钩子函数
	// 设置组件的数据状态
	setData (data) {
		const { cellHeight } = this.props
		this.list = data
		this.setIndex(this.selectIndex)
		this.move(-this.selectIndex * cellHeight)
	}
	
	// 获取下标
	getIndex (value) {
		const { isKv, valueKey } = this.props
		value = typeof value === 'object' ? value[valueKey] : value
		let index = 0
		if (isKv) {
			this.list.forEach((v, i) => {
				v[valueKey] === value && (index = i)
			})
		} else {
			index = this.list.indexOf(value)
		}
		index = index >= 0 ? index : 0
		return index
	}
	
	setIndex (index, checkChange = true) {
		const { onChange } = this.props
		if (index >= this.list.length) {
			index = this.list.length - 1
		}
		
		this.selectItem = this.list[index]
		if (index !== this.selectIndex && checkChange) {
			onChange && onChange(this.getValue())
		}
		this.selectIndex = index
	}
	
	panstart (e) {
		e.preventDefault()
		const { cellHeight } = this.props
		this.startY = this.y
		Tool.removeClass(this.wrap, 'mona-picker-view-transition')
		this.maxHeight = (this.list.length - 1) * cellHeight
	}
	
	panmove (e) {
		e.preventDefault()
		this.move(this.parseY(e.deltaY))
	}
	
	panend (e) {
		e.preventDefault()
		const { cellHeight } = this.props
		Tool.addClass(this.wrap, 'mona-picker-view-transition')
		
		let speed = this.calcSpeed(e.velocityY)
		let endPoint = this.calcEndPoint(e.deltaY + speed * cellHeight) 	//获取终点位置;
		let index = this.parseY(endPoint) / cellHeight 	//获取终点位置对应的index,最终运动距离根据index计算
		this.setIndex(Math.abs(index))
		
		if (Math.abs(e.velocityY) > 0.8) {
			// 作缓冲效果
			let buffer = e.velocityY > 0 ? 15 : -15
			this.move(index * cellHeight, buffer)
			clearTimeout(this.moveTimeout)
			this.moveTimeout = setTimeout(() => {
				this.move(index * cellHeight)
			}, 400)
		} else {
			this.move(index * cellHeight)
		}
		
		clearTimeout(this.removeTimeout)
		this.removeTimeout = setTimeout(() => {
			Tool.removeClass(this.wrap, 'mona-picker-view-transition')
		}, 1000)
	}
	
	// 手指离开后的运动系数,限制最大速度
	calcSpeed (_v, _maxV = 4) {
		if (Math.abs(_v) > _maxV) {
			return _v > 0 ? _maxV * 4 : -1 * _maxV * 4
		} else {
			return _v * 4
		}
	}
	
	// 取整操作，保证终点的位置准确
	calcEndPoint (_y) {
		const { cellHeight } = this.props
		if (_y % cellHeight === 0) {
			return _y
		} else {
			return Math.round(_y / cellHeight) * cellHeight
		}
	}
	
	parseY (_y) {
		let y = this.startY + _y
		if (y > 0) {
			return 0
		}
		if (y < -this.maxHeight) {
			return -this.maxHeight
		}
		return y
	}
	
	move (y, buffer = 0) {
		if (!this.wrap) {
			return
		}
		this.y = y
		Tool.css(this.wrap, {
			transform: `translateY(${buffer + y}px)`
		})
	}
	
	render () {
		const {
			className,
			isKv,
			valueKey,
			cellHeight
		} = this.props
		return (
			<div className={classNames('mona-picker-view mona-form-control', className)}>
				<div className="h-full flex-center">
					<div className="mona-picker-view-wrap" ref="wrap" style={{ height: `${cellHeight}px` }}>
						<Choose>
							<When condition={isKv}>
								<For each="item" of={this.list}>
									<div className="mona-picker-view-item"
										key={item[valueKey]}
										style={{
											height: `${cellHeight}px`,
											lineHeight: `${cellHeight}px`
										}}>
										{item[valueKey]}
									</div>
								</For>
							</When>
							<Otherwise>
								<For each="item" of={this.list} index="index">
									<div className="mona-picker-view-item"
										key={`item${index}`}
										style={{
											height: `${cellHeight}px`,
											lineHeight: `${cellHeight}px`
										}}>
										{item}
									</div>
								</For>
							</Otherwise>
						</Choose>
					</div>
				</div>
				<Hammer
					style={{ backgroundSize: `100% calc(50% - ${cellHeight / 2}px)` }}
					className="mona-picker-view-mask"
					panmove={this.panmove.bind(this)}
					panend={this.panend.bind(this)}
					panstart={this.panstart.bind(this)}>
				</Hammer>
			</div>
		)
	}
}
