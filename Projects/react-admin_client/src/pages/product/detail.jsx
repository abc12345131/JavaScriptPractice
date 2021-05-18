import React, { Component } from 'react'
import { Card, List, Button} from 'antd'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'

const Item = List.Item

export default class ProductDetail extends Component {
    render() {

        const title = (
            <span>
                <Button type='link'>
                    <ArrowLeftOutlined onClick={() =>this.props.history.goBack()}/>
                </Button>
                Product Detail               
            </span>
        )

        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className='left'>Product Name:</span>
                        <span className='right'>productname</span>
                    </Item>
                    <Item>
                        <span className='left'>Product Description:</span>
                        <span className='right'>productdesc</span>
                    </Item>
                    <Item>
                        <span className='left'>Product price:</span>
                        <span className='right'>price</span>
                    </Item>
                    <Item>
                        <span className='left'>Category:</span>
                        <span className='right'>classification - category</span>
                    </Item>
                    <Item>
                        <span className='left'>Product Picture:</span>
                        <span className='right'>
                            <img src="" alt="picture"/>
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>Product Detail:</span>
                        <span className='right'>detail</span>
                    </Item>
                </List>
            </Card>
        )
    }
}
