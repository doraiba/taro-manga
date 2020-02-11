import {AxiosInstance} from 'taro-axios'
import TokenStore from "@/store/token-store";


const injectDefaultAuth = (axios: AxiosInstance,
                          tokenStore: TokenStore) => {
  axios.interceptors.request.use((value => {
    try {
      value.url = tokenStore.parseAuth(value.url as string)
    }catch (e) {
      console.log("parse error", e)
    }
    return value
  }));

  return axios
}
export default injectDefaultAuth

export const AuthParam = "dmzj_token"
