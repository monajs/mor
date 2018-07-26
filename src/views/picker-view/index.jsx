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
			this.source.push(2000 + i + '年')
		}
	}
	
	render () {
		return (
			<div className="full">
				<PickerView source={this.source} isKv={false} defaultValue={this.year} onChange={this.getValue.bind(this)} />
			</div>
		)
	}
}
