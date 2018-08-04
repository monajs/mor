import React, { Component } from 'react'
import { Modal } from 'mona'
import PageModel from 'components/pageModel'
import DemoBlock from 'components/demoBlock'
import DemoButton from 'components/demoButton'
import Data from 'static/data'

export default class Test extends Component {
	data = Data.getComponentItemInfo('modal')
	
	demo1 () {
		this.demo1Visible = true
		this.setState({})
	}
	
	demo2 () {
		this.demo2Visible = true
		this.setState({})
	}
	
	demo3 () {
		this.demo3Visible = true
		this.setState({})
	}
	
	demo4 () {
		this.demo4Visible = true
		this.setState({})
	}
	
	demo5 () {
		this.demo5Visible = true
		this.setState({})
	}
	
	open () {
		Modal.confirm({
			title: <span style={{ color: 'red' }}>自定义用法(dialog)</span>,
			content: <div>所有参数和'节点插入方式'提供的一致</div>,
			confirmText: '知道了',
			cancelText: '不要了',
			onConfirm () {
				console.log('confirm')
			},
			onCancel (type) {
				console.log(type)
			}
		})
	}
	
	confirm () {
		this.hide()
		console.log('confirm')
	}
	
	cancel (type) {
		this.hide()
		console.log(type)
	}
	
	hide () {
		this.demo1Visible = false
		this.demo2Visible = false
		this.demo3Visible = false
		this.demo4Visible = false
		this.demo5Visible = false
		this.setState({})
	}
	
	render () {
		return (
			<div className="full">
				<PageModel {...this.data}>
					<DemoBlock title="基础用法" desc={<pre>节点插入方式<br />demo1 - 提供onConfirm和onCancel两个确认和取消时的钩子函数</pre>}>
						<DemoButton className="w-full" onClick={this.demo1.bind(this)}>打开</DemoButton>
					</DemoBlock>
					<DemoBlock title="自定义用法" desc="demo2 - 自定义title模版">
						<DemoButton className="w-full" onClick={this.demo2.bind(this)}>打开</DemoButton>
					</DemoBlock>
					<DemoBlock title="自定义用法" desc="demo3 - 自定义确认和取消文案、无title">
						<DemoButton className="w-full" onClick={this.demo3.bind(this)}>打开</DemoButton>
					</DemoBlock>
					<DemoBlock title="自定义用法" desc="demo4 - 无底部，可以根据需求自定义底部">
						<DemoButton className="w-full" onClick={this.demo4.bind(this)}>打开</DemoButton>
					</DemoBlock>
					<DemoBlock title="自定义用法" desc="demo5 - 无取消按钮">
						<DemoButton className="w-full" onClick={this.demo5.bind(this)}>打开</DemoButton>
					</DemoBlock>
					<DemoBlock title="基础用法(dialog)" desc={<pre>api调用方式<br />所有参数和'节点插入方式'提供的一致</pre>}>
						<DemoButton className="w-full" onClick={this.open.bind(this)}>打开</DemoButton>
					</DemoBlock>
				</PageModel>
				<Modal
					visible={this.demo1Visible}
					title="基础用法"
					onCancel={this.cancel.bind(this)}
					onConfirm={this.confirm.bind(this)}>
					demo1 - 基础用法
				</Modal>
				<Modal
					visible={this.demo2Visible}
					title={<span style={{ color: 'red' }}>自定义用法</span>}
					onCancel={this.cancel.bind(this)}
					onConfirm={this.confirm.bind(this)}>
					<div>demo2 - 自定义title模版</div>
				</Modal>
				<Modal
					visible={this.demo3Visible}
					confirmText="知道了"
					cancelText="算了吧"
					onCancel={this.cancel.bind(this)}
					onConfirm={this.confirm.bind(this)}>
					<div>demo3 - 自定义确认和取消文案、无title</div>
				</Modal>
				<Modal
					visible={this.demo4Visible}
					title="自定义用法"
					confirmText="知道了"
					cancelText="算了吧"
					maskClosable={false}
					footer={false}
					onCancel={this.cancel.bind(this)}
					onConfirm={this.confirm.bind(this)}>
					<div>demo4 - 无底部，且蒙层不可关闭</div>
					<div style={{margin: 15, color: '#333'}} onClick={this.hide.bind(this)}>点我关闭</div>
				</Modal>
				<Modal
					visible={this.demo5Visible}
					title="自定义用法"
					enableCancel={false}
					confirmText="知道了"
					onCancel={this.cancel.bind(this)}
					onConfirm={this.confirm.bind(this)}>
					<div>demo5 - 无取消按钮</div>
				</Modal>
			</div>
		)
	}
}
