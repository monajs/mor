import React, { Component } from 'react'
import classNames from 'classnames'
import Swiper from '../swiper'
import TabItem from './item'
import TabsCtrl from './ctrl'

export default class Tabs extends Component {
	static item = TabItem
	static defaultProps = {
		enableTouch: true,
		defaultIndex: 0
	}
	
	children = []
	
	componentWillMount () {
		const { children } = this.props
		this.children.length = React.Children.count(children)
		this.currentIndex = this.props.defaultIndex
	}
	
	keysList = new Set() // 存储tabsItem已经可以展示的项
	
	componentDidMount () {
		this.keysList.add(TabsCtrl.getTabsItemKey()[this.currentIndex])
		this.ctrlItem()
	}
	
	changeIndex (index) {
		if (index === this.currentIndex) {
			return
		}
		this.currentIndex = index
		this.refs.swiper.changeIndex(index)
	}
	
	updateIndex (index) {
		const { tabs, afterChange } = this.props
		this.currentIndex = index
		this.ctrlItem()
		if (tabs && tabs.length > 0) {
			this.setState({})
		}
		afterChange && afterChange(index)
	}
	
	ctrlItem () {
		this.keysList.add(TabsCtrl.getTabsItemKey()[this.currentIndex])
		TabsCtrl.emit('tabsIndexChange', this.keysList)
	}
	
	render () {
		const {
			className,
			enableTouch,
			beforeChange,
			defaultIndex,
			enableDamp,
			tabs,
			children,
			afterChange,
			...props
		} = this.props
		const swiperProps = {
			enableTouch,
			beforeChange,
			defaultIndex,
			enableDamp,
			loop: false,
			autoplay: false,
			dots: false
		}
		const indexMarkSty = {
			width: `${1 / this.children.length * 100}%`,
			transform: `translateX(${100 * this.currentIndex}%)`
		}
		
		const swiperSty = {
			height: `calc(100% - ${tabs && tabs.length > 0 ? '45px' : '0px'})`
		}
		return (
			<div className={classNames('mona-tabs full', className)} {...props}>
				<If condition={tabs && tabs.length > 0}>
					<div className="mona-tabs-header d-f pos-r">
						<For of={tabs} index="index" each="item">
							<div key={index} className={classNames('item flex-1 flex-center', { 'active': this.currentIndex === index })} onClick={this.changeIndex.bind(this, index)}>{item.title}</div>
						</For>
						<div className="pos-a index-mark" style={indexMarkSty}></div>
					</div>
				</If>
				<Swiper {...swiperProps} afterChange={this.updateIndex.bind(this)} ref="swiper" style={swiperSty}>
					{children}
				</Swiper>
			</div>
		)
	}
}
