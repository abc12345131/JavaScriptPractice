import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd'
import './index.less'
import logo from '../../assets/images/logo.jpg'
import { reqAddUser } from "../../api";

const Item = Form.Item

export default class Register extends Component {

    onFinish = async (values) => {
        console.log(values)
        const { username, password } = values
        const user = { username, password }
        const result = await reqAddUser(user)
        if (result.status === 0) {
            message.success('Register succeed')
            this.props.history.replace('/login')
        } else {
            message.error(result.message)
        }
    }
    
    onFinishFailed = (errorInfo) => {
        message.error('Register failed!')
    }

    render() {
    
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 8,
                },
            },
            wrapperCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 16,
                }
            }
        }

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                }
            }
        }

        return (
            <div className="register">
                <header className="register-header">
                    <img src={logo} alt="logo"/>
                    <h1>React Backstage Management System</h1>
                </header>
                <section className="register-content">
                    <h2>User Register</h2>
                    <Form
                        {...formItemLayout}
                        name="register"
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        scrollToFirstError
                    >
                        <Item
                            name="username"
                            label="Username"
                            rules={[
                                {required: true, message: 'Username is required' },
                                {min: 6, message: 'Username has to be no less than 6 digits' },
                                {max: 12, message: 'Username has to be no more than 12 digits' },
                                {pattern: /^[\w]+$/, message: 'Username must include only the following character types: uppercase, lowercase, numbers, and _ symbol.' },
                            ]}
                        >
                            <Input />
                        </Item>
                        <Item
                            name="password"
                            label="Password"
                            rules={[
                                {required: true, message: 'Password is required' },
                                {pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,16}$/, message: 'Password must include 8 to 16 digits and at least two of the following character types: letters, numbers and special characters.' },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Item>
                        <Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Item>
                        <Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">Register</Button>
                            Or <a href="/login">Log in</a>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}