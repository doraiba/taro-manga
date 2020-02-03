import TokenStore from "@/store/token-store";
import { AxiosStatic } from "taro-axios";


const patchAxiosConfig = (axios: AxiosStatic, tokenStore: TokenStore) => {
  if (!axios) throw Error('axios: must not be null');
  if (!tokenStore) throw Error('tokenStore: must not be null');

  axios.interceptors.request.use((requestConfig) => {
    // if (tokenStore.token) {
    //   Object.assign(requestConfig.headers, { 'token': tokenStore.token.token })
    // }
    return requestConfig;
  });
  axios.interceptors.response.use(response => {
    if ((response.headers['content-type'] || '').includes('octet-stream')) {
      return response;
    }
    if (response.data && response.data.code !== 0) {
      // Toast.fail(response.data.msg);
      // if (response.data.code === 401) {
      //   //添加到异步队列,防止组件提前销毁
      //   setTimeout(() => tokenStore.setToken(null), 0);
      // }
      throw Object.assign(response, { data: response.data.data || {} });
    }
    return Object.assign(response, { data: response.data.data || {} });
  });
};
export default patchAxiosConfig
