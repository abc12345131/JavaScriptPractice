import React, { useState } from 'react'
import {
    NavBar,
    InputItem,
    TextareaItem,
    Button
} from 'antd-mobile'
import { useSelector, useDispatch } from 'react-redux'
import AvatarSelect from '../../components/avatar-select'

export default function SeekerInfo(props) {
    
    const [avatar, setAvatar] = useState('')
    const [desiredPosition, setDesiredPosition] = useState('')
    const [personalProfile, setPersonalProfile] = useState('')
    const errorMsg = useSelector(state => state)
    const dispatch = useDispatch()

    const selectAvatar = (text) => {
        setAvatar(text)
    }
    
    const save = () => {
        const info = {
            avatar,
            desiredPosition,
            personalProfile
        }
        console.log(info)
    }

    return (
        <div>
            <NavBar>Job Provider Information</NavBar>
            <AvatarSelect selectAvatar={selectAvatar}/>
            <InputItem placeholder="Please enter desired position" onChange={ val => setDesiredPosition(val) }>Position</InputItem>
            <TextareaItem title="Profile" placeholder="Please enter personal profile" rows={5} onChange={ val => setPersonalProfile(val) }/>
            <Button type="primary" onClick={save}>Save</Button>
        </div>
    )
}
