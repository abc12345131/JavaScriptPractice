import React from 'react'
import {Button, Row, Col} from 'antd-mobile'
import './index.less'

export default function NotFound(props) {

    return (
        <div className='not-found'>
            <div className='top'></div>
            <div className='bottom'>
                <h1>Error 404</h1>
                <h2>Sorry, Page Not Found!</h2>
                <Button
                    type='primary'
                    onClick={() => props.history.replace('/')}
                >
                    Return to Home
                </Button>
            </div>
        </div>
    )
}