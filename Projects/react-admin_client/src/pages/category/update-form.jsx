import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item

export default class UpdateForm extends Component {

    formRef = React.createRef()

    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setFormRef: PropTypes.func.isRequired
    }

    constructor (props) {
        super(props)
        this.props.setFormRef(this.formRef)
    }

    render() {

        const {categoryName} = this.props

        return (
            <Form initialValues={{category: categoryName}} ref={this.formRef}>
                <Item name='category'>
                    <Input placeholder='Please input claasification name'></Input>
                </Item>
            </Form>
        )
    }
}
