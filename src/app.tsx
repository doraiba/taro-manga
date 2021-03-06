import Taro, {Component, Config} from '@tarojs/taro'
import {AsyncTrunk} from 'mobx-sync'
import {TaroAsyncStorage} from '@/storage'
import Index from '@/pages/index'
import {stores} from '@/contexts'
import {configure} from "axios-hooks";
import axios from 'axios'
// import LRU from 'lru-cache'
import DOMAIN, {UCENTER} from '@/contexts/manga-api'
import injectDefaultLog from "@/utils/inject-axios-log";
import {autorun} from "mobx";
import injectDefaultAuth from "@/utils/inject-axios-auth";

import './app.scss'

global.Date = Date
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
// const cache = new LRU({max: 10})
//更改axios的请求前缀
axios.defaults.baseURL = DOMAIN
const {tokenStore, userStore, comicStore, searchStore,chapterStore} = stores

configure({/*cache, */axios: injectDefaultAuth(injectDefaultLog(axios),tokenStore)})

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/user/user',
      'pages/login/login',
      'pages/register/register',
      'pages/subscribe/subscribe',
      'pages/manga/manga',
      'pages/browse/browse',
      'pages/search/search',
      'pages/history/history'
    ],
    // tabBar: {
    //   list: [
    //     {
    //       "pagePath": "pages/index/index",
    //       "text": "首页"
    //     },
    //     {
    //       "pagePath": "pages/user/user",
    //       "text": "我的"
    //     },
    //   ]
    // },
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#0094ff',
      navigationBarTitleText: '二刺猿',
      navigationBarTextStyle: 'white',
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Index />
    )
  }
}

new AsyncTrunk([tokenStore, userStore, comicStore,chapterStore, searchStore], {storage: new TaroAsyncStorage()}).init().then(() => {
  autorun(async () => {
    if (!tokenStore.authed) return userStore.clear()
    const {data} = await axios.get<MangaUser>(UCENTER)
    userStore.setMangaUser(data)
  }, {name: 'update::user info'})
  Taro.render(<App />, document.getElementById('app'))
})

