const axios = require('axios')

const ajax = (url, data={}, type='GET') => {
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
                promise = axios.delete(url,{params: data})
                break
            default:
                console.log('Request type is wrong!' )
        }
        
        promise.then(response => {
            //directly return response.data for request
            resolve(response.data)
        }).catch(error => {
            reject(error.message)
        })
    })
}

module.exports = ajax