import React, { Component } from 'react'
import classNames from 'classnames'

export default class DemoBlock extends Component {
	render () {
		const {
			title,
			desc,
			className,
			children
		} = this.props
		return (
			<div className={classNames('demo-block', className)}>
				<div className="demo-block-title">{title}</div>
				<div className="demo-block-wrap">
					<div className="demo-block-desc">{desc}</div>
					{children}
				</div>
			</div>
		)
	}
}
