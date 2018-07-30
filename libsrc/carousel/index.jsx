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
		this.group = this.refs.group
		this.initNode()
	}
	
	itemWidth = 0
	children = []
	
	initNode () {
		const { childWidth, children } = this.props
		this.itemWidth = childWidth || this.wrap.offsetWidth
		this.children = React.Children.toArray(children)
		this.setState({})
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
			loop,
			className,
			...props
		} = this.props
		
		let child = React.Children.map(children, (v) => {
			if (!v) {
				return
			}
			return React.cloneElement(v, {
				itemWidth: this.itemWidth
			})
		})
		
		const groupSty = {
			width: (this.children.length + (loop ? 2 : 0)) * this.itemWidth
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
