import React, { Component } from 'react'
import classNames from 'classnames'

export default class DemoBlock extends Component {
	render () {
		const {
			title,
			desc,
			className,
			children,
			...props
		} = this.props
		return (
			<div className={classNames('demo-block d-f flex-direction-y', className)} {...props}>
				<div className="demo-block-title">{title}</div>
				<div className="demo-block-wrap flex-1 w-full">
					<div className="demo-block-desc">{desc}</div>
					{children}
				</div>
			</div>
		)
	}
}
