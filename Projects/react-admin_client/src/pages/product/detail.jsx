import React, { Component } from 'react'
import { Card, List, Button} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Base_IMG_URL } from '../../utils/constants'
import { reqIdentifyCategory } from '../../api'


const {Item} = List

export default class ProductDetail extends Component {
    
    state = {
        classification: '',
        category: ''
    }

    async componentDidMount () {
        const { pCategoryId, categoryId } = this.props.location.state.product
        if (pCategoryId==='0') {
            const result = await reqIdentifyCategory(categoryId)
            if (result.data) {
                this.setState({classification: result.data.name})
            }
        } else {
            //use promise.all to get multiple request at same time
            const results = await Promise.all([reqIdentifyCategory(pCategoryId),reqIdentifyCategory(categoryId)])
            if (results[0].data) {
                this.setState({classification: results[0].data.name})
            }
            if (results[1].data) {
                this.setState({category: results[1].data.name})
            }
        }
    }

    render() {

        const { name, desc, price, detail, imgs, status } = this.props.location.state.product
        const { classification, category } = this.state
        const title = (
            <span style={{fontSize:20, fontWeight:'bold'}}>
                <Button type='link'>
                    <ArrowLeftOutlined style={{fontSize:20}} onClick={() =>this.props.history.goBack()}/>
                </Button>
                Product Detail               
            </span>
        )

        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className='left'>Product Name:</span>
                        <span className='right'>{name}</span>
                    </Item>
                    <Item>
                        <span className='left'>Product Description:</span>
                        <span className='right'>{desc}</span>
                    </Item>
                    <Item>
                        <span className='left'>Product price:</span>
                        <span className='right'>${price}</span>
                    </Item>
                    <Item>
                        <span className='left'>Category:</span>
                        <span className='right'>{classification} {category ? '--> '+category: ''}</span>
                    </Item>
                    <Item>
                        <span className='left'>Product Picture:</span>
                        <span className='right'>
                            {
                                imgs.map(img => (
                                    <img key={img} src={Base_IMG_URL+img} alt="picture"/>
                                ))
                            }
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>Product Detail:</span>
                        <span dangerouslySetInnerHTML={{__html: detail}}></span>
                    </Item>
                    <Item>
                        <span className='left'>Product Status:</span>
                        <span className='right'>{status===1 ? 'Available': 'Unavailable'}</span>
                    </Item>
                </List>
            </Card>
        )
    }
}
