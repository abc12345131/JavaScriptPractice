import React, { Component } from 'react'
import { Card, Button, } from 'antd'
import ReactECharts from 'echarts-for-react'

export default class Acquisition extends Component {

    state = {
        dateList: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        direct: [11,12,13,14,15,11,13],
        referral: [6,3,7,4,9,4,8]
    }

    update = () => {
        this.setState(state => ({
            direct: state.direct,
            referral: state.referral,
            dateList: state.dateList
        }))
    }

    getOption = (direct, referral, dateList) => {
        return { 
           
            visualMap: {
                show: false,
                type: 'continuous',
                seriesIndex: 0,
            },

            title: {
                text: 'Line Chart'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['direct', 'referral']
            },
            xAxis: {
                data: dateList
            },
            yAxis: {
            },
            grid: {
            },
            series: [{
                name: 'direct',
                type: 'line',
                data: direct
            },            
            {
                name: 'referral',
                type: 'line',
                data: referral
            }
            ]
        }    
    }

    render() {
        const { direct, referral, dateList } = this.state
        return (
            <div>
                <Card>
                    <Button type='primary' onClick={this.update}>Update</Button>
                </Card>
                <Card title='Weekly User Data'>
                    <ReactECharts option={this.getOption(direct, referral, dateList)} style={{height:600}}/>
                </Card>
            </div>
        )
    }
}