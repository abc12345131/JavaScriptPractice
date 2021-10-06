import React, { useState } from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'
import { useSelector, useDispatch } from 'react-redux'
import Logo from '../../components/logo'
import { reqLogin } from '../../api'
import { saveUser, showErrorMsg } from '../../redux/actions'

export default function Login(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const errorMsg = useSelector(state => state.userReducer.errorMsg)
    const user = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch()
    
    const login = async () => {
        if(!/^\w{6,12}$/.test(username)) {
            dispatch(showErrorMsg('Username must include 6 to 12 digits the following character types: uppercase, lowercase, numbers, and _ symbol.'))
        } else if(!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,16}$/.test(password)) {
            dispatch(showErrorMsg('Password should include 8 to 16 digits, at least two of the following character types: letters, numbers and special characters.'))
        } else {
            const result = await reqLogin(username, password)
            if (result.status === 0) {
                dispatch(saveUser(result.data))
                props.history.replace('/')
            } else {
                const errorMsg = result.msg
                dispatch(showErrorMsg(errorMsg))
            }
        }
    }

    const redirect = () => {
        dispatch(showErrorMsg(''))
        props.history.push('/register')
    }

    return (
        <div>
            <NavBar>BW Hire</NavBar>
            <Logo/>
            <WingBlank>
                <List>
                    {errorMsg ? <div className='error-msg'>{errorMsg}</div> : null}
                    <InputItem placeholder="Please enter the username" onChange={ val => setUsername(val) }>Username:</InputItem>
                    <InputItem placeholder="Please enter the password" type="password" onChange={ val => setPassword(val) }>Password:</InputItem>
                    <WhiteSpace/>
                    <Button type="primary" onClick={login}>Login</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={redirect}>Do not have an account</Button>
                </List>
            </WingBlank>
        </div>
    )
}
