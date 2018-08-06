import React, { Component } from 'react'
import { PickerView } from 'mona'
import PageModel from 'components/pageModel'
import DemoBlock from 'components/demoBlock'
import Data from 'static/data'

export default class Test extends Component {
	data = Data.getComponentItemInfo('pickerView')
	
	value = '2018年'
	
	getValue (value) {
		this.value = value
		this.setState({})
	}
	
	source = []
	
	componentWillMount () {
		for (let i = 0; i < 100; i++) {
			this.source.push(2000 + i + '年')
		}
	}
	
	render () {
		return (
			<PageModel {...this.data}>
				<DemoBlock title="基础用法" desc="demo">
					<div className="show">选取： {this.value}</div>
					<PickerView style={{ height: 'calc(100vh - 210px)' }} source={this.source} isKv={false} defaultValue={this.value} onChange={this.getValue.bind(this)} />
				</DemoBlock>
			</PageModel>
		)
	}
}
