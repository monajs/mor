import React, { Component } from 'react'

export default class PageModel extends Component {
	render () {
		const {
			name,
			desc,
			children
		} = this.props
		return (
			<div className="page-model flex-direction-y flex-center-y">
				<div className="page-model-title d-ib">{name}</div>
				<div className="page-model-desc text-center">{desc}</div>
				<div className="page-model-wrap w-full">{children}</div>
			</div>
		)
	}
}
