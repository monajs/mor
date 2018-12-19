import React, { Component } from 'react'
import { Row, Col } from 'mona'
import PageModel from 'components/pageModel'
import DemoBlock from 'components/demoBlock'
import Data from 'static/data'

export default class Test extends Component {
	data = Data.getComponentItemInfo('layout')
	
	render () {
		return (
			<PageModel {...this.data}>
				<DemoBlock title="24栅格布局" desc="demo1">
					<Row className="layout-wrap">
						<Col className="layout-item" span={12}>span: 12</Col>
						<Col className="layout-item" span={12}>span: 12</Col>
					</Row>
					<Row className="layout-wrap m-t-10">
						<Col className="layout-item" span={8}>span: 8</Col>
						<Col className="layout-item" span={8}>span: 8</Col>
						<Col className="layout-item" span={8}>span: 8</Col>
					</Row>
					<Row className="layout-wrap m-t-10">
						<Col className="layout-item" span={6}>span: 6</Col>
						<Col className="layout-item" span={6}>span: 6</Col>
						<Col className="layout-item" span={6}>span: 6</Col>
						<Col className="layout-item" span={6}>span: 6</Col>
					</Row>
				</DemoBlock>
				<DemoBlock title="列元素之间增加间隙" desc="demo2">
					<Row className="layout-wrap" gutter={10}>
						<Col className="layout-item-1" span={12}>
							<div className="inner">gutter: 10px</div>
						</Col>
						<Col className="layout-item-1" span={12}>
							<div className="inner">gutter: 10px</div>
						</Col>
					</Row>
				</DemoBlock>
				<DemoBlock title="flex布局，水平垂直居中" desc="demo3">
					<Row className="layout-wrap-1" align="center" justify="center">
						<Col className="layout-item" span={6}>span: 6</Col>
						<Col className="layout-item" span={6}>span: 6</Col>
					</Row>
				</DemoBlock>
				<DemoBlock title="flex布局，垂直布局" desc="demo4">
					<Row className="layout-wrap-1" gutter={10} direction="column" align="center" justify="center">
						<Col className="layout-item" span={6}>span: 6</Col>
						<Col className="layout-item m-t-10" span={6}>span: 6</Col>
					</Row>
				</DemoBlock>
			</PageModel>
		)
	}
}
