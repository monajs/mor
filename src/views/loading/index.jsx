import React, { Component } from 'react'
import { Loading, MountRoot } from 'mona'
import PageModel from 'components/pageModel'
import Data from 'static/data'

export default class Test extends Component {
	open () {
		Loading.show()
		setTimeout(() => {
			Loading.hide()
		}, 2000)
	}
	
	data = Data.getComponentItemInfo('loading')
	
	render () {
		console.log(this.data)
		return (
			<PageModel {...this.data}>123</PageModel>
		)
	}
}
