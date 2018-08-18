import React, { Component } from 'react'
import { Drop } from 'mona'
import Data from 'static/data'

const DropTitle = Drop.title
const DropContent = Drop.content

export default class Home extends Component {
	open (isOpen, index) {
		// console.log(isOpen, index)
	}
	
	data = Data.getIndexData()
	
	go (url) {
		window.location.href = `#${url}`
	}
	
	render () {
		return (
			<div className="page-index">
				<h1 className="page-title flex-center">Mor</h1>
				<div className="page-desc text-center">让你感到幸福的 React 组件库</div>
				<For of={this.data || []} each="item" index="index">
					<Drop className="component-item" isOpen={true} onChange={this.open.bind(this, index)} key={index}>
						<DropTitle className="header flex-center-y">{item.name}</DropTitle>
						<DropContent className="content">
							<For of={item.list} each="child" index="childIndex">
								<div className="child-item flex-center-y" key={childIndex} onClick={this.go.bind(this, child.url)}>{child.name}</div>
							</For>
						</DropContent>
					</Drop>
				</For>
			</div>
		)
	}
}
