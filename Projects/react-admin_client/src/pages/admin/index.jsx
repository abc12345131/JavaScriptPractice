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

const { Footer, Sider, Content } = Layout

class Admin extends Component {
    render() {
        //without redux
        //const user = memoryUtils.user
        const user = this.props.user
        if(!user || !user._id) {
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{minHeight:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header/>
                    <Content style={{margin:20, backgroundColor:'#fff'}}>
                        <Switch>
                            <Route path="/home" component={Home}/>
                            <Route path="/category" component={Category}/>
                            <Route path="/product" component={Product}/>
                            <Route path="/role" component={Role}/>
                            <Route path="/user" component={User}/>
                            <Route path="/charts/bar" component={Bar}/>
                            <Route path="/charts/line" component={Line}/>
                            <Route path="/charts/pie" component={Pie}/>
                            <Redirect to="/home"/>
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