import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux' 
import UserList from '../../components/user-list'
import { reqUserList } from '../../api'
import { saveUserList } from '../../redux/actions'

export default function Provider(props) {

    const user = useSelector(state => state.userReducer.user)
    const userList = useSelector(state => state.userListReducer.userList)
    const dispatch = useDispatch()

    useEffect(()=>{
        async function fetchUserList() {
            if(user.userType==='provider') {
                const result = await reqUserList('seeker')
                if(result.status===0) {
                    dispatch(saveUserList(result.data))
                    console.log('Load UserList successfully!')
                } else {
                    console.log('Failed to load UserList!')
                }
            }
        }
        fetchUserList()
    },[user])

    return (
        <UserList userList={userList}/>
    )
}
