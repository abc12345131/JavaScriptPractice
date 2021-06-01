import React, { Component } from 'react'
import { Card, Button, } from 'antd'
import ReactECharts from 'echarts-for-react'

export default class Bar extends Component {

    state = {
        accounts: [1,2,3,4,5,6,7,8],
        clicks: [1,2,3,4,5,1,3,5],
        visits: [2,3,7,4,9,4,2,1]
    }

    update = () => {
        this.setState(state => ({
            clicks: state.clicks,
            visits: state.visits,
            accounts: state.accounts
        }))
    }

    getOption = (clicks, visits, accounts) => {
        return { 
            title: {
                text: 'Visitor Data By Account'
            },
            tooltip: {},
            legend: {
                data:['Clicks', 'Visits']
            },
            xAxis: {
                data: accounts
            },
            yAxis: {},
            series: [{
                name: 'Clicks',
                type: 'bar',
                data: clicks
            },
            {
                name: 'Visits',
                type: 'bar',
                data: visits
            }]
        }        
    }

    render() {
        const { clicks, visits, accounts } = this.state
        return (
            <div>
                <Card>
                    <Button type='primary' onClick={this.update}>Update</Button>
                </Card>
                <Card title='Bar chart'>
                    <ReactECharts option={this.getOption(clicks, visits, accounts)} style={{height:600}}/>
                </Card>
            </div>
        )
    }
}
