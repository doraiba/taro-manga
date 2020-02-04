import {AxiosInstance} from 'taro-axios'

const injectDefaultLog = (axios: AxiosInstance,
                          config: Partial<{ request: boolean, response: boolean }> = {request: true}) => {
  axios.interceptors.request.use((value => {
    if(config.request) {
      console.log("=========开始请求:%o============",value.url)
    }

    return value
  }));
  axios.interceptors.response.use(value => {
    if(config.response) {
      console.log("=========开始请求:%o============",value)
    }
    return value
  })
  return axios
}
export default injectDefaultLog
