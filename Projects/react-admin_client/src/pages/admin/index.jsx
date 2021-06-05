import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout } from 'antd'
// without redux
// import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../../pages/home'
import Category from '../../pages/category'
import Product from '../../pages/product'
import Role from '../../pages/role'
import User from '../../pages/user'
import Bar from '../../pages/charts/bar'
import Line from '../../pages/charts/line'
import Pie from '../../pages/charts/pie'
import NotFound from '../../pages/not-found'

const { Footer, Sider, Content } = Layout

class Admin extends Component {



    routeList = {
        "/home": Home,
        "/category": Category,
        "/product": Product,
        "/role": Role,
        "/user": User,
        "/charts/bar": Bar,
        "/charts/line": Line,
        "/charts/pie": Pie
    }

    getRouteNodes = (user) => {
        return user.role.menus.map((item) => {
            if (this.routeList[item]) {
                return (<Route key={item} path={item} component={this.routeList[item]}/>)
            } else {
                return null
            }
        })
    }

    render() {
        //without redux
        //const user = memoryUtils.user
        const user = this.props.user
        if(!user || !user._id) {
            return <Redirect to='/login'/>
        } else {
            this.routeNodes = this.getRouteNodes(user)
        }

        return (
            <Layout style={{minHeight:'100%'}}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header/>
                    <Content style={{margin:20, backgroundColor:'#fff'}}>
                        <Switch>
                            <Redirect exact from='/' to="/home"/>
                            {this.routeNodes}
                            <Route component={NotFound}/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center', color: '#cccccc'}}>This website is for learning and communication only, not for commercial use.</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {}
) (Admin)