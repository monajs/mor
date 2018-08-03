import React, { Component } from 'react'
import { Drop } from 'mona'
import Data from 'static/data'

const DropTitle = Drop.title
const DropContent = Drop.content

export default class Home extends Component {
	open (isOpen, name) {
		// console.log(isOpen, name)
	}
	
	data = Data.getIndexData()
	
	go (url) {
		window.location.href = `#${url}`
	}
	
	render () {
		return (
			<div className="page-index">
				<h1 className="page-title flex-center">Mor</h1>
				<div className="page-desc text-center">一款让你感到幸福的 React 组件库</div>
				<For of={this.data||[]} each="item" index="index">
					<Drop className="component-item" onChange={this.open.bind(this)} key={index} name={index}>
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
