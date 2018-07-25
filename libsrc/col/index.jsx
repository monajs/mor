import React, { Component } from 'react'
import classNames from 'classnames'

export default class Col extends Component {
	render () {
		const {
			className,
			style,
			gutter,
			children,
			span,
			...props
		} = this.props
		
		let sty = Object.assign({}, style)
		
		if (gutter) {
			sty.paddingLeft = gutter / 2
			sty.paddingRight = gutter / 2
		}
		
		return (
			<div className={classNames(`mona-col-${span}`, className)} style={sty} {...props}>
				{children}
			</div>
		)
	}
}
