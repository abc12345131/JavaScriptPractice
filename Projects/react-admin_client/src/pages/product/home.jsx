import React, { Component } from 'react'
import { Card, Select, Input, Table, Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'

const Option = Select.Option

export default class ProductHome extends Component {

    state = {
        loading: false,
        products: [],
        total: 0,
        keywords: '',
        searchType: 'productName',
        Status: 0
    }

    initColumns = () => {
        this.columns = [
            {
                title: 'Product Name',
                width: 300,
                dataIndex: 'name',
            },
            {
                title: 'Product Description',
                dataIndex: 'desc',
            },
            {
                title: 'Price',
                width: 120,
                dataIndex: 'price',
                render: (price) => ('$'+price)
            },
            {
                title: 'Status',
                width: 150,
                dataIndex: 'status',
                render: (product) => {
                    const {status, _id} = product
                    const newStatus = status===1 ? 2:1
                    return (
                        <span>
                            <Button type="primary" onClick={() => this.updateStatus(_id, newStatus)}>{status===1 ? 'Withdraw':'Launch'}</Button>
                            <span>{status===1 ? 'Available':'Unavailable'}</span>
                        </span> 
                    )
                }
            },
            {
                title: 'Action',
                width: 150,
                render: (product) => (
                    <span>
                        <Button type="link" onClick={() => this.props.history.push('/product/addupdate')}>Modify</Button>
                        <Button type="link" onClick={() => this.props.history.push('/product/detail', {product})}>View</Button>
                    </span>
                )
            }
        ];
    }

    getProducts = async (pageNum) => {
        //save pageNum for other method
        this.pageNum = pageNum
        this.setState({loading:true})
        const {searchType, keywords} = this.state
        let result
        if (keywords) {
            result = await reqSearchProducts(pageNum, PAGE_SIZE, searchType, keywords)
        } else {
            result = await reqProducts(pageNum, PAGE_SIZE)
        }
        //after request loading false
        this.setState({loading:false})

        if (result.status===0) {
            //get product data by page            
            const { list, total } = result.data
            this.setState({total, products: list})
        }
    }

    updateStatus = async (productId, newStatus) => {
        const result = await reqUpdateStatus(productId, newStatus)
        if (result.status===0) {
            message.success('Update succeed')
            this.getProducts(this.pageNum)
        }
    }

    componentDidMount () {
        this.getProducts(1)
    }

    constructor (props) {
        super(props)
        this.initColumns()
    }

    render() {

        const { products, total, loading, searchType, keywords } = this.state

        const title = (
            <span>
                <Select
                    value={searchType}
                    style={{width:150}}
                    onChange={value => this.setState({searchType: value})}
                >
                    <Option value='productName'>Search by name</Option>
                    <Option value='productDesc'>Search by description</Option>
                </Select>
                <Input
                    placeholder='keywords'
                    style={{width:150, margin: '0 5px'}}
                    value={keywords}
                    onChange={event => this.setState({keywords: event.target.value})}
                />
                <Button type='primary' onClick={()=>this.getProducts(1)}>Search</Button>
            </span>
        ) 

        const extra = (
            <Button type='primary'>
                <PlusOutlined />Add
            </Button>
        )

        return (
            <Card title={title} extra={extra} >
                <Table
                    bordered
                    rowKey='_id'
                    loading={loading}
                    dataSource={products}
                    columns={this.columns}
                    pagination={{
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getProducts
                    }}
                />
            </Card>
        )
    }
}
