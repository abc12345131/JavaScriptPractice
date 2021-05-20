import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'

const {Item} = Form
const {Option} = Select

export default class AddForm extends Component {

    formRef = React.createRef()

    static propTypes = {
        setFormRef: PropTypes.func.isRequired
    }

    constructor (props) {
        super(props)
        this.props.setFormRef(this.formRef)
    }

    render() {

        const { categories, parentId } = this.props

        return (
            <Form initialValues={{classification: parentId}} ref={this.formRef}>
                <Item name='classification'>
                    <Select>
                        <Option value='0'>Primary Classification</Option>
                        {
                            categories.map(c => (<Option value={c._id}>{c.name}</Option>))
                        }
                    </Select>
                </Item>
                <Item 
                    name='category'
                    rules={[
                        {required: true, message: 'category is required'}
                    ]}
                >
                    <Input placeholder='Please input claasification name'></Input>
                </Item>
            </Form>
        )
    }
}
