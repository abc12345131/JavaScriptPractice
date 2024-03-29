import React, { Component } from 'react'
//use redux
//import { connect } from 'react-redux'
import cookieUtils from '../../utils/cookieUtils'
import { Card, Statistic, DatePicker, Timeline, message } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined, QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons'
import moment from 'moment'
import PlatformChart from './platform-chart'
import ViewChart from './view-chart'
import EngagementChart from './engagement-chart'
import { reqWork } from '../../api'
import './index.less'

const dateFormat = 'YYYY/MM/DD'
const {RangePicker} = DatePicker

export default class Home extends Component {

    state = {
        work: {},
        isVisited: true
    }

    update = () => {
        //use redux
        //const userId = this.props.user._id
        
        const userId = cookieUtils.getUser()._id
        this.initTask(userId)
    }

    initTask = async (userId) => {
        const result = await reqWork(userId)
        if (result.status===0) {            
            const work = result.data
            this.taskNodes = this.getTaskNodes(work)
            this.setState({work})
        } else {
            message.error('Get tasks failed!')
        }
    }

    getTaskNodes = (work) => {
        if (work) {
            return work.tasks.map((item) =>{
                if (item.status===0) {
                    return (<Timeline.Item key={item.task} color="green">{item.task}</Timeline.Item>)
                } else if (item.status===1) {
                    return (<Timeline.Item key={item.task} color="yellow">{item.task}</Timeline.Item>)
                } else {
                    return (<Timeline.Item key={item.task} color="red">{item.task}</Timeline.Item>)
                }
            })
        }
    }

    handleChange = (isVisited) => {
        return () => this.setState({isVisited})
    }

    componentDidMount () {
        this.update()
    }

    render() {
        const {isVisited} = this.state

        return (
            <div className='home'>
                <Card className="home-top">
                    <Card
                        className="home-card"
                        title="Total Views"
                        style={{width: '15%'}}
                        headStyle={{color: 'rgba(0,0,0,.45)'}}
                    >
                        <div className="help-tip">
                            <QuestionCircleOutlined />
                            <p>This is the total page views since the website is launched.</p>
                        </div>
                        <Statistic
                            value={2163}
                            style={{fontWeight: 'bolder'}}
                        />
                        <Statistic
                            value={15}
                            valueStyle={{fontSize: 15}}
                            prefix={'Weekly'}
                            suffix={<div>%<ArrowUpOutlined style={{color: 'red', marginLeft: 10}}/></div>}
                        />
                        <Statistic
                            value={10}
                            valueStyle={{fontSize: 15}}
                            prefix={'Daily'}
                            suffix={<div>%<ArrowDownOutlined style={{color: '#3f8600', marginLeft: 10}}/></div>}
                        />
                    </Card>
                    <PlatformChart className="home-chart"/>
                </Card>
                <Card
                    className="home-bottom"
                    title={<div className="home-menu">
                        <span className={isVisited ? "home-menu-active home-menu-visited" : 'home-menu-visited'}
                            onClick={this.handleChange(true)}>View</span>
                        <span className={isVisited ? "" : 'home-menu-active'} onClick={this.handleChange(false)}>Engagement</span>
                    </div>}
                    extra={<RangePicker
                        defaultValue={[moment('2021/06/01', dateFormat), moment('2021/07/01', dateFormat)]}
                        format={dateFormat}
                    />}
                >
                    <Card
                        className="home-table-left"
                        title={isVisited ? 'View Trend' : 'Engagement Trend'}
                        bodyStyle={{padding: 0, height: 381}}
                    >
                        {isVisited ? <ViewChart />: <EngagementChart />}
                    </Card>

                    <Card
                        title='Tasks'
                        extra={<ReloadOutlined onClick={() => this.update()}/>}
                        className="home-table-right"
                    >
                        <Timeline>
                            {this.taskNodes}
                        </Timeline>
                    </Card>
                </Card>
            </div>
        )
    }
}
// use redux
// export default connect(
//     state => ({user: state.user}),
//     {}
// ) (Home)