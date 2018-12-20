// @flow
/**
 * @fileoverview DemoButton 组件
 * @author yangxi | 599321378@qq.com
 */

import * as React from 'react'
import classNames from 'classnames'

type Props = {
	children: React.Node,
	className?: string,
}

type State = {}

class DemoButton extends React.PureComponent<Props, State> {
	render () {
		const {
			children,
			className,
			...props
		}:Props = this.props
		return (
			<button className={classNames('demo-button', className)} {...props}>{children}</button>
		)
	}
}

export default DemoButton
