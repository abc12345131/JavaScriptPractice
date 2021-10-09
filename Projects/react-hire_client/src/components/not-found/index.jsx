import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd-mobile'
import './index.less'

export default function NotFound(props) {

    const history = useHistory()
    
    return (
        <div className='not-found'>
            <div className='top'></div>
            <div className='bottom'>
                <h1>Error 404</h1>
                <h2>Sorry, Page Not Found!</h2>
                <Button
                    type='primary'
                    onClick={() => history.replace('/')}
                >
                    Return to Home
                </Button>
            </div>
        </div>
    )
}