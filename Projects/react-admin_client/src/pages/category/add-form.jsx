import React, { PureComponent } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'

const {Item} = Form
const {Option} = Select

export default class AddForm extends PureComponent {

    static propTypes = {
        setFormRef: PropTypes.func.isRequired,
        categories: PropTypes.array.isRequired,
        parentId: PropTypes.string.isRequired
    }

    constructor (props) {
        super(props)
        this.formRef = React.createRef()
        this.props.setFormRef(this.formRef)
    }

    render() {

        const { categories, parentId } = this.props

        return (
            <Form initialValues={{classification: parentId}} ref={this.formRef}>
                <Item name='classification'>
                    <Select>
                        <Option key='0' value='0'>Primary Classification</Option>
                        {
                            categories.map(c => (<Option key={c._id} value={c._id}>{c.name}</Option>))
                        }
                    </Select>
                </Item>
                <Item 
                    name='category'
                    rules={[
                        {required: true, message: 'category is required'}
                    ]}
                >
                    <Input placeholder='Please input category name'></Input>
                </Item>
            </Form>
        )
    }
}
