import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { reqUsers, reqDeleteUser, reqAddOrUpdateUser } from '../../api'
import { DeleteOutlined } from '@ant-design/icons'
import { PAGE_SIZE } from '../../utils/constants'
import {formatTime} from '../../utils/timeUtils'
import UserForm from './user-form'

export default class User extends Component {

    state = {
        loading: false,
        users: [],
        roles: [],
        user: {},
        showStatus: false
    }

    initColumns = () => {
        this.columns = [
            {
                title: 'Username',
                dataIndex: 'username',
            },
            {
                title: 'Email',
                dataIndex: 'email',
            },
            {
                title: 'Phone Number',
                dataIndex: 'phone',
            },
            {
                title: 'Creation Time',
                dataIndex: 'create_time',
                render: formatTime
            },
            {
                title: 'Role',
                dataIndex: 'role_id',
                render: (role_id) => this.roleNames[role_id]
            },
            {
                title: 'Action',
                width: 300,
                render: (user) => (
                    <span>
                        <Button type="link" onClick={() => this.showAddOrUpdate(user)}>Modify</Button>
                        <Button type="link" onClick={()=> this.deleteUser(user)}>Delete</Button>
                    </span>
                )
            }
        ]
    }

    initRoleNames = (roles) => {
        this.roleNames = roles.reduce((pre, role) => {
            pre[role._id] = role.name
            return pre
        },{})
    }

    handleCancel = () => {
        //close modal
        this.setState({
            showStatus: false
        })
    }

    addOrUpdateUser = () => {
        //validate form promise
        this.formRef.current.validateFields().then( async values => {
            this.setState({
                showStatus: false
            })

            const result = await reqAddOrUpdateUser()
            if (result.status===0) {
                message.success('Role updated successfully!')
                this.setState({

                })            
            } else {
                message.error('Failed to update role!')
            } 
        })
    }

    showAddOrUpdate = (user) => {
        this.setState({showStatus: true})
        if (user) {
            this.setState({user})
        }
    }

    deleteUser = (user) => {
        const { confirm } = Modal
        confirm({
            title: `Do you want to delete ${user.username}?`,
            icon: <DeleteOutlined />,
            onOk: async () => {
                const result = await reqDeleteUser(user._id)
                if (result.status===0) {
                    message.success('User deleted sucessfully!')
                    this.getUsers()
                } else {
                    message.error('Failed to delete user!')
                }
            }
          })
    }

    getUsers = async () => {
        const result = await reqUsers()
        if (result.status===0) {
            const {roles, users} = result.data
            this.initRoleNames(roles)
            this.setState({roles, users})
        }
    }

    constructor (props) {
        super(props)
        this.initColumns()
    }

    componentDidMount () {
        this.getUsers()
    }

    render() {

        const { users, user, roles, showStatus, loading } = this.state

        const title = (
            <Button type='primary' onClick={this.showAddOrUpdate}>Add User</Button>
        )

        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='_id'
                    loading={loading}
                    dataSource={users}
                    columns={this.columns}
                    pagination={{defaultPageSize: PAGE_SIZE, showQuickJumper: true}}
                />

                <Modal 
                    title={(user._id?'Update User':'Add User')}
                    visible={showStatus}
                    onOk={this.addOrUpdateUser}
                    onCancel={this.handleCancel}
                    getContainer={false}
                >
                    <UserForm
                        user={user}
                        roles={roles}                        
                        setFormRef={(formRef) => this.formRef=formRef}
                    />
                </Modal>
            </Card>
        )
    }
}
