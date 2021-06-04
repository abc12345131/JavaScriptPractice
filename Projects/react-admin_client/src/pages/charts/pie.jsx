import React, { Component } from 'react'
import { Card, Button, } from 'antd'
import ReactECharts from 'echarts-for-react'

export default class Line extends Component {

    state = {
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

    update = () => {
        this.setState(state => ({
            data: state.data,
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
                data: this.state.data
            }
        }
    }

    render() {
        
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