import React, { PureComponent } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'

const {Item} = Form

export default class UpdateForm extends PureComponent {

    static propTypes = {
        setFormRef: PropTypes.func.isRequired,
        categoryName: PropTypes.string
    }

    constructor (props) {
        super(props)
        this.formRef = React.createRef()
        this.props.setFormRef(this.formRef)
    }

    render() {

        const {categoryName} = this.props

        return (
            <Form initialValues={{category: categoryName}} ref={this.formRef}>
                <Item 
                    name='category'
                    rules={[
                        {required: true, message: 'category is required' }
                    ]}
                >
                    <Input placeholder='Please input category name'></Input>
                </Item>
            </Form>
        )
    }
}
