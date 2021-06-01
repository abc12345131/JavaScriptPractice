import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './index.less'
import logo from '../../assets/images/logo.jpg'
// without redux
// import { reqLogin } from "../../api";
// import memoryUtils from '../../utils/memoryUtils'
// import storageUtils from '../../utils/storageUtils'
import { login } from '../../redux/actions'


const Item = Form.Item

class Login extends Component {

    onFinish = async (values) => {
        const { username, password } = values
        // without redux
        // const result = await reqLogin(username, password)
        // if (result.status === 0) {
        //     message.success('Log in succeed!')
        //     const user = result.data
        //     //save user in memory                
        //     memoryUtils.user = user
        //     //save user in localstorage
        //     storageUtils.saveUser(user)
        //     this.props.history.replace('/home')
        // } else {
        //     message.error(result.message)
        // }

        this.props.login(username, password)
    }

    onFinishFailed = (errorInfo) => {
        message.error('Log in failed!')
    }

    render() {

        //if user already log in, redirect to admin
        // without redux
        // const user = memoryUtils.user
        const user = this.props.user
        if(user && user._id) {
            return <Redirect to='/home' />
        }

        const errorMsg = user.errorMsg

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React Backstage Management System</h1>
                </header>
                <section className="login-content">
                    <div className={errorMsg ? "error-msg show": "error-msg"}>{errorMsg}</div>
                    <h2>User Login</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
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

export default connect(
    state => ({user: state.user}),
    {login}
) (Login)