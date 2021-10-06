import React from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

export default function UserList(props) {

    const userList = props.userList
    return (
        <WingBlank>
            {   
                userList?
                    userList.map(user => (
                        <div key={user._id}>
                            <WhiteSpace/>
                            <Card>
                                <Card.Header
                                    thumb = {require(`../../assets/images/${user.info.avatar}.png`).default}
                                    extra = {user.username}
                                />
                                <Card.Body>
                                    {user.info.providedPosition ? <div>{'Provided Position: '+user.info.providedPosition}</div>: null}
                                    {user.info.company ? <div>{'Company: '+user.info.company}</div>: null}
                                    {user.info.salary ? <div>{'Salary: '+user.info.salary}</div>: null}
                                    {user.info.jobDescription ? <div>{'Job Description: '+user.info.jobDescription}</div>: null}
                                    {user.info.desiredPosition ? <div>{'Desired Position: '+user.info.desiredPosition}</div>: null}
                                    {user.info.skills ? <div>{'Skills: '+user.info.skills}</div>: null}
                                </Card.Body>
                            </Card>
                        </div>    
                    )): null
            }
        </WingBlank>
    )
}

