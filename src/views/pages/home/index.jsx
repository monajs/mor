import React, { Component } from 'react'
import classnames from 'classnames'


export default class Home extends Component {
	render () {
		return (
			<div className={classnames('page-home flex-center', { 'test': true })}>
				<div>Home - aaaa</div>
			</div>
		)
	}
}
