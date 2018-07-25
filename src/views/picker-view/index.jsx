import React, { Component } from 'react'
import { PickerView } from 'mona'

export default class Test extends Component {
	year = '2018年'
	
	getValue (val) {
		console.log(val)
	}
	
	source = []
	
	componentWillMount () {
		for (let i = 0; i < 100; i++) {
			this.source.push({ value: 2000 + i + '年' })
		}
	}
	
	render () {
		return (
			<div className="full">
				<PickerView source={this.source} defaultValue={this.year} onChange={this.getValue.bind(this)} />
			</div>
		)
	}
}
