import React, { Component } from 'react'
import classNames from 'classnames'
import Col from '../col'

export default class Row extends Component {
	render () {
		const {
			align,
			gutter,
			justify,
			direction,
			children,
			style,
			className,
			...props
		} = this.props
		let sty = Object.assign({}, style)
		let child = children
		
		if (gutter) {
			sty.paddingLeft = gutter / 2
			sty.paddingRight = gutter / 2
			
			child = React.Children.map(children, (v) => {
				if (!v) {
					return
				}
				if (v.type === Col) {
					return React.cloneElement(v, {
						gutter: gutter
					})
				} else {
					return v
				}
			})
		}
		
		const cls = classNames('mona-row',
			(justify ? 'mona-row-' + justify : ''),
			(align ? 'mona-row-align-' + align : ''),
			(direction ? 'mona-row-direction-' + direction : ''),
			className
		)
		
		return (
			<div className={cls} style={sty} {...props}>
				{child}
			</div>
		)
	}
}
