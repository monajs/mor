/**
 *    created by yangxi on 2018-07-19
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class MountRoot extends Component {
	static defaultProps = {
		closeDelay: 0			//延迟关闭时间(毫秒)
	}
	
	componentDidMount () {
		if (this.props.visible) {
			this.mountRoot(this.props)
		}
	}
	
	componentWillUnmount () {
		//卸载
		if (!this.node) {
			return
		}
		ReactDOM.unmountComponentAtNode(this.node)
		this.node.remove()
	}
	
	componentWillReceiveProps (nextProps) {
		//显示
		if (nextProps.visible && !this.props.visible) {
			this.mountRoot(nextProps)
		}
		//卸载
		if (this.props.visible && !nextProps.visible) {
			if (this.props.closeDelay) {
				this.domRender(nextProps)
			}
			setTimeout(() => {
				ReactDOM.unmountComponentAtNode(this.node)
				this.node.remove()
			}, this.props.closeDelay)
		} else if (nextProps.visible) {
			this.domRender(nextProps)
		}
	}
	
	mountRoot (props) {
		this.node = document.createElement('div')
		this.node.className = props.className || ''
		let rootDom = document.getElementsByTagName('body')[0]
		if (this.props.getContainer) {
			rootDom = this.props.getContainer()
		}
		rootDom.appendChild(this.node)
		this.domRender(props)
	}
	
	domRender (props) {
		ReactDOM.render(props.children, this.node)
	}
	
	render () {
		return null
	}
}

