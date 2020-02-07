import Taro from '@tarojs/taro';
import TokenStore from "@/store/token-store";

export const stores = {tokenStore: new TokenStore()};

const storesContext = Taro.createContext(stores)

export default storesContext
