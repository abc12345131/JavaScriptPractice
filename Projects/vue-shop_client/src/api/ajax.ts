import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";

export interface ResponseData {
    code: number;
    data?: any;
    message: string;
}


export default function ajax (url='', data={}, type='POST') {
    //collecting error within the function instead of rejecting the error
    return new Promise((resolve, reject) => {

        let promise: Promise<AxiosResponse<any, any>> | undefined
        const service: AxiosInstance | any = axios.create({
            baseURL: "/graphql", // base_url
            timeout: 50000 
        })
        
        // // request interceptor setting
        // service.interceptors.request.use(
        //     (config: AxiosRequestConfig) => {
        //         return config;
        //     },
        //     (error: any) => {
        //         // Do something with request error
        //         console.error("error:", error) // for debug
        //         Promise.reject(error)
        //     }
        // )
  
        // // response interceptor setting
        // service.interceptors.response.use(
        //     (res: AxiosResponse) => {
        //         // Some example codes here:
        //         // code == 0: success
        //         if (res.status === 200) {
        //             const data: ResponseData = res.data
        //             if (data.code === 0) {
        //                 return data.data;
        //             } else {
        //                 ElMessage({
        //                     message: data.message,
        //                     type: "error"
        //                 })
        //             }
        //         } else {
        //             ElMessage({
        //                 message: "Network error!",
        //                 type: "error"
        //             });
        //             return Promise.reject(new Error(res.data.message || "Error"));
        //         }
        //     },
        //     (error: any) => Promise.reject(error)
        // )

        switch (type) {
            case 'GET':
                promise = service.get(url,{params: data})
                break
            case 'POST': 
                promise = service.post(url,data)
                break
            case 'PUT': 
                promise = service.put(url,data)
                break
            case 'DELETE': 
                promise = service.delete(url,{params: data})
                break
            default:
                console.log('Request type is wrong!' )
        }
        
        promise?.then(response => {
            //directly return response.data for request
            resolve(response.data)
        }).catch(error => {
            reject(error.message)
        })
    })
}
