import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { List, Badge } from 'antd-mobile'
import { useSelector, useDispatch } from 'react-redux'

const Item = List.Item
const Brief = Item.Brief

export default function Message(props) {

    const history = useHistory()
    const user = useSelector(state => state.userReducer.user)
    const {users, messageList} = useSelector(state => state.chatReducer)
    const [lastMessages, setLastMessages] = useState([])
    const dispatch = useDispatch()

    useEffect(()=>{
        const getLastMessages = (messageList) => {
            //get obj(faster) of {targetId:lastMessage}
            const lastMessageObj = {}
            messageList.forEach(message => {
                const targetId = message.to===user._id ? message.from : message.to
                const lastMessage = lastMessageObj[targetId]
                if(!lastMessage) {
                    lastMessageObj[targetId] = message
                } else {
                    if(message.create_time>lastMessage.create_time) {
                        lastMessageObj[targetId] = message
                    }
                }
            })
            //turn obj to array
            const lastMessages = Object.values(lastMessageObj)
            //sort array
            lastMessages.sort((m1,m2) => {
                return m2.create_time - m1.create_time
            })
            setLastMessages(lastMessages)
        }
        getLastMessages(messageList)
    },[messageList])

    if(!users) {
        return null
    }

    return (
        <List style={{paddingBottom:50, paddingTop:45}}>
            {
                lastMessages ?
                    lastMessages.map( message => {
                        const targetId = message.to===user._id ? message.from : message.to
                        const target = users[targetId]
                        if(target) {
                            return (
                                <Item
                                    key={message._id}
                                    thumb = {target.avatar ? require(`../../assets/images/${target.avatar}.png`).default : null}
                                    extra = {<Badge text={0}/>}
                                    arrow = 'horizontal'
                                    onClick={()=> history.push(`/chat/${targetId}`)}
                                >
                                    <Brief>{target.username}</Brief>
                                    {message.content}
                                </Item>
                            )
                        } else {
                            return null
                        }    
                    }) : null
            }
        </List>
    )
}
