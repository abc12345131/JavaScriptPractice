import React, { useState, useEffect } from 'react'
import {
    List,
    NavBar,
    InputItem,
    Button
} from 'antd-mobile'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reqMessageList } from '../../api'
import { sendMsg } from '../../redux/actions'

export default function Chat(props) {

    const [content, setContent] = useState('')
    const params = useParams()
    const user = useSelector(state => state.userReducer.user)
    const {users, messageList} = useSelector(state => state.chatReducer)
    const dispatch = useDispatch()
    
    //if async request didnt get data back yet
    if(!users[to]) {
        return null
    }

    const from = user._id
    const to = params.userId

    const sendMessage = () => {
        if(content) {
            dispatch(sendMsg({from, to, content}))            
        }
        setContent('')
    }
    const sendChatId = [from, to].join('_')
    const receiveChatId = [to, from].join('_')
    const messages = messageList.filter(message => message.chat_id===(sendChatId || receiveChatId))
    const targetAvatar = users[to].info.avatar ? require(`../../assets/images/${users[to].info.avatar}.png`) : null
    const userAvatar = require(`../../assets/images/${user.info.avatar}.png`)
    return (
        <div>
            <NavBar>{users[to].username}</NavBar>
            <List>
                {
                    messages.map(message => {
                        if(message.chat_id===receiveChatId) {
                            <List.item key={message._id} thumb={targetAvatar}>
                                {message.content}
                            </List.item>
                        } else {
                            <List.item key={message._id} className='chat-me' extra='me' thumb={userAvatar}>
                                {message.content}
                            </List.item>
                        }
                    })
                }
            </List>
            <div className='am-tab-bar'>
                <InputItem
                    placeholder='Please input'
                    value={content}
                    onChange={ val => setContent(val) }
                    extra={
                        <Button onClick={sendMessage}>Send</Button>
                    }
                />
            </div>
        </div>
    )
}
