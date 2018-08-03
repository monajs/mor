import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Wrap from './wrap'
import classNames from 'classnames'
import MountRoot from '../mount-root'

export default class Loading extends Component {
	static defaultProps = {
		isHaveMask: false,
		loadingText: '加载中'
	}
	
	static show (config) {
		if (!this.node) {
			this.node = document.createElement('div')
			document.body.appendChild(this.node)
			this.node.remove()
		}
		ReactDOM.render(<Loading {...config} />, this.node)
	}
	
	static hide () {
		ReactDOM.unmountComponentAtNode(this.node)
	}
	
	render () {
		const {
			content,
			isHaveMask,
			loadingText,
			...props
		} = this.props
		console.log(content)
		return (
			<MountRoot visible={true}>
				<div className={classNames('mona-loading pos-f pos-f-full flex-center', { 'mask': isHaveMask })}>
					<If condition={content}>
						{content}
					</If>
					<If condition={!content}>
						<Wrap loadingText={loadingText} />
					</If>
				</div>
			</MountRoot>
		)
	}
}
