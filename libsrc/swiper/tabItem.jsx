import React, { Component } from 'react'
import classNames from 'classnames'
import KeyGenerate from '../key-generate'

export default class SwiperTabItem extends Component {
	componentWillMount () {
		const { ctrl } = this.props
		this.key = KeyGenerate.getMonaKey()
		console.log(`设置tabsItem的唯一key - ${this.key}`)
		ctrl.setTabItemKey(this.key)
		ctrl.on('tabsIndexChange', (keysList) => {
			console.log(123)
			if (this.isShow) {
				return
			}
			this.isShow = keysList.has(this.key)
			this.setState({})
		})
	}
	
	isShow = false
	
	componentWillUnmount () {
		const { ctrl } = this.props
		ctrl.off('tabsIndexChange')
	}
	
	render () {
		const {
			children,
			className,
			style,
			itemWidth,
			ctrl,
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
