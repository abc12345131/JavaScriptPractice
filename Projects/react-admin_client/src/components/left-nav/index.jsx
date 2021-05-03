import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.jpg'
import './index.less'

export default class LeftNav extends Component {
    
    getMenuNodes = () => {
        return menuList.map(item => {
            if (!item.chirdren)
            return 
        })
    }

    render() {
        const { SubMenu } = Menu;

        return (
            <div  className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt="logo" />
                    <h1>React BackStage</h1>
                </Link>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    { this. getMenuNodes(menuList) }
                    
                    <Menu.Item key="1" icon={<AppstoreOutlined />}>
                        <Link to="/home">Home</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<MailOutlined />} title="Commodity">
                        <Menu.Item key="2" icon={<MailOutlined />}>
                            <Link to="/category">Category Management</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<MailOutlined />}>
                            <Link to="/product">Product Management</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="4" icon={<PieChartOutlined />}>
                        <Link to="/user">User Management</Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<PieChartOutlined />}>
                        <Link to="/role">Role Management</Link>
                    </Menu.Item>
                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                        <Menu.Item key="6">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
