import axios from 'axios'
// import { ElMessage } from 'element-plus'
import { diffTokenTime } from '@/utils/auth'
import store from '@/store'
const service = axios.create({
    baseURL: 'http://180.76.145.206:4100/api/',
    timeout: 5000
})

service.interceptors.request.use(
    (config) => {
        if (localStorage.getItem('token')) {
            if (diffTokenTime()) {
                store.dispatch('app/logout')
                return Promise.reject(new Error('token 失效了'))
            }
        }
        config.headers.token = localStorage.getItem('token')
        return config
    },
    (error) => {
        return Promise.reject(new Error(error))
    }
)

service.interceptors.response.use(
    (response) => {
        // const { errno } = response
        // if (errno === 0) {
        return response.data
    }
    //     } else {
    //         ElMessage.error('响应失败')
    //             return Promise.reject(new Error(errno))
    //     }
    // }
    // (error) => {
    //     console.log(error.response)
    //     error.response && ElMessage.error(error.response.data)
    //     return Promise.reject(new Error(error.response.data))
    // }
)
export default service