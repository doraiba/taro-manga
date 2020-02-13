import {AxiosInstance} from 'taro-axios'

const injectDefaultLog = (axios: AxiosInstance,
                          config: Partial<{ request: boolean, response: boolean }> = {request: true}) => {
  axios.interceptors.request.use((value => {
    if(config.request) {
      const uniqueId = `${Date.now()}/${(Math.random() * 99).toFixed()}`
      value['uniqueRequestId'] = uniqueId
      const {method,url,params,data} = value
      console.log('===unique id: ',uniqueId,' request config: ',{method,url,params,data},'===')
    }

    return value
  }));
  axios.interceptors.response.use(value => {
    if(config.response) {
      const uniqueId = value.config['uniqueRequestId']
      delete value.config['uniqueRequestId']
      console.log('===unique id: ',uniqueId,' response: ',value,'===')
    }
    return value
  })
  return axios
}
export default injectDefaultLog
