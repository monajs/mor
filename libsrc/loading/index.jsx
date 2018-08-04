/**
 *    created by yangxi on 2018-08-03
 *    loading组件
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Wrap from './wrap'
import classNames from 'classnames'
import MountRoot from '../mount-root'
import Tool from '../tool'

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
		Tool.preventScroll()
		ReactDOM.render(<Loading {...config} />, this.node)
	}
	
	static hide () {
		Tool.cancelPreventScroll()
		ReactDOM.unmountComponentAtNode(this.node)
	}
	
	render () {
		const {
			template,
			isHaveMask,
			loadingText,
			...props
		} = this.props
		return (
			<MountRoot visible={true}>
				<div className={classNames('mona-loading pos-f pos-f-full flex-center', { 'mask': isHaveMask })}>
					<If condition={template}>
						{template}
					</If>
					<If condition={!template}>
						<Wrap loadingText={loadingText} />
					</If>
				</div>
			</MountRoot>
		)
	}
}
