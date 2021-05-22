import React, { Component } from 'react'
import { Card, Form, Input, Cascader, Button, message } from 'antd'
import PicturesWall from './pictures-wall'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { reqCategories, reqAddProduct } from '../../api'


const {Item} = Form
const {TextArea} = Input

export default class ProductAddUpdate extends Component {
    
    onFinish = (values) => {
        const form = this.formRef.current
        const pw = this.pwRef.current
        const imgs = pw.getImgs()
        console.log(value,form, imgs)
    }

    onFinishFailed = (errorInfo) => {
        message.error('Submit failed!')
    }
    
    state = {
        options: [],
    }

    initOptions = async (categories) => {
        const options = categories.map(c => {
            return {
                value: c._id,
                label: c.name,
                isLeaf: false
            }
        })

        const { isUpdate, product } = this
        const { pCategoryId } = product
        if (isUpdate && pCategoryId!=='0') {
            const subCategories = await this.getCategories(pCategoryId)
 
            const childOptions = subCategories.map(c => (
                {
                    value: c._id,
                    label: c.name,
                    isLeaf: true
                }
            ))
            //find classification the product 
            const targetOption = options.find(option => option.value===pCategoryId)
            if (targetOption) {
                targetOption.children = childOptions
            }
        }

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
            const childOptions = subCategories.map(c => (
                {
                    value: c._id,
                    label: c.name,
                    isLeaf: true
                }
            ))
            targetOption.children = childOptions
        } else {
            targetOption.isLeaf = true
        }
        this.setState({
            options: [...this.state.options]
        })
    }

    constructor (props) {
        super(props)
        this.formRef = React.createRef()
        this.pwRef = React.createRef()
        const product = this.props.location.state
        //save add/update
        this.isUpdate = !! product
        //if product is undefined set product {}
        this.product = product || {}
    }

    componentDidMount () {
        this.getCategories('0')
    }

    render() {

        const { isUpdate, product } = this
        const { categoryId, pCategoryId } = product
        //cascader accept array as initialvalue
        const categoryIds = []
        if(isUpdate) {
            if(pCategoryId==='0') {
                categoryIds.push(categoryId)
            } else {
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }
        }

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
                {isUpdate ? 'Modify Product' : 'Add Product'}             
            </span>
        )
                
        return (
            <Card title={title}>
                <Form
                    {...formItemLayout}
                    initialValues={{
                        ProductName: product.name,
                        ProductDescription: product.desc,
                        ProductPrice: product.price,
                        ProductCategory: categoryIds
                    }}
                    ref={this.formRef}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    scrollToFirstError
                >
                    <Item
                        name ='ProductName'
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
                        name ='ProductDescription'
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
                        name='ProductPrice'
                        label='Product Price'
                        rules={[
                            {
                                required: true,
                                message: 'Product price is required'
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
                        name='ProductCategory'
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
                        name='ProductPicture'
                        label='Product Picture'
                    >
                        <PicturesWall ref={this.pwRef}/>
                    </Item>
                    <Item
                        name='ProductDetail'
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
