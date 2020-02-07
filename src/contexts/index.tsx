import Taro from '@tarojs/taro';
import TokenStore from "@/store/token-store";
import UserStore from "@/store/user-store";
import OtherStore from "@/store/other-store";

export const stores = {
  tokenStore: new TokenStore(),
  userStore: new UserStore(),
  otherStore: new OtherStore()
};

const storesContext = Taro.createContext(stores)

export default storesContext
