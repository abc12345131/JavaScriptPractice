import React, { PureComponent } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'

const {Item} = Form
const {Option} = Select

export default class UserForm extends PureComponent {

    static propTypes = {
        setFormRef: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        roles: PropTypes.array.isRequired,
    }

    constructor (props) {
        super(props)
        this.formRef = React.createRef()
        this.props.setFormRef(this.formRef)
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
        const { user, roles } = this.props

        return (
            <Form
                initialValues={{username: user.username, phone: user.phone, email: user.email, role_id: user.role_id, prefix:'1'}}
                ref={this.formRef}
                {...formItemLayout}
            >
                <Item
                    name='username'
                    label='Username'
                    rules={[
                        {required: true, message: 'Username is required' },
                        {min: 6, message: 'Username has to be no less than 6 digits' },
                        {max: 12, message: 'Username has to be no more than 12 digits' },
                        {pattern: /^[\w]+$/, message: 'Username must include only the following character types: uppercase, lowercase, numbers, and _ symbol.' },
                    ]}
                >
                    <Input placeholder='Please input username'/>
                </Item>
                <Item 
                    name='password'
                    label='Password'
                    rules={[
                        {required: true, message: 'Password is required' },
                        {pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,16}$/, message: 'Password must include 8 to 16 digits and at least two of the following character types: letters, numbers and special characters.' }
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder='Please input password'/>
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
                    <Input.Password placeholder='Please confirm password'/>
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
                <Item 
                    name='role_id'
                    label='Role'
                    rules={[
                        {required: true, message: 'Email is required'}
                    ]}
                >
                    <Select placeholder='Please select role'>
                        {roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)}
                    </Select>
                </Item>
            </Form>
        )
    }
}
