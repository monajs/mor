import React, { Component } from 'react'

export default class DefaultLayout extends Component {
	render () {
		/*eslint-disable*/
		const { children } = this.props
		/*eslint-disable*/
		return (
			<div>
				{children}
			</div>
		)
	}
}
