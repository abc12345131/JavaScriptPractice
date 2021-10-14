import React, { useState } from 'react'
import {
    List,
    NavBar,
    InputItem,
    Button
} from 'antd-mobile'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage } from '../../redux/actions'

const { Item } = List

export default function Chat(props) {

    const [content, setContent] = useState('')
    const params = useParams()
    const user = useSelector(state => state.userReducer.user)
    const {users, messageList} = useSelector(state => state.chatReducer)
    const dispatch = useDispatch()

    const from = user._id
    const to = params.userId

    //if async request didnt get data back yet
    if(!users[to]) {
        return null
    }

    const handleSend = () => {
        if(content) {
            dispatch(sendMessage({from, to, content}))            
        }
        setContent('')
    }
    const sendChatId = [from, to].join('_')
    const receiveChatId = [to, from].join('_')
    const messages = messageList ? messageList.filter(message => (message.chat_id===sendChatId || message.chat_id===receiveChatId)) : []
    const targetAvatar = users[to] ? require(`../../assets/images/${users[to].avatar}.png`).default : null
    const userAvatar = require(`../../assets/images/${user.info.avatar}.png`).default
    const list2 = messages.map(message => {
        if(to===message.from) {
            return (
                <Item
                    key={message._id}
                    thumb={targetAvatar}
                >
                    {message.content}
                </Item>
            )
        } else {
            return (
                <Item
                    key={message._id}
                    className='chat-me'
                    extra={
                        <img src={userAvatar} alt={user.info.avatar}/>
                    }
                >
                    {message.content}
                </Item>
            )
        }
    })

    return (
        <div id='chat-page'>
            <NavBar>{users[to].username}</NavBar>
            <List>
                {list2}
            </List>
            <div className='am-tab-bar'>
                <InputItem
                    placeholder='Please input'
                    value={content}
                    onChange={ val => setContent(val) }
                    extra={
                        <Button type='primary' style={{height: '100%', lineHeight: '100%', fontSize: 20}} onClick={handleSend}>&nbsp;Send&nbsp;</Button>
                    }
                />
            </div>
        </div>
    )
}
