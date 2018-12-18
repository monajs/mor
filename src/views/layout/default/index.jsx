import React, { Component } from 'react'
import Header from './header'

export default class DefaultLayout extends Component {
	render () {
		/*eslint-disable*/
		const { children } = this.props
		/*eslint-disable*/
		return (
			<div>
				<Header />
				{children}
			</div>
		)
	}
}
