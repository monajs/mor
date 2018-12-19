import React, { Component } from 'react'

export default class Wrap extends Component {
	render () {
		const {
			loadingText
		} = this.props
		return (
			<div className="mona-wrap flex-center flex-direction-y">
				<div className="mona-wrap-anim"></div>
				<div className="mona-wrap-text">{loadingText}</div>
			</div>
		)
	}
}
