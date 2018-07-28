import React, { Component } from 'react'
import { ListView } from 'mona'

export default class Test extends Component {
	componentWillMount () {
		this.getList()
	}
	
	list = []
	
	getList () {
		this.list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 4, 5]
	}
	
	onRefresh (done) {
		setTimeout(() => {
			this.getList()
			// this.isEnd = this.list.length > 20
			done() // call done
		}, 2000)
	}
	
	render () {
		return (
			<div style={{ height: 400 }}>
				<ListView onRefresh={this.onRefresh.bind(this)} enableInfinite={false}>
					<For of={this.list} each="item" index="index">
						<div style={{ height: 60 }} key={index}>{item}</div>
					</For>
				</ListView>
			</div>
		)
	}
}
