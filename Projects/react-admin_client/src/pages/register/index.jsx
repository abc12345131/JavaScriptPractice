import React, { Component } from 'react'
import { Form, Select, Input, Button, message } from 'antd'
import './index.less'
import logo from '../../assets/images/logo.jpg'
import { reqAddOrUpdateUser } from "../../api";

const {Item} = Form
const {Option} = Select

export default class Register extends Component {

    onFinish = async (values) => {
        const result = await reqAddOrUpdateUser(values)
        if (result.status === 0) {
            message.success('Register succeed')
            this.props.history.replace('/login')
        } else {
            message.error(result.msg)
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

        const prefixSelector = (
            <Item name="prefix" noStyle>
              <Select
                style={{
                  width: 70,
                }}
              >
                <Option value="1">+1</Option>
              </Select>
            </Item>
        )

        return (
            <div className="register">
                <header className="register-header">
                    <img src={logo} alt="logo"/>
                    <h1>React Backstage Management System</h1>
                </header>
                <section className="register-content">
                    <h2>User Register</h2>
                    <Form
                        initialValues={{prefix:'1'}}
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
                        <Item 
                            name='phone'
                            label='Phone Number'
                            rules={[
                                {required: true, message: 'Phone Number is required'},
                                {pattern: /^[0-9]{10}$/, message: 'Please enter your 10 digits phone number' }
                            ]}
                        >
                            <Input
                                type='number'
                                placeholder='Please input phone number'
                                addonBefore={prefixSelector}
                                style={{width: '100%'}}
                            />
                        </Item>
                        <Item 
                            name='email'
                            label='Email'
                            rules={[
                                {type: 'email', message: 'The input is not valid E-mail!'},
                                {required: true, message: 'Please input your E-mail!'}
                            ]}
                        >
                            <Input placeholder='Please input email address'/>
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