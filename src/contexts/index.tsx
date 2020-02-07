import Taro from '@tarojs/taro';
import TokenStore from "@/store/token-store";
import UserStore from "@/store/user-store";

export const stores = {tokenStore: new TokenStore(),userStore: new UserStore()};

const storesContext = Taro.createContext(stores)

export default storesContext
