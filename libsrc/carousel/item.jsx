import React, { Component } from 'react'
import classNames from 'classnames'

export default class CarouselItem extends Component {
	render () {
		const {
			children,
			className,
			style,
			itemWidth,
			...props
		} = this.props
		const sty = Object.assign({}, style, {
			width: itemWidth
		})
		return (
			<div style={sty} className={classNames('mona-carousel-item pull-left h-full', className)} {...props}>
				{children}
			</div>
		)
	}
}
