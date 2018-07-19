import React, { Component } from 'react'
import route from 'core/route'

export default class Router extends Component {
	constructor (props) {
		super(props)
		this.state = route.current || {}
		route.on('change', this.changePage.bind(this))
	}
	
	componentDidMount () {
		this.hasMount = true
		if (this.preData) {
			this.setState(this.preData)
			this.preData = null
		}
	}
	
	componentWillUnmount () {
		this.hasMount = false
	}
	
	setState (data) {
		if (!this.hasMount) {
			//如果没有挂载 则将要改的数据先保存
			this.preData = data
			return
		}
		super.setState(data)
	}
	
	changePage () {
		this.setState(route.current)
	}
	
	render () {
		let RoutePage = this.state.page
		if (!RoutePage) {
			return null
		}
		return (
			<RoutePage {...this.state.params} />
		)
	}
}

