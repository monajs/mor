import React, { Component } from 'react'
import classNames from 'classnames'

export default class DemoButton extends Component {
	render () {
		const {
			children,
			className,
			...props
		} = this.props
		return (
			<button className={classNames('demo-button', className)} {...props}>{children}</button>
		)
	}
}
