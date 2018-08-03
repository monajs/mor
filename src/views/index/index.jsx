import React, { Component } from 'react'
import { Drop } from 'mona'

const DropTitle = Drop.title
const DropContent = Drop.content

export default class Home extends Component {
	open (isOpen, name) {
		// console.log(isOpen, name)
	}
	
	data = [{
		name: '基础组件',
		list: [{
			name: 'Loading - 加载', url: '#/loading'
		}, {
			name: 'Toast - 提示', url: '#/toast'
		}]
	}, {
		name: '基础组件',
		list: [{
			name: 'Loading - 加载', url: '#/loading'
		}, {
			name: 'Toast - 提示', url: '#/toast'
		}]
	}]
	
	render () {
		return (
			<div className="page-index">
				<h1 className="title flex-center">Mor</h1>
				<div className="desc text-center">一款让你感到幸福的 React 组件库</div>
				<For of={this.data} each="item" index="index">
					<Drop className="component-item" isOpen={true} onChange={this.open.bind(this)} key={index} name={index}>
						<DropTitle className="header flex-center-y">{item.name}</DropTitle>
						<DropContent className="content">
							<For of={item.list} each="child" index="childIndex">
								<div className="child-item flex-center-y" key={childIndex}>{child.name}</div>
							</For>
						</DropContent>
					</Drop>
				</For>
			</div>
		)
	}
}
