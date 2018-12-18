import React, { Component } from 'react'
import { Popup } from 'mona'
import PageModel from 'components/pageModel'
import DemoBlock from 'components/demoBlock'
import DemoButton from 'components/demoButton'
import Data from 'static/data'

export default class Test extends Component {
	data = Data.getComponentItemInfo('popup')
	
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
	
	demo6 () {
		this.demo6Visible = true
		this.setState({})
	}
	
	demo7 () {
		this.demo7Visible = true
		this.setState({})
	}
	
	hide () {
		this.demo1Visible = false
		this.demo2Visible = false
		this.demo3Visible = false
		this.demo4Visible = false
		this.demo5Visible = false
		this.demo6Visible = false
		this.demo7Visible = false
		this.setState({})
	}
	
	render () {
		return (
			<PageModel {...this.data}>
				<DemoBlock title="底部弹出" desc="demo1 - 默认">
					<DemoButton className="w-full" onClick={this.demo1.bind(this)}>打开</DemoButton>
				</DemoBlock>
				<DemoBlock title="顶部弹出" desc="demo2">
					<DemoButton className="w-full" onClick={this.demo2.bind(this)}>打开</DemoButton>
				</DemoBlock>
				<DemoBlock title="右侧弹出" desc="demo3">
					<DemoButton className="w-full" onClick={this.demo3.bind(this)}>打开</DemoButton>
				</DemoBlock>
				<DemoBlock title="左侧弹出" desc="demo4">
					<DemoButton className="w-full" onClick={this.demo4.bind(this)}>打开</DemoButton>
				</DemoBlock>
				<DemoBlock title="无动画效果" desc="demo5">
					<DemoButton className="w-full" onClick={this.demo5.bind(this)}>打开</DemoButton>
				</DemoBlock>
				<DemoBlock title="蒙层禁止点击关闭" desc="demo6">
					<DemoButton className="w-full" onClick={this.demo6.bind(this)}>打开</DemoButton>
				</DemoBlock>
				<DemoBlock title="无蒙层背景" desc="demo7">
					<DemoButton className="w-full" onClick={this.demo7.bind(this)}>打开</DemoButton>
				</DemoBlock>
				<Popup visible={this.demo1Visible} placement="bottom" onClose={this.hide.bind(this)}>
					<div style={{ height: '286px' }} className="w-full bg-white flex-center flex-direction-y">
						<DemoButton onClick={this.hide.bind(this)}>底部弹出</DemoButton>
						<DemoButton className="m-t-10" onClick={this.hide.bind(this)}>关闭</DemoButton>
					</div>
				</Popup>
				<Popup visible={this.demo2Visible} placement="top" onClose={this.hide.bind(this)}>
					<div style={{ height: '286px' }} className="w-full bg-white flex-center flex-direction-y">
						<DemoButton onClick={this.hide.bind(this)}>顶部弹出</DemoButton>
						<DemoButton className="m-t-10" onClick={this.hide.bind(this)}>关闭</DemoButton>
					</div>
				</Popup>
				<Popup visible={this.demo3Visible} placement="right" onClose={this.hide.bind(this)}>
					<div style={{ width: '200px' }} className="h-full bg-white flex-center flex-direction-y">
						<DemoButton onClick={this.hide.bind(this)}>右侧弹出</DemoButton>
						<DemoButton className="m-t-10" onClick={this.hide.bind(this)}>关闭</DemoButton>
					</div>
				</Popup>
				<Popup visible={this.demo4Visible} placement="left" onClose={this.hide.bind(this)}>
					<div style={{ width: '200px' }} className="h-full bg-white flex-center flex-direction-y">
						<DemoButton onClick={this.hide.bind(this)}>左侧弹出</DemoButton>
						<DemoButton className="m-t-10" onClick={this.hide.bind(this)}>关闭</DemoButton>
					</div>
				</Popup>
				<Popup visible={this.demo5Visible} animate={false} onClose={this.hide.bind(this)}>
					<div style={{ height: '286px' }} className="w-full bg-white flex-center flex-direction-y">
						<DemoButton onClick={this.hide.bind(this)}>无动画效果</DemoButton>
						<DemoButton className="m-t-10" onClick={this.hide.bind(this)}>关闭</DemoButton>
					</div>
				</Popup>
				<Popup visible={this.demo6Visible} maskClosable={false} onClose={this.hide.bind(this)}>
					<div style={{ height: '286px' }} className="w-full bg-white flex-center flex-direction-y">
						<DemoButton onClick={this.hide.bind(this)}>蒙层禁止点击关闭</DemoButton>
						<DemoButton className="m-t-10" onClick={this.hide.bind(this)}>关闭</DemoButton>
					</div>
				</Popup>
				<Popup visible={this.demo7Visible} isHaveMask={false} onClose={this.hide.bind(this)}>
					<div style={{
						height: '286px',
						boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.3)'
					}} className="w-full bg-white flex-center flex-direction-y">
						<DemoButton onClick={this.hide.bind(this)}>无蒙层背景</DemoButton>
						<DemoButton className="m-t-10" onClick={this.hide.bind(this)}>关闭</DemoButton>
					</div>
				</Popup>
			</PageModel>
		)
	}
}
