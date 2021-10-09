import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    NavBar,
    InputItem,
    TextareaItem,
    Button
} from 'antd-mobile'
import AvatarSelect from '../../components/avatar-select'
import { reqUpdateUser } from '../../api'

export default function ProviderInfo(props) {

    const history = useHistory()
    const [avatar, setAvatar] = useState('')
    const [providedPosition, setProvidedPosition] = useState('')
    const [company, setCompany] = useState('')
    const [salary, setSalary] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    
    const selectAvatar = (text) => {
        setAvatar(text)
    }

    const save = async () => {
        const info = {
            avatar,
            providedPosition,
            company,
            salary,
            jobDescription
        }
        const result = await reqUpdateUser(info)
        if(result.status===0) {
            console.log('Info saved successfully!')
            history.push('/provider')
        } else {
            console.log(result.msg)
        }
    }

    return (
        <div>
            <NavBar>Job Provider Information</NavBar>
            <AvatarSelect selectAvatar={selectAvatar}/>
            <InputItem placeholder="Please enter provided position" onChange={ val => setProvidedPosition(val) }>Position</InputItem>
            <InputItem placeholder="Please enter company" onChange={ val => setCompany(val) }>Company</InputItem>
            <InputItem placeholder="Please enter salary" onChange={ val => setSalary(val) }>Salary</InputItem>
            <TextareaItem title="Description" placeholder="Please enter job description" rows={3} onChange={ val => setJobDescription(val) }/>
            <Button type="primary" onClick={save}>Save</Button>
        </div>
    )
}
