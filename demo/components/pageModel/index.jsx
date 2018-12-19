import React, { Component } from 'react'
import classNames from 'classnames'

export default class PageModel extends Component {
	render () {
		const {
			name,
			className,
			desc,
			children
		} = this.props
		return (
			<div className={classNames('page-model flex-direction-y flex-center-y', className)}>
				<div className="page-model-title d-ib">{name}</div>
				<div className="page-model-desc text-center">{desc}</div>
				<div className="page-model-wrap w-full flex-1">{children}</div>
			</div>
		)
	}
}
