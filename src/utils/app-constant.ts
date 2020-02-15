import {navigateBack, navigateTo, showToast, getCurrentPages} from "@tarojs/taro";
import {stores} from '@/contexts'

export const LOGIN_PAGE = 'pages/login/login'
export const REGISTER_PAGE = 'pages/register/register'
export const USER_PAGE = 'pages/user/user'
export const INDEX_PAGE = 'pages/index/index'
export const SUBSCRIBE_PAGE = 'pages/subscribe/subscribe'
export const MANGA_PAGE = 'pages/manga/manga'
export const BROWSE_PAGE = 'pages/browse/browse'
export const SEARCH_PAGE = 'pages/search/search'
export const HISTORY_PAGE = 'pages/history/history'

export const ORIGINAL_IMAGE_SERVER = 'imgsmall.dmzj.com'
export const PROXY_IMAGE_SERVER = 'xxx.xxx.xx'

export const navigateToLogin = () => navigateTo({url: `/${LOGIN_PAGE}`})
export const navigateToRegister = () => navigateTo({url: `/${REGISTER_PAGE}`})
export const navigateToUser = () => navigateTo({url: `/${USER_PAGE}`})
export const navigateToIndex = ({redirect = false} = {}) => redirect ? navigateBack({delta: getCurrentPages().length + 1}) : navigateTo({url: `/${INDEX_PAGE}`})
export const navigateToSubscribe = () => navigateTo({url: `/${SUBSCRIBE_PAGE}`})
export const navigateToManga = (query: string) => navigateTo({url: `/${MANGA_PAGE}?${query}`})
export const navigateToBrowse = (query: string) => {
  const {otherStore: {debug,proxyURL}} = stores
  if(debug) {
    return showToast({title: '演示项目 :-D',icon: 'none'})
  }
  if(!proxyURL) {
    return showToast({title: `点击LOGO配置代理[解决跨域]`,icon: 'none'})
  }
  return navigateTo({url: `/${BROWSE_PAGE}?${query}`})
}

export const navigateToSearchManga = () => navigateTo({url: `/${SEARCH_PAGE}`})
export const navigateToHistory = () => navigateTo({url: `/${HISTORY_PAGE}`})


