import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom' 
import { Menu } from 'antd'
import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.jpg'
import memoryUtils from '../../utils/memoryUtils'
import './index.less'


const { SubMenu } = Menu

class LeftNav extends Component {
    
    getMenuNodes = (menuList) => {

        const path = this.props.location.pathname

        return menuList.map((item) => {
            if (this.hasAuth(item)) {
                if (!item.children) {
                    return (
                        <Menu.Item key={item.key} icon={item.icon}>
                            <Link to={item.key}>{item.title}</Link>
                        </Menu.Item>
                    )
                } 
                else {
                    //submenu need to be open if any chird match beginning of the path
                    if(item.children.find(c => path.indexOf(c.key)===0))
                        this.openkey = item.key

                    return (
                        <SubMenu key={item.key} icon={item.icon} title={item.title}>
                            {this.getMenuNodes(item.children)}
                        </SubMenu>
                    )
                }
            }
        })
    }

    hasAuth = (item) => {
        const {key,isPublic} = item
        const username = memoryUtils.user.username
        const menus = memoryUtils.user.role.menus

        if (username==='admin' || isPublic || menus.includes(key)) {
            return true
        } else if (item.children) {
            return !!item.children.find(child => menus.includes(child.key))
        }
        return false
    }

    //run getMenuNodes once before render to get openkey
    constructor (props) {
        super(props)
        this.menuNodes = this.getMenuNodes(menuList)
    }

    render() {

        let path = this.props.location.pathname
        if (path.indexOf('/product')===0) {
            path = '/product'
        }
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