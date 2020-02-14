/**
 * mobx数据管理
 */
import Taro from '@tarojs/taro';
import TokenStore from "@/store/token-store";
import UserStore from "@/store/user-store";
import OtherStore from "@/store/other-store";
import ComicStore from "@/store/comic-store";
import SearchStore from "@/store/search-store";

export const stores = {
  tokenStore: new TokenStore(),
  userStore: new UserStore(),
  comicStore: new ComicStore(),
  otherStore: new OtherStore(),
  searchStore: new SearchStore()
};

const storesContext = Taro.createContext(stores)

export default storesContext
