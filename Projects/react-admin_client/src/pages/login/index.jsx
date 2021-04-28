import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './index.less'
import logo from '../../assets/images/logo.jpg'
import { reqLogin } from "../../api";
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router'

export default class Login extends Component {

    render() {

        //if user already login, redirect to admin
        const user = memoryUtils.user
        if(user && user._id) {
            return <Redirect to='/' />
        }

        const onFinish = async (values) => {
            const { username, password } = values
            const result = await reqLogin(username, password)
            if (result.status === 0) {
                message.success('Login succeed')
                const user = result.data
                //save user in memory                
                memoryUtils.user = user
                //save user in localstorage
                storageUtils.saveUser(user)
                this.props.history.replace('/admin')
            } else {
                message.error(result.message)
            }
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React Backstage Management System</h1>
                </header>
                <section className="login-content">
                    <h2>User Login</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {required: true, message: 'Username is required' }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {required: true, message: 'Password is required' },                               
                            ]}
                        >
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                            Or <a href="/register">register now!</a>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}