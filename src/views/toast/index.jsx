import React, { Component } from 'react'
import { Toast } from 'mona'
import PageModel from 'components/pageModel'
import DemoBlock from 'components/demoBlock'
import DemoButton from 'components/demoButton'
import Data from 'static/data'

export default class Test extends Component {
	data = Data.getComponentItemInfo('toast')
	visible = false
	
	demo1 () {
		Toast.config({
			message: 'Toast'
		})
	}
	
	demo2 () {
		Toast.config({
			message: '成功咯',
			duration: 2000,
			type: 'success'
		})
	}
	
	render () {
		return (
			<PageModel {...this.data}>
				<DemoBlock title="基础用法" desc="默认展示3s">
					<DemoButton className="w-full" onClick={this.demo1.bind(this)}>打开</DemoButton>
				</DemoBlock>
				<DemoBlock title="自定义信息"
					desc={<pre>展示：2s(2000)<br />文案：'成功咯'<br />type：'success'<br />type支持两种类型：'success'和'error'</pre>}>
					<DemoButton className="w-full" onClick={this.demo2.bind(this)}>打开</DemoButton>
				</DemoBlock>
			</PageModel>
		)
	}
}
