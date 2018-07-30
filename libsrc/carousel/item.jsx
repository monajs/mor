import React, { Component } from 'react'
import classNames from 'classnames'

export default class CarouselItem extends Component {
	render () {
		const {
			children,
			className,
			...props
		} = this.props
		
		return (
			<div className={classnames('pull-left h-fullUrl', className)} {...props}>
				{children}
			</div>
		)
	}
}
