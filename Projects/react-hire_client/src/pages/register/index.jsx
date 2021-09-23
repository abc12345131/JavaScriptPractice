import React, { useState } from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'
import Logo from '../../components/logo'

export default function Register(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [userType, setUserType] = useState('')

    const register = () => {

    }

    return (
        <div>
            <NavBar>BW Hire</NavBar>
            <Logo/>
            <WingBlank>
                <List>
                    <InputItem onChange={ val => setUsername(val) }>Username:</InputItem>
                    <InputItem type="password" onChange={ val => setPassword(val) }>Password:</InputItem>
                    <InputItem type="password" labelNumber="7" onChange={ val => setPassword2(val) }>Confirm Password:</InputItem>
                    <List.Item>
                        <span>User Type:</span>
                        &nbsp;&nbsp;&nbsp;
                        <Radio>Job Provider</Radio>
                        &nbsp;&nbsp;&nbsp;
                        <Radio>Job Seeker</Radio>
                    </List.Item>
                    <WhiteSpace/>
                    <Button type="primary" onClick={register}>Register</Button>
                    <WhiteSpace/>
                    <Button type="primary">Already have an account</Button>
                </List>
            </WingBlank>
        </div>
    )
}
