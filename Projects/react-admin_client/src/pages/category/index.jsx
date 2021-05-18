import React, { Component } from 'react'
import { Card, Table, Button, Modal, message } from 'antd'
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { reqAddCategories, reqCategories, reqUpdateCategories } from '../../api'
import AddForm from './add-form'
import UpdateForm from './update-form'

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
                        <Button type="link" onClick={() => this.showUpdate(category)}>Modify</Button>
                        {this.state.parentId==='0' ? <Button type="link" onClick={()=>{this.showSubCategories(category)}}>View</Button>: null}
                    </span>
                )
            }
        ];

    }

    getCategories = async (parentId) => {
        //before request loading true 
        this.setState({loading:true})

        parentId = parentId || this.state.parentId

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

    handleCancel = () => {
        //close modal
        this.setState({
            showStatus: 0
        })
    }

    showAdd = () => {
        this.setState({
            showStatus: 1
        })
    }

    addCategory = () => {
        //validate form promise
        this.formRef.current.validateFields().then(async values => {
            this.setState({
                showStatus: 0
            })

            const parentId = values.classification
            const categoryName = values.category

            const result = await reqAddCategories(categoryName, parentId)
            if (result.status===0) {
                //refresh the data
                if(parentId===this.state.parentId) {
                    this.getCategories()
                } else if (parentId==='0') {
                    this.getCategories('0')
                }
            }
        }).catch(
            message.error('Input is not valid!')
        )
    }

    showUpdate = (category) => {
        
        this.category = category

        this.setState({
            showStatus: 2
        })
    }

    updateCategory = () => {
        //validate form promise
        this.formRef.current.validateFields().then(async values => {
            this.setState({
                showStatus: 0
            })
            const categoryId = this.category._id
            const categoryName = values.category
            const result = await reqUpdateCategories(categoryId, categoryName)
            if (result.status===0) {
                //refresh the data
                this.getCategories()
            }
        }).catch(
            message.error('Input is not valid!')
        )
    }


    constructor (props) {
        super(props)
        this.initColumns()
    }

    componentDidMount () {
        this.getCategories()
    }

    render() {

        const {categories, subCategories, parentId, parentName, showStatus, loading } = this.state

        const category = this.category || {}

        const title = parentId==='0' ? 'Primary Classification' : (
            <span>
                <Button type="link" onClick={this.showCategories} style={{fontSize:16, fontWeight:'inherit', marginLeft: -15}}>Primary classification</Button>
                <ArrowRightOutlined style={{marginRight:10}}/>
                <span>{parentName}</span>
            </span>
        )

        const extra = (
            <Button type='primary' onClick={this.showAdd}>
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

                <Modal title="Add classification" visible={showStatus===1} onOk={this.addCategory} onCancel={this.handleCancel} getContainer={false}>
                    <AddForm
                        categories={categories}
                        parentId={parentId}
                        setFormRef={(formRef) => this.formRef=formRef}/>
                </Modal>

                <Modal title="Update classification" visible={showStatus===2} onOk={this.updateCategory} onCancel={this.handleCancel} getContainer={false}>
                    <UpdateForm
                        categoryName={category.name}
                        setFormRef={(formRef) => this.formRef=formRef}
                    />
                </Modal>
            </Card>
        )
    }
}
