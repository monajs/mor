import React, { Component } from 'react'
import classNames from 'classnames'
import Swiper from '../swiper'

const SwiperItem = Swiper.tabItem

export default class TabsItem extends Component {
	render () {
		const {
			children,
			className,
			...props
		} = this.props
		return (
			<SwiperItem className={classNames(className)} {...props}>
				{children}
			</SwiperItem>
		)
	}
}
