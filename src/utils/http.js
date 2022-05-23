import axios from 'axios'
import store from '@/store/index'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://127.0.0.1:7001'

// http request 拦截器
axios.interceptors.request.use(
    config => {
        console.log(store.state.token);
        if (store.state.token) {
            config.headers.Authorization = `bearer ${store.state.token}`
        }
        return config
    },
    err => {
        return Promise.reject(err)
    },
)

export default axios