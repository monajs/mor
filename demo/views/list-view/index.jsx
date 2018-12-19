import React, { Component } from 'react'
import { ListView } from 'mona'
import PageModel from 'components/pageModel'
import DemoBlock from 'components/demoBlock'
import Data from 'static/data'

export default class Test extends Component {
	data = Data.getComponentItemInfo('listView')
	
	componentWillMount () {
		this.getList()
	}
	
	list = []
	
	getList () {
		this.list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
			this.list = this.list.concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
			this.isEnd = this.list.length > 40
			this.setState({})
			done()
		}, 1500)
	}
	
	toTop () {
		ListView.toTop()
	}
	
	render () {
		return (
			<PageModel className="full" {...this.data}>
				<DemoBlock title="基础用法" desc="demo">
					<ListView
						style={{ height: 'calc(100vh - 210px)' }}
						onRefresh={this.onRefresh.bind(this)}
						onInfinite={this.onInfinite.bind(this)}
						isEnd={this.isEnd}>
						<div className="list-view-group">
							<For of={this.list} each="item" index="index">
								<div className="list-view-item flex-center-y" onClick={this.toTop.bind(this)} key={index}>
									<img className="avatar r-circle" src="https://avatars3.githubusercontent.com/u/13312192?s=40&v=4" alt="" />
									<div className="info flex-1">杨玺 - {index}</div>
								</div>
							</For>
							<If condition={this.isEnd}>
								<div className="flex-center" style={{ height: 80 }}>没有更多了哟～</div>
							</If>
						</div>
					</ListView>
				</DemoBlock>
			</PageModel>
		)
	}
}
