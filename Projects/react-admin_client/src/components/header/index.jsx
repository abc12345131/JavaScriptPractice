import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal, Button } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { formateDate } from '../../utils/dateUtils'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
import menuList from '../../config/menuConfig'
import { reqWeather } from '../../api'
import './index.less'

class Header extends Component {
    state = {
        currentTime: formateDate(Date.now()),
        icon: '',
        text: '',
    }

    getTime = () => {
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        }, 1000)
    }

    getWeather = async () => {
        const result = await reqWeather('Toronto')
        const { icon, text } = result.current.condition
        this.setState({ icon, text })
    }

    getTitle = () => {
        const path = this.props.location.pathname
        let title = null
        menuList.forEach( item => {
            if (item.key===path) {
                title=item.title
            } else if (item.children) {
                const cItem=item.children.find(cItem=>cItem.key===path)
                if (cItem) {
                    title=cItem.title
                }
            }
        })
        return title
    }

    signout = () => {
        const { confirm } = Modal
        confirm({
            title: 'Do you want to sign out?',
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                //remove user data
                storageUtils.removeUser()
                memoryUtils.user = {}
                //redirect to login
                this.props.history.replace('/login')
            }
          });
    }

    componentDidMount() {
        this.getTime()
        this.getWeather()
    }

    componentWillUnmount() {
        //always remember to clear interval
        clearInterval(this.intervalId)
    }

    render() {

        const { currentTime, icon, text} = this.state

        const username = memoryUtils.user.username

        const title=this.getTitle()

        return (
            <div className="header">
                <div className="header-top">
                    <span>Hello, {username}</span>
                    <Button type="primary" shape="round" onClick={this.signout}>Sign Out</Button>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={icon} alt="weather"/>
                        <span>{text}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)