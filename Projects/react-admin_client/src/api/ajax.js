import axios from 'axios'
import { message } from 'antd'


//axios.defaults.withCredentials = true

export default function ajax (url, data={}, type='GET' ){
    //collecting error within the function instead of rejecting the error
    return new Promise((resolve, reject) => {
        let promise = null

        switch (type) {
            case 'GET':
                promise = axios.get(url,{params: data})
                break
            case 'POST': 
                promise = axios.post(url,data)
                break
            case 'PUT': 
                promise = axios.put(url,data)
                break
            case 'DELETE': 
                promise = axios.delete(url,data)
                break
        }

        promise.then(response => {
            //directly return response.data for request
            resolve(response.data)
        }).catch(error => {
            //use antd message collect error
            message.error(error.message)
        })
    })
}