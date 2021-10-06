import React, { useState } from 'react'
import {
    NavBar,
    InputItem,
    TextareaItem,
    Button
} from 'antd-mobile'
import AvatarSelect from '../../components/avatar-select'
import { reqUpdateUser } from '../../api'

export default function SeekerInfo(props) {
    
    const [avatar, setAvatar] = useState('')
    const [desiredPosition, setDesiredPosition] = useState('')
    const [skills, setSkills] = useState('')

    const selectAvatar = (text) => {
        setAvatar(text)
    }
    
    const save = async () => {
        const info = {
            avatar,
            desiredPosition,
            skills
        }
        const result = await reqUpdateUser(info)
        if(result.status===0) {
            console.log('Info saved successfully!')
            props.history.push('/seeker')
        } else {
            console.log(result.msg)
        }
    }

    return (
        <div>
            <NavBar>Job Provider Information</NavBar>
            <AvatarSelect selectAvatar={selectAvatar}/>
            <InputItem placeholder="Please enter desired position" onChange={ val => setDesiredPosition(val) }>Position</InputItem>
            <TextareaItem title="Skills" placeholder="Please enter skills" rows={5} onChange={ val => setSkills(val) }/>
            <Button type="primary" onClick={save}>Save</Button>
        </div>
    )
}
