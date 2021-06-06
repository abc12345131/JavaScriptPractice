import React, { PureComponent } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import PropTypes from 'prop-types'

export default class RichTextEditor extends PureComponent {

    static propTypes = {
        detail: PropTypes.string
    }

    state = {
        editorState: EditorState.createEmpty(),
        textarea:''
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
            textarea: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        })
    }

    getDetail = () => {
        return this.state.textarea
    }

    uploadImageCallBack = (file) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open('POST', '/manage/img/upload')
            const data = new FormData()
            data.append('image', file)
            xhr.send(data)
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText)
                const url = response.data.url
                resolve({data: {link:url}})
            })
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText)
                reject(error)
            })
        })
    }

    constructor (props) {
        super(props)
        const html = this.props.detail
        if (html) {
            const contentBlock = htmlToDraft(html)
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
                const editorState = EditorState.createWithContent(contentState)
                this.state = {
                    editorState,
                    textarea: html
                }
            }
        }
    }

    render() {
        const { editorState } = this.state
        return (
            <div>
                <Editor
                    editorState={editorState}
                    editorStyle={{border:'1px solid black', height:'200px', padding:'5px'}}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                        image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                    }}
                />
                <textarea
                    disabled
                    value={this.state.textarea}
                    style={{width:'100%', height:'200px', padding:'5px'}}
                />
            </div>
        )
    }
}