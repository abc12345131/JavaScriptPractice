import React, { Component } from 'react'
// use redux
// import { connect } from 'react-redux'
//import { login } from '../../redux/actions'
import cookieUtils from '../../utils/cookieUtils'
import { reqLogin } from "../../api"
import { Redirect } from 'react-router'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './index.less'
import logo from '../../assets/images/logo.jpg'
import backgroundimage from '../../assets/images/background1.jpg' 
import backgroundvideo from '../../assets/videos/waterfall-in-forest.mp4'
// use localstorage
// import memoryUtils from '../../utils/memoryUtils'
// import storageUtils from '../../utils/storageUtils'


const Item = Form.Item

export default class Login extends Component {

    state = {
        errorMsg: ''
    }

    onFinish = async (values) => {
        const { username, password } = values
        
        const result = await reqLogin(username, password)
        if (result.status === 0) {
            message.success('Log in succeed!')
            //use localstorage   
            //save user in memory 
            //memoryUtils.user = user
            //save user in localstorage
            //storageUtils.saveUser(user)
            //redirect to home
            this.props.history.replace('/home')
        } else {
            this.setState({errorMsg: result.msg})
        }

        // use redux
        //this.props.login(username, password)
    }

    onFinishFailed = (errorInfo) => {
        message.error('Log in failed!')
    }

    render() {

        //if user already log in, redirect to admin
        // use localstorage
        // const user = memoryUtils.user

        // use redux
        //const user = this.props.user

        const user = cookieUtils.getUser()
        if(user && user._id) {
            return <Redirect to='/home' />
        }
        
        const {errorMsg} = this.state

        return (
            <div className="login">
                <video autoPlay loop muted poster={backgroundimage} className="bgvid">
                    <source src={backgroundvideo} type="video/mp4"/>
                </video>
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React Administration System</h1>
                </header>
                <section className="login-content">
                    <div className={errorMsg ? "error-msg show": "error-msg"}>{errorMsg}</div>
                    <h2>User Login</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            username: 'admin',
                            password: 'admin',
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Item
                            name="username"
                            rules={[
                                {required: true, message: 'Username is required' }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Item>
                        <Item
                            name="password"
                            rules={[
                                {required: true, message: 'Password is required' },                               
                            ]}
                        >
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                        </Item>
                        <Item>
                            <Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Item>
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                            Or <a href="/register">register now!</a>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}
// use redux
// export default connect(
//     state => ({user: state.user}),
//     {login}
// ) (Login)