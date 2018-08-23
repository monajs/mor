import React, { Component } from 'react'
import classNames from 'classnames'

export default class ScrollWatcherItem extends Component {
    render () {
        const {
            className,
            onWatcher,
            children,
            ...props
        } = this.props
        return (
            <div className={classNames('mona-scroll-watcher-item', className)}>
                {children}
            </div>
        )
    }
}
