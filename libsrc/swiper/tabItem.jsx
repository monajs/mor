import React, { Component } from 'react'
import classNames from 'classnames'
import TabsCtrl from '../tabs/ctrl'

export default class SwiperTabItem extends Component {
	componentWillMount () {
		this.key = `tabs-item_${this.props.monaKey}`
		console.log(`设置tabsItem的唯一key${this.key}`)
		TabsCtrl.setTabItemKey(this.key)
		TabsCtrl.on('tabsIndexChange', (keysList) => {
			if (this.isShow) {
				return
			}
			this.isShow = keysList.has(this.key)
			this.setState({})
		})
	}
	
	isShow = false
	
	componentWillUnmount () {
		TabsCtrl.off('tabsIndexChange')
	}
	
	render () {
		const {
			children,
			className,
			style,
			monaKey,
			itemWidth,
			...props
		} = this.props
		const sty = Object.assign({}, style, {
			width: itemWidth
		})
		return (
			<div style={sty} className={classNames('mona-swiper-item pull-left h-full', className)} {...props}>
				{this.isShow ? children : null}
			</div>
		)
	}
}
