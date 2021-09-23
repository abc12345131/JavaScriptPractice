import React from 'react'
import './index.less'
import logo from '../../assets/images/logo.jpg'

export default function Logo() {
    return (
        <div className="logo-container">
            <img src={logo} alt="logo" className="logo-img"/>
        </div>
    )
}

