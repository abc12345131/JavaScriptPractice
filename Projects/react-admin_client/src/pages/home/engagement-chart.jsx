import React, { PureComponent } from 'react'
import { Chart, Interval, Tooltip } from 'bizcharts'

export default class EngagementChart extends PureComponent {

    render() {

        const data = [
            {
            year: "1月",
            engagements: 38
            },
            {
            year: "2月",
            engagements: 52
            },
            {
            year: "3月",
            engagements: 61
            },
            {
            year: "4月",
            engagements: 145
            },
            {
            year: "5月",
            engagements: 48
            },
            {
            year: "6月",
            engagements: 38
            },
            {
            year: "7月",
            engagements: 28
            },
            {
            year: "8月",
            engagements: 38
            },
            {
            year: "9月",
            engagements: 68
            },
            {
            year: "10月",
            engagements: 38
            },
            {
            year: "11月",
            engagements: 58
            },
            {
            year: "12月",
            engagements: 38
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
                    <Interval position="year*engagements" />
                    <Tooltip shared />
                </Chart>
        )
    }
}