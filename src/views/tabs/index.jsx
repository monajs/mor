import React, { Component } from 'react'
import { Tabs } from 'mona'

const TabItem = Tabs.item

export default class Test extends Component {
	afterChange (index) {
		console.log(index)
	}
	
	test () {
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
				<Tabs defaultIndex={1} tabs={this.tabs} afterChange={this.afterChange.bind(this)} className="tabs-pannel full">
					<TabItem>
						<div className="h-full item">
							<button>切换wrap0</button>
						</div>
					</TabItem>
					<TabItem>
						<div className="h-full item">
							<button>切换wrap1</button>
						</div>
					</TabItem>
					<TabItem>
						<div className="h-full item">
							<button>切换wrap2</button>
						</div>
					</TabItem>
				</Tabs>
			</div>
		)
	}
}
