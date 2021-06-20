import React, { PureComponent } from 'react'
import { Chart, Line, Axis, Point, Tooltip } from 'bizcharts'

export default class PlatformChart extends PureComponent {

    render() {

        const data = [
            {
                month: "Jan",
                platform: "PC",
                visit: 7
            },
            {
                month: "Jan",
                platform: "Andriod",
                visit: 6
            },
            {
                month: "Jan",
                platform: "iOS",
                visit: 4
            },
            {
                month: "Feb",
                platform: "PC",
                visit: 7
            },
            {
                month: "Feb",
                platform: "Andriod",
                visit: 6
            },
            {
                month: "Feb",
                platform: "iOS",
                visit: 4
            },
            {
                month: "Mar",
                platform: "PC",
                visit: 10
            },
            {
                month: "Mar",
                platform: "Andriod",
                visit: 4
            },
            {
                month: "Mar",
                platform: "iOS",
                visit: 6
            },
            {
                month: "Apr",
                platform: "PC",
                visit: 15
            },
            {
                month: "Apr",
                platform: "Andriod",
                visit: 8
            },
            {
                month: "Apr",
                platform: "iOS",
                visit: 9
            },
            {
                month: "May",
                platform: "PC",
                visit: 18
            },
            {
                month: "May",
                platform: "Andriod",
                visit: 11
            },
            {
                month: "May",
                platform: "iOS",
                visit: 12
            },
            {
                month: "Jun",
                platform: "PC",
                visit: 22
            },
            {
                month: "Jun",
                platform: "Andriod",
                visit: 9
            },
            {
                month: "Jun",
                platform: "iOS",
                visit: 15
            },
            {
                month: "Jul",
                platform: "PC",
                visit: 25
            },
            {
                month: "Jul",
                platform: "Andriod",
                visit: 12
            },
            {
                month: "Jul",
                platform: "iOS",
                visit: 17
            },
            {
                month: "Aug",
                platform: "PC",
                visit: 27
            },
            {
                month: "Aug",
                platform: "Andriod",
                visit: 14
            },
            {
                month: "Aug",
                platform: "iOS",
                visit: 17
            },
            {
                month: "Sep",
                platform: "PC",
                visit: 23
            },
            {
                month: "Sep",
                platform: "Andriod",
                visit: 8
            },
            {
                month: "Sep",
                platform: "iOS",
                visit: 14
            },
            {
                month: "Oct",
                platform: "PC",
                visit: 18
            },
            {
                month: "Oct",
                platform: "Andriod",
                visit: 8
            },
            {
                month: "Oct",
                platform: "iOS",
                visit: 10
            },
            {
                month: "Nov",
                platform: "PC",
                visit: 14
            },
            {
                month: "Nov",
                platform: "Andriod",
                visit: 7
            },
            {
                month: "Nov",
                platform: "iOS",
                visit: 7
            },
            {
                month: "Dec",
                platform: "PC",
                visit: 10
            },
            {
                month: "Dec",
                platform: "Andriod",
                visit: 6
            },
            {
                month: "Dec",
                platform: "iOS",
                visit: 5
            }
        ]

        const scale = {
            visit: { 
                min: 0,
                alias:'Users'
            },

        }

        const title = {
            style: {
                fontSize: 18,
                textAlign: 'center',
                fill: '#999',
            },
 
            offset: 40,
          }

        return (
            <div style={{width: '80%', height: 250, float: 'right'}}>
                <Chart
                    height={230}
                    autoFit
                    data={data}
                    scale={scale}
                    interactions={['element-active']}
                    padding={[20, 20, 60, 80]}
                >
                    <Point position="month*visit" color="platform" shape='circle' />
                    <Axis name="visit" title={title}/>
                    <Line shape="smooth" position="month*visit" color="platform" label="visit" />
                    <Tooltip shared showCrosshairs />
	            </Chart>
            </div>
        )
    }
}
