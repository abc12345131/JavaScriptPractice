import React from 'react'
import { useHistory, useLocation } from "react-router-dom"
import { TabBar } from 'antd-mobile'

export default function FooterGuide(props) {

    const history = useHistory()
    const location = useLocation()

    return (
        <TabBar>
            {props.navList.map(item => (
                <TabBar.Item
                    key={item.path}
                    icon={item.icon}
                    title={item.text}
                    selectedIcon={item.icon}
                    selected={item.path===location.pathname}
                    onPress={() => history.push(item.path)}/>
            ))}
        </TabBar>
    )
}

