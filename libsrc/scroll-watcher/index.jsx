import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

export default class ScrollWatcher extends Component {
    static defaultProps = {}
    
    render () {
        const {
            children
        } = this.props
        return (
            <div className="mona-scroll-watcher full">
                { children }
            </div>
        )
    }
}
