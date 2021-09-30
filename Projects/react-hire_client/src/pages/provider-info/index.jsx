import React, { useState } from 'react'
import {
    NavBar,
    InputItem,
    TextareaItem,
    Button
} from 'antd-mobile'
import { useSelector, useDispatch } from 'react-redux'
import AvatarSelect from '../../components/avatar-select'

export default function ProviderInfo(props) {

    const [avatar, setAvatar] = useState('')
    const [providedPosition, setProvidedPosition] = useState('')
    const [company, setCompany] = useState('')
    const [salary, setSalary] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const errorMsg = useSelector(state => state)
    const dispatch = useDispatch()
    
    const selectAvatar = (text) => {
        setAvatar(text)
    }

    const save = () => {
        const info = {
            avatar,
            providedPosition,
            company,
            salary,
            jobDescription
        }
        console.log(info)
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
