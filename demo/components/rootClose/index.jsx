import React, { Component } from 'react'
import classNames from 'classnames'

export default class RootClose extends Component {
	state = {}
	
	constructor (props) {
		super(props)
	}
	
	eve () {}
	
	componentDidMount () {
		this.eve = (e) => {
			this.clickOther(e)
		}
		document.addEventListener('click', this.eve, false)
	}
	
	componentWillUnmount () {
		document.removeEventListener('click', this.eve, false)
		this.unmount = true
	}
	
	clickOther () {
		if (this.props.onBlur) {
			this.props.onBlur()
		}
	}
	
	onClick (e) {
		e.nativeEvent.stopImmediatePropagation()
		if (this.props.onClick) {
			this.props.onClick()
		}
	}
	
	render () {
		if (this.props.type === 'ul') {
			return (
				<ul className={classNames(this.props.className)} onClick={this.onClick.bind(this)}>
					{this.props.children}
				</ul>
			)
		} else {
			return (
				<div className={classNames(this.props.className)} onClick={this.onClick.bind(this)}>
					{this.props.children}
				</div>
			)
		}
	}
}
