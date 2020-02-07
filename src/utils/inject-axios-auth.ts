import {AxiosInstance} from 'taro-axios'
import TokenStore from "@/store/token-store";


const injectDefaultAuth = (axios: AxiosInstance,
                          tokenStore: TokenStore) => {
  axios.interceptors.request.use((value => {
    // TODO 没有请求标准,存在formdata,params
    console.log(tokenStore.uid,tokenStore.token)
    return value
  }));

  return axios
}
export default injectDefaultAuth

export const AuthParam = "dmzj_token"
