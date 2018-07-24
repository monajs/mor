import React, { Component } from 'react'
import Modal from './index'

export default class Confirm extends Component {
	render () {
		const {
			content,
			...props
		} = this.props.options
		return (
			<Modal {...props}>
				<span dangerouslySetInnerHTML={{ __html: content }}></span>
			</Modal>
		)
	}
}
