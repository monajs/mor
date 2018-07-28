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
			<div className="full o-H">
				<ListView onRefresh={this.onRefresh.bind(this)} onInfinite={this.onInfinite.bind(this)} isEnd={this.isEnd}>
					<div className="list-view-group">
						<For of={this.list} each="item" index="index">
							<div className="list-view-item flex-center-y" key={index}>
								<div className="avatar r-circle"></div>
								<div className="info flex-1">杨玺</div>
							</div>
						</For>
						<If condition={this.isEnd}>
							<div className="flex-center" style={{ height: 80 }}>没有更多了哟～</div>
						</If>
					</div>
				</ListView>
			</div>
		)
	}
}
