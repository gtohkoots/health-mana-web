// configure axios
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:9090/'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
      console.log("服务端异常");
      return Promise.reject(res);
    }
  
    return res.data
})

export default axios

