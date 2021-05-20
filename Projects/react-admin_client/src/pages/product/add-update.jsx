import React, { Component } from 'react'
import { Card, Form, Input, Cascader, Upload, Button, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { reqCategories, reqAddProduct } from '../../api'

const {Item} = Form
const {TextArea} = Input

export default class ProductAddUpdate extends Component {
    
    formRef = React.createRef();

    onFinish = (values) => {
        console.log(values)
        console.log(this.props)
    }

    onFinishFailed = (errorInfo) => {
        message.error('Submit failed!')
    }
    
    state = {
        options: []
    }

    initOptions = (categories) => {
        const options = categories.map(c => {
            return {
                value: c._id,
                label: c.name,
                isLeaf: false
            }
        })
        this.setState({options})
    }

    getCategories = async (parentId) => {
        const result = await reqCategories(parentId)
        if (result.status===0) {
            const categories = result.data
            if (parentId==='0') {
                this.initOptions(categories)
            } else {
                return categories

            }
        }
    }

    //lazy load data
    loadData = async (selectedOptions) => {

        const targetOption = selectedOptions[0]
        targetOption.loading = true
        const subCategories = await this.getCategories(targetOption.value)
        targetOption.loading = false
        if (subCategories && subCategories.length>0) {
            const childOptions = subCategories.map(c => {
                return {
                    value: c._id,
                    label: c.name,
                    isLeaf: true
                }
            })
            targetOption.children = childOptions
        } else {
            targetOption.isLeaf = true
        }
        this.setState({
            options: [...this.state.options]
        })
    }

    componentDidMount () {
        this.getCategories('0')
    }
    render() {
        
        const formItemLayout = {
            labelCol: {
              span: 3 
            },
            wrapperCol: {
              span: 9 
            }
        }

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                }
            }
        }

        const title = (
            <span style={{fontSize:20, fontWeight:'bold'}}>
                <Button type='link'>
                    <ArrowLeftOutlined style={{fontSize:20}} onClick={() =>this.props.history.goBack()}/>
                </Button>
                Add Product              
            </span>
        )
                
        return (
            <Card title={title}>
                <Form
                    {...formItemLayout}
                    initialValues={{'Product Name':''}}
                    ref={this.formRef}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    scrollToFirstError
                >
                    <Item
                        name ='Product Name'
                        label='Product Name'
                        rules={[
                            {
                                required: true,
                                message: 'Product name is required',
                            },
                        ]}
                    >
                        <Input placeholder='Please input product name' />
                    </Item>
                    <Item 
                        name ='Product Description'
                        label='Product Description'
                        rules={[
                            {
                                required: true,
                                message: 'Product description is required',
                            },
                        ]}
                    >
                        <TextArea
                            placeholder='Please input product description'
                            autoSize={{ minRows: 2, maxRows: 6 }}
                        />
                    </Item>
                    <Item
                        name='Product Price'
                        label='Product Price'
                        rules={[
                            {
                                required: true,
                                message: 'Product description is required'
                            },
                            {
                                validator: (_, value) => {
                                    if (value*1 > 0) {
                                        return Promise.resolve()
                                    } else {
                                        return Promise.reject(new Error('Price has to be bigger than 0'))
                                    }
                                }
                            },
                        ]}
                    >
                        <Input type='number' placeholder='Please input product price' addonBefore='$'/>
                    </Item>
                    <Item
                        name='Product Category'
                        label='Product Category'
                        rules={[
                            {
                                required: true,
                                message: 'Product category is required',
                            },
                        ]}
                    >
                        <Cascader
                            options={this.state.options}
                            loadData={this.loadData}
                        />
                    </Item>
                    <Item
                        name='Product Picture'
                        label='Product Picture'
                    >
                        <Input placeholder='Please input product name' />
                    </Item>
                    <Item
                        name='Product Detail'
                        label='Product Detail'
                    >
                        <Input placeholder='Please input product name' />
                    </Item>
                    <Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}
