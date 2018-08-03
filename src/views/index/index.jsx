import React, { Component } from 'react'
import { Drop } from 'mona'

const DropTitle = Drop.title
const DropContent = Drop.content

export default class Home extends Component {
	render () {
		return (
			<div className="page-index">
				<h1 className="title flex-center">Mor</h1>
				<div className="desc text-center">一款让你感到幸福的 React 组件库</div>
				<Drop className="component-item" isOpen={true}>
					<DropTitle className="header flex-center-y">1</DropTitle>
					<DropContent className="content">
						<div>123</div>
					</DropContent>
				</Drop>
			</div>
		)
	}
}
