import React, { Component } from 'react'
import { Card, Button, } from 'antd'
import ReactECharts from 'echarts-for-react'

export default class Line extends Component {

    state = {
        dateList: [1,2,3,4,5,6,7,8],
        clicks: [1,2,3,4,5,1,3,5],
        visits: [2,3,7,4,9,4,2,1]
    }

    update = () => {
        this.setState(state => ({
            clicks: state.clicks,
            visits: state.visits,
            dateList: state.dateList
        }))
    }

    getOption = (clicks, visits, dateList) => {
        return { 
           
            visualMap: {
                show: false,
                type: 'continuous',
                seriesIndex: 0,
            },

            title: {
                text: 'Visitor Data By Date'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['Clicks', 'Visits']
            },
            xAxis: {
                data: dateList
            },
            yAxis: {
            },
            grid: {
            },
            series: [{
                name: 'Clicks',
                type: 'line',
                data: clicks
            },            
            {
                name: 'Visits',
                type: 'line',
                data: visits
            }
            ]
        }    
    }

    render() {
        const { clicks, visits, dateList } = this.state
        return (
            <div>
                <Card>
                    <Button type='primary' onClick={this.update}>Update</Button>
                </Card>
                <Card title='Line Chart'>
                    <ReactECharts option={this.getOption(clicks, visits, dateList)} style={{height:600}}/>
                </Card>
            </div>
        )
    }
}