import React, { useEffect } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux' 
import { NavBar } from 'antd-mobile'
import {
    AppOutline,
    MessageOutline,
    GlobalOutline,
    UserOutline
  } from 'antd-mobile-icons'
import cookieUtils from '../../utils/cookieUtils'
import getRedirectPath from '../../utils/redirectUtils'
import { reqUser } from '../../api'
import { saveUser, removeUser } from '../../redux/actions'
import ProviderInfo from '../provider-info'
import SeekerInfo from '../seeker-info'
import Provider from '../provider'
import Seeker from '../seeker'
import Message from '../message'
import Personal from '../personal'
import NotFound from '../../components/not-found'
import FooterGuide from '../../components/footer-guide'

export default function Main(props) {

    const user = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch()
    const userId = cookieUtils.getUser()

    useEffect(()=>{
        async function fetchUser() {
            const result = await reqUser(userId)
            if(result.status===0) {
                dispatch(saveUser(result.data))
            } else {
                console.log('User not found, Please login!')
                dispatch(removeUser())
            }
        }
        if(userId && !user._id) {
            fetchUser()
        }
    }, [])
        
    if(!userId) {
        return <Redirect to='/login'/>
    } 

    let path = props.location.pathname
    if(path==='/') {
        path = getRedirectPath(user.userType, user.info)
        return <Redirect to={path}/>
    }

    const navList = [
        {
            path: '/provider',
            component: Provider,
            title: 'Seeker List',
            icon: <AppOutline/>,
            text: 'Job Seekers',
        },
        {
            path: '/seeker',
            component: Seeker,
            title: 'Provider List',
            icon: <GlobalOutline/>,
            text: 'Job Providers',
        },
        {
            path: '/message',
            component: Message,
            title: 'Message List',
            icon: <MessageOutline/>,
            text: 'Message Center',
        },
        {
            path: '/personal',
            component: Personal,
            title: 'Personal Center',
            icon: <UserOutline/>,
            text: 'Personal Center',
        }
    ]

    const currentNav = navList.find(nav => nav.path===path)
    if(currentNav) {
        if(user.userType==='provider') {
            navList[1].hide = true
        } else {
            navList[0].hide = true
        }
    }
    
    return (
        <div>
            {currentNav? <NavBar>{currentNav.title}</NavBar>: null}
            <Switch>
                {
                    navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}/>)
                }
                <Route path='/providerinfo' component={ProviderInfo}/>
                <Route path='/seekerinfo' component={SeekerInfo}/>
                <Route component={NotFound}/>
            </Switch>
            {currentNav? <FooterGuide navList={navList}/>: null}
        </div>
    )
}
