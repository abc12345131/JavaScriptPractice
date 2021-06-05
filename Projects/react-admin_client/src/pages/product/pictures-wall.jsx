import React, { PureComponent } from 'react'
import { Upload, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { reqDeleteImg } from '../../api'
import { Base_IMG_URL } from '../../utils/constants'


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
      
export default class PicturesWall extends PureComponent {

    static propTypes = {
        imgs: PropTypes.array
    }

    constructor (props) {
        super(props)
        let fileList= [
            // each item should be like this
            // {
            //     uid: '-1',
            //     name: 'image.png',
            //     status: 'done',
            //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            // }
        ]

        const {imgs} = this.props
        if (imgs && imgs.length>0) {
            fileList = imgs.map((img,index) => ({
                uid:-index,
                name: img,
                status: 'done',
                url: Base_IMG_URL+img
            }))
        }

        this.state = {
            previewVisible: false,
            //image url
            previewImage: '',
            previewTitle: '',
            fileList
        }

    }

    state = {    
        previewVisible: false,
        //image url
        previewImage: '',
        previewTitle: '',
        fileList: [
        // each item is like this
        // {
        //     uid: '-1',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        ],
    }
    
    handleCancel = () => this.setState({ previewVisible: false });
    
    //show big picture of the file
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
    
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        })
    }
    
    handleChange = async ({ file, fileList }) => {
        
        if (file.status==='done') {
            const result = file.response
            if (result.status===0) {
                message.success('Picture uploaded successfully!')
                const {name, url} = result.data
                const newFile = fileList[fileList.length-1]
                newFile.name = name
                newFile.url = url
            } else {
                message.error('Failed to upload!')
            }
        } else if (file.status==='removed') {
            const result = await reqDeleteImg(file.name)
            if (result.status===0) {
                message.success('Image deleted successfully!')
            } else {
                message.error('Failed to delete image!')
            }
        }
                
        this.setState({ fileList })
    }
    
    getImgs = () => {
        return this.state.fileList.map(file => file.name)
    }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
        )
        return (
            <div>
                <Upload
                    //accept location
                    action='/api/manage/img/upload'
                    //accept format
                    accept='image/*'
                    //uploaded file name
                    name='image'
                    listType="picture-card"
                    //array of uploaded image object
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}