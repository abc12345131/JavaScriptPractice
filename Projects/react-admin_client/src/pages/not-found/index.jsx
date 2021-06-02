import React, {Component} from 'react'
import {Button, Row, Col} from 'antd'
import { connect } from 'react-redux'
import { setHeadTitle } from '../../redux/actions'
import './index.less'

class NotFound extends Component {

    goHome = () => {
        this.props.setHeadTitle('Home')
        this.props.history.replace('/home')
    }

    render() {
        return (
            <Row className='not-found'>
                <Col span={12} className='left'></Col>
                <Col span={12} className='right'>
                    <h1>Error 404</h1>
                    <h2>Sorry, we couldn't find that Web page!</h2>
                    <Button
                        type='primary'
                        onClick={() => this.goHome()}
                        size='large'
                    >
                        Return to Home
                    </Button>
                </Col>
            </Row>
        )
    }
}

export default connect(
    state => ({}),
    {setHeadTitle}
) (NotFound) 