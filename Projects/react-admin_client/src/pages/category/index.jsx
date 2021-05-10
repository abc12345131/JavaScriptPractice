import React, { Component } from 'react'
import { Card, Table, Button, Modal, message } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { reqCategories } from '../../api';
import './index.less'

export default class Category extends Component {

    state = {
        loading: false,
        categories: [],
        subCategories: [],
        parentId: '0',
        parentName: '',
        showStatus: 0
    }

    initColumns = () => {
        this.columns = [
            {
            title: 'Class Name',
            dataIndex: 'name',
            },
            {
            title: 'Action',
            width: 300,
            render: (category) => (
                <span>
                    <Button type="link">Modify</Button>
                    {this.state.parentId==='0' ? <Button type="link" onClick={()=>{this.showSubCategories(category)}}>View</Button>: null}
                </span>
            )
            }
        ];

    }

    getCategories = async () => {
        //before request loading true 
        this.setState({loading:true})

        const {parentId} = this.state

        const result = await reqCategories(parentId)
        //after request loading false
        this.setState({loading:false})

        if (result.status===0) {            
            const categories = result.data
            if (parentId==='0') {
                this.setState({categories})
            } else {
                this.setState({subCategories:categories})
            }
        } else {
            message.error('Get categrories failed!')
        }
    }

    showSubCategories = (category) => {
        this.setState({
            parentId:category._id,
            parentName: category.name
        }, () => {            
            this.getCategories()
        })
    }

    showCategories = () => {
        this.setState({
            subCategories: [],
            parentId: '0',
            parentName: '',
        })
    }

    constructor (props) {
        super(props)
        this.initColumns()
    }

    componentDidMount () {
        this.getCategories()
    }

    render() {

        const {categories, subCategories, parentId, parentName, showStatus, loading, } = this.state

        const category = this.category || {}

        const title = parentId==='0' ? 'Primary classification' : (
            <span>
                <Button type="link" onClick={this.showCategories}>Primary classification</Button>
                <ArrowRightOutlined style={{marginRight:10}}/>
                <span>{parentName}</span>
            </span>
        )

        const extra = (
            <Button type='primary' >
                <PlusOutlined />Add
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='_id'
                    loading={loading}
                    dataSource={parentId==='0' ? categories: subCategories}
                    columns={this.columns}
                    pagination={{defaultPageSize: 5, showQuickJumper: true}}
                />

                <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>

                <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            
            </Card>
        )
    }
}
