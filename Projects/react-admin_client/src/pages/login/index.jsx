import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './index.less'
import logo from './images/logo.jpg'

export default class Login extends Component {

    render() {
        const onFinish = (values) => {
            console.log('Received values of form: ', values);
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
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {required: true, message: 'Username is required' },
                                {min: 6, message: 'Username has to be no less than 6 digits' },
                                {max: 12, message: 'Username has to be no more than 12 digits' },
                                {pattern: /^[\w]+$/, message: 'Username must include only the following character types: uppercase, lowercase, numbers, and _ symbol.' },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {required: true, message: 'Password is required' },
                                {pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,16}$/, message: 'Password must include 8 to 16 digits and at least two of the following character types: letters, numbers and special characters.' },
                            ]}
                        >
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <a className="login-form-forgot" href="">Forgot password</a>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                            Or <a href="">register now!</a>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}