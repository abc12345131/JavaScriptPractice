import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Statistic, DatePicker, Timeline, message } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined, QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons'
import moment from 'moment'
import LineChart from './line-chart'
import BarChart from './bar-chart'
import { reqTask } from '../../api'
import './index.less'

const dateFormat = 'YYYY/MM/DD'
const {RangePicker} = DatePicker

class Home extends Component {

    state = {
        task: {},
        isVisited: true
    }

    update = () => {
        const userId = this.props.user._id
        this.initTask(userId)
    }

    initTask = async (userId) => {
        const result = await reqTask(userId)
        if (result.status===0) {            
            const task = result.data
            this.taskNodes = this.getTaskNodes(task)
            this.setState({task})
        } else {
            message.error('Get tasks failed!')
        }
    }

    getTaskNodes = (task) => {
        if (task.tasks) {
            return task.tasks.map((item) =>{
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
                        title="Total clicks"
                        style={{width: '15%'}}
                        headStyle={{color: 'rgba(0,0,0,.45)'}}
                    >
                        <div className="help-tip">
                            <QuestionCircleOutlined />
                            <p>This is the total clicks since the website is launched.</p>
                        </div>
                        <Statistic
                            value={1128163}
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
                    <LineChart className="home-chart"/>
                </Card>
                <Card
                    className="home-bottom"
                    title={<div className="home-menu">
                        <span className={isVisited ? "home-menu-active home-menu-visited" : 'home-menu-visited'}
                            onClick={this.handleChange(true)}>Visit</span>
                        <span className={isVisited ? "" : 'home-menu-active'} onClick={this.handleChange(false)}>Click</span>
                    </div>}
                    extra={<RangePicker
                        defaultValue={[moment('2021/06/01', dateFormat), moment('2021/07/01', dateFormat)]}
                        format={dateFormat}
                    />}
                >
                    <Card
                        className="home-table-left"
                        title={isVisited ? 'Visit Trend' : 'Click Trend'}
                        bodyStyle={{padding: 0, height: 381}}
                    >
                        <BarChart />
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

export default connect(
    state => ({user: state.user}),
    {}
) (Home)