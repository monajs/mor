import React, { Component } from 'react'
import { Row, Col } from 'mona'

export default class Test extends Component {
	render () {
		return (
			<div>
				<Row style={{height: 100}} gutter={10} align="center" justify="center">
					<Col span="12">
						<div className="full" style={{background: 'red'}}>123</div>
					</Col>
					<Col span="12">
						<div className="full" style={{background: 'red'}}>123</div>
					</Col>
				</Row>
			</div>
		)
	}
}
