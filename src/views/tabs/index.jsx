import React, { Component } from 'react'
import { Tabs } from 'mona'
import ListView from '../list-view'

const TabItem = Tabs.item

export default class Test extends Component {
	afterChange (index) {
		console.log(index)
	}
	
	tab (index) {
		this.refs.tabs.changeIndex(index)
		// console.log(123)
	}
	
	tabs = [
		{ title: '1 Tab' },
		{ title: '2 Tab' },
		{ title: '3 Tab' }
	]
	
	render () {
		return (
			<div className="full">
				<Tabs ref="tabs" defaultIndex={1} tabs={this.tabs} afterChange={this.afterChange.bind(this)} className="tabs-pannel full">
					<TabItem>
						<div className="h-full item">
							<button onClick={this.tab.bind(this, 1)}>切换wrap0</button>
						</div>
					</TabItem>
					<TabItem>
						<div className="h-full item">
							<ListView />
						</div>
					</TabItem>
					<TabItem>
						<div className="h-full item">
							<button onClick={this.tab.bind(this, 0)}>切换wrap2</button>
						</div>
					</TabItem>
				</Tabs>
			</div>
		)
	}
}
