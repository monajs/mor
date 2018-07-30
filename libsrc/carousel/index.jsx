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
		enableTouch: true, // 是否支持手势
		loop: false // 是否循环轮播
	}
	
	componentWillMount () {
	
	}
	
	componentDidMount () {
		this.wrap = findDOMNode(this.refs.wrap)
	}
	
	panmove (e) {
	
	}
	
	panstart (e) {
	
	}
	
	panend (e) {
	
	}
	
	render () {
		const {
			children,
			className,
			...props
		} = this.props
		return (
			<Hammer
				className={classNames('mona-carousel full pos-r o-h', className)}
				panmove={this.panmove.bind(this)}
				panstart={this.panstart.bind(this)}
				panend={this.panend.bind(this)}
				ref="wrap">
				{children}
			</Hammer>
		)
	}
}
