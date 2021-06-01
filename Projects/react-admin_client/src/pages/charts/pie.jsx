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

    getOption = () => {
        return {     
            backgroundColor: '#2c343c',

            title: {
                text: 'Visitor Data By Platform',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },        
            legend: {
                top: 'bottom'
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: true},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            series:{
                name: 'Area mode',
                type: 'pie',
                radius: [50, 250],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: [
                    {value: 40, name: 'rose 1'},
                    {value: 38, name: 'rose 2'},
                    {value: 32, name: 'rose 3'},
                    {value: 30, name: 'rose 4'},
                    {value: 28, name: 'rose 5'},
                    {value: 26, name: 'rose 6'},
                    {value: 22, name: 'rose 7'},
                    {value: 18, name: 'rose 8'}
                ]
            }
        }
    }

    render() {
        const { clicks, visits, dateList } = this.state
        return (
            <div>
                <Card>
                    <Button type='primary' onClick={this.update}>Update</Button>
                </Card>
                <Card title='Pie Chart'>
                    <ReactECharts option={this.getOption()} style={{height:600}}/>
                </Card>
            </div>
        )
    }
}