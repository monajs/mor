import React, { Component } from 'react'
import { PickerSelect } from 'mona'

export default class Test extends Component {
	value = '2018年'
	
	componentWillMount () {
		this.source = []
		for (let i = 0; i < 100; i++) {
			this.source.push(2000 + i + '年')
		}
	}
	
	open () {
		// PickerSelect.config({
		// 	source: this.source,
		// 	defaultValue: this.value, // 或者ths.value2.v
		// 	nameKey: 'n', // 默认 name
		// 	valueKey: 'v', // 默认 value
		// 	onConfirm: (data) => {
		// 		console.log(data)
		// 		this.value = data
		// 	},
		// 	onCancel: (type) => {
		// 		console.log(type)
		// 	}
		// })
		PickerSelect.config({
			source: this.source,
			defaultValue: this.value,
			isKv: false,
			onConfirm: (data) => {
				this.value = data
			},
			onCancel: (type) => {
				console.log(type)
			}
		})
	}
	
	render () {
		return (
			<div>
				<div onClick={this.open.bind(this)}>open</div>
			</div>
		)
	}
}
