import React, { Component } from 'react'
import { Tabs } from 'mona'
import PageModel from 'components/pageModel'
import DemoBlock from 'components/demoBlock'
import DemoButton from 'components/demoButton'
import Data from 'static/data'

const TabItem = Tabs.item

export default class Test extends Component {
	data = Data.getComponentItemInfo('tabs')
	
	afterChange (index) {
		console.log(index)
	}
	
	tab (index) {
		this.refs.tabs.changeIndex(index)
	}
	
	tabs = [
		{ title: 'Tab - 1' },
		{ title: 'Tab - 2' },
		{ title: 'Tab - 2' }
	]
	
	render () {
		return (
			<PageModel {...this.data}>
				<DemoBlock title="基础用法" desc="demo1">
					<Tabs style={{ height: 200 }} tabs={this.tabs} afterChange={this.afterChange.bind(this)} className="tabs-pannel">
						<TabItem className="flex-center">第一面板</TabItem>
						<TabItem className="flex-center">第二面板</TabItem>
						<TabItem className="flex-center">第三面板</TabItem>
					</Tabs>
				</DemoBlock>
				<DemoBlock title="基础用法" desc="demo2 - 调用api切换面板,初始化在第二面板">
					<Tabs style={{ height: 200 }} ref="tabs" defaultIndex={1} tabs={this.tabs} afterChange={this.afterChange.bind(this)} className="tabs-pannel">
						<TabItem className="flex-center">
							<DemoButton onClick={this.tab.bind(this, 1)}>切换wrap to 1</DemoButton>
						</TabItem>
						<TabItem className="flex-center">
							<DemoButton onClick={this.tab.bind(this, 0)}>切换wrap to 0</DemoButton>
						
						</TabItem>
						<TabItem className="flex-center">
							<DemoButton onClick={this.tab.bind(this, 0)}>切换wrap to 0</DemoButton>
						</TabItem>
					</Tabs>
				</DemoBlock>
				<DemoBlock title="基础用法" desc="demo3 - 禁用手势">
					<Tabs style={{ height: 200 }} enableTouch={false} tabs={this.tabs} afterChange={this.afterChange.bind(this)} className="tabs-pannel">
						<TabItem className="flex-center">第一面板</TabItem>
						<TabItem className="flex-center">第二面板</TabItem>
						<TabItem className="flex-center">第三面板</TabItem>
					</Tabs>
				</DemoBlock>
				<DemoBlock title="基础用法" desc="demo4 - 禁用弹性阻尼效果(左滑到底，右滑到底)">
					<Tabs style={{ height: 200 }} enableDamp={false} tabs={this.tabs} afterChange={this.afterChange.bind(this)} className="tabs-pannel">
						<TabItem className="flex-center">第一面板</TabItem>
						<TabItem className="flex-center">第二面板</TabItem>
						<TabItem className="flex-center">第三面板</TabItem>
					</Tabs>
				</DemoBlock>
				<DemoBlock title="基础用法" desc="demo5 - 取消默认头部，可根据需求自定义头部导航">
					<Tabs style={{ height: 200 }} tabs={false} afterChange={this.afterChange.bind(this)} className="tabs-pannel">
						<TabItem className="flex-center">第一面板</TabItem>
						<TabItem className="flex-center">第二面板</TabItem>
						<TabItem className="flex-center">第三面板</TabItem>
					</Tabs>
				</DemoBlock>
			</PageModel>
		)
	}
}
