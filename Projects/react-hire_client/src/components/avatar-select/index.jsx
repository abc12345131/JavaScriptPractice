import React, {useState, useEffect } from 'react'
import {
    List,
    Grid
} from 'antd-mobile'

export default function AvatarSelect(props) {

    const [selected, setSelected] = useState({})
    const [avatarList, setAvatarList] = useState([])
    
    useEffect(()=>{
        const list = []
        for(let i=0; i<20; i++) {
            list.push({
                text: 'avatar'+(i+1),
                icon: require(`../../assets/images/avatar${i+1}.png`).default
            })
        }
        setAvatarList(list)
    }, [])

    const listHeader=!selected ? 'Please select avatar': (
        <div>
            Selected Avatar: <img src={selected.icon} alt={selected.text}/>
        </div>
    )

    const handleClick = (object) => {
        setSelected(object)
        props.selectAvatar(object.text)
    }

    return (
        <List renderHeader={()=>listHeader}>
            <Grid data={avatarList} columnNum={5} onClick={handleClick} ></Grid>
        </List>
    )
}

