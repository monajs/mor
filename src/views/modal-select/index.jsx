import React, { Component } from 'react'
import { ModalSelect } from 'mona'

export default class Test extends Component {
	value = 2
	
	open () {
		// ModalSelect.config({
		// 	source: [{
		// 		n: '测试1', v: 1
		// 	}, {
		// 		n: '测试2', v: 2
		// 	}, {
		// 		n: '测试3', v: 3
		// 	}, {
		// 		n: '测试4', v: 4
		// 	}, {
		// 		n: '测试5', v: 5
		// 	}, {
		// 		n: '测试6', v: 6
		// 	}],
		// 	defaultValue: this.value, // 或者ths.value2.v
		// 	nameKey: 'n', // 默认 name
		// 	valueKey: 'v', // 默认 value
		// 	onConfirm: (data) => {
		// 		this.value = data
		// 	},
		// 	onCancel: (type) => {
		// 		console.log(type)
		// 	}
		// })
		ModalSelect.config({
			source: [1, 2, 3, 4, 5, 6, 7, 8],
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
