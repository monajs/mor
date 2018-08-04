import React, { Component } from 'react'
import { Loading, MountRoot } from 'mona'
import PageModel from 'components/pageModel'
import DemoBlock from 'components/demoBlock'
import DemoButton from 'components/demoButton'
import Data from 'static/data'

export default class Test extends Component {
	data = Data.getComponentItemInfo('loading')
	
	demo1 () {
		Loading.show()
		setTimeout(() => {
			Loading.hide()
		}, 2000)
	}
	
	demo2 () {
		Loading.show({ isHaveMask: true })
		setTimeout(() => {
			Loading.hide()
		}, 2000)
	}
	
	demo3 () {
		Loading.show({ loadingText: '别急哟' })
		setTimeout(() => {
			Loading.hide()
		}, 2000)
	}
	
	demo4 () {
		const temp = <div className="demo-loading-template flex-center">加载中..</div>
		Loading.show({ template: temp })
		setTimeout(() => {
			Loading.hide()
		}, 2000)
	}
	
	render () {
		return (
			<PageModel {...this.data}>
				<DemoBlock title="基础用法" desc="2s后自动关闭">
					<DemoButton className="w-full" onClick={this.demo1.bind(this)}>打开</DemoButton>
				</DemoBlock>
				<DemoBlock title="是否有蒙层" desc="默认:无，2s后自动关闭">
					<DemoButton className="w-full" onClick={this.demo2.bind(this)}>打开</DemoButton>
				</DemoBlock>
				<DemoBlock title="自定义文案" desc="默认:'加载中'，2s后自动关闭">
					<DemoButton className="w-full" onClick={this.demo3.bind(this)}>打开</DemoButton>
				</DemoBlock>
				<DemoBlock title="自定义模版" desc="2s后自动关闭">
					<DemoButton className="w-full" onClick={this.demo4.bind(this)}>打开</DemoButton>
				</DemoBlock>
			</PageModel>
		)
	}
}
