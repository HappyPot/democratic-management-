import axios from 'axios'
import {
  Notification,
  MessageBox,
  Message
} from 'element-ui'
import {
  getToken,
} from './auth'
import store from '@/store'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_API,
  // 超时
  timeout: 100000
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['adminToken'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['token'] =  getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(res => {
    if (res.data.size || res.data.size == 0) {
      return res.data
    }
    const code = res.data.status
    if (code === 1002) {
      MessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('evaluation/account/logout',{},{ root: true }).then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    } else if (code !== 0) {
      Notification.error({
        title: res.data.msg
      })
      return Promise.reject(res.data)
    } else {
      return res.data
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject('错误',res.data)
  }
)

export default service
