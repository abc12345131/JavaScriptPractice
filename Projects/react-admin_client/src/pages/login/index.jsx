import React, { Component } from 'react'

import './index.less'
import logo from './images/logo.jpg'

export default class Login extends Component {
    render() {
        return (
            <div className="login">
                <header className="login">
                    <img src={logo} alt="logo"/>
                    <h1>React Backstage Management System</h1>
                </header>
                <section className="content"></section>
            </div>
        )
    }
}
