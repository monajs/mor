import React, { Component } from 'react'
import classnames from 'classnames'
import { Mask, Loading } from 'mor'

export default class Home extends Component {
	visible = false
	close = () => {
		Loading.show({})
		setTimeout(Loading.hide, 1000)
	}
	render () {
		return (
			<div className={classnames('page-home flex-center', { 'test': true })}>
				<div onClick={this.close}>321
				</div>
				<Mask fade visible={this.visible}>
					<div style={{ position: 'relative' }} onClick={this.close}>guanbi</div>
				</Mask>
			</div>
		)
	}
}
