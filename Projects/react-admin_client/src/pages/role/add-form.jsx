import React, { PureComponent } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'

const {Item} = Form

export default class AddForm extends PureComponent {

    static propTypes = {
        setFormRef: PropTypes.func.isRequired,
    }

    constructor (props) {
        super(props)
        this.formRef = React.createRef()
        this.props.setFormRef(this.formRef)
    }

    render() {

        const formItemLayout = {
            labelCol: {
              span: 6 
            },
            wrapperCol: {
              span: 16 
            }
        }

        return (
            <Form ref={this.formRef} {...formItemLayout}>
                <Item 
                    name='roleName'
                    label='Role Name'
                    rules={[
                        {required: true, message: 'role name is required'}
                    ]}
                >
                    <Input placeholder='Please input role name'></Input>
                </Item>
            </Form>
        )
    }
}
