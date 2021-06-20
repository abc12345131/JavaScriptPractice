import React, { Component } from 'react'
import { Card, Button, } from 'antd'
import ReactECharts from 'echarts-for-react'

export default class Engagement extends Component {

    state = {
        accounts: ['admin','Jerry123','Tom123','John123','Paul123','David123'],
        page_view: [188,221,231,152,180,213],
        scroll: [90,113,127,75,90,100],
        user_engagement: [69,82,93,45,65,71],
        session_start: [6,8,9,4,5,6],
        first_visit: [2,2,3,4,5,1]
    }

    update = () => {
        this.setState(state => ({
            accounts: state.accounts,
            page_view: state.page_view,
            scroll: state.scroll,
            user_engagement: state.user_engagement,
            session_start: state.session_start,
            first_visit: state.first_visit
        }))
    }

    getOption = (page_view, scroll, user_engagement, session_start, first_visit, accounts) => {
        return { 
            title: {
                text: 'Bar Chart'
            },
            tooltip: {},
            legend: {
                data:['page_view', 'scroll', 'user_engagement', 'session_start', 'first_visit']
            },
            xAxis: {
                data: accounts
            },
            yAxis: {},
            series: [
                {
                    name: 'page_view',
                    type: 'bar',
                    data: page_view
                },
                {
                    name: 'scroll',
                    type: 'bar',
                    data: scroll
                },                {
                    name: 'user_engagement',
                    type: 'bar',
                    data: user_engagement
                },                {
                    name: 'session_start',
                    type: 'bar',
                    data: session_start
                },                {
                    name: 'first_visit',
                    type: 'bar',
                    data: first_visit
                },
            ]
        }        
    }

    render() {
        const { page_view, scroll, user_engagement, session_start, first_visit, accounts } = this.state
        return (
            <div>
                <Card>
                    <Button type='primary' onClick={this.update}>Update</Button>
                </Card>
                <Card title='User events by account'>
                    <ReactECharts option={this.getOption(page_view, scroll, user_engagement, session_start, first_visit, accounts)} style={{height:600}}/>
                </Card>
            </div>
        )
    }
}
