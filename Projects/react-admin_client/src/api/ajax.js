import axios from 'axios'
import { message } from 'antd'

export default function ajax (url, data={}, type='GET' ){
    //collecting error within the function instead of rejecting the error
    return new Promise((resolve, reject) => {
        let promise = null

        if(type==='GET') {
            promise = axios.get(url,{
                params: data
            })
        }
        else {
            promise = axios.post(url,data)
        }

        promise.then(response => {
            //directly return response.data for request
            resolve(response.data)
        }).catch(error => {
            //use antd message collect error
            message.error('Request failed'+error.message)
        })
    })
}