import React from 'react'
import { useHistory, useLocation } from "react-router-dom"
import { TabBar } from 'antd-mobile'

export default function FooterGuide(props) {

    const history = useHistory()
    const location = useLocation()
    const filteredList = props.navList.filter(nav => !nav.hide)
    return (
        <TabBar>
            {filteredList.map(item => (
                <TabBar.Item
                    key={item.path}
                    badge={item.path==='/message' ? props.unReadCount : 0}
                    icon={item.icon}
                    title={item.text}
                    selectedIcon={item.icon}
                    selected={item.path===location.pathname}
                    onPress={() => history.push(item.path)}/>
            ))}
        </TabBar>
    )
}

