// @flow
/**
 * @fileoverview DemoBlock 组件
 * @author yangxi | yangxi@babytree-inc.com
 */

import * as React from 'react'
import classNames from 'classnames'

type Props = {
	title: string,
	children: React.Node,
	className?: string,
	desc: string
}

type State = {}

class DemoBlock extends React.PureComponent<Props, State> {
	render () {
		const {
			title,
			desc,
			className,
			children,
			...props
		} = this.props
		return (
			<div className={classNames('demo-block d-f flex-direction-y', className)} {...props}>
				<div className="demo-block-title">{title}</div>
				<div className="demo-block-wrap flex-1 w-full">
					<div className="demo-block-desc">{desc}</div>
					{children}
				</div>
			</div>
		)
	}
}

export default DemoBlock
