import React, { Component } from 'react'
import { Drop } from 'mona'

const DropTitle = Drop.title
const DropContent = Drop.content

export default class Home extends Component {
	open (isOpen, name) {
		// console.log(isOpen, name)
	}
	
	data = [{
		name: '基础组件',
		list: [{ name: 'Loading - 加载', url: 'loading' },
			{ name: 'Toast - 提示', url: 'toast' },
			{ name: 'Modal - 弹框', url: 'modal', desc: '支持自定义弹框以及dialog' },
			{ name: 'Tabs - 切换面板', url: 'tabs', desc: '支持手势滑动切换' },
			{ name: 'ListView - 列表', url: 'list-view', desc: '支持瀑布流以及下拉刷新' },
			{ name: 'Swiper - 走马灯', url: 'swiper', desc: '支持自定义wrap' },
			{ name: 'popup - 弹层', url: 'popup' },
			{ name: 'DatePicker - 时间日期事件选择器', url: 'date-picker' },
			{ name: 'DatePickerRange - 日期区间选择器', url: 'date-picker-range' },
			{ name: 'layout - 布局组件', url: 'layout', desc: 'Row、Col' },
			{ name: 'ModalSelect - 列表数据选择器', url: 'modal-select' },
			{ name: 'PickerSelect - 列表数据滚动选择器', url: 'picker-select' }]
	}, {
		name: '其他',
		list: [{ name: 'Hammer - 手势库', url: 'hammer', desc: '迷你手势库' },
			{ name: 'PickerView - 滚动面板', url: 'picker-view' },
			{ name: 'Events - 事件类', url: 'events', desc: '监听者模式' }]
	}]
	
	go (url) {
		window.location.href = `#${url}`
	}
	
	render () {
		return (
			<div className="page-index">
				<h1 className="title flex-center">Mor</h1>
				<div className="desc text-center">一款让你感到幸福的 React 组件库</div>
				<For of={this.data} each="item" index="index">
					<Drop className="component-item" onChange={this.open.bind(this)} key={index} name={index}>
						<DropTitle className="header flex-center-y">{item.name}</DropTitle>
						<DropContent className="content">
							<For of={item.list} each="child" index="childIndex">
								<div className="child-item flex-center-y" key={childIndex} onClick={this.go.bind(this, child.url)}>{child.name}</div>
							</For>
						</DropContent>
					</Drop>
				</For>
			</div>
		)
	}
}
