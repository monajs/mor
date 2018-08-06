import React, { Component } from 'react'
import { Hammer, Row, Col } from 'mona'
import PageModel from 'components/pageModel'
import DemoBlock from 'components/demoBlock'
import Data from 'static/data'
import Util from 'core/util'

export default class Test extends Component {
	data = Data.getComponentItemInfo('hammer')
	panInfo = {}
	
	pan (e) {
		this.panInfo = e
		this.setState({})
	}
	
	press (e) {
		console.log(e)
		Util.info('长按事件')
	}
	
	render () {
		return (
			<PageModel {...this.data}>
				<DemoBlock title="基础用法" desc={<pre>在原有的 event 数据基础之上，添加了触点的<b>速度</b>、<b>角度</b>、<b>偏移量</b></pre>}>
					<div>X轴速度：{this.panInfo.velocityX || 0}</div>
					<div>Y轴速度：{this.panInfo.velocityY || 0}</div>
					<div>角度：{this.panInfo.angle || 0}</div>
					<div>X轴偏移量：{this.panInfo.deltaX || 0}</div>
					<div>Y轴偏移量：{this.panInfo.deltaY || 0}</div>
					<div className="hammer-wrap m-t-10">
						<Hammer
							pan={this.pan.bind(this)}
							className="full flex-center">
							触控板 - 滑动
						</Hammer>
					</div>
				</DemoBlock>
				<DemoBlock title="基础用法" desc="长按事件">
					<div className="hammer-wrap m-t-10">
						<Hammer
							press={this.press.bind(this)}
							className="full flex-center">
							触控板 - 长按
						</Hammer>
					</div>
				</DemoBlock>
			</PageModel>
		)
	}
}
