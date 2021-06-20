import React, { PureComponent } from 'react'
import { Chart, Interval, Tooltip } from 'bizcharts'

export default class ViewChart extends PureComponent {

    render() {

        const data = [
            {
            year: "1月",
            views: 108
            },
            {
            year: "2月",
            views: 162
            },
            {
            year: "3月",
            views: 116
            },
            {
            year: "4月",
            views: 245
            },
            {
            year: "5月",
            views: 128
            },
            {
            year: "6月",
            views: 98
            },
            {
            year: "7月",
            views: 88
            },
            {
            year: "8月",
            views: 118
            },
            {
            year: "9月",
            views: 108
            },
            {
            year: "10月",
            views: 108
            },
            {
            year: "11月",
            views: 58
            },
            {
            year: "12月",
            views: 68
            }
        ]

        return (
                <Chart
                    height={320}
                    autoFit
                    data={data}
                    interactions={['active-region']}
                    padding={[30, 30, 30, 50]}
                >
                    <Interval position="year*views" />
                    <Tooltip shared />
                </Chart>
        )
    }
}