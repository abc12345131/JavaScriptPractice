import React, { Component } from 'react'
import { Card, Button, } from 'antd'
import ReactECharts from 'echarts-for-react'

export default class Demographics extends Component {

    state = {
        data: [
            {value: 78, name: 'United Kingdom'},
            {value: 106, name: 'Australia'},
            {value: 132, name: 'France'},
            {value: 145, name: 'Germany'},
            {value: 200, name: 'United States of America'},
            {value: 226, name: 'Canada'},
        ]
    }

    update = () => {
        this.setState(state => ({
            data: state.data,
        }))
    }

    getOption = () => {
        return {     
            backgroundColor: '#ddd',

            title: {
                text: 'Pie Chart',
                top: 20,
                textStyle: {
                    color: '#000'
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
                <Card title='Users By Country'>
                    <ReactECharts option={this.getOption()} style={{height:600}}/>
                </Card>
            </div>
        )
    }
}