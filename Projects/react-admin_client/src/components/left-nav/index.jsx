import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom' 
import { Menu } from 'antd';
import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.jpg'
import './index.less'

const { SubMenu } = Menu

class LeftNav extends Component {
    
    getMenuNodes = (menuList) => {

        const path = this.props.location.pathname

        return menuList.map((item) => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                )
            } 
            else {

                if(item.children.find(c => c.key===path))
                    this.openkey = item.key

                return (
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    //run getMenuNodes once before render to get openkey
    constructor(props){
        super(props)
        this.menuNodes = this.getMenuNodes(menuList)
    }

    render() {

        const path = this.props.location.pathname
        const openkey = this.openkey

        return (
            <div  className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt="logo" />
                    <h1>BW BackStage</h1>
                </Link>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openkey]}
                    mode="inline"
                    theme="dark"
                >
                    { this.menuNodes }

                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)