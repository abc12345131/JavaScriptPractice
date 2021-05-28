import React, { Component } from 'react'
import { Form, Input, Tree } from 'antd'
import PropTypes from 'prop-types'
import menuList from '../../config/menuConfig'

const {Item} = Form

export default class UpdateForm extends Component {

    static propTypes = {
        setFormRef: PropTypes.func.isRequired,
        role: PropTypes.object.isRequired
    }

    state = {
        checkedKeys: [],
        roleName: ''
    }
    
    onCheck = (checkedKeys, info) => {
        this.setState({checkedKeys})
    }

    getMenus = () => this.state.checkedKeys

    constructor (props) {
        super (props)
        const {role} = this.props
        this.state = {
            checkedKeys:role.menus,
            roleName:role.name
        }
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

        const treeData = [
            {
              title: 'Platform permission',
              key: 'all',
              children: menuList
            }
        ]

        return (
            <div>
                <Form ref={this.formRef} initialValues={{roleName:this.state.roleName}} {...formItemLayout}>
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
                <Tree
                    checkable
                    defaultExpandAll
                    checkedKeys={this.state.checkedKeys} 
                    onCheck={this.onCheck}
                    treeData={treeData}
                />  
            </div>
        )
    }
}
