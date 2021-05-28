import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { PAGE_SIZE } from '../../utils/constants'
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import {formateDate} from '../../utils/dateUtils'
import AddForm from './add-form'
import UpdateForm from './update-form'

export default class Role extends Component {
    
    state = {
        roles: [],
        role: {},
        showStatus: 0
    }

    initColumns = () => {
        this.columns = [
            {
                title: 'Role Name',
                dataIndex: 'name',
            },
            {
                title: 'Creation Time',
                dataIndex: 'create_time',
                render: formateDate
            },
            {
                title: 'Authorization Time',
                dataIndex: 'auth_time',
                render: formateDate
            },
            {
                title: 'Authorized By',
                dataIndex: 'auth_name',
            }
        ]
    }

    getRoles = async () => {
        const result = await reqRoles()
        if (result.status===0) {
            const roles = result.data
            this.setState({roles})
        }
    }

    onRow = (role) => {
        return {
            onClick: (event) => {
                this.setState({role})
            }
        }
    }

    handleCancel = () => {
        //close modal
        this.setState({
            showStatus: 0
        })
    }

    addRole = () => {
        //validate form promise
        this.formRef.current.validateFields().then(async values => {
            this.setState({
                showStatus: 0
            })

            const { roleName } = values

            const result = await reqAddRole(roleName)
            if (result.status===0) {
                message.success('Role added successfully!')
                const role = result.data
                this.setState((state) => ({
                    roles: [...state.roles, role]
                }))
                
            } else {
                message.error('Failed to add role!')
            }
        })
    }

    updateRole = () => {
        //validate form promise
        this.formRef.current.validateFields().then( async values => {
            this.setState({
                showStatus: 0
            })
          
            const uf = this.ufRef.current  
            const role=this.state.role
            role.name=values.roleName
            role.menus=uf.getMenus()
            role.auth_name=memoryUtils.user.username
            role.auth_time=Date.now()
            const result = await reqUpdateRole(role)
            if (result.status===0) {
                message.success('Role updated successfully!')
                this.setState({
                    roles: [...this.state.roles]
                })            
            } else {
                message.error('Failed to update role!')
            } 
        })
    }

    showAdd = () => {
        this.setState({
            showStatus: 1
        })
    }

    showUpdate = () => {
        this.setState({
            showStatus: 2
        })
    }

    constructor (props) {
        super(props)
        this.initColumns()
        this.ufRef = React.createRef()
    }

    componentDidMount () {
        this.getRoles()
    }

    render() {

        const { roles, role, showStatus } = this.state

        const title = (
            <span>
                <Button type='primary' onClick={this.showAdd} >Add Role</Button>&nbsp;&nbsp;
                <Button type='primary' disabled={!role._id} onClick={this.showUpdate}>Permission Setting</Button>
            </span>
        )

        return (
            <Card title={title}>
                <Table
                    bordered
                    onRow={this.onRow}
                    rowSelection={{type: 'radio',selectedRowKeys: [role._id]}}
                    rowKey='_id'
                    dataSource={roles}
                    columns={this.columns}
                    pagination={{defaultPageSize: PAGE_SIZE, showQuickJumper: true}}
                />
                <Modal title="Add Role" visible={showStatus===1} onOk={this.addRole} onCancel={this.handleCancel} getContainer={false}>
                    <AddForm
                        setFormRef={(formRef) => this.formRef=formRef}
                    />
                </Modal>
                <Modal title="Permission Setting" visible={showStatus===2} onOk={this.updateRole} onCancel={this.handleCancel} getContainer={false}>
                    <UpdateForm                    
                        ref={this.ufRef}
                        role = {role}
                        setFormRef={(formRef) => this.formRef=formRef}
                    />
                </Modal>
            </Card>            
        )
    }
}