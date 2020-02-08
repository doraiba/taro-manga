import {AxiosInstance} from 'taro-axios'
import TokenStore from "@/store/token-store";


const injectDefaultAuth = (axios: AxiosInstance,
                          tokenStore: TokenStore) => {
  axios.interceptors.request.use((value => {
    value.url = tokenStore.parseAuth(value.url)
    return value
  }));

  return axios
}
export default injectDefaultAuth

export const AuthParam = "dmzj_token"
