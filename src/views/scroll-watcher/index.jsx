import React, { Component } from 'react'
import { ScrollWatcher } from 'mona'
import PageModel from 'components/pageModel'
import DemoBlock from 'components/demoBlock'
import Data from 'static/data'

export default class Test extends Component {
	data = Data.getComponentItemInfo('scrollWatcher')
	render () {
		return (
			<PageModel {...this.data}>
				<DemoBlock title="基础用法" desc="demo">
					<div className="show">选取： {this.value}</div>
					<ScrollWatcher>
						<div className="scroll-watcher-wrap">
							<div className="scroll-watcher-item"></div>
						</div>
					</ScrollWatcher>
				</DemoBlock>
			</PageModel>
		)
	}
}
