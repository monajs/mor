import React, { Component } from 'react'
import Router from 'moreact-router'
import routerConf from './config'
import { hot } from 'react-hot-loader'

class RouterEntry extends Component {
	routerConf = routerConf
	
	render () {
		return (
			<Router config={this.routerConf} />
		)
	}
}

/*eslint-disable*/
export default hot(module)(RouterEntry)
/*eslint-disable*/
