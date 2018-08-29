import React, { Component } from 'react'
import { Drop } from 'mona'
import classNames from 'classnames'
import Data from 'static/data'

const DropTitle = Drop.title
const DropContent = Drop.content

export default class Home extends Component {
    data = Data.getIndexData()
    
    open (index, isOpen) {
        this.data[index].open = isOpen
        this.setState({})
    }
    
    go (url) {
        window.location.href = `#${url}`
    }
    
    render () {
        return (
            <div className="page-index">
                <h1 className="page-title flex-center">
                    <img src="http://static.monajs.cn/common/logo100.png" alt="" />
                    <span>Mor</span>
                </h1>
                <div className="page-desc text-center">让你感到幸福的 React 组件库</div>
                <For of={this.data || []} each="item" index="index">
                    <Drop className="component-item" isOpen={true} onChange={this.open.bind(this, index)} key={index}>
                        <DropTitle className="header flex-center-y">
                            <div className="flex-1">{item.name}</div>
                            <div className={classNames('tag-drop flex-center flex-direction-y', { 'open': item.open })}>
                                <div className="point-start"></div>
                                <div className="line"></div>
                                <div className="point-end"></div>
                            </div>
                        </DropTitle>
                        <DropContent className="content">
                            <For of={item.list} each="child" index="childIndex">
                                <div className="child-item flex-center-y" key={childIndex} onClick={this.go.bind(this, child.url)}>{child.name}</div>
                            </For>
                        </DropContent>
                    </Drop>
                </For>
            </div>
        )
    }
}
