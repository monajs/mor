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
			this.isEnd = this.list.length > 20
			this.setState({})
			done() // call done
		}, 2000)
	}
	
	onInfinite (done) {
		setTimeout(() => {
			this.list = this.list.concat([11, 12, 13, 14, 15, 16, 17, 18])
			this.isEnd = this.list.length > 20
			this.setState({})
			done()
		}, 1500)
	}
	
	render () {
		return (
			<div style={{ height: 400 }}>
				<ListView onRefresh={this.onRefresh.bind(this)} onInfinite={this.onInfinite.bind(this)} isEnd={this.isEnd}>
					<For of={this.list} each="item" index="index">
						<div style={{ height: 60 }} key={index}>{item}</div>
					</For>
					<If condition={this.isEnd}>
						<div className="flex-center">没有更多了哟～</div>
					</If>
				</ListView>
			</div>
		)
	}
}
