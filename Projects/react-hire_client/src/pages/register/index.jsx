import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
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
import { reqRegister } from '../../api'
import { showErrorMsg } from '../../redux/actions'


export default function Register(props) {

    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [userType, setUserType] = useState('')
    const errorMsg = useSelector(state => state.userReducer.errorMsg)
    const dispatch = useDispatch()

    const register = async () => {

        if(!/^\w{6,12}$/.test(username)) {
            dispatch(showErrorMsg('Username must include 6 to 12 digits the following character types: uppercase, lowercase, numbers, and _ symbol.'))
        } else if(!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,16}$/.test(password)) {
            dispatch(showErrorMsg('Password should include 8 to 16 digits, at least two of the following character types: letters, numbers and special characters.'))
        } else if(!(password===password2)) {
            dispatch(showErrorMsg('Passwords do not match.'))
        } else if(!userType) {
            dispatch(showErrorMsg('User type is required.'))
        } else {
            const user = {username, password, userType}
            const result = await reqRegister(user)
            if (result.status === 0) {
                console.log('Register succeed')
                dispatch(showErrorMsg(''))
                history.replace('/login')
            } else {
                dispatch(showErrorMsg(result.msg))
            }
        }
    }

    const redirect = () => {
        dispatch(showErrorMsg(''))
        history.push('/login')
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
                    <InputItem placeholder="Re-enter the password" type="password" labelNumber="7" onChange={ val => setPassword2(val) }>Confirm Password:</InputItem>
                    <List.Item>
                        <span>User Type:</span>
                        &nbsp;&nbsp;&nbsp;
                        <Radio checked={userType==='provider'} onChange={ () => setUserType('provider') }>Job Provider</Radio>
                        &nbsp;&nbsp;&nbsp;
                        <Radio checked={userType==='seeker'} onChange={ () => setUserType('seeker') }>Job Seeker</Radio>
                    </List.Item>
                    <WhiteSpace/>
                    <Button type="primary" onClick={register}>Register</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={redirect}>Already have an account</Button>
                </List>
            </WingBlank>
        </div>
    )
}
