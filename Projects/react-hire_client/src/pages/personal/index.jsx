import React from 'react'
import { useSelector, useDispatch } from 'react-redux' 
import {
    Result,
    List,
    Button,
    WhiteSpace,
    Modal
} from 'antd-mobile'
import { removeUser } from '../../redux/actions'

export default function Personal(props) {

    const user = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch()
    const logout= () => {
        Modal.alert('Log out', 'Are you sure to log out?', 
            [
                {
                    text: 'Cancel',
                    onPress: ()=> {
                        console.log('Log out cancelled!')
                    }
                },
                {
                    text: 'Confirm',
                    onPress: ()=> {
                        console.log('Log out successfully!')
                        dispatch(removeUser())
                    }
                }
            ]
        )        
    }
    
    if(user.info) {

        const {
            avatar,
            providedPosition,
            company,
            salary,
            jobDescription,
            desiredPosition,
            skills
        } = user.info

        return (
            <div style={{marginTop:45}}>
                <Result
                    img={<img src={require(`../../assets/images/${avatar}.png`).default} alt="header"/>}
                    title={user.username}
                    message={company}
                />
                <List>
                    <List.Item multipleLine>
                        {providedPosition ? <List.Item.Brief>{'Provided Position: '+providedPosition}</List.Item.Brief>: null}
                        {company ? <List.Item.Brief>{'Company: '+company}</List.Item.Brief>: null}
                        {salary ? <List.Item.Brief>{'Salary: '+salary}</List.Item.Brief>: null}
                        {jobDescription ? <List.Item.Brief>{'Job Description: '+jobDescription}</List.Item.Brief>: null}
                        {desiredPosition ? <List.Item.Brief>{'Desired Position: '+desiredPosition}</List.Item.Brief>: null}
                        {skills ? <List.Item.Brief>{'Skills: '+skills}</List.Item.Brief>: null}
                    </List.Item>
                </List>
                <WhiteSpace/>
                <Button type="warning" onClick={logout}>Log out</Button>
            </div>
        )
    } else {
        return (
            <div>
                Loading...
            </div>
        )
    }
}
