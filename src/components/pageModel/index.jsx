// @flow
/**
 * @fileoverview PageModel 组件
 * @author yangxi | 599321378@qq.com
 */

import * as React from 'react'
import classNames from 'classnames'

type Props = {
	name: string,
	children: React.Node,
	className?: string,
	desc: string
}

type State = {}

class PageModel extends React.PureComponent<Props, State> {
	render () {
		const {
			name,
			className,
			desc,
			children
		}:Props = this.props
		return (
			<div className={classNames('page-model flex-direction-y flex-center-y', className)}>
				<div className="page-model-title d-ib">{name}</div>
				<div className="page-model-desc text-center">{desc}</div>
				<div className="page-model-wrap w-full flex-1">{children}</div>
			</div>
		)
	}
}

export default PageModel
