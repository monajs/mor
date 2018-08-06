import React, { Component } from 'react'
import { PickerSelect } from 'mona'
import PageModel from 'components/pageModel'
import DemoBlock from 'components/demoBlock'
import DemoButton from 'components/demoButton'
import Data from 'static/data'

export default class Test extends Component {
	data = Data.getComponentItemInfo('pickerSelect')
	// demo2Value = 'item - 2018'
	//
	// componentWillMount () {
	// 	this.source = []
	// 	for (let i = 0; i < 100; i++) {
	// 		this.source.push(`item - ${2000 + i}`)
	// 	}
	// }
	//
	// demo1 () {
	// 	PickerSelect.config({
	// 		source: this.source,
	// 		defaultValue: this.demo1Value,
	// 		isKv: false,
	// 		onConfirm: (data) => {
	// 			this.demo1Value = data
	// 		},
	// 		onCancel: (type) => {
	// 			console.log(type)
	// 		}
	// 	})
	// }
	//
	// demo2 () {
	// 	PickerSelect.config({
	// 		source: this.source,
	// 		defaultValue: this.demo2Value,
	// 		isKv: false,
	// 		onConfirm: (data) => {
	// 			this.demo2Value = data
	// 		},
	// 		onCancel: (type) => {
	// 			console.log(type)
	// 		}
	// 	})
	// }
	
	demo2Value = 2
	
	demo1 () {
		PickerSelect.config({
			source: [{
				n: 'item - 1', v: 1
			}, {
				n: 'item - 2', v: 2
			}, {
				n: 'item - 3', v: 3
			}, {
				n: 'item - 4', v: 4
			}, {
				n: 'item - 5', v: 5
			}],
			defaultValue: this.demo1Value, // 或者ths.demo1Value.v
			nameKey: 'n', // 默认 name
			valueKey: 'v', // 默认 value
			onConfirm: (data) => {
				this.demo1Value = data.v
				this.setState({})
			}
		})
	}
	
	demo2 () {
		PickerSelect.config({
			source: [1, 2, 3, 4, 5, 6],
			defaultValue: this.demo2Value, // 或者ths.demo2Value.v,
			isKv: false,
			onConfirm: (data) => {
				this.demo2Value = data
				this.setState({})
			},
			onCancel: (type) => {
				console.log(type)
			}
		})
	}
	
	render () {
		return (
			<PageModel {...this.data}>
				<DemoBlock title="基础用法" desc="demo1">
					<DemoButton className="w-full" onClick={this.demo1.bind(this)}>打开 {this.demo1Value}</DemoButton>
				</DemoBlock>
				<DemoBlock title="基础用法" desc="demo2 - 默认选中第二项">
					<DemoButton className="w-full" onClick={this.demo2.bind(this)}>打开 {this.demo2Value}</DemoButton>
				</DemoBlock>
			</PageModel>
		)
	}
}
