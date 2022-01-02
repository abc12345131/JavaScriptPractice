import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { List, Badge } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import formatTime from '../../utils/timeUtils'

const Item = List.Item
const Brief = Item.Brief

export default function Message(props) {

    const history = useHistory()
    const user = useSelector(state => state.userReducer.user)
    const {users, messageList} = useSelector(state => state.chatReducer)
    const [lastMessages, setLastMessages] = useState([])

    useEffect(()=>{
        const getLastMessages = (messageList, userId) => {
            //get obj(faster) of {targetId:lastMessage}
            const lastMessageObj = {}
            messageList.forEach(message => {
                //message itself unreadcount
                if(message.to===userId && !message.read) {
                    message.unReadCount = 1
                } else {
                    message.unReadCount = 0
                }
                const targetId = message.to===userId ? message.from : message.to
                const lastMessage = lastMessageObj[targetId]
                if(!lastMessage) {
                    lastMessageObj[targetId] = message
                } else {
                    const unReadCount = message.unReadCount + lastMessage.unReadCount
                    if(message.create_time>lastMessage.create_time) {
                        lastMessageObj[targetId] = message
                    }
                    lastMessageObj[targetId].unReadCount = unReadCount
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
        getLastMessages(messageList, user._id)
    },[messageList])

    if(!users) {
        return null
    }

    return (
        <List style={{paddingBottom:50, paddingTop:45}}>
            <QueueAnim type='alpha' delay={100}>
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
                                        extra = {<Badge text={message.unReadCount}/>}
                                        arrow = 'horizontal'
                                        onClick={()=> history.push(`/chat/${targetId}`)}
                                    >
                                        <Brief style={{fontSize: 13}}>
                                            <span>{target.username}</span>
                                            <span style={{float: 'right'}}>{formatTime(message.create_time)}</span>
                                        </Brief>
                                        {message.content}
                                    </Item>
                                )
                            } else {
                                return null
                            }    
                        }) : null
                }
            </QueueAnim>
        </List>
    )
}
