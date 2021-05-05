import React, { Component } from 'react'
import './index.less'

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header-top">
                    <span>Hello, {}</span>
                    <a href="javascript:">Exit</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">Home</div>
                    <div className="header-bottom-right">
                        <span>{}</span>
                        <img src="" alt="weather"/>
                        <span>{}</span>
                    </div>
                </div>
            </div>
        )
    }
}
