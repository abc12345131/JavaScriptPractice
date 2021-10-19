import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    List,
    NavBar,
    InputItem,
    Icon,
    Grid
} from 'antd-mobile'
import { reqUpdateMessageList } from '../../api'
import { sendMessage, readMessage } from '../../redux/actions'

const { Item } = List

export default function Chat(props) {

    const history = useHistory()
    const [content, setContent] = useState('')
    const [emojiList, setEmojiList] = useState([])
    const [isShow, setIsShow] = useState(false)
    const params = useParams()
    const user = useSelector(state => state.userReducer.user)
    const {users, messageList} = useSelector(state => state.chatReducer)
    const dispatch = useDispatch()

    useEffect(()=>{
        const emojis = [
            '😀', '😁', '🤣', '😄', '😁', '😅', '😂', '🙂', '🙃', '😉', '😊',
            '😇', '🥰', '😍', '🤩', '😘', '😗', '😜', '😚', '😙', '😋', '😛',
            '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑',
            '😶', '😏', '😒', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷',
            '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '😎'
        ]
        const emojiList = emojis.map(emoji => ({text: emoji}))
        setEmojiList(emojiList)
    }, [])

    useEffect(()=>{
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0);
    }, [isShow])

    useEffect(()=>{
        window.scrollTo(0, document.body.scrollHeight)
    }, [messageList])

    //user id
    const from = user._id
    //target id
    const to = params.userId

    useEffect(()=>{
        const messageRead = async (targetId, userId) => {
            const result = await reqUpdateMessageList(targetId)
            if(result.status===0) {
                const count = result.data
                const from = targetId
                const to = userId
                dispatch(readMessage({count, from, to}))
            }
        }
        //only message send to user will be updated as read
        messageRead(to, from)
    }, [])

    //if async request didnt get data back yet
    if(!users[to]) {
        return null
    }

    const handleSend = () => {
        if(content) {
            dispatch(sendMessage({from, to, content}))            
        }
        setIsShow(false)
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
            <NavBar
                icon={<Icon type='left'/>}
                className='sticky-header'
                onLeftClick={()=> history.goBack()}
            >
                {users[to].username}
            </NavBar>
            <List style={{paddingBottom:50, paddingTop:45}}>
                {list2}
            </List>
            <div className='am-tab-bar'>
                <InputItem
                    placeholder='Please input'
                    value={content}
                    onChange={val => setContent(val)}
                    onFocus={() => setIsShow(false)}
                    extra={
                        <span>
                            <span onClick={() => setIsShow(!isShow)} style={{fontSize: 12, marginRight: 5}}>😀</span>
                            <span onClick={handleSend} style={{backgroundColor: '#1EB270', color: 'white', fontSize: 18, padding: '0 5px', borderRadius: 5}}>Send</span>
                        </span>
                    }
                />
                {isShow ? (
                    <Grid
                        data={emojiList}
                        columnNum={8}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={ item => setContent(content + item.text)}
                        style={{touchAction: 'none'}}
                    />
                ) : null}

            </div>
        </div>
    )
}
